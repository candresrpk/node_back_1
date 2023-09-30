const express = require('express');
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const productos = [];
  const {size} = req.query ;

  const limit = size || 10 ;

  for (let i = 0; i < limit; i++) {
    productos.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image: faker.image.url(),
    })
  }

  res.json(productos)
});

router.get('/products/:id',(req, res) => {
  const {id} = req.params;

  res.json({
    id: id,
    name: 'product # ' + id,
    price: '3000'
  })
})


module.exports = router
