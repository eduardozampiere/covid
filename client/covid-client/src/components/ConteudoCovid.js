import React from 'react';

import CardCovid from './CardCovid'
import TabelaCovid from './TabelaCovid'
import GraficoCovid from './GraficoCovid'
import GraficoLateralCovid from './GraficoLateralCovid'



function ConteudoCovid(props){
	console.log(props.data);

	function formatDate(date){
		return date.toString().split('-').reverse().join('/');
	}

	if(!props.data){
		return (<h1>Loading</h1>);
	}
	return (
		<div className="container-lg" id="content">
			<small className="text-muted">Atualizado em: {formatDate(props.data.ultimo_dia) }</small>
			<div className="row">
				<CardCovid title="Casos confirmados:" value={props.data.confirmados} />
				<CardCovid title="Mortes:" value={props.data.mortos}/>
				<CardCovid title="Letalidade:" value={props.data.letalidade + '%'}/>
				<CardCovid title="Dobrando em:" value={props.data.dobro + ' dias'}/>
				<CardCovid title="Primeiro caso:" value={formatDate(props.data.primeiro_caso) }/>
				<CardCovid title="Primeira morte:" value={formatDate(props.data.primeira_morte)} />
			</div>
			
			<div className="row mt-2">
				<TabelaCovid value={props.data.por_estados}/>
				<GraficoLateralCovid value={props.data.por_regiao}/>
			</div>

			<GraficoCovid title="Casos acumulados por dia." tag="dia" value={props.data.por_dia} type="line"/>
			<GraficoCovid title="Projeção de casos" tag="projecao" value={props.data.projecao} type="line"/>
			<GraficoCovid title="Casos novos por dia."  tag="novos" value={props.data.por_dia_novos} type="bar"/>
			<GraficoCovid title="Taxa de mortalidade por dia." tag="mortalidade" value={props.data.letalidade_dia} type="line"/>
			<GraficoCovid title="Casos por semana." tag="semana" stacked="true" value={props.data.por_semana} type="bar"/>
			<GraficoCovid title="Casos por 100mil habitantes." stacked="true" tag="100_mil" value={props.data.por_cem_mil} type="bar"/>
		</div>
	);
}



export default ConteudoCovid;