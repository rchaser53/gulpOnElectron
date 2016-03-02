const gulp = require('gulp-help')(require('gulp'));
const ts = require('gulp-typescript');
const project = ts.createProject('tsconfig.json');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const getTime = require("./getTime");

gulp.task("tsCompile",()=>{
    return gulp.src(['./typings/bundle.d.ts','src/**/*ts','src/**/*tsx'])
    	.pipe(plumber())
        .pipe(ts(project)).js
        .pipe(gulp.dest('./build'));
});
