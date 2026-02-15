const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

module.exports = function (db) {
  // All admin routes require authentication
  router.use(authenticateToken);

  // GET /api/admin/stats - dashboard statistics
  router.get('/stats', async (req, res) => {
    try {
      const totalOrders = (await db.prepare('SELECT COUNT(*) as count FROM orders').get()).count;
      const totalRevenue = (await db.prepare('SELECT COALESCE(SUM(total_cost), 0) as total FROM orders').get()).total;
      const pendingOrders = (await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").get()).count;
      const deliveredOrders = (await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'delivered'").get()).count;
      const totalCustomers = (await db.prepare('SELECT COUNT(DISTINCT customer_phone) as count FROM orders').get()).count;
      const recentOrders = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5').all();

      // Monthly revenue (last 6 months)
      const monthlyRevenue = await db.prepare(`
        SELECT
          TO_CHAR(created_at, 'YYYY-MM') as month,
          SUM(total_cost) as revenue,
          COUNT(*) as orders
        FROM orders
        WHERE created_at >= NOW() - INTERVAL '6 months'
        GROUP BY TO_CHAR(created_at, 'YYYY-MM')
        ORDER BY month DESC
      `).all();

      res.json({
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        totalCustomers,
        recentOrders,
        monthlyRevenue,
      });
    } catch (error) {
      console.error('Stats error:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // GET /api/admin/orders - list all orders
  router.get('/orders', async (req, res) => {
    try {
      const { status, page = 1, limit = 20 } = req.query;
      let query = 'SELECT * FROM orders';
      const params = [];

      if (status) {
        query += ' WHERE status = ?';
        params.push(status);
      }

      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

      const orders = await db.prepare(query).all(...params);

      let countQuery = 'SELECT COUNT(*) as count FROM orders';
      const countParams = [];
      if (status) {
        countQuery += ' WHERE status = ?';
        countParams.push(status);
      }
      const total = (await db.prepare(countQuery).get(...countParams)).count;

      res.json({ orders, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
      console.error('Orders list error:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

  // GET /api/admin/orders/:id - order detail with items
  router.get('/orders/:id', async (req, res) => {
    try {
      const order = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const items = await db.prepare(`
        SELECT oi.*, p.name as product_name, p.size, p.category
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `).all(req.params.id);

      res.json({ ...order, items });
    } catch (error) {
      console.error('Order detail error:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  });

  // PATCH /api/admin/orders/:id - update order status
  router.patch('/orders/:id', async (req, res) => {
    try {
      const { status, notes } = req.body;
      const validStatuses = ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'];

      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
      }

      const order = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      if (status) {
        await db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
      }
      if (notes !== undefined) {
        await db.prepare('UPDATE orders SET notes = ? WHERE id = ?').run(notes, req.params.id);
      }

      const updated = await db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
      res.json(updated);
    } catch (error) {
      console.error('Update order error:', error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  });

  // ============ PRODUCT MANAGEMENT ============

  // GET /api/admin/products - list all products (including out-of-stock)
  router.get('/products', async (req, res) => {
    try {
      const products = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
      res.json(products);
    } catch (error) {
      console.error('Admin products error:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  // POST /api/admin/products - create product
  router.post('/products', async (req, res) => {
    try {
      const { name, category, size, use_case, price_per_ton, description, image, in_stock } = req.body;

      if (!name || !category || !size || !use_case || price_per_ton === undefined) {
        return res.status(400).json({ error: 'Name, category, size, use_case, and price_per_ton are required' });
      }

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const existing = await db.prepare('SELECT id FROM products WHERE slug = ?').get(slug);
      if (existing) {
        return res.status(400).json({ error: 'A product with a similar name already exists' });
      }

      await db.prepare(`
        INSERT INTO products (name, slug, category, size, use_case, price_per_ton, description, image, in_stock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(name, slug, category, size, use_case, parseFloat(price_per_ton), description || '', image || '', in_stock !== undefined ? (in_stock ? 1 : 0) : 1);

      const product = await db.prepare('SELECT * FROM products WHERE slug = ?').get(slug);
      res.status(201).json(product);
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  });

  // PUT /api/admin/products/:id - update product
  router.put('/products/:id', async (req, res) => {
    try {
      const product = await db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const { name, category, size, use_case, price_per_ton, description, image, in_stock } = req.body;
      const fields = [];
      const values = [];
      let idx = 0;

      if (name !== undefined) {
        fields.push(`name = $${++idx}`, `slug = $${++idx}`);
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        values.push(name, slug);
      }
      if (category !== undefined) { fields.push(`category = $${++idx}`); values.push(category); }
      if (size !== undefined) { fields.push(`size = $${++idx}`); values.push(size); }
      if (use_case !== undefined) { fields.push(`use_case = $${++idx}`); values.push(use_case); }
      if (price_per_ton !== undefined) { fields.push(`price_per_ton = $${++idx}`); values.push(parseFloat(price_per_ton)); }
      if (description !== undefined) { fields.push(`description = $${++idx}`); values.push(description); }
      if (image !== undefined) { fields.push(`image = $${++idx}`); values.push(image); }
      if (in_stock !== undefined) { fields.push(`in_stock = $${++idx}`); values.push(in_stock ? 1 : 0); }

      if (fields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(req.params.id);
      await db.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = $${++idx}`).run(...values);

      const updated = await db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
      res.json(updated);
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  });

  // ============ REPORTS ============

  // GET /api/admin/reports/monthly?month=YYYY-MM
  router.get('/reports/monthly', async (req, res) => {
    try {
      const { month } = req.query;
      if (!month || !/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({ error: 'Month parameter required in YYYY-MM format' });
      }

      const monthStart = `${month}-01`;
      const [year, mon] = month.split('-').map(Number);
      const nextMonth = mon === 12 ? `${year + 1}-01` : `${year}-${String(mon + 1).padStart(2, '0')}`;
      const nextMonthStart = `${nextMonth}-01`;

      // Previous month for comparison
      const prevMonth = mon === 1 ? `${year - 1}-12` : `${year}-${String(mon - 1).padStart(2, '0')}`;
      const prevMonthStart = `${prevMonth}-01`;

      // Revenue summary
      const revenue = await db.prepare(`
        SELECT
          COALESCE(SUM(total_cost), 0) as total_revenue,
          COUNT(*) as total_orders,
          COALESCE(AVG(total_cost), 0) as avg_order_value
        FROM orders
        WHERE created_at >= ? AND created_at < ?
      `).get(monthStart, nextMonthStart);

      // Previous month revenue for comparison
      const prevRevenue = await db.prepare(`
        SELECT
          COALESCE(SUM(total_cost), 0) as total_revenue,
          COUNT(*) as total_orders
        FROM orders
        WHERE created_at >= ? AND created_at < ?
      `).get(prevMonthStart, monthStart);

      // Orders by status
      const ordersByStatus = await db.prepare(`
        SELECT status, COUNT(*) as count
        FROM orders
        WHERE created_at >= ? AND created_at < ?
        GROUP BY status
      `).all(monthStart, nextMonthStart);

      // Top products sold
      const topProducts = await db.prepare(`
        SELECT
          p.name,
          p.category,
          SUM(oi.quantity_tons) as tons_sold,
          SUM(oi.price) as revenue
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        JOIN products p ON oi.product_id = p.id
        WHERE o.created_at >= ? AND o.created_at < ?
        GROUP BY oi.product_id, p.name, p.category
        ORDER BY revenue DESC
        LIMIT 10
      `).all(monthStart, nextMonthStart);

      // Customer stats
      const totalCustomers = (await db.prepare(`
        SELECT COUNT(DISTINCT customer_phone) as count
        FROM orders
        WHERE created_at >= ? AND created_at < ?
      `).get(monthStart, nextMonthStart)).count;

      const topCustomers = await db.prepare(`
        SELECT
          customer_name as name,
          customer_phone as phone,
          COUNT(*) as orders,
          SUM(total_cost) as total_spent
        FROM orders
        WHERE created_at >= ? AND created_at < ?
        GROUP BY customer_phone, customer_name
        ORDER BY total_spent DESC
        LIMIT 5
      `).all(monthStart, nextMonthStart);

      // All orders for this month
      const orders = await db.prepare(`
        SELECT * FROM orders
        WHERE created_at >= ? AND created_at < ?
        ORDER BY created_at DESC
      `).all(monthStart, nextMonthStart);

      res.json({
        month,
        revenue: {
          totalRevenue: revenue.total_revenue,
          totalOrders: revenue.total_orders,
          avgOrderValue: revenue.avg_order_value,
        },
        previousMonth: {
          month: prevMonth,
          totalRevenue: prevRevenue.total_revenue,
          totalOrders: prevRevenue.total_orders,
        },
        ordersByStatus,
        topProducts,
        customers: {
          total: totalCustomers,
          topCustomers,
        },
        orders,
      });
    } catch (error) {
      console.error('Monthly report error:', error);
      res.status(500).json({ error: 'Failed to generate monthly report' });
    }
  });

  // GET /api/admin/customers - customer list
  router.get('/customers', async (req, res) => {
    try {
      const { format } = req.query;

      const customers = await db.prepare(`
        SELECT
          customer_name as name,
          customer_phone as phone,
          customer_email as email,
          COUNT(*) as total_orders,
          SUM(total_cost) as total_spent,
          MAX(created_at) as last_order
        FROM orders
        GROUP BY customer_phone, customer_name, customer_email
        ORDER BY last_order DESC
      `).all();

      if (format === 'csv') {
        const header = 'Name,Phone,Email,Total Orders,Total Spent,Last Order\n';
        const rows = customers
          .map((c) => `"${c.name}","${c.phone}","${c.email || ''}",${c.total_orders},${c.total_spent},"${c.last_order}"`)
          .join('\n');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=customers.csv');
        return res.send(header + rows);
      }

      res.json(customers);
    } catch (error) {
      console.error('Customers error:', error);
      res.status(500).json({ error: 'Failed to fetch customers' });
    }
  });

  return router;
};
