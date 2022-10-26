const io = require('socket.io')();
const tokenService = require('./services/token.service');
const prisma = require('./utils/prisma');

const userIo = io.of('/');

userIo.use(async (socket, next) => {
	const token = socket.handshake.auth.token;
	if (!token) {
		return next(new Error('Please authenticate'));
	}
	try {
		const { sub: userId } = await tokenService.verifyToken(token);

		const room = await prisma.room.findUnique({
			where: {
				id: userId,
			},
		});

		if (!room) {
			return next(new Error('Please authenticate'));
		}
		next();
	} catch (error) {
		return next(new Error('Please authenticate'));
	}
});

io.on('connection', (socket) => {
	console.log(`${socket.id} connected`);
});

module.exports = { io };
