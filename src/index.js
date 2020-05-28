const express = require('express');
const handle = require("express-handlebars");
const body = require('body-parser');
const path = require("path");

const app = express();

const update = require('./controllers/updateController');
const get = require('./controllers/getController');
const home = require('./controllers/index');

app.use(body.json());
app.use(body.urlencoded({extended: false}));

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	// res.header("Content-Type", "application/json"); // update to match the domain you will make the request from
	next();
});

app.engine('handlebars', handle({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "../node_modules")));

app.use( (req, res, next) => {
	next();
});

app.use('/update', update);
app.use('/get', get);

app.use('/', home);

//Teste

//Fim teste

app.listen(3001);