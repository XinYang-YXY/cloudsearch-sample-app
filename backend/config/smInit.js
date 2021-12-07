fs = require("fs");
// Import the Secret Manager client and instantiate it:
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const client = new SecretManagerServiceClient();
const secretPath = "projects/593463850334/secrets/db_pass"; // Project for which to manage secrets.

async function smInit() {
	client
		.accessSecretVersion({
			name: secretPath + "/versions/1",
		})
		.then((data) => {
			let dbPassword = data[0].payload.data.toString();
			fs.readFile(".env", async (err, data) => {
				if (err) throw err;
				if (data.includes(`DB_PASS=${dbPassword}`)) {
					console.log("✅ Secrets are already retrieved");
				} else {
					fs.appendFile(".env", `\nDB_PASS=${dbPassword}`, (err) => {
						if (err) return console.log(err);
					});
					console.log(
						"🎉 Data retrieved from Secrets Manager successfully!"
					);
				}
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

smInit();
