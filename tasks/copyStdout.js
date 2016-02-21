const gulp = require("gulp");

gulp.task("copyStdout",()=>{
	gulp.src("node_modules/**/testStdout/*.js")
		.pipe(gulp.dest("./"));
})