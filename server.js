const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta absoluta a la base de datos
const dbPath = path.join(__dirname, 'imperial.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado correctamente a imperial.db');
  }
});

// Ruta API para obtener los productos/muebles por categoría
app.get('/api/productos', (req, res) => {
  const categoria = req.query.categoria;
  
  let sql = 'SELECT * FROM productos';
  let params = [];

  if (categoria && categoria !== 'todos') {
    sql += ' WHERE LOWER(categoria) = LOWER(?)';
    params.push(categoria);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Usar el puerto asignado por Render (process.env.PORT) o 3000 para local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});