const express = require('express');
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middleweares/errorHandler')

const { faker } = require('@faker-js/faker');

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my firts app with express running at http://localhost:3000')
});

app.get('/secondary', (req, res) => {
  res.send('Hello i am the secondary route')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('listening port: ' + port)
});






