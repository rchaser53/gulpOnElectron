const gulp = require('gulp-help')(require('gulp'));
const plumber = require('gulp-plumber');
const getTime = require("./getTime");

gulp.task('transferAssets',function(){
	gulp.src(['fonts/**/*'])
		.pipe(plumber())
        .pipe(gulp.dest('./workplace/fonts/'))
        .pipe(gulp.dest('./dist/fonts/'));
	return gulp.src(['img/**/*'])
		.pipe(plumber())
        .pipe(gulp.dest('./workplace/img/'))
        .pipe(gulp.dest('./dist/img/'));
});