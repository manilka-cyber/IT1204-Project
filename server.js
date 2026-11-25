const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'marlow_mayfair_secret_2026';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'The-Marlow-Phone-And-Laptop-v5.html'));
});

// Health check to verify MySQL connection
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', database: err.message });
  }
});

// 1. AUTHENTICATION ROUTES
app.post('/api/auth/register', async (req, res) => {
  try {
    const { full_name, property_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Full name, email, and password are required' });
    }

    const hash = await bcrypt.hash(password, 10);
    const propName = property_name || 'Marlow - Mayfair';
    const [result] = await pool.query(
      'INSERT INTO users (full_name, property_name, email, password_hash) VALUES (?, ?, ?, ?)',
      [full_name, propName, email, hash]
    );

    const token = jwt.sign({ user_id: result.insertId, email }, JWT_SECRET, { expiresIn: '12h' });
    res.status(201).json({
      message: 'Account created',
      token,
      user: { full_name, property_name: propName, email }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ user_id: rows[0].user_id, role: rows[0].role }, JWT_SECRET, { expiresIn: '12h' });
    res.json({
      message: 'Logged in',
      token,
      user: { full_name: rows[0].full_name, role: rows[0].role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. MEAL ORDERS & KITCHEN QUEUE ROUTES
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM meal_orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { order_id, room_or_table, guest_name, items_summary, allergy_alert, station, total_amount } = req.body;
    const generatedId = order_id || `#${Math.floor(1050 + Math.random() * 8900)}`;

    await pool.query(
      'INSERT INTO meal_orders (order_id, room_or_table, guest_name, items_summary, allergy_alert, station, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [generatedId, room_or_table, guest_name, items_summary, allergy_alert || 'None', station || 'Hot kitchen', Number(total_amount)]
    );
    res.status(201).json({ message: 'Order sent to kitchen', order_id: generatedId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const decodedId = decodeURIComponent(req.params.id);
    await pool.query('UPDATE meal_orders SET status = ? WHERE order_id = ?', [status, decodedId]);
    res.json({ message: 'Order status updated', status });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const decodedId = decodeURIComponent(req.params.id);
    await pool.query('DELETE FROM meal_orders WHERE order_id = ?', [decodedId]);
    res.json({ message: 'Order dispatched' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. MENU MANAGEMENT ROUTES
app.get('/api/menu', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM menu_items ORDER BY item_id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/menu/:id/toggle', async (req, res) => {
  try {
    const { is_available } = req.body;
    await pool.query('UPDATE menu_items SET is_available = ? WHERE item_id = ?', [Boolean(is_available), req.params.id]);
    res.json({ message: 'Menu availability updated' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. INVENTORY & BARCODE EXPIRY ROUTES
app.get('/api/inventory', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory ORDER BY expiry_date ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const { sku, barcode, ingredient_name, category_storage, quantity_on_hand, unit, reorder_level, expiry_date, supplier } = req.body;
    await pool.query(
      'INSERT INTO inventory (sku, barcode, ingredient_name, category_storage, quantity_on_hand, unit, reorder_level, expiry_date, supplier) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [sku, barcode, ingredient_name, category_storage, Number(quantity_on_hand), unit || 'units', Number(reorder_level ?? 2), expiry_date, supplier]
    );
    res.status(201).json({ message: 'Inventory item added' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/inventory/:sku/restock', async (req, res) => {
  try {
    const qty = Number(req.body.quantity_on_hand) || 12;
    await pool.query('UPDATE inventory SET quantity_on_hand = ? WHERE sku = ?', [qty, req.params.sku]);
    res.json({ message: 'Stock restocked' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`The Marlow Full-Stack Server running on http://localhost:${PORT}`);
});
