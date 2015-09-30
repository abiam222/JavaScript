
var express = require("express");
var app = express();

app.get('/',function(req,res){
	res.send("Hello World Abiam");
})

app.get('/home',function(req,res){
	res.send("Papiiii");
})

app.listen(3000);


