const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const config = require('./config/config');
const logger = require('./config/logger');

const port = process.env.PORT || 3000;

const server = http.createServer(app);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB')
  server.listen(port, () => {
    logger.info(`Listening to port ${port}`);
  });
});


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
