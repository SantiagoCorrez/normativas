const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const normativasRoutes = require('./routes/normativasRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes'); // Nueva
const subcategoriasRoutes = require('./routes/subcategoriasRoutes'); // Nueva
const categoriasRoutesPublic = require('./routes/categoriasRoutesPublic'); // Nueva
const subcategoriasRoutesPublic = require('./routes/subcategoriasRoutesPublic'); // Nueva

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/normativas', normativasRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/categorias', categoriasRoutes); // Nueva ruta
app.use('/api/admin/subcategorias', subcategoriasRoutes); // Nueva ruta
app.use('/api/categorias', categoriasRoutesPublic); // Nueva ruta
app.use('/api/subcategorias', subcategoriasRoutesPublic); // Nueva ruta

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));