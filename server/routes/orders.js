const express = require('express');
const router = express.Router();
const { sendOrderNotification } = require('../utils/email');
const { generateWhatsAppOrderLink } = require('../utils/whatsapp');

module.exports = function (db) {
  // POST /api/orders - create a new order
  router.post('/', (req, res) => {
    try {
      const {
        customer_name,
        customer_phone,
        customer_email,
        delivery_address,
        delivery_lat,
        delivery_lng,
        delivery_cost,
        items,
        notes,
      } = req.body;

      if (!customer_name || !customer_phone || !items || !items.length) {
        return res.status(400).json({ error: 'Name, phone, and at least one item are required.' });
      }

      // Calculate total
      let subtotal = 0;
      for (const item of items) {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id);
        if (!product) {
          return res.status(400).json({ error: `Product ID ${item.product_id} not found` });
        }
        subtotal += product.price_per_ton * item.quantity_tons;
      }
      const total_cost = subtotal + (delivery_cost || 0);

      // Insert order
      const orderResult = db.prepare(`
        INSERT INTO orders (customer_name, customer_phone, customer_email, delivery_address, delivery_lat, delivery_lng, delivery_cost, total_cost, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        customer_name,
        customer_phone,
        customer_email || null,
        delivery_address || null,
        delivery_lat || null,
        delivery_lng || null,
        delivery_cost || 0,
        total_cost,
        notes || null
      );

      const orderId = orderResult.lastInsertRowid;

      // Insert order items
      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity_tons, price)
        VALUES (?, ?, ?, ?)
      `);

      const itemDetails = [];
      for (const item of items) {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.product_id);
        const price = product.price_per_ton * item.quantity_tons;
        insertItem.run(orderId, item.product_id, item.quantity_tons, price);
        itemDetails.push({
          product_name: product.name,
          quantity_tons: item.quantity_tons,
          price: product.price_per_ton,
        });
      }

      db.save();

      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);

      // Send notifications (non-blocking)
      sendOrderNotification(order, itemDetails).catch(console.error);
      const whatsappLink = generateWhatsAppOrderLink(order, itemDetails);

      res.status(201).json({
        message: 'Order placed successfully!',
        order: {
          id: orderId,
          total_cost,
          status: 'pending',
        },
        whatsapp_link: whatsappLink,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  return router;
};
