const gulp = require('gulp-help')(require('gulp'));
const replace = require('gulp-replace');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const getTime = require("./getTime");

// redux由来のconnectがimportされているか判定する
const condition = (file) =>{
	const tmpStream = file.contents.toString("utf8");

	return (tmpStream.match(/import \{ connect \} from \'react-redux\';/) != null);
}

gulp.task("copyJSX",()=>{
    return gulp.src(['./src/**/*.jsx','./src/**/*.js'])
    			.pipe(plumber())
				.pipe(replace(/\.ts(x?)\';/g,"';"))
				// istanbulに無視させたい
				.pipe(replace(	/const(\s*)mapStateToProps/,
								"/* istanbul ignore next */ \r\n const mapStateToProps"))
				.pipe(replace(	/const(\s*)mapDispatchToProps/,
								"/* istanbul ignore next */ \r\n const mapDispatchToProps"))
				.pipe(gulpIf(condition,replace(	/export(\s*)default/,
											"/* istanbul ignore next */ \r\n export default")))
				.pipe(gulp.dest('./build'));
});