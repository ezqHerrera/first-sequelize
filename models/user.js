const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model { }

User.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
	avatar:{
		type: DataTypes.STRING,
		allowNull: true
	}
},
    {
        sequelize,
        modelName: 'User'
    });


User.sync()
    .then(() => {
        console.log('La tabla users ha sido creada');
    })
    .catch((error) => {
        console.error('Error al crear la tabla users: ', error);
    });

module.exports = User;