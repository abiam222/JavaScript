// function sum(x,y,z) {
//     return x+y+z;
// }

// const numbers = [1,2,3];

// console.log(sum(...numbers));

// console.log(sum.apply(null, numbers))

//5 uses of spread
/*
Copying an array
Concat array
Pass arg as array
Copy an object
Merge Object
Error 
https://dev.to/laurieontech/5-uses-for-the-spread-operator-b9i

*/

//const veg = ["cat", "dog", "fish"];

// for (let itr in veg) {
//     console.log(veg[itr]);
//     //console.log('\n');
// }

// veg.forEach((elem, index) => {
//     console.log(elem + " " + index);
// });

// const obj = { 
//     "top": "bottom",
//     "left": "right",
//     "first": "second"
// }

//https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object

// Object.keys(obj).forEach( (key, val) => {
//     console.log(key + " " + val + " " + obj[key]);
// });

// for (const key of Object.keys(obj)) {
//     console.log(key, obj[key]);
// }

// Object.entries(obj).forEach(([key, value]) => {
//     console.log(key, value)
// });

// for (const [key, value] of Object.entries(obj)) {
//     console.log(key, value);
// }

//======================================

// console.log(1)
// setTimeout((event) => { console.log(2)}, 0);
// console.log(3)

//======================================
//Constructors, Private/Public, etc

//const Quo;
//constructor

//The purpose of the new operator is to create an object 
//(the this value inside the constructor), setting the right [[Prototype]]
// internal property, to build the prototype chain and implement inheritance
// (you can see the details in the [[Construct]] operation).

//  const Quo = function(){};
// Quo.prototype.name = function() {
//     return 'hey'
// }

//Calling Quo() it has to be an Object but FUNCTION 
 //var quo = new Quo(); 
//  var quo = Quo();

//  console.log(quo) //only works with new 


// const Quo = function (string){
// 	this.status = string;
// }

//constructor 2
// function Quo(status) {
//     this.get_status = function() { //this constructor sets status as private
//         return status;
//     }
// }

// Quo.prototype.get_status = function(){ //prototype functions of instances 
// 	return this.status;
// };

//var myQuo = new Quo("confused");//new makes an instance

//console.log(myQuo.get_status());//confused
//console.log(JSON.parse(JSON.stringify(myQuo)));//if use second constructor status
//is private so you can't change status


// Object.keys(myQuo).forEach( (key, index) => {
//     console.log(key)
//     if (myQuo[index] === 'function') console.log(myQuo[index]);
// });

//=============================================

//jsExtreme 450

//Module
//we can use functions and closure to make modules.  A module is a function or object
//that presents an interface but that hides its state and implementation
//By using functions to prduce modules, we can almost completely eliminate our use of global
//variables, thereby mitigating one of JS worst features 

//The module pattern takes advantage of function scope and closure to create
//relationships that are binding and private.   In this exampe, only the deentityify 
//method has access tot eh entity data structure 

//Modular programming is a software design technique that emphasizes separating the 
//functionality of a program into independent, interchangeable modules, such 
//that each contains everything necessary to execute only one aspect of the desired 
//functionality


// var state = function() {
//     var name = '';
//     var lastName = '';
//     var address = {
//         addressStreet: '',
//         zipcode: '',
//         city: '',
//         state: ''
//     }

//     return {
//         name: 'tony',
//         get_name: function() {
//             return this.name;
//         },
//         set_name: function(name) {
//             this.name = name;
//         },
//         get_lastName: function() {
//             return this.lastName;
//         },
//         set_lastName: function(lastName) {
//             this.lastName = lastName;
//         }
//     }
// }

// var newState = state();
// var newState2 = state();
// newState.set_name("abiam");
// newState2.set_name("rachael");
// console.log(newState.get_name())
// console.log(newState2.get_name())



//Curry
//Functions are values, and we can manipulate function values in interesting ways
//Currying allows us to produce a new function by combining a function and an argument

// var multiply = function(a,b,c) {
//     return a*b*c;
// }

// function multiply(a) {
//     return (b) => {
//         return (c) => {
//             return a * b * c
//         }
//     }
// }
// console.log(multiply(1)(2)(3)) // 6

// const mul1 = multiply(1);
// const mul2 = mul1(2);
// const result = mul2(3);
// console.log(result); // 6


