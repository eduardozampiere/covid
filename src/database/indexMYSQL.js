const Sequelize = require('sequelize');
const config = require('../config-data.json');

const sequelize = new Sequelize(config);

sequelize.authenticate().then( () => {
	console.log('Database connected');
}).catch( err => {
	console.log('Unable to connect to the database: ', err);
});

module.exports = {
	Sequelize: Sequelize,
	sequelize: sequelize
}