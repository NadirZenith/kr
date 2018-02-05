import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import morgan from 'morgan'; // express middleware log
import bodyParser from 'body-parser'; // express middleware request parser
import Express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import flash from 'connect-flash';
// import mongoose from 'mongoose';
import mongoose from './utils/mongoose';


import wpconfig from '../config/webpack.config.dev';
import config from './config';
import mainRoutes from './routes/main.routes';
import * as tickManager from './utils/krakenTick';

// Express --------------------------------------------
const app = Express();

// log
app.use(morgan('dev'));
// app.use(morgan('tiny'));
// app.use(morgan('combined'))

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// ------ dev
// Webpack Requirements
// Run Webpack dev server in development mode
if (config.env === 'development') {
  const compiler = webpack(wpconfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: wpconfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  // cors
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
} else {
  app.use(Express.static('dist/client'));
}


// // db --------------------------------------------
// mongoose.connect(config.db.uri, {useMongoClient: true}, (error) => {
//     if (error) {
//         console.log('-------------------- MONGO ERROR -------------------');
//         console.log(error);
//     }
// });
// mongoose.Promise = global.Promise;

// session --------------------------------------------
const MongoStore = require('connect-mongo')(session);

const sess = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {},
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  // store: new MongoStore({mongooseConnection: mongoose.connection}),
};
app.use(session(sess));

// setInterval(() => {
//     console.log(' --------------- ');
// console.log(mongoose.connection.readyState)
// }, 4000)


// const sessFile = {
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
// };
// app.use(session(sessFile));

// flash messages
app.use(flash());

// security -------------------------------------------
require('./app/config/passport');

app.use(passport.initialize());
app.use(passport.session());

// ---------- routes ------------------------------
// app.use(Express.static('public'))
// app.use(Express.static(path.resolve(__dirname, '../client')));
app.use(mainRoutes);


const tickInterval = tickManager.createTickInterval(5, { key: 'value' });

setTimeout(() => {
  clearInterval(tickInterval);
  // console.log('timeout');
}, 16000);
// Express start ----------------------------------
app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});

export default app;

