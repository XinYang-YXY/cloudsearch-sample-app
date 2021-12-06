const express = require("express");
const mysql = require("mysql");
const cors = require('cors')
const app = express();

// Import the Secret Manager client and instantiate it:
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

app.use(cors())
app.use(express.json());
require('dotenv').config()

const secretPath = 'projects/593463850334/secrets/db_pass' // Project for which to manage secrets.
let pool;
async function databaseConnectionSetUp(){
  const [version] = await client.accessSecretVersion({
    name: secretPath + '/versions/1',
  });

  pool = mysql.createPool({
    host: process.env.DB_HOST,
    // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    user: process.env.DB_USER,
    password: version.payload.data.toString(),
    database: process.env.DB_NAME,
  })
  
}
databaseConnectionSetUp()




app.get("/", async (req, res) => {
  const [secret] = await client.getSecret({
    name: secretPath,
  });
  console.log(process.env.DB_HOST)
  console.log(process.env.DB_USER)
  console.log(process.env.DB_NAME)

  res.json({status: "success", message: `Welcome to the CloudSeArch sample app backend!\nFound secret ${secret.name}`})
})

app.post("/subscribe", async (req, res) => {
  const userEmail = req.body.email;
  const userName = req.body.name;
  const data = {
    email: userEmail,
    name: userName,
  };
  const query = "INSERT INTO subscriber VALUES (?, ?)";
  pool.query(query, Object.values(data), (error) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else {
      const msg = `[CREATED] ${userEmail} - ${userName}`;
      console.log(msg);
      res.json({ status: "success", data: data });
    }
  });
});

app.get("/subscribe/count", async (req, res) => {
  const query = "SELECT COUNT(*) as totalSubscriber from newsletter.subscriber";
  pool.query(query, [], (error, results) => {
    if (!results[0]) {
      res.json({ status: "failure" });
    } else {
      const totalSubscriber = results[0].totalSubscriber
      const msg = `[RETRIEVED] ${totalSubscriber}`;
      console.log(msg);
      res.json(totalSubscriber);
    }
  });
});

app.put("/subscribe/update", (req, res) => {
  const userNewEmail = req.body.newEmail;
  const userOldEmail = req.body.oldEmail;
  const data = {
    newEmail: userNewEmail,
    oldEmail: userOldEmail,
  };
  const query = "UPDATE subscriber SET email = ? WHERE email = ?;";
  pool.query(query, Object.values(data), (error, results) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else if (results.affectedRows === 0) {
      res.json({ status: "failure", reason: 400 });
    } 
    else {
      const msg = `[UPDATED] ${userOldEmail} -> ${userNewEmail}`;
      console.log(msg);
      console.log(results)
      res.json({ status: "success", data: data });
    }
  });
});

app.delete("/unsubscribe", (req, res) => {
  const userEmail = req.body.email;
  const query = "DELETE FROM subscriber WHERE email = ?";
  pool.query(query, [userEmail], (error, results) => {
    if (error) {
      res.json({ status: "failure", reason: error.code });
    } else if (results.affectedRows === 0) {
      res.json({ status: "failure", reason: 400 });
    } else {
      const msg = `[DELETED] ${userEmail}`;
      console.log(msg);
      res.json({ status: "success", data: userEmail });
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));