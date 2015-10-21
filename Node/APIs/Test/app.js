var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');

var db;

if(process.env.ENV == 'Test')
	db = mongoose.connect('mongodb://localhost/bookAPI_test');
else{
	db = mongoose.connect('mongodb://localhost/bookAPI');
}

var Book = require('./models/bookModel')
var app = express();

var port  = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books',bookRouter);
app.use('/api/authors',bookRouter);

app.get('/',function(req,res){
	res.send('welcome to my API');
});

app.listen(port,function(){
	console.log('Gulp is running my app on PORT:' + port);
});

module.exports = app;

/*
Filter with query
hence 8000/api/books?genre=Fiction
then filters by Fiction

bookRouter.route('/Books')
	.get(function(req,res){

		var query = {};

		if(req.query.genre){
			query.genre = req.query.genre;
		}

		Book.find(query, function(err,books){ //books is my model from bookModel
			if(err)
				res.status(500).send(err);
			else
				res.json(books);
		});
	});
*/

/*
The bodyParser object exposes various factories to create middlewares. 
All middlewares will populate the req.body property with the parsed body
or provide an error to the callback. The various errors are described in the 
errors section.
*/