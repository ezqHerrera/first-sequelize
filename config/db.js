const {Sequelize} =  require('sequelize');

const sequelize = new Sequelize(
    'sequelpractice',
    'root',
    '',
    {
        host:'localhost',
        dialect: 'mysql'
    }
    );

module.exports = sequelize;