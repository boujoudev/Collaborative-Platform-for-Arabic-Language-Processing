const MailtrapClient = require("mailtrap").MailtrapClient;
const donenv = require("dotenv");
require("dotenv").config();



const mailtrapClient = new MailtrapClient({
	endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
});

const sender = {
	email: "hello@demomailtrap.co",
	name: "TAL-Arab Platform",
};

module.exports = {mailtrapClient, sender};
