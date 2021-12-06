const express = require("express");
const cors = require('cors')
const app = express();
const db = require("./models");

app.use(cors())
app.use(express.json());
require('dotenv').config();

// Initialize DB configuration with Sequelize
// https://sequelize.org/
db.sequelize.sync();
const Subscribers = db.subscribers;

app.get("/", async (req, res) => {
  res.json({status: "success", message: "Welcome to the CloudSeArch sample app backend!"})

// Import the Secret Manager client and instantiate it:
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();
const secretPath = 'projects/593463850334/secrets/db_pass' // Project for which to manage secrets.
let pool;
  
// async function databaseConnectionSetUp(){
//   const [version] = await client.accessSecretVersion({
//     name: secretPath + '/versions/1',
//   });

//   pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
//     user: process.env.DB_USER,
//     password: version.payload.data.toString(),
//     database: process.env.DB_NAME,
//   })
  
// }
// databaseConnectionSetUp()
  
app.get("/", async (req, res) => {
  const [secret] = await client.getSecret({
    name: secretPath,
  });

  res.json({status: "success", message: `Welcome to the CloudSeArch sample app backend!\nFound secret ${secret.name}`})
})

app.post("/subscribe", async (req, res) => {
  const userEmail = req.body.email;
  const userName = req.body.name;
  Subscribers.create({
    email: userEmail,
    name: userName,
  })
  .then(data => {
    const msg = `[CREATED] ${data.email} - ${data.name}`;
    console.log(msg);
    res.json({ status: "success", data: data });
  })
  .catch(err => {
    console.log(err);
    res.json({ status: "failure", reason: err.message });
  });
});

app.get("/subscribe/count", async (req, res) => {
  Subscribers.count()
  .then(data => {
    const msg = `[RETRIEVED] ${data}`;
    console.log(msg);
    res.send(200, data);
  })
  .catch(err => {
    console.log(err);
    res.json({ status: "failure", reason: err.message });
  });
});

app.put("/subscribe/update", (req, res) => {
  const userNewEmail = req.body.newEmail;
  const userOldEmail = req.body.oldEmail;
  const data = {
    newEmail: userNewEmail,
    oldEmail: userOldEmail,
  };
  Subscribers.update({ email: userNewEmail }, {
    where: {
      email: userOldEmail
    }
  })
  .then(results => {
    console.log(results);
    if (results[0] === 0) {
      res.json({ status: "failure", reason: 400 });
    } else {
      const msg = `[UPDATED] ${userOldEmail} -> ${userNewEmail}`;
      console.log(msg);
      res.json({ status: "success", data: data });
    }
  })
  .catch(err => {
    console.log(err);
    res.json({ status: "failure", reason: err.message });
  });
});

app.delete("/unsubscribe", (req, res) => {
  const userEmail = req.body.email;
  Subscribers.destroy({
    where: {
      email: userEmail
    }
  })
  .then(results => {
    console.log(results);
    if (results === 0) {
      res.json({ status: "failure", reason: 400 });
    } else {
      const msg = `[DELETED] ${userEmail}`;
      console.log(msg);
      res.json({ status: "success", data: userEmail });
    }
  })
  .catch(err => {
    console.log(err);
    res.json({ status: "failure", reason: err.message });
  });
});

const PORT = process.env.PORT || 8080;


app.listen(PORT, console.log(`Server started on port ${PORT}`));
