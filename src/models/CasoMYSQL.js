const db = require('../database');

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const Caso = sequelize.define('Caso', {
	data:{
		type: Sequelize.DataTypes.STRING,
	},
	contaminados:{
		type: Sequelize.DataTypes.INTEGER,
	},
	mortos:{
		type: Sequelize.DataTypes.INTEGER,		
	}
});

module.exports = Caso;

