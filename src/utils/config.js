require('dotenv').config();

module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT || 8081,
	jwt: {
		accessSecret: process.env.JWT_ACCESS_SECRET,
	},
	tokenTypes: {
		ACCESS: 'access',
	},
};
