const express = require('express');
const moment = require('moment');
const router = express.Router();
const json = require('../config.json');
const Caso = require("../models/Caso");


router.post('/', async (req, res) => {
	let {pais_id, estado_id, regiao} = req.body;
	let opt = {}
	if(estado_id && estado_id != '0')
		opt.estado = estado_id
	if(pais_id && pais_id != '0')
		opt.pais = pais_id
	if(regiao && regiao != '0')
		opt.regiao = regiao

	let casos = await Caso.find(opt).sort({data:'asc'}).lean();
	dados = {}
	let por_cem_mil = {}
	let por_estados = {}
	let por_dia = {}
	let por_dia_novos = {}
	let por_regiao = {}
	let por_semana = {}
	let letalidade_dia = {}
	let estado_por_regiao = {}
	let projecao = {}
	let mortos = 0
	let confirmados = 0
	let ultimo_dia = null;
	let primeira_morte = null;
	let primeiro_caso = null;

	let dias_dobro = 0;
	let dias_dobro_aux = 1;
	let casos_aux = 0;
	let data_dobra;
	let dias_projecao = 30;
	let ultimos_casos = 0;
	let ultimas_mortes = 0;
	for(i in casos){
		let caso = casos[i];
		let uf = caso.estado;
		let dia = caso.data;
		let regiao = caso.regiao;
		let novos_casos = caso.contaminados;
		let novas_mortes = caso.mortos;
		let momento = moment(dia, 'YYYY-MM-DD');
		let id_semana = momento.week();

		mortos += novas_mortes;
		confirmados += novos_casos;
		
		if(confirmados <= 0 && mortos <= 0) continue;

		ultimo_dia = dia;
		
		if(!primeira_morte && mortos > 0){
			primeira_morte = dia;
		}

		if(!primeiro_caso){
			primeiro_caso = dia;
		}

		//Agrupando estados por regiao
		if(!estado_por_regiao[regiao]){
			estado_por_regiao[regiao] = {};
		}

		if(!estado_por_regiao[regiao][uf]){
			estado_por_regiao[regiao][uf] = true;

		}

		//Casos por dia	
		if(!por_dia[dia]){
			por_dia[dia] = {};
		}
		por_dia[dia].mortos = mortos;
		por_dia[dia].casos = confirmados;
		
		//Casos novos por dia
		if(!por_dia_novos[dia]){
			por_dia_novos[dia] = {};
			por_dia_novos[dia].casos = 0;
			por_dia_novos[dia].mortos = 0;
		}
		por_dia_novos[dia].casos += novos_casos;
		por_dia_novos[dia].mortos += novas_mortes;

		//Casos por estado
		if(!por_estados[uf]){
			por_estados[uf] = {};
			por_estados[uf].casos = 0;
			por_estados[uf].mortos = 0;
		}
		por_estados[uf].casos += novos_casos;
		por_estados[uf].mortos += novas_mortes;
		
		//Casos por regiao
		if(!por_regiao[regiao]){
			por_regiao[regiao] = {};
			por_regiao[regiao].casos = 0;
			por_regiao[regiao].mortos = 0;
		}
		por_regiao[regiao].casos += novos_casos;
		por_regiao[regiao].mortos += novas_mortes;

		//Casos novos por semana
		if(!por_semana[id_semana]){
			por_semana[id_semana] = {};
			por_semana[id_semana].casos = 0;
			por_semana[id_semana].mortos = 0;
		}
		por_semana[id_semana].casos += novos_casos;
		por_semana[id_semana].mortos += novas_mortes;
	}

	let arr = [];
	for(i in por_dia){
		let dia = por_dia[i];
		let caso = dia.casos;
		let mortos = dia.mortos;
		arr.push(caso);
		

		if(mortos > 0)
			letalidade_dia[i] = (mortos/caso) * 100;
	}

	//Pega de quantos em quantos dias está dobrando
	for(i = arr.length -1; i >= 0; i--){
		let caso = arr[i];
		if(casos_aux == 0)
			casos_aux = caso;

		if(caso <= casos_aux / 2){
			break;
		}

		dias_dobro++;
	}

	//A cadas 100 mil habitantes
	let populacao = json.population;
	for(uf in por_estados){
		let e = por_estados[uf];
		por_cem_mil[uf] = {}
		por_cem_mil[uf].casos = (e.casos / populacao[uf]) * 100000;
		por_cem_mil[uf].mortos = (e.mortos / populacao[uf]) * 100000;
	}

	let letalidade = (mortos/confirmados);
	
	//Projeta
	for(let i = 1; i <= dias_projecao; i++){
		var novo = parseInt(casos_aux * (Math.pow(2, dias_dobro_aux/dias_dobro )));
		dias_dobro_aux++;
		let dia_futuro = moment(ultimo_dia, "YYYY-MM-DD").add(i, 'd').format('YYYY-MM-DD');
		projecao[dia_futuro] = {}
		projecao[dia_futuro].casos = novo;
		projecao[dia_futuro].mortos = parseInt(novo * letalidade);
	};

	// por_cem_mil.sort((a, b) => {
	// 	return (a.casos > b.casos) ? 1 : ((b.casos > a.casos) ? -1 : 0);
	// });

	dados.dobro = dias_dobro;
	dados.data_ultima_dobra = data_dobra;
	dados.ultimo_dia = ultimo_dia;
	dados.primeira_morte = primeira_morte;
	dados.primeiro_caso = primeiro_caso;
	dados.letalidade = (letalidade * 100).toFixed(2);
	dados.mortos = mortos;
	dados.confirmados = confirmados;
	dados.projecao = projecao;
	dados.dias_projecao = dias_projecao;
	dados.letalidade_dia = letalidade_dia;
	dados.por_estados = por_estados
	dados.por_dia = por_dia;
	dados.por_dia_novos = por_dia_novos;
	dados.por_regiao = por_regiao;
	dados.por_semana = por_semana;
	dados.estado_por_regiao = estado_por_regiao;
	dados.por_cem_mil = por_cem_mil;
	dados.ultimos_casos = por_dia_novos[ultimo_dia].casos;
	dados.ultimas_mortes = por_dia_novos[ultimo_dia].mortos;

	res.send(dados);
});

module.exports = router;
