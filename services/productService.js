const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100 ;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  create (data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    }

    this.products.push(newProduct);

    return newProduct;
  }

  find () {
    return this.products;
  }

  findOne(id) {
    const product = this.products.find(item => item.id === id);

    if(!product){
      throw boom.notFound("Product not found");
    }
    if (product.isBlocked){
      throw boom.conflict("Product is blocked");

    }
    return product;
  }

  update(id, changes){
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index]

    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  delete (id) {
    const index = this.products.findIndex(item => item.id === id);

    if (index === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(index, 1);

    return {id}
  }
}

module.exports = ProductsService;
