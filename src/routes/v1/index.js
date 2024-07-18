const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const packageRoute = require('./package.route');
const videoRoute = require('./video.route');
const categoryRoute = require('./category.route');
const languageRoute = require('./language.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },

  {
    path: '/packages',
    route: packageRoute,
  },
  {
    path: '/video',
    route: videoRoute,
  },

  {
    path: '/category',
    route: categoryRoute,
  },

  {
    path: '/language',
    route: languageRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
