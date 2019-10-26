import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const PORT = process.env.NODE_ENV == 'development' ? 3333 : process.env.PORT;

app.listen(PORT, () =>
  process.env.NODE_ENV ? console.log(`server running on port ${PORT}`) : null
);
