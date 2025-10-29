const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const router = express.Router();
const MOCK_USER = 'mock-user';

router.post('/', async (req, res, next) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body || {};
    if (!customerName || !customerEmail) {
      return res.status(400).json({ message: 'customerName and customerEmail are required' });
    }

    const cart = await Cart.findOne({ userId: MOCK_USER });
    if (!cart || !cart.items.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderId = `ORD-${Date.now()}`;
    const order = new Order({
      orderId,
      customerName,
      customerEmail,
      items: cart.items.map((i) => ({
        itemId: i._id,
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      })),
      total: cart.total,
      timestamp: new Date(),
    });
    await order.save();

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({
      orderId: order.orderId,
      items: order.items,
      total: order.total,
      timestamp: order.timestamp,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;


