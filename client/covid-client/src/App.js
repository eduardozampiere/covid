import React, {useState, useEffect} from 'react';

import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

import HeaderCovid from './components/HeaderCovid';
import ConteudoCovid from './components/ConteudoCovid';

import axios from 'axios';

function App(){
	const [data, setData] = useState(null);
	document.title = "Dados da Covid-19";
	useEffect( () => {
		getData({});
	}, []);

	function getData(obj){
		axios.post('/get', obj).then( r => {			
			setData(r.data);
		});
	}

	function update(){
		axios.post('/update').then( r => {
			getData({
				estado_id: 0,
				regiao: 0
			});
			alert("Atualizaçao concluida");
    	})
	}

	function setUf(event){
		let value = event.target.selectedOptions[0].attributes.value.nodeValue;
		let type = event.target.selectedOptions[0].attributes.type.nodeValue;
		setData(null);
		if(type === 'regiao'){
			getData({
				regiao: value,
				estado_id: 0
			})

		}
		else if(type === 'estado'){
			getData({
				regiao: 0,
				estado_id: value
			})
		}
		else{
			getData({
				regiao: 0,
				estado_id: 0
			})
		}
	}
	return (
		<div>
			<HeaderCovid setUf={setUf} update={update} />
			<ConteudoCovid data={data}/>
		</div>
		)
}

export default App;
