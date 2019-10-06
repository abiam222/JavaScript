/*
Typescript does not add true classes, interfaces or generics
*/


//Types===================================================
// "use strict";
//
// const name = "Peleke";
// const nothing = null;
// const nemo = undefined;
// const obj = {};
//
// private boolean screamName(String name) {
// 	return name.toUpperCase();
// }
//
// tameMongoose(  new Mongoose() );

//function greeter(person) {
//    return "Hello, " + person;
//}

//var user = "Jane User";

//document.body.innerHTML = greeter(user);


// function greeter( person: string ) {
//   return "Hello, " + person;
// }
//
// var user = [ 0,1,2 ];
// //var user = "Abiam";
// document.body.innerHTML = greeter( user );


//Boolean=========================
// "use strict";
//
// const lie: boolean = false,
//       truth: boolean = true;


//Number=============================================
"use strict";

const pi : number = 3.14;

//String===============================================

const tree_of_knowledge : string = "Yggdrasil";

//Array===============================================
//Typescript treats arrays as their own type, and requires
//that you declare the type of whats inside of them, as wells

//1. Array<[ Item Type ]>
//2. []

"use strict";

//the item type, T, followed by brackets means, "an array whose items"
//are of type T
const divine_lovers : string[] = [ "Zeus", "Aphrodite" ];

//writing array<[Item Type]> means the same thing
const digits : Array<number> = [143219876, 112347890];

//But his doesn't work
const only_strings : string[] = [];
only_strings.push("This works!"); //this works
only_strings.push(42); //this doesn't work

//we can't put 42 into only_string because we declared that
//it can only contain items of type string.  This is an example
//of Typescripts compile-time complains in action


//Tuples==============================================
/*
Typles are another collection data type.  They're useful
for collection a known number of items into an array-like
structure. You can declare each item to be a specific type

Type Keyword: [(Item Type),..,(Item Type)]
*/

"use strict";

//[Date, Month, Year] :: Triplet of numbers
let date_triplet : [ number, number, number ];
date_triplet = [ 31, 6, 2016 ];

//[Name, Age]
let athena : [ string, number ];
athena = [ 'Athena', 9386 ];

//You retrieve items with indexes, as with arrays
//TS remembers the type for You
var name : string = athena[0];
const age : number = athena[1];

//But:
name = athena[1]; //No dice, We're writing Typescript now

//tupes useful for?
//Javascript is the only language I write without native tuples, but I
//rarely use them elsewhere. Occasionally, I  use them to group
//related data that isn't liable to change
let big_three : [ string, string, string ];
big_three = [ 'Squat', 'Deadlift', 'Bench Press' ];

//But in general, I use a Map or Set instead


//Enum==================================================
//enum allow you to associate names with intever values
//the name comes form the fact that they're enumerable
"use strict";

//this is an example form the TypeScript docs
enum Color {  Red, Green, Blue };
const red : Color = Color.Red;

//Enums are like associative arrays. Each enum constant is associated
//with an index, starting at 0
console.log( Color[0] ); //'Red'

//you can start from any number instead of zero, if you want
//note that indexing a non-existent enum constnat returns undefined
//but doesn't throw an error
enum RomanceLanguages { Spanish = 1, French, Italian, Romanian,
Portuguese };

console.log( RomanceLanguages[4] ); //'Romanian'
console.log( RomanceLanguages[0] ); // undefined


//Any==========================================
//a type that accepts any value.  In some sense, its a way
//to opt out of type checking. It allows us to declare mixed collections

"use strict";

let mystery : any = 4; //number
mystery = "four"; //string -- no error

const not_only_strings : any[] = [];
not_only_strings.push("This works");
not_only_strings.push(42);


//Void =====================================================
//finally, we have Void.  This is the typeclass associated with the
//values undefined or null.  Unlike the other types, you
//won't use this to declare variables

//It's not that you can't.  Just that,if you do, you can only set that
//variable to null or undefined
"use strict";
let the_void : void = undefined;
the_void = null;
the_void = "nothing"; //Error

//The main reason void exists is to mark functions without
//return statements


//Return Types=======================================================
//Typescript allows you to mark the type of the value that a function
//returns

"use strict";

function capitalizeName( name : string ) : string {
  return name.toUpperCase();
}

console.log( capitalizeName('geronimo') ); //'GERONIMO'
console.log( capitalizeName(42) ); //Error

function even_broken ( num : number ) : boolean {
  return ( num % 2 ); //WRONG. This will cause a compile-error
}

function even ( num : number ) : boolean {
  return ( num % 2 == 0 ); //Much better; this works
}


//The Last Type: functions======================================
//we can pass arguments to functions and return them from functions
//like any other value.
"use strict";

let multiply : (first : number, second :number ) => number;
multiply = function( first, second ) {
  return first * second;
}

//same pattern applies if you're returning a function
//in that case,thoough, you wrap the type of the function you
//return -- taht is everything after the fat arrow in parenthese
"use strict";

let multiply : ( first : number ) => ((second:number) => number);
multiplyFist = function ( first ) {
  return function( num ) {
    return first * num;
  }
}

console.log( multiply( 5, 2 ) ); //10
console.log( multiplyFirst(9)(2) ); //18

//
//Interfaces ===========================================
//an interface that describes objects that have a firstName and lastName
interface Person {
  firstName: string;
  lastName: string;
}

function greeter( person: Person ) {
  return "Hello, " + person.firstName + " " + person.LastName;
}

var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);

//Classes ==================================

class Student {
  fullName : string;
  constructor( public firstName, public middleInitial, public lastName ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName : string;
  lastName : string;
}

function greeter( person : Person ) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

var user = new Student("Jane", "M. ", "User" );
document.body.innerHTML = greeter( user );
