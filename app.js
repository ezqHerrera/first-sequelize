const express = require('express');
const app = express();
const sequelize = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Relaciones entre los modelos User y Post
const User = require('./models/user');
const Post = require('./models/post');
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

// Configuración de la base de datos:
sequelize.authenticate()
.then(()=>{
    console.log('Conexión exitosa a la base de datos');
})
.catch((error)=>{
    console.error('Error al conectar con la base de datos: ', error);
});


// Le decimos que serialice la información a Json
app.use(express.json())
app.use(cors());
app.use(morgan());

// Configurar rutas
app.use('/auth', require('./routes/auth'));
app.use('/protected', require('./routes/protected')); // Ruta protegida
app.use('/api/', userRoutes);
app.use('/api/', postRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));