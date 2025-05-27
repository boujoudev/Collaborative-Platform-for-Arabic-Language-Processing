const jwt = require('jsonwebtoken');
require("dotenv").config();

const generateTokenAndSetCookie = (res, userId, username, role) => {
	const token = jwt.sign({ id: userId, username: username, role: role }, process.env.JWT_SECRET, {
		expiresIn: "24h",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		/*sameSite: "strict",*/
		sameSite: "lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};

module.exports = { generateTokenAndSetCookie };
