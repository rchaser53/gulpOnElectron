const gulp = require("gulp");
	gulp.task("poyo",()=>{

		gulp.src(["./tasks/aaa.js"])
			.pipe(gulp.dest("./test"));
	});
	