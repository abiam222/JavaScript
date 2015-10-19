
//Load angular
var app = angular.module('scotch-chat', ['ngMaterial', 'ngAnimate', 'ngMdIcons', 'btford.socket-io']);

//set our server url
var serverBaseUrl = 'http://localhost:2015';

//services to interact with nodewebkit GUI and Window
app.factory('GUI', function() {
	//return nw.gui
	return require('nw.gui');
});

app.factory('Window', function (GUI) {
	return GUI.Window.get();
});


//Service to interact with the socket library
app.factory('socket', function(socketFactory) {
	var myIoSocket = io.connect(serverBaseUrl);

	var socket = socketFactory({
		ioSocket: myIoSocket
	});

	return socket;
})


//ng-enter directive

app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind('keydown keypress', function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});


//Our controller
app.controller('MainCtrl', function($scope, Window, GUI, $mdDialog, socket, $hhtp) {

	//Menu setup

	//Modal setup

	//listen for new message

	//notify server of the new mesage
});



	//Global Scope
	$scope.messages = [];
	$scope.room = "";

	//build the window menu for our app using the GUIand Window service
	var windowMenu = new GUI.Menu({
		type: 'menubar'
	});

	var roomsMenu = new GUI.Menu();

	windowMenu.append(new GUI.MenuItem({
		label: 'Exit',
		click: function () {
			Window.close()
		}
	}));


	//Listen for the setup event and create room
	socket.on('setup', function (data) {
		var rooms = data.rooms;

		for ( var r = 0; r < room.length; r++) {
			//loop and append room to the window room menu
			handleRoomSubMenu(r);
		}

		//handle creation of room
		function handleRoomSubMenu(r) {
			var clickedRoom =  rooms[r];

			//append each room to the menu
			roomsMenu.append(new GUI.MenuItem({
				label: clickedRoom.toUpperCase(),
				click: function() {
					//what happens on clicking the rooms? swtich room
					$scope.room = clickedRoom.toUpperCase();
					//notify the server that the user changed his room
					socket.emit('switch room', {
						newRoom: clickedRoom,
						username: $scope.username
					});
					//fetch the new rooms messages
					$http.get(serverBaseUrl + '/msg?room=' + clickedRoom).success(function (msgs) {
						$scope.messages = msgs;
					});
				}
			}));
		}
		//attach menu
		GUI.Window.get().menu = windowMenu;
	});




	$scope.usernameModal = function (ev) {
		//launch modal to get username
		$mdDialog.show({
			controller: UsernameDialogController,
			templateUrl: 'partials/username.tmpl.html',
			parent: angular.element(document.body),
			targetEvent: ev //,
		})
		.then(function (answer) {
			//set username with the value return from the modal
			$scope.username = answer;
			//tell the server there is a new user
			socket.emit('new user', {
				username: answer
			});

			//set room to general;
			$scope.room = 'GENERAL';

			//fetch chat messages in GENERAL
			$http.get(serverBaseUrl + '/msg?room=' + $scope.room).success(function (msgs) {
				$scope.messages = msgs;
			});
		}, function () {
			Window.close();
		});
	};


	//Listen for new messages (objective 3)
	socket.on('message created', function (data) {
		//push to new message to our $scope.messages
		$scope.messages.push(data);
		//empty the textarea
		$scope.message = "";
	});

	//send a new message (objective 4)
	$scope.send = function (msg) {
		//notify the server that there is a new message with the message as packet
		socket.emit('new message', {
			room: $scope.room,
			message: msg,
			username: $scope.username
		});
	};

	//dialog controller
	function UsernameDialogController($scope, $mdDialog) {
		$scope.answer = function (answer) {
			$mdDialog.hide(answer);
		};
	}


	//adding notification
	var options = {
		body: data.content
	};

	var notification = new Notification('Message from: ' + data.username, options);

	notification.onshow = function () {

		//auto close after 1 second
		setTimeout( function () {
			notification.close();
		}, 2000);
	}