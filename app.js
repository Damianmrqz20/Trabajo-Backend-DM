const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // O usar sqlite3 si es necesario

const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/todos', todoRoutes);

// Conexión a la base de datos (MongoDB en este caso)
mongoose.connect('mongodb://localhost:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;

// Endpoint básico para probar
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