// Function.method('curry', function(){
// 	var slice = Array.prototype.slice,
// 	args = slice.apply(arguments),
// 	that = this;
// 	return function(){
// 		return that.apply(null, args.concat(slice.apply(arguments)));
// 	};
// });

//  var add1 = add.curry(1);
//  console.log(add1(6)); //7

//https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339

//==================================================

//Inheritance 595

/*

In object-oriented programming, inheritance is the mechanism of basing 
an object or class upon another object or class, retaining similar implementation.
 Also defined as deriving new classes from existing ones and forming them into a 
 hierarchy of classes.

*/

// var car = () => {
//     return 'this car'
// }

// console.log(car())

// (function() {
//     console.log( 'Thanks' )
// })()



// The word "polyfill" is an invented term used to refer to taking
// the definition of a newer feature and producing a piece of
// code that's equivalent to the behavior, but is able to run
// in older JS environments.

// e.g. if (isNaN doesn't work on older browsers)

// if (!Number.isNaN) {
// 	Number.isNaN = function isNan(x) {
// 		return x !== x;
// 	}
// }



// Whereas Closure = Function pointer + Stack frame. 
// Closure is a feature in JavaScript where a function has 
// access to its own scope variables, access to the outer function 
// variables and access to the global variables. Closure has access 
// to its outer function scope even after the outer function has returned.



//===============================

// var numbers = [4, 9, 16, 25];

// function multiply(val) {
//     return val*2;
// }
//var x = numbers.map(Math.sqrt)
//var x = numbers.map(x => x*2)
//var y = numbers.map(multiply)

//console.log(numbers.map(multiply))

// var numbers = [175, 50, 25];

// function myFunc(total, num) {
//   return total - num;
// }

// console.log(numbers.reduce(myFunc));

// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.reverse();

//console.log(fruits)


// var fruits = ["Banana", "Orange", "Apple", "Mango"];
// fruits.shift();

// console.log(fruits)


//============================================

//String

//var txt = "a,b,c,d,e";   // String
//txt.split(",");          // Split on commas
//txt.split(" ");          // Split on spaces
//txt.split("|");          // Split on pipe
//console.log(txt.split(","))



// function result() {
//     let a = new Object()
//     let b = new Object()
//     let m = new Object()
  
//     console.log(m)
//     m[a] = 'a'// { {}:a }
//     console.log(m) //[object object] alerting instance of obj
//     m[b] = 'b' // {  }
//     console.log(m)
//     console.log(m[b])
  
//     return m[a]
//   }
  
 // console.log( result() )

//   let obj = {}
//   let a = {}
//   let b = {}
//   obj[a] = 'a'
//   obj[b] = 'b'
//   console.log(obj)

//  obj =  {
//     "{ }": "a",
//     "{ }": "b"
//   }
//   console.log(obj) //you can only hav
  //have one object in an object 

  /*
  my exp - you can only have one object in an object

  other - 
  When using m[a] or m[b] the object key is dynamic and a and b is itself an object that gets converted to the string [Object object] as a key.

Code would look like:
m['[Object object]'] = 'a'
m['[Object object]'] = 'b'

return m['[Object object]']


  */

//    var name = 'rick'

// //   var obj = {
// //     name: 'mich',
// //     // get_name() {
// //     //     console.log(this.name)//console.log() return undefined
// //     // }
// //     // get_name: function() {
// //     //     return name
// //     // }
// //     // get_name: () => { 
// //     //     return name
// //     // }
// //   }

// //   console.log(obj.get_name())
  
// // var other = {
// //     get_name: function() { 
// //     console.log('getting called')
// //     return this.name
// //  }
// // }

// // var obj = {
// //     name: 'rachael'
// // }

// // console.log ( other.get_name.apply(obj, []) )

// class Animal {
//     constructor(name) {
//         this.name = name;
//     }

//     //static  only exist on Animal constructor
//     static extinct(species) {
//         console.log(species + 'have gone extinct')
//     }
// }

// const firstAnimal  = new Animal('Frank')

// class Mammal extends Animal {
//     constructor(name, hasFur) {
//         super(name)
//         this.hasFur = hasFur
//         this.warmBlooded = true
//         this.level = 0
//     }

//     eat(food) {
//         console.log(this.name + ' eats a ' + food )
//         this.level++
//     }
// }

// class Wolf extends Mammal {
//     constructor(name) {
//         super(name,true)
//         this.carnivore = true
//     }
// }

// //static properties have to be
// //defined outside of the class body
// Wolf.speciesName = 'wolves'

