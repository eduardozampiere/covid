const express = require('express');
const router = express.Router();

const Caso = require("../models/Caso");

const http = require('https');
const csv = require('get-csv');

function getRegiao(uf){
	norte = ['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC']
	nordeste = ['MA', 'PI', 'CE', 'RN', 'PE', 'PB', 'SE', 'AL', 'BA']
	centro = ['MT', 'MS', 'GO', 'DF']
	sul = ['PR', 'RS', 'SC']

	if(norte.indexOf(uf) != -1)
		return 'Norte'

	if(nordeste.indexOf(uf) != -1)
		return 'Nordeste'

	if(centro.indexOf(uf) != -1)
		return 'Centro-Oeste'

	if(sul.indexOf(uf) != -1)
		return 'Sul'

	return 'Sudeste'
}


async function tryCaso(params){
	let c = params
	let caso;
	try{
		caso = await Caso.findOne({estado: params.estado, data: params.data});
		if(!caso){
			//Insere caso novo
			caso = await Caso.create(c);
		}
		else{
			//Atualiza caso existente
			if(caso.mortos != c.mortos || caso.contaminados != c.contaminados){
				caso.mortos = c.mortos;
				caso.contaminados = c.contaminados;
				await caso.save();
			}
		}
	}catch(err){
		console.log(err);
		return false;
	}

	return caso;
}

router.post('/', async (req, res) => {
	const link = "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv";	
	
	pais = 'Brasil';
	let rows = await csv(link);
	for(i in rows){
		let row = rows[i];
		if (row.state == 'TOTAL') continue;
	
		let estado = row.state;
		let data = row.date;
		let mortos = parseInt(row.newDeaths);
		let contaminados = parseInt(row.newCases);
		let c = {
			estado: estado, 
			contaminados: contaminados, 
			mortos: mortos,
			data: data,
			pais: pais,
			regiao: getRegiao(estado)
		}

		if( await !tryCaso(c)){
			console.log("Erro");
			break;
		}

	}

	res.send({ok: true});
});

module.exports = router;