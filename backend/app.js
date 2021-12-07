const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(express.json());
require("dotenv").config();

// Initialize DB configuration with Sequelize
// https://sequelize.org/
db.sequelize.sync();
const Subscribers = db.subscribers;

app.get("/", async (req, res) => {
	res.json({
		status: "success",
		message: "Welcome to the CloudSeArch sample app backend!",
	});
});

app.post("/subscribe", async (req, res) => {
	const userEmail = req.body.email;
	const userName = req.body.name;
	Subscribers.create({
		email: userEmail,
		name: userName,
	})
		.then((data) => {
			const msg = `[CREATED] ${data.email} - ${data.name}`;
			console.log(msg);
			res.json({ status: "success", data: data });
		})
		.catch((err) => {
			console.log(err);
			res.json({ status: "failure", reason: err.message });
		});
});

app.get("/subscribe/count", async (req, res) => {
	Subscribers.count()
		.then((data) => {
			const msg = `[RETRIEVED] ${data}`;
			console.log(msg);
			res.send(200, data);
		})
		.catch((err) => {
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
	Subscribers.update(
		{ email: userNewEmail },
		{
			where: {
				email: userOldEmail,
			},
		}
	)
		.then((results) => {
			console.log(results);
			if (results[0] === 0) {
				res.json({ status: "failure", reason: 400 });
			} else {
				const msg = `[UPDATED] ${userOldEmail} -> ${userNewEmail}`;
				console.log(msg);
				res.json({ status: "success", data: data });
			}
		})
		.catch((err) => {
			console.log(err);
			res.json({ status: "failure", reason: err.message });
		});
});

app.delete("/unsubscribe", (req, res) => {
	const userEmail = req.body.email;
	Subscribers.destroy({
		where: {
			email: userEmail,
		},
	})
		.then((results) => {
			console.log(results);
			if (results === 0) {
				res.json({ status: "failure", reason: 400 });
			} else {
				const msg = `[DELETED] ${userEmail}`;
				console.log(msg);
				res.json({ status: "success", data: userEmail });
			}
		})
		.catch((err) => {
			console.log(err);
			res.json({ status: "failure", reason: err.message });
		});
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