// const bob = new Wolf('Bob')
// const fido = new Wolf('Fido')

// // Wolf {
// //     name: 'Fido',
// //     hasFur: true,
// //     warmBlooded: true,
// //     carnivore: true,
// //     level: 0
// // }

// fido.eat('rabbit') 

// let obj = {
//     personName: 'nick',
//     get name() {
//         return this.personName
//     },
//     set name(name) {
//         this.personName = name
//     }
// }

// obj.name = 'abiam'
// console.log( obj.name )

// let obj= {
//     name: 'nick'
// }

// let a = { ...obj }
// console.log(a)

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// var xhttp = new XMLHttpRequest();

// xhttp.open("GET", "data.txt", true);
// //xhttp.send();

// console.log( xhttp.responseText )


//========================

/*
Concurrency is when two or more tasks can start, run, and complete in overlapping 
time periods. It doesn't necessarily mean they'll ever both be running at the same 
instant. For example, multitasking on a single-core machine.

Parallelism is when tasks literally run at the same time, e.g., on a multicore processor.


When you run something asynchronously it means it is non-blocking, you execute it 
without waiting for it to complete and carry on with other things. Parallelism means
 to run multiple things at the same time, in parallel. Parallelism works well when
  you can separate tasks into independent pieces of work.

Take for example rendering frames of a 3D animation. To render the animation takes a
 long time so if you were to launch that render from within your animation editing 
 software you would make sure it was running asynchronously so it didn't lock up your
  UI and you could continue doing other things. Now, each frame of that animation can 
  also be considered as an individual task. If we have multiple CPUs/Cores or multiple 
  machines available, we can render multiple frames in parallel to speed up the overall workload.

  Async and Callbacks are generally a way (tool or mechanism) to express concurrency 
  i.e. a set of entities possibly talking to each other and sharing resources. 
  In the case of async or callback communication is implicit while sharing of 
  resources is optional (consider RMI where results are computed in a remote machine).
  As correctly noted this is usually done with responsiveness in mind; to not wait 
  for long latency events.

Parallel programming has usually throughput as the main objective while 
latency, i.e. the completion time for a single element, might be worse than
 a equivalent sequential program.

 Concurrency - when two or more processes are executing simultaneously (sequentially) (I did not say running at the same time)

  */

// function now() {
//   return 21;
// }

// function later() {
//   answer *= 2;
//   console.log('Meaning of life:', answer);
// }

// var answer = now();
// setTimeout(later, 1000)
//later()

// var arr = [[1,11,3,2,33,22]
// arr.sort(function(a,b) {return a-b})
// console.log(arr)]

//callbacks are by far the most common way that asynchrony in JS programs is expressed and managed. Indeed, the callback is the most fundamental async pattern in the language.




/*
synchronous vs concurrency lists pg14

Where nondeterminism doesn't really matter pg15
More nondeterminism 

If you want don't want to use callbacks how to make it deterministic 

* using conditions
* latching (nondeterministic)
* nondeterministic example but with concurrency help


*/

// console.log( "A" );

// setTimeout( function(){
//     console.log( "B" );
// }, 0 );

// // theoretical "Job API"
// schedule( function(){
//     console.log( "C" );

//     schedule( function(){
//         console.log( "D" );
//     } );
// } )();


//Add to end and front of array. Doing it without ES6 and then with it
//var arr = ['a','b','c','d'];

// arr.unshift('z')
// arr.push('e')
//arr = ['z', ...arr, 'e'] //es6
//console.log(arr)

//How to create private variable in Javascript
// function secretVariable() {
//   var private = "super secret code"

//   return {
//     get_private: function() {
//       return private;
//     }
//   }
// }

// console.log(secretVariable().get_private())


 //var fruits = ["Banana", "Orange", "Apple", "Mango"];
//  var fruits = {

//  }
// fruits.splice(2, 0, "Lemon", "Kiwi");//index, remove, add
// console.log(fruits)
//console.log(Array.isArray(fruits))

//  var trees = ["redwood", "bay", "cedar", "oak", "maple"];
// // delete trees[3];
// // console.log(trees)
// console.log(trees instanceof Array)

// var foo = ['one', 'two', 'three'];

// var [red, yellow, green] = foo;
// console.log(red); // "one"
// console.log(yellow); // "two"
// console.log(green); // "three"

// var array1 = [1, 4, 9, 16];

