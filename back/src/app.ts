import express from 'express';
const app = express();
const port = 3001;

const xero = require('./routes/xero.routes');

app.use('', xero);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});