const mongoose = require("../database");

const CasoSchema = new mongoose.Schema({
	data: {
		type: String,
		require: true
	},

	contaminados: {
		type: Number,
		default: 0
	},

	mortos: {
		type: Number,
		default: 0
	},

	estado:{
		type: String,
		required: true
	},

	regiao:{
		type: String,
		required: true
	},

	pais:{
		type: String,
		required: true
	}
});

const Caso = mongoose.model('Caso', CasoSchema);
module.exports = Caso;