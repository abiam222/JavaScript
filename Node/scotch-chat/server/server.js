var express = require('express');
var mongoose = require('mongoose');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


//tell express where to serve static files from
app.use(express.static(__dirname + '/public'));


mongoose.connect("mongodb://localhost/scotch-chat");


//create a scema for chat
var ChatSchema = mongoose.Schema({
	created: Date,
	content: String,
	username: String,
	room: String
});

//create a model from the chat schema
var Chat = mongoose.model('Chat', ChatSchema);


//allow CORS

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

	if ( req.method == 'OPTIONS' ) {
		res.status(200).end();
	} else {
		next();
	}
});


/*|||||||||||||||||ROUTES||||||||||||||||||||*/
//route for our index file

app.get('/', function( req, res ) {
	//send the index.html in our public directory
	res.sendfile('index.html');
});

//This route is simply run only on first launch just to generate some chat history
app.post('/setup', function ( req, res ) {
	//array of chat data. Each object properties must match the schema object properties
	var chatData = [{
		created: new Date(),
		content: 'Hi',
		username: 'Chris',
		room: 'php'
	}, {
		created: new Date(),
		content: 'Hello',
		username: 'Obinna',
		room: 'laravel'
	}, {
		created: new Date(),
		content: 'Ait',
		username: 'Bill',
		room: 'angular'
	}, {
		created: new Date(),
		content: 'Amazing room',
		username: 'Patience',
		room: 'socet.io'
	}];

	//Loop thorugh each of the chat data adn insert into the database
	for ( var c = 0; c < chatData.length; c++ ) {
		//create an instance of the chat model
		var newChat = new Chat( chatData[c] );
		//Call save to insert the chat
		newChat.save(function(err, savedChat) {
			console.log(savedChat);
		});
	}
	//send a response so the serve would not get stuck
	res.send('created');

});

	//This route produces a list of chat as filtered by 'room' query
 app.get( '/msg', function( req, res ) {
 	//Find
 	Chat.find({
 		'room': req.query.room.toLowerCase()
 	}).exec( function( err, msg ) {
 		//send
 		res.json( msgs );
 	});
 });

 /*||||||||||||||||||END ROUTES|||||||||||||||||*/



 /*|||||||||||||||||SOCKET||||||||||||||*/
 //Listen for connection

 io.on( 'connection', function( socket ) {
 	//Globals
 	var defaultRoom = 'general';
 	var rooms = ['General', 'angular', 'socket.io', 'express', 'node', 'mongo', 'PHP', 'laravel' ];
 
 	//Emit the rooms array
 	socket.emit( 'setup', {
 		rooms: rooms
 	});


 	//Listens for new user
 	socket.on( 'new user', function (data) {
 		data.room = defaultRoom;
 		//new user joins the default room
 		socket.join(defaultRoom);
 		//tell all those in the room that a new user joined
 		io.in(defaultRoom).emit('user joined', data);
 	});

 	//Listens for switch room
 	socket.on( 'switch room', function(data) {
 		//handles joining and leaving rooms
 		//console.log(data)
 		socket.leave(data.oldRoom);
 		socket.join(data.newRoom);
 		io.in(data.oldRoom).emit('user left', data);
 		io.in(data.newRoom).emit('user joined', data);
 	});

 	//Listens for a new chat message
 	socket.on('new message', function(data) {
 		//create message
 		var newMsg = new Chat({
 			username: data.username,
 			content: data.message,
 			room: data.room.toLowerCase(),
 			created: new Date()
 		});
 		//save it to database
 		newMsg.save(function( err, msg ) {
 			//send message to those connecte in teh room
 			io.in(msg.room).emit('message created', msg);
 		});
 	});
 });


/*|||||||||||||||END SOCKETS|||||||||||*/

server.listen(2015);
console.log('It\'s going down in 2015');

/*THIS IS SICK AFFFFFFF */
process.on('uncaughtException', function (err) {
    console.log(err);
}); 





 