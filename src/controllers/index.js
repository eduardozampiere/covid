const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	// console.log('a');
	// res.render('index');
	res.send("Oops! Essa rota não existe mais.\nTente acessar pela porta 3000");
});

module.exports = router