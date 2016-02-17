const gulp = require('gulp');
const webpack = require('webpack-stream');
const plumber = require('gulp-plumber');
const getTime = require("./getTime");

gulp.task('webpack',(cb)=>{
	return gulp.src('src/Studio.jsx')
		.pipe(plumber())
	  	.pipe(webpack( require('../webpack.production.config.js') ))
	  	.pipe(gulp.dest('dist/'));
		// .on("end",()=>{
		// 	writeDiv("divTitle",`[${getTime()}] webpack done.`)
		// });
});