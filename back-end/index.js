const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sportime'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(bodyParser.json());

// Create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  connection.query('INSERT INTO products SET ?', newProduct, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json({ message: 'Product created successfully', productId: result.insertId });
  });
});

// Get all products
app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Get a specific product by ID
app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  connection.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update a product by ID
app.put('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;
  connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product updated successfully' });
    }
  });
});

// Delete a product by ID
app.delete('/products/:productId', (req, res) => {
  const productId = req.params.productId;
  connection.query('DELETE FROM products WHERE id = ?', [productId], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
