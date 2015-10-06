
var express = require("express");
var app = express();

app.get('/',function(req,res){
	res.send("Hello World Abiam");
})

app.get('/home',function(req,res){
	res.send("Papiiii");
})

app.listen(3000);



/* #1 */
/*
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect('mongodb://localhost/simple')

var personSchema = {
	firstName: String,
	lastName: String,
	email: String
}

var Person = mongoose.model('Person',personSchema, 'people');
var app = express()

app.get('/people',function(req, res){
	Person.findOne(function(err,doc){
		...
	})
})

app.listen(3000);
*/

