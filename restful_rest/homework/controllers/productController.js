const express = require('express');
const ProductModel = require('../models/productModel');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const products = await ProductModel.getAll();

  if (products) {
    return res.status(200).json(products);
  }

  return res.status(500).json({ message: 'Unexpected server problem' });
});

router.get('/:id', async (req, res, next) => {
  const product = await ProductModel.getById(req.params.id);

  if (product) {
    return res.status(200).json(product);
  }

  return res.status(404).json({ message: 'Product not found' });
});

router.post('/', async (req, res) => {
  const { name, brand } = req.body;

  const newProduct = await ProductModel.add(name, brand);

  if (newProduct.id) {
    return res.status(200).json(newProduct);
  }

  return res.status(500).json({ message: 'Unexpected server problem' });
});

router.delete('/:id', async (req, res) => {
  const products = await ProductModel.exclude(req.params.id);

  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(products);
});

router.put('/:id', async (req, res) => {
  const { name, brand } = req.body;

  const products = await ProductModel.update(req.params.id, name, brand);
  if (products) {
    return res.status(200).json(products);
  }

  return res.status(404).json({ message: 'Product not found' });
});

module.exports = router;