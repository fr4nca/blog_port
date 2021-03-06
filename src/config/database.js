const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST ? 'localhost' : process.env.DB_HOST,
  username: process.env.DB_USER ? 'postgres' : process.env.DB_USER,
  password: process.env.DB_PASS ? 'asd123' : process.env.DB_PASS,
  database: process.env.DB_NAME ? 'fr4nca' : process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
