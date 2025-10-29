const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

function getSeedProducts() {
  return [
    { name: 'Wireless Headphones', price: 79.99, description: 'Comfortable over-ear wireless headphones with noise isolation.', image: 'https://picsum.photos/seed/headphones/400/300', category: 'electronics' },
    { name: 'Smart Watch', price: 199.99, description: 'Track fitness and notifications with a sleek smartwatch.', image: 'https://picsum.photos/seed/watch/400/300', category: 'electronics' },
    { name: 'Laptop Backpack', price: 49.99, description: 'Durable backpack with padded laptop sleeve.', image: 'https://picsum.photos/seed/backpack/400/300', category: 'accessories' },
    { name: 'USB-C Cable', price: 12.99, description: 'Fast charging and data transfer cable.', image: 'https://picsum.photos/seed/cable/400/300', category: 'electronics' },
    { name: 'Bluetooth Speaker', price: 59.99, description: 'Portable speaker with rich bass.', image: 'https://picsum.photos/seed/speaker/400/300', category: 'electronics' },
    { name: 'Phone Case', price: 24.99, description: 'Shock-absorbing phone case with grip.', image: 'https://picsum.photos/seed/case/400/300', category: 'accessories' },
    { name: 'Wireless Mouse', price: 34.99, description: 'Ergonomic wireless mouse with adjustable DPI.', image: 'https://picsum.photos/seed/mouse/400/300', category: 'electronics' },
    { name: 'Desk Lamp', price: 44.99, description: 'LED desk lamp with adjustable brightness.', image: 'https://picsum.photos/seed/lamp/400/300', category: 'home' },
    { name: 'Water Bottle', price: 18.99, description: 'Insulated stainless steel water bottle.', image: 'https://picsum.photos/seed/bottle/400/300', category: 'accessories' },
    { name: 'Notebook Set', price: 15.99, description: 'Set of 3 dotted notebooks for notes and sketches.', image: 'https://picsum.photos/seed/notebook/400/300', category: 'stationery' },
  ];
}

router.get('/', async (req, res, next) => {
  try {
    let products = await Product.find({}).lean();
    if (!products || products.length === 0) {
      const seeded = await Product.insertMany(getSeedProducts());
      products = seeded.map((p) => p.toObject());
    }
    res.json(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


