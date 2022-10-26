const app = require('./app');
const logger = require('./utils/logger');
const config = require('./utils/config');
const prisma = require('./utils/prisma');
const { io } = require('./socket');

const server = app.listen(config.port, async () => {
	await prisma.$connect().then(() => {
		logger.info('Prisma connected.');
	});
	logger.info(`Listening to port ${config.port}`);
});

io.attach(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		credentials: true,
	},
});
