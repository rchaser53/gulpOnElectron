const gulp = require("gulp");

gulp.task("copyStdout",()=>{
	gulp.src("./**/testStdout/*.js")
		.pipe(gulp.dest("./node_modules"));
		
})