const express = require('express');

const ProductsService = require('./../services/productService');
const validatorHandler = require('./../middleweares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/producSchema')


const router = express.Router();
const service = new ProductsService();


router.get('/', (req, res) => {
  const products = service.find()
  res.json(products)
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const product = service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  })


router.post('/',
  validatorHandler(createProductSchema, 'body'),
  (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);
    res.status(201).json({
      message: 'Product created successfully',
      newProduct
    });
  })

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const producto = service.update(id, body);

      res.json({
        message: 'Product updated successfully',
        producto
      });
    } catch (error) {
      next(error);
    }
  })

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json({
    message: 'Product deleted successfully',
    rta
  });
})


module.exports = router
