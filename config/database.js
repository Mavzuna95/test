const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('megabook', 'postgres', '1111', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432 ,
    define: {
        timestamps: false
      }
});


module.exports = sequelize;
