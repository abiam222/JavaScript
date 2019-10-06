// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
           // console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {

        if (!$scope.formData.text){
            console.log("ERROR!!!! ENTER SOMETHING BRUH");
        }else{
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
               // console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            }).then(function(){
                $http.get('/api/todos').success(function(data){
                    $scope.todos = data;
                })
            });//This works but It doesn't without, idk why?!?!?(shouldn't need this)
        }//end else
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
               // console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}