import React from 'react';

function HeaderCovid(props){ 

	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
			<div className="container">
				<span className="navbar-brand">CoVID-19 | Painel</span>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-site">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse navbar-site mt-2 mt-lg-0">
					<select className="form-control mt-sm-1 mt-ls-0 w-25" id="select_uf" onChange={ e => { props.setUf(e) }} >
						<option value="0" type="0">Todos</option>
						<optgroup label="Regiões">
							<option value="Sudeste" type="regiao">Sudeste</option>
							<option value="Nordeste" type="regiao">Nordeste</option>
							<option value="Centro-Oeste" type="regiao">Centro-Oeste</option>
							<option value="Sul" type="regiao">Sul</option>
							<option value="Norte" type="regiao">Norte</option>
						</optgroup>
						<optgroup label="Sudeste">
							<option value="SP" type="estado">SP - São Paulo</option>
							<option value="RJ" type="estado">RJ - Rio de Janeiro</option>
							<option value="ES" type="estado">ES - Espírito Santo</option>
							<option value="MG" type="estado">MG - Minas Gerais</option>
						</optgroup>
						<optgroup label="Nordeste">
							<option value="BA" type="estado">BA - Bahia</option>
							<option value="AL" type="estado">AL - Alagoas</option>
							<option value="PE" type="estado">PE - Pernambuco</option>
							<option value="RN" type="estado">RN - Rio Grande do Norte</option>
							<option value="SE" type="estado">SE - Sergipe</option>
							<option value="CE" type="estado">CE - Ceará</option>
							<option value="PB" type="estado">PB - Paraíba</option>
							<option value="PI" type="estado">PI - Piauí</option>
							<option value="MA" type="estado">MA - Maranhão</option>
						</optgroup>
						<optgroup label="Centro-Oeste">
							<option value="DF" type="estado">DF - Distrito Federal</option>
							<option value="GO" type="estado">GO - Goias</option>
							<option value="MS" type="estado">MS - Mato Grosso do Sul</option>
							<option value="MT" type="estado">MT - Mato Grosso</option>
						</optgroup>
						<optgroup label="Sul">
							<option value="RS" type="estado">RS - Rio Grande do Sul</option>
							<option value="PR" type="estado">PR - Paraná</option>
							<option value="SC" type="estado">SC - Santa Catarina</option>
						</optgroup>
						<optgroup label="Norte">
							<option value="AM" type="estado">AM - Amazonas</option>
							<option value="AC" type="estado">AC - Acre</option>
							<option value="PA" type="estado">PA - Pará</option>
							<option value="TO" type="estado">TO - Tocantins</option>
							<option value="AP" type="estado">AP - Amapá</option>
							<option value="RO" type="estado">RO - Rondônia</option>
							<option value="RR" type="estado">RR - Roraima</option>
						</optgroup>
					</select>
					<button id="attDados" className="text-center btn btn-primary ml-lg-4 mt-2 mt-lg-0" onClick={props.update}>Atualizar dados</button>
				</div>
			</div>
		</nav>
	)
}

export default HeaderCovid;