// // pass a function to map
// const map1 = array1.map(x => x * 2);
// const map2 = array1.map(function(x) {
//   return x*2;
// })

// console.log(map1);
// console.log(map2)
// // expected output: Array [2, 8, 18, 32]

// var val = 1;
// console.log( ["1","2","3"].map(x => parseInt(x)))
// console.log( typeof parseInt("1"))
// console.log( val.toString())
// console.log( typeof val.toString())

// //converts string to integer


// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;
// const reducer2 = function(accum, curr) {
//   console.log( accum )
//   console.log( curr )
//   return accum + curr
// }

// const reducer3 = array1.reduce( (accum, curr) => {
//   return accum + curr
// })

// // const array2 = array1.map( (x) => {
// //   return x + 
// // })

// //console.log(reducer3)
// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer2));
// // expected output: 10

// 5 + 1 + 2 + 3 + 4
//console.log(array1.reduce(reducer, 5));
// expected output: 15


//FIND MAX
// const arr = [1,44,22,3,5,15,100,21]

// const arr2 = arr.reduce( (acc, val) =>  Math.max(acc,val) )

// //****** IF YOU HAVE RETURN YOU NEED {} BUT YOU DON"T NEED THE RETURN  */

// console.log(arr2)

// //multiply each value by 2 then find the biggest number
// const arr3 = [2,22,50,21,65,32,100]

// const arr4 = arr3.map( (x) => x*2).reduce( (acc,val) => Math.max(acc,val))
// console.log(arr4)


// var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// const result = words.filter(word => word.length > 6);

// console.log(result);
// // expected output: Array ["exuberant", "destruction", "present"]

//multiply each value by 2, filter if less than 49 then find the biggest number, 
// const arr3 = [2,22,50,21,65,32,100]

// const arr4 = arr3
// .map( (x) => x*2)
// .filter( x => x < 49 )
// .reduce( (acc,val) => Math.max(acc,val))
// console.log(arr4)

//Map = loops through each value (making changes to that value) and returns array
//filter = loop through each value (making change to that value) and return array (filter you can use operators)
//reduce = loop through each value but returns 1 value back. 


// var nums = [1, 2, 3, 4];

// var sum = nums.reduce(function(prevVal, curVal, curIndex, origArr) {
//   return prevVal + curVal;
// });

// console.log(sum); // => 10

/*

toLowerCase
toUpperCase
toString
parseInt

*/

// function add (x,y) {
//   return x + y
// }

// function higherOrderFunction (x, callback) {
//   return callback(x, 5)
// }

// console.log( higherOrderFunction(10, add) )

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve() // Change status to 'fulfilled'
//   }, 2000)
//   //resolve()
// })

// console.log('Promise before being resolved', promise)

// setTimeout(() => {
//   console.log('Promise after being resolved', promise)
// }, 2000)

//http.get('url')
//then, catch angular

// function getPromise () {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 2000)
//   })
// }

// function logA () {
//   console.log('A')
// }

// function logB () {
//   console.log('B')
// }

// function logCAndThrow () {
//   console.log('C')

//   throw new Error()
// }

// function catchError () {
//   console.log('Error!')
// }

// getPromise()
//   .then(logA) // A
//   .then(logB) // B
//   .then(logCAndThrow) // C
//   .catch(catchError) // Error!

// var obj = {
//   a: 1
// }

// //var obj2 = Object.assign(obj, obj2)
// var obj2 = {...obj}
// obj2.a = 4
// console.log(obj2)
// console.log(obj)

// var x = 1
// var y = 2

// var z = [x,y]

// console.log(z)

// var obj = [
//   {name: 'Abiam', val: 28 },
//   {name: 'Rachael', val:23},
//   {name: 'Nick', val:20}
// ]

// const val = obj.map( (x) => x.val+2 )
// //can rent a car
// const canRentACar = obj.filter( (x) => x.val >= 25)

// //can't drink becuase thy aren't 21
// const belowDrinkingAge = obj.filter( (x) => x.val < 21)

// //Can drink but I want array but just names that can
// const canDrinkNames = []
// const canDrink = obj
// .filter( (x) => x.val >= 21)
// .map( (x) => {
//   return x.name
// })

// console.log(canDrink)



