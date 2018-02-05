const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  db: {
    uri: process.env.db_uri || 'mongodb://localhost/trader2',
  },
  session: {
    secret: process.env.session_secret|| 'secret',
  },
  security: {
    areas: {
      admin: ['tino'],
    },
  },
};

export default config;
