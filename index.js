const express = require('express');
const routerApi = require('./routes')

const {faker} = require('@faker-js/faker');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my firts app with express running at http://localhost:3000')
});

app.get('/secondary', (req, res) => {
  res.send('Hello i am the secondary route')
});

routerApi(app);

app.listen(port, () => {
  console.log('listening port: ' + port)
});