//how to do this in c++?
// var vals = [ 
//   { name: "Abiam", id: 1},
//   { name: "Mike", id: 2},
//   { name: "Rachael", id: 3},
//   { name: "Mike", id: 4},
//   { name: "Abiam", id: 5},
//   { name: "Robert", id: 6},
//   { name: "Abiam", id: 7},
// ]

//Abiam 1 5 7
//Mike 2 4

//do Abiam 1 5 7
//get largest and smallest
//get K largest or smallest  

// var found = 0;

// for (var i=0; i<vals.length;i++) {
//     myMap.set(vals[i].name, myMap.get(vals[i].name)+1 || 1)
//     var id = vals[i].id;
//     for (var j=i+1;j<vals.length;j++) {
//       if (vals[i].name == vals[j].name && myMap.get(vals[i].name) == 1) {
//         if (found == 0) { console.log(vals[i].name + ":"); console.log(id); found++ }
//         console.log(vals[j].id)
//       }
//     }
//     found = 0;
// }


// var myMap = new Map()
// var found = new Set();

// //O(n) linear
// for (var i=0; i<vals.length;i++) {
//   //if exists, there is a duplicate
//   if (myMap.get(vals[i].name)) { //or has(x)
//     if (!found.has(vals[i].name)) {  //first time ever
//       console.log(vals[i].name); 
//       found.add(vals[i].name);
//       console.log(myMap.get(vals[i].name)) 
//     }
//     console.log(vals[i].id)
//   }
//   myMap.set(vals[i].name, vals[i].id)
// }


//You are reading these values from a file
//print out any duplicates in as shown below
//Mike: 2,4
//Abiam: 1, 5, 7

//  [ 
//   { name: "Abiam", id: 1},
//   { name: "Mike", id: 2},
//   { name: "Rachael", id: 3},
//   { name: "Mike", id: 4},
//   { name: "Abiam", id: 5},
//   { name: "Robert", id: 6},
//   { name: "Abiam", id: 7},
// ]




/**
 * @param {string[]} strs
 * @return {string[][]}
 */
// var groupAnagrams = function(strs) {
    
//   if (strs.length === 0) return [[]]
  
//   let words = new Map();
//   let arr = []
//   let final = []
//   let finalSort = ""
//   //Map of <string, array<strings>>

//   var sortAlphabets = function(val) {
//       return val.split('').sort().join('');
//   };
  
//   strs.forEach( (val) => {
//       finalSort = sortAlphabets(val)
//       if ( words.get(finalSort) ) arr = words.get(finalSort) 
//       arr.push(val)
//       words.set(finalSort, arr)
//       arr = []
//   });   
  
//   for (var key of words.keys()) {
//       final.push( words.get(key) )
//   }
  
//   return final;
// };

// let myMap = new Map()
// myMap.set("abiam", 1)
// myMap.set("nick", 2)
// myMap.set("rach", 3)

// //val and index
// myMap.forEach( (val, index) => {
//   console.log(index + ":" + val)
// })

// let mySet = new Set()
// mySet.add(5)
// mySet.add(4)
// mySet.add(4)

// console.log( mySet.has(43) )


///////
// Given a non-empty array of integers, return the k most frequent elements.

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

// class Solution {
//   public:
//       vector<int> topKFrequent(vector<int>& nums, int k) {
//           //1=3 2=2 3=1 map ds 
//           map<int, int> vals;
//           vector<int> largest;
//           vector<int> tmp;
          
//           for (auto i: nums) {
//               //cout << i << endl;
//               vals[i]++;
//               //vals[0] = 1 1 = 
//               cout << vals[i] << endl;
//           }
          
//           cout << endl;
//           //is finding the k most frequent elements
//           //put this in a priority_queue 
//           for (auto i: vals) {
//               cout << i.second << endl;
//               largest.push_back(i.second);//3,2,1
//           }
          
//           sort(largest.begin(),largest.end(),greater<int>());//???
          
//             //Push the top K ones in vector a.
//               for(auto j:vals){
//                   for(int i=0;i<k;i++){
//                       if(j.second==largest[i]){
//                           tmp.push_back(j.first);
//                           break;
//                   }
//               }
//           }
          
//           return tmp;
//       }
//   };

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// var topKFrequent = function(nums, k) {
//   //nums = [1,1,1,2,2,3]  k = x
//   var vals = new Map();
//   var tmp = [];
//   var largest = [];
  
//   nums.forEach( (val, index) => {
//       vals.set(nums[index], vals.get(nums[index])+1 || 1)
//   });
  
