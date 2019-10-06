/*
//To declare a filter we pass in two parameters to app.filter

//The first parameter is the name of the filter
//second is a function that will return another function that does the actual 
//work of a filter
app.filter('myFilter', function() {

    //in the return function, we must pass in a single parameter which will be the
    //data we will work on.  We have the ability to support multiple other parameters that can
    //be passed into the filter optionally
    return function(input, optional1, optional2) {
      var output;

      //DO filter work here

      return output;
    }
})
*/

//e.g. 1
/*
(function() {

'use strict';

angular.module('myApp', [])
   .filter('ordinal', function() {
  //create the return function
  //set the required parameter name to **number**
    return function(number) {
      //Ensure that the passed in data is a number
        if ( isNaN(number) || number < 1 ) {
          //If the data is not a number or is less than one
          return number;
        } else {
          //if the data we are applying is a number
          var lastDigit = number % 10;

          if ( lastDigit === 1 ) {
            return number + 'st'
          } else if ( lastDigit === 2 ) {
            return number + 'nd'
          } else if ( lastDigit === 3 ) {
            return number + 'rd'
          } else if ( lastDigit > 3 ) {
            return number + 'th'
          }
        }//still else
    }
});
})();
*/


//e.g.2
/*
(function () {
  'use strict';

  angular.module('myApp', [])
    .filter('capitalize', function() {

      //create the return function and set the required parameter as well as an optional param
      return function ( input, char ) {
        if ( isNaN(input)) {
          //if the input data is not a number
          var char = char - 1 || 0;
          var letter = input.charAt(char).toUpperCase();
          var out = [];

          for ( var i = 0 ; i < input.length ; i++ ) {
            if ( i == char ) {
              out.push(letter);
            } else {
              out.push(input[i]);
            }
          }
          return out.join('');
        } else {
          return input;
        }
      }
    })
    
})();
*/

//e.g. 3, go through a list of PL and display only the statically
//typed ones. 
/*
(function () {
  'use strict';

  angular.module('myApp', [])
    .filter('staticLanguage', function() {
      return function(input) {

        var out = [];

        angular.forEach(input , function(language) {
          if(language.type === 'static') {
            out.push(language)
          }
        })
        return out;
      }
    });
    
})();
*/

//e.g.4
(function () {
  'use strict';

  angular.module('myApp', [])
    .filter('customCurrency', function() {
        return function(input, symbol, place) {

          if(isNaN(input)) {
            return input;
          } else {

            var symbol = symbol || '$';
            var place =  place === undefined ? true : place;

            if (place === true) {
              return symbol + input;
            } else {
              return input + symbol;
            }
        }
    }
  });  
    
})();