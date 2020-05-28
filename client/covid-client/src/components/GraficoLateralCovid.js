import React, {useEffect, useCallback, useRef} from 'react';
import Chart from 'chart.js';

function GraficoLateralCovid(props){
	const chartRef = useRef();
	const parentRef = useRef();

	const feedChart = useCallback( () => {
		const myChartRef = chartRef.current.getContext("2d");
		let json = props.value;

		var nCasos = [];
			var regioes = [];

			for(let i in json){
				regioes.push(i);
				nCasos.push(json[i].casos)
			}

			var data = {
				datasets:[{
					data: nCasos,
					backgroundColor: ['#FF4500', '#6959CD', '#00FF7F', '#FF00FF', '#FFD700', '#228B22', '#008B8B']
				}],

				labels:regioes,
			}

			new Chart(myChartRef, {
				type: 'pie',
				data: data,
				options: {
					maintainAspectRatio: false
				}
			});
	}, [chartRef, props])


	useEffect(() => {
		chartRef.current.remove();
		let canvas = document.createElement('canvas');
		let ref = parentRef.current.appendChild(canvas);
		chartRef.current = ref;
		feedChart();	
	}, [props.value, chartRef, parentRef, feedChart]);

	return (
		<div className="col-lg-6 col-sm-12 mt-lg-0 mt-2 mt-lg-0">
			<div className="card" id="grafico_regiao">
				<div className="card-header">
					<span>Casos por regiao</span>
				</div>
				<div className="card-body">
					<div id="div_grafico_regiao" ref={parentRef}>
						<canvas id="canvas_regiao" ref={chartRef} height="400"></canvas>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GraficoLateralCovid;