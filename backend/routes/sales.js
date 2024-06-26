const express = require('express');
const jwt = require('jsonwebtoken');
const Sale = require('../models/Sale');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

router.get('/', authenticate, async (req, res) => {
  const sales = await Sale.find({ userId: req.user.id });
  res.json(sales);
});

router.post('/', authenticate, async (req, res) => {
  const { item, amount } = req.body;
  const sale = new Sale({ item, amount, userId: req.user.id });
  await sale.save();
  res.status(201).json(sale);
});

module.exports = router;
