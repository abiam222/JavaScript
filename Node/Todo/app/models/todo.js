 var mongoose = require('mongoose');

    module.exports = mongoose.model('Todo', {
        myTodo : String
    });