//   //put numbers in array
//   vals.forEach( (val,index) => {
//       tmp.push(val);
//   });
  
//   //sort values
//   tmp.sort(function(a,b){ return a-b }).reverse();//3,2,1
  
//   //find the largest k numbers (which in this case is two)
//   vals.forEach( (valll, indexxx) => { //2 7 1 /
//      // console.log(valll + " " + indexxx)
//       for (var i=0; i<k;i++) {
//           if (valll === tmp[i]) largest.push(indexxx);
//       }
//       // tmp.forEach( (val, index) => {
//       //     console.log(val)
//       //     if (vals[indexxx] == val) { largest.push(vals[indexxx]); BREAK; }
//       // })
//   })
  
//   //where largest is an array of the largest k numbers
//   return largest;
// };

//   let res = [], map = new Map();
    
//     nums.forEach(n => map.set(n, map.get(n) + 1 || 1));
    
//     let sortedArray = [...map.entries()].sort((a, b) => b[1] - a[1]);
    
//     for(let i = 0; i < k; i++) {
//         res.push(sortedArray[i][0]);
//     }
    
   // return res;


//Write a function that takes a string as an arg, and returns the same string with all duplicates removed. 

// let duplicatesRemoved = function(strng) {
//   //create a Set and put the char values in the set
//   let vals = new Set(strng)
//   let finalString = ""

//   vals.forEach( (val, index) => {
//     finalString += val;
//   });

//   return finalString;
// }

// let strng = "abbebdbeddebdbekfkdjdjfkkdldkwbdjflskd";

// console.log( duplicatesRemoved(strng))

//Write a contains()/includes() function in JavaScript 

// var global = ['abiam', 'nick', 'harp', 'mike']

// let includes2 = function(string) {
//     for( let i=0;i<global.length;i++) {
//       if (string == global[i]) {
//           return true;
//       }
//     }
//     return false;
// }

// console.log( includes2('abiam'));


//Given a binary search tree find the kth smallest element.  
//I would put all elements in an array (doing DFS through tree)
//DFS = inorder/preorder/postorder
//then sort the array 
//choose array[k-1]

//Sorting

//sort(function(a,b){return a-b })
//I can reverse if I want 

//sort strings
//   var sortAlphabets = function(val) {
//       return val.split('').sort().join('');
//   };


//A message containing letters from A-Z is being encoded to numbers from1-26. Determine the total number of ways to decode a given message 
/**
 * @param {string} s
 * @return {number}
 */

//22345 I want to try out 22 23 34 45 so I have 5 
//2 2 3 4 5
//22 3 4 5
//2 23 4 5

//10 = 1 0, no just 10
//01 = nothing can't be 0 1 or 01

// var numDecodings = function(s) {
//   if(s.length === 0 || s.charAt(0) === '0') return 0;
  
//   //it follows a fibonacci sequence in ideal conditions
//   let dp = new Array(s.length + 1);
//   dp[0] = 1;
//   dp[1] = 1;
  
//   for(let i = 2; i <= s.length; i++){
//       let str = s.substring(i-2,i);
//       console.log(str)
//       //if the last character in the subsequence is 0
//       if(str.charAt(1) == '0') {
//           //if the first character is 0 as well
//           //or the integer value of subsequence is 0
//           //return 0 (not a valid string)
//           if(str.charAt(0) <= '0' || parseInt(str) > 26){
//               return 0;
//           }
//           dp[i] = dp[i-2];
//           continue;
//       }
//       //if the first character in the subsequence is 0
//       //or the integer value of subsequence is greater than 26
//       if(str.charAt(0) == '0' ||  parseInt(str) > 26){
//           dp[i] = dp[i-1];
//           continue;
//       }
//       //follow the fibonacci sequence
//       dp[i] = dp[i-2] + dp[i-1];
//       console.log(dp)
//       console.log('next')
//   }
//   console.log(dp)
//   return dp[s.length];
// };


//Think different things
//DP have values being held at the beginning
//could have some type of Fibanoccia sequency dp[i-2]+dp[i-1]
//start i=0 or other element 
//think base and test cases

//if find the kth largest or k smallest. You need all vals in an array
//somehow. Sort it and return array[k-1]
//if find the k largest (differnt from kth). You need all the values, sort
//then do comparison between array of values in order and the other data 
//structure


// Merge Intervals

// /**
//  * @param {number[][]} intervals
//  * @return {number[][]}
//  */
// function merge(intervals) {
//   if (!intervals.length) return intervals
  
