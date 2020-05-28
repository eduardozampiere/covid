import React, {useEffect, useCallback, useRef} from 'react';
import Chart from 'chart.js';

function GraficoCovid(props){
	const chartRef = useRef();
	const parentRef = useRef();
	const feedChart = useCallback(() =>{
		const myChartRef = chartRef.current.getContext("2d");
		let json = props.value;
		let labels = [];
		let dataAux = {};
		let data = [];
		let colors = {
				mortos: '#FF4500',
				casos: '#6959CD',
				Letalidade: '#FF4500'
		}
		let opt = {}
		for(let i in json){
			labels.push(i);
			if( typeof json[i] === 'object' ){
				for(let j in json[i]){
					if(!dataAux[j]) dataAux[j] = []
					dataAux[j].push(json[i][j]);
				}
			}
			else{
				if(!dataAux['Letalidade']) dataAux['Letalidade'] = []
				dataAux['Letalidade'].push(json[i]);
			}
			
		}

		for(let i in dataAux){
			data.push({
				label: i,
				data: dataAux[i],
				backgroundColor: colors[i]
			});
		}

		if(props.stacked){
			opt = {
				scales:{
					xAxes: [{
						stacked: true,
					}],
					yAxes:[{
						stacked: true,
					}]
				}
			}
		}
		opt.maintainAspectRatio = false;

		new Chart(myChartRef, {
			type: props.type,
			data: {
				labels: labels,
				datasets: data
			},
			options: opt
		});
	}, [chartRef, props]
	);
	useEffect(() => {
		chartRef.current.remove();
		let canvas = document.createElement('canvas');
		let ref = parentRef.current.appendChild(canvas);
		chartRef.current = ref;
		feedChart();	
	}, [props.value, chartRef, parentRef, feedChart]);


	return (
		<div className="row">
			<div className="col-12 mt-2">
				<div className="card">
					<div className="card-header">
						<span>{props.title}</span>
					</div>
					<div className="card-body">
						<div ref={parentRef} className="chart">
							<canvas id={"canvas_" + props.tag} ref={chartRef}></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default GraficoCovid;