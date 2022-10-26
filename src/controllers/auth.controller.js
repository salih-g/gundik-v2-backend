const bcrypt = require('bcryptjs');
const prisma = require('../utils/prisma');

const tokenService = require('../services/token.service');

const register = async (req, res) => {
	let { roomName, password } = req.body;
	//Hash Password
	password = await bcrypt.hash(password, 8);
	try {
		const room = await prisma.room.create({
			data: {
				roomName,
				password,
			},
		});

		room.token = await tokenService.generateAuthTokens(room);
		room.password = undefined;

		res.status(201).send({ ...room });
	} catch (error) {
		if (error.code === 'P2002') {
			return res.status(500).send({ error: 'This roomname was taken' });
		}
		res.status(500).send({ error: error.message || error });
	}
};

const login = async (req, res) => {
	const { roomName, password } = req.body;
	try {
		const room = await prisma.room.findUnique({
			where: {
				roomName,
			},
		});
		if (!room) {
			return res.status(401).send({ error: 'Incorrect roomname or password' });
		}
		const isPasswordTrue = await bcrypt.compare(password, room.password);
		if (!isPasswordTrue) {
			return res.status(401).send({ error: 'Incorrect roomname or password' });
		}
		room.token = await tokenService.generateAuthTokens(room);
		room.password = undefined;
		res.status(200).send({ ...room });
	} catch (error) {
		res.status(500).send({ error: error.message || error });
	}
};

module.exports = {
	register,
	login,
};
