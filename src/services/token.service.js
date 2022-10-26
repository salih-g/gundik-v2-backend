const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../utils/config');

const generateToken = (
	roomId,
	type = config.tokenTypes.ACCESS,
	secret = config.jwt.accessSecret,
) => {
	const payload = {
		sub: roomId,
		iat: moment().unix(),
		type,
	};
	return jwt.sign(payload, secret);
};

const generateAuthTokens = async (room) => {
	return generateToken(room.id);
};

const verifyToken = async (token) =>
	await jwt.verify(token, config.jwt.accessSecret);

module.exports = {
	generateToken,
	generateAuthTokens,
	verifyToken,
};
