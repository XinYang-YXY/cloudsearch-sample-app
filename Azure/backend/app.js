const express = require("express");
const mysql = require("mysql");
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
require('dotenv').config()
const pool = mysql.createPool({
  // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`, # For GCP
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get("/", async (req, res) => {
  res.json({status: "success", message: "Welcome to the CloudSeArch sample app backend!"})
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
