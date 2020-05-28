import React from 'react';

function TabelaCovid(props){

	function getTable(data){
		return Object.keys(data).map( key => {
			return(
				<tr key={key}>
					<th>{key}</th>
					<td>{data[key].casos}</td>
					<td>{data[key].mortos}</td>
				</tr>
				)
		});
	}

		return (
		<div className="col-lg-6 col-sm-12">
			<div className="card" id="card-estados">
				<div className="card-header header-tabela">
					<span>Casos por estado</span>
				</div>
				<div className="card-body" id="tabela_estados">
					<table className="col-12 table table-hover">
						<thead className="thead-light">
							<tr>
								<th scope="col">Região</th>
								<th scope="col">Casos</th>
								<th scope="col">Mortes</th>
							</tr>
						</thead>
						<tbody set_value="por_estado">
							{getTable(props.value)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)	
}

export default TabelaCovid;