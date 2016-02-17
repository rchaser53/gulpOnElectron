const gulp = require('gulp-help')(require('gulp'));
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');
const plumber = require('gulp-plumber');
const getTime = require("./getTime");

// いちいち書かないといけないのが凄いめんどくさい
const targetPaths = ['build/**/*.js','build/**/*.jsx','build/**/*.tsx'];
const notTargetPaths = ['!build/components/supice-components/**/*.jsx',
						'!build/components/preview/**/*.jsx',
						'!build/components/preview/**/*.js',
						'!build/sfdc/**/*.js',
						'!build/internal/**/*.js',
						'!build/compile.js',
						'!build/declare.js',
						'!build/components/unitSettingWindow/contentItems.jsx',
						'!build/components/unitSettingWindow/interactions/interactionsItems.jsx'];

gulp.task('coverage', () => {
	const srcArray = targetPaths.concat(notTargetPaths);
    return gulp.src(srcArray)
    			.pipe(plumber())
				.pipe(istanbul({
					instrumenter: isparta.Instrumenter,
					includeUntested: true
				}))
				.pipe(istanbul.hookRequire())
				.on("finish",()=>{
					gulp.src("test/src/**/*.js",{read: false})
						.pipe(mocha({reporter: 'nyan'}))
						.pipe(istanbul.writeReports({
								reporters: ['text', 'text-summary', 'json', 'html']
						}));
				});
});