console.clear(); // <-- keep the console clean on refresh

/* global angular */
(function() {
  'use strict';

 angular.module('formlyExample', ['formly', 'formlyBootstrap'])
                .config(config)
                .controller('MainCtrl', MainCtrl);



    function config(formlyConfigProvider) {
    // set templates here
    formlyConfigProvider.setType({
      name: 'custom',
      templateUrl: 'test.html'
    });
  };
  

function MainCtrl(formlyVersion) {
    var vm = this;

     vm.exampleTitle = 'Abiam Formly Example';

      // funcation assignment
      vm.onSubmit = onSubmit;

    vm.model = {
      awesome: true
    };

    vm.formFields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'This is my label, Name:',
          placeholder: 'Here we go!!'
        }
      }, 

      {
        key: 'lastname',
        type: 'input',
        templateOptions: {
          label: 'Last name',
          placeholder: 'Last Name'
        }
      },

      {
        key: 'textArea1',
        type: 'textarea',
        templateOptions: {
          label: 'This is a text area',
          placeholder: 'Write anything you want here'
        }
      }

    ];
  

    function onSubmit() {
      alert(JSON.stringify(vm.model), null, 2);
    }







    // variable assignment
  /*  vm.author = { // optionally fill in your info below :-)
      name: 'Kent C. Dodds',
      url: 'https://twitter.com/kentcdodds' // a link to your twitter/github/blog/whatever
    };
*/

   


   /* vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };*/


    
    //vm.awesomeIsForced = false;

    

    // function definition
    
   

};//end of whole function

  /*
  app.directive('exampleDirective', function() {
    return {
      templateUrl: 'example-directive.html'
    };
  });*/


})();