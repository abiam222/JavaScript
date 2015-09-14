/*JAVASCRIPT EVENTS*/


el.click = checkUsername;  //checkUsername is the function name(only one method)

el.addEventListener('click', function(){});


/*JQUERY*/
el.on('click', function(){})




/* NODEJS */

/*
Once you have an instance of an object that will
emit events, you can add listeners for the events that you care about.  
You add listeners to an EventEmitter object by using one of the following functions.  
*/

.addListener(eventName, callback)
/*ataches the callback function to the object's listeners. Every time the eventName is
triggered, the callback function is placed in the event queue to be executed
*/

.on(eventName, callback)
/*
Same as .addListener()
*/

.once(eventNmae, callback)
/*
Only the first time the eventName event is triggered, the 
callback function is placed in the event queue to be executed
*/