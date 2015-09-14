var gulp = require('gulp'),	
    nodemon = require('gulp-nodemon');//task runner

gulp.task('default', function(){
   nodemon({
   	script: 'app.js',
   	ext: 'js',//extension
   	env: { //environment
   		PORT:8000
   	},
   	ignore: ['./node_modules/**']
   })
   .on('restart',function(){
   	console.log('Restarting');
   });
});

gulp.task('test',function(){
	gulp.src('tests/*.js', {read: false})//all our .js files in tests
	    .pipe(gulpMocha({reporter: 'nyan'}))
});