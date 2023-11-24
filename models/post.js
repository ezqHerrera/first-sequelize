const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Post extends Model { }

Post.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
	url:{
		type: DataTypes.STRING,
		allowNull: true
	}
},
    {
        sequelize,
        modelName: 'Post'
    })

Post.sync()
    .then(() => {
        console.log('La tabla posts ha sido creada');
    })
    .catch((error) => {
        console.error('Error al crear la tabla posts: ', error);
    });

module.exports = Post;