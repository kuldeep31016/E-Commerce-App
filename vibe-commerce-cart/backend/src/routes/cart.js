const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const router = express.Router();

const MOCK_USER = 'mock-user';

async function recalcTotal(cart) {
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return cart.total;
}

async function getOrCreateCart(userId = MOCK_USER) {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [], total: 0 });
    await cart.save();
  }
  return cart;
}

router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity } = req.body || {};
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ message: 'productId and valid quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await getOrCreateCart(MOCK_USER);
    const existing = cart.items.find((i) => String(i.productId) === String(productId));
    if (existing) {
      existing.quantity += quantity;
      existing.price = product.price; // keep price in sync
    } else {
      cart.items.push({ productId, quantity, price: product.price });
    }

    await recalcTotal(cart);
    await cart.save();

    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(MOCK_USER);
    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const cart = await getOrCreateCart(MOCK_USER);
    const beforeLen = cart.items.length;
    cart.items = cart.items.filter((i) => String(i._id) !== String(itemId));
    if (cart.items.length === beforeLen) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    await recalcTotal(cart);
    await cart.save();
    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const { quantity } = req.body || {};
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Valid quantity is required' });
    }
    const cart = await getOrCreateCart(MOCK_USER);
    const item = cart.items.find((i) => String(i._id) === String(itemId));
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    item.quantity = quantity;
    await recalcTotal(cart);
    await cart.save();
    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(MOCK_USER);
    cart.items = [];
    cart.total = 0;
    await cart.save();
    const populated = await Cart.findById(cart._id).populate('items.productId');
    res.json(populated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


