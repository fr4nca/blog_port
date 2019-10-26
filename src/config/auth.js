const dotenv = require('dotenv');
dotenv.config();

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};
