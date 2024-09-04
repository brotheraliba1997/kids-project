const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const config = require('./config/config');
const logger = require('./config/logger');
const { Server } = require('socket.io');
const { permittedCrossDomainPolicies } = require('helmet');
const { notificationDocumentChangeHelper } = require('./helpers/watchFunctions');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: '*', // React app ka URL
//     methods: ['GET', 'POST'],
//   },
// });


const io = new Server(server, {
  // transports: ['polling'],
  // cors: {
  //   cors: {
  //     origin: '*',
  //     methods: ['GET', 'POST'],
  //   },
  // },

  // {
  transports: ['websocket', 'polling'],
  // transports: ["websocket", "polling"],
  // allowEIO3: true,
  // wsEngine: require("eiows").Server,
  perMessageDeflate: false,
  // perMessageDeflate: {
  //   // threshold: 1028,
  //   threshold: 32768,
  //   // threshold: 800000,
  // },
  cors: {
    origin: '*',
    // origin: await getDomains(),

    methods: ['GET', 'POST'],
    credentials: true,
  },
  // }
});


mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server.listen(port, () => {
    logger.info(`Listening to port ${port}`);

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
    
    const notificationCollection = mongoose.connection.collection('notifications');
    const notificationChangeStream = notificationCollection.watch();
    notificationChangeStream.on('change', (change) => {
      notificationDocumentChangeHelper({
        payload: change,
        io
      });
    });
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
