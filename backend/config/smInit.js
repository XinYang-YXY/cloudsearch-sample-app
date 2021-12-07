fs = require("fs");
// Import the Secret Manager client and instantiate it:
var AWS = require("aws-sdk"),
	region = "ap-northeast-1",
	secretName =
		"arn:aws:secretsmanager:ap-northeast-1:102153735617:secret:cloudsearch/db-iO8jhV",
	secret;

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
	region: region,
});

async function smInit() {
	client.getSecretValue({ SecretId: secretName }, function (err, data) {
		if ("SecretString" in data) {
			secret = data.SecretString;
			//console.log("SecretString retrieved = " + JSON.parse(secret).password) //working
		}
		console.log("SecretString retrieved = " + JSON.parse(secret).password); //working
		let dbPassword = JSON.parse(secret).password;
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
	});
}

smInit();
