const express = require('express');
const router = express.Router();

module.exports = function (db) {
  // GET /api/products - list all products with optional filters
  router.get('/', async (req, res) => {
    try {
      const { size, use_case, category, min_price, max_price, search } = req.query;
      let query = 'SELECT * FROM products WHERE in_stock = 1';
      const params = [];
      let idx = 0;

      if (size) {
        query += ` AND size = $${++idx}`;
        params.push(size);
      }
      if (use_case) {
        query += ` AND use_case ILIKE $${++idx}`;
        params.push(`%${use_case}%`);
      }
      if (category) {
        query += ` AND category = $${++idx}`;
        params.push(category);
      }
      if (min_price) {
        query += ` AND price_per_ton >= $${++idx}`;
        params.push(parseFloat(min_price));
      }
      if (max_price) {
        query += ` AND price_per_ton <= $${++idx}`;
        params.push(parseFloat(max_price));
      }
      if (search) {
        query += ` AND (name ILIKE $${++idx} OR description ILIKE $${++idx})`;
        params.push(`%${search}%`, `%${search}%`);
        idx++; // account for second placeholder
      }

      query += ' ORDER BY name ASC';

      const products = await db.prepare(query).all(...params);
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // GET /api/products/:slug - single product
  router.get('/:slug', async (req, res) => {
    try {
      const product = await db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  return router;
};
