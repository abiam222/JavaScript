//=============================TRANSPILING=======================================
/*
transpiling = transformation + compiling

Roughly, the idea is to use a spcial to transform your ES6 code into equivalient (or close)
matches that workin ES5 environments.
*/

var foo = [1,2,3]

var obj={
  foo //means foo: foo, if it has the same name
}

obj.foo

//Transpilers perform these transformations for you, ususally in a build workflow step
//similar to how you perform linting, minification, and other similar operations


//=========================SHIMS/POLYFILLS=========================

/*
Not all new ES6 features need a transpiler.  Polyfiils(aka shims) are a pattern for
defining equivalent behavior form a newer environment into an older environment,
when possible.  Syntax cannot be polyfiiled, but APIs often can be.


ES6 Shim, Provides a compatibility shims so that legacy JS engines
behave as closely as possible to ES6 

*/
