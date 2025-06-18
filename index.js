require('dotenv').config();
const express = require('express');
const connection = require('./database.js');
const app = express();
const port = 3000;

app.use(express.json());





app.get('/', (req, res) => {
  res.send(' Bienvenue sur l’API Produits & Catégories !');
});

//  Pour lister les catégories

app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// pour créer une catégorie
app.post('/categories', (req, res) => {
  const { name } = req.body;
  connection.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, name });
  });
});

// pour modif une catégorie
app.put('/categories/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  connection.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Catégorie modifiée' });
  });
});

// pour supprimer une catégorie
app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM categories WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Catégorie supprimée' });
  });
});



// pourlister les produits
app.get('/products', (req, res) => {
  connection.query(`
    SELECT products.*, categories.name AS category_name
    FROM products
    JOIN categories ON products.category_id = categories.id
  `, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// pour creer un produit
app.post('/products', (req, res) => {
  const { name, price, category_id } = req.body;
  connection.query(
    'INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)',
    [name, price, category_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, name, price, category_id });
    }
  );
});

// pour modifier un produit
app.put('/products/:id', (req, res) => {
  const { name, price, category_id } = req.body;
  const { id } = req.params;
  connection.query(
    'UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?',
    [name, price, category_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Produit modifié' });
    }
  );
});

// pour supprimer un produit
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Produit supprimé' });
  });
});

app.listen(port, () => {
  console.log(` le serveur est en marche sur http://localhost:${port}`);
});