//   console.log(intervals)
//   intervals.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1])
//   console.log(intervals)
    
//   var prev = intervals[0]//[0,0] intervals is now sorted
//   var res = [prev] //[[0,0]]hwat I'm returning 
  
//   for (var curr of intervals) {// [4,1] [0,0]
//       console.log(curr[0])//4
//       console.log(prev[1])//0
//     if (curr[0] <= prev[1]) {
//       prev[1] = Math.max(prev[1], curr[1])
//     } else {
//       console.log(curr)
//       res.push(curr)//[4,1]
//       prev = curr//
//     }
//   }
    
//   return res
// }
//[1,3][2,6][4,8][7,10]


// Hi, here's your problem today. This problem was recently asked by Apple:

// Given a list of words, and an arbitrary alphabetical order, verify that the words are in order of the alphabetical order.

// Example:
// Input:
// words = ["abcd", "efgh"], order="zyxwvutsrqponmlkjihgfedcba"

// Output: False
// Explanation: 'e' comes before 'a' so 'efgh' should come before 'abcd'

// Example 2:
// Input:
// words = ["zyx", "zyxw", "zyxwy"],
// order="zyxwvutsrqponmlkjihgfedcba"

// Output: True
// Explanation: The words are in increasing alphabetical order

// Here's a starting point:

// def isSorted(words, order):
//   # Fill this in.

// print isSorted(["abcd", "efgh"], "zyxwvutsrqponmlkjihgfedcba")
// # False
// print isSorted(["zyx", "zyxw", "zyxwy"],
//                "zyxwvutsrqponmlkjihgfedcba")
// # True



/*
Map and Set

Set
size
add()
clear()
delete()
forEach( (val, index) => { ... })
has()
key()
values()

Map
size
clear()
delete()
forEach( (val, index) => { ... })
get()
has()
keys()
set()

c++
priority_queue<pair<int, int>> 

**There could be multiple fors (but if there is try to see if there is a solution) if not a solution is better than no solution 

For map in javascript always set all values to ZERO or 1 but like "  |  " not separeted
it will take longer and unecessary 



nums.forEach(n => map.set(n, map.get(n) + 1 || 1));

//sorting numbers
tmp.sort(function(a,b){ return a-b }).reverse();//3,2,1

//sorting strings
//   var sortAlphabets = function(val) {
//       return val.split('').sort().join('');
//   };

=== in JS
use let or const. Not var anymore

Map [key, value]
 for ([v, i] of vals) {
             if (val === i) { result.push(v); break; }
            //console.log( v + " " + i)
        }



var i = str.length;
while (i--) {
  alert(str.charAt(i));
}

or

//with this I can use break;, continue; unlike the others (maybe while but not for each or etc)
for (var i = 0; i < str.length; i++) {
  alert(str.charAt(i));
}


*/

// Input: "The cat in the hat"
// Output: "ehT tac ni eht tah"
// Note: In the string, each word is separated by single space and there will not be any extra space in the string.

// Here's a starting point:

// class Solution:
//   def reverseWords(self, str):
//     # Fill this in.

// print Solution().reverseWords("The cat in the hat")
// # ehT tac ni eht tah

// function reverseString(str) {
//   // Step 1. Use the split() method to return a new array
//   var splitString = str.split(""); // var splitString = "hello".split("");
//   // ["h", "e", "l", "l", "o"]

//   // Step 2. Use the reverse() method to reverse the new created array
//   var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
//   // ["o", "l", "l", "e", "h"]

//   // Step 3. Use the join() method to join all elements of the array into a string
//   var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
//   // "olleh"
  
//   //Step 4. Return the reversed string
//   return joinArray; // "olleh"
// }

// let reverseWords = function(word) {
//   let finalWord = "";
//   let tmpWord="";

//   //base cases
//   if (word.length === 0) return "";
//   if (word.length === 1) return word;
  
//   //sort through word
//   for (let i=0; i<word.length;i++) {
//     tmpWord += word[i];
//     //if space we finish and reverse
//     if (word[i+1] === ' ' || i+1 == word.length) {
//       tmpWord = tmpWord.split("").reverse().join("");
//       finalWord = finalWord + tmpWord + " "; 
//       tmpWord = "";
//     }
//   }
//   return finalWord;
// }

// console.log(reverseWords("The cat in the hat"))

