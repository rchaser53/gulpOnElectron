const gulp = require('gulp-help')(require('gulp'));
const plumber = require('gulp-plumber');
const getTime = require("./getTime");

// aconst sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const replace = require('gulp-replace');

gulp.task("sassCompile",()=>{
  gulp.src([
              './scss/styleLibrary/font-awesome.scss',
              './scss/styleLibrary/bootstrap.scss',
              './node_modules/react-widgets/dist/css/react-widgets.css',
              './scss/assets/**/*.scss',
              './scss/styleLibrary/slds/salesforce-lightning-design-system-ltng.min.css',
              './scss/assets/supice-components/*.css'
            ])
  // 少し強引だが、問題となるケースはまずないはず
  .pipe(replace("@-ms-viewport", "'@-ms-viewport'"))
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sass({outputStyle:'compressed'}))
  .pipe(concat('all.css'))
  .pipe(replace("'@-ms-viewport'", "@-ms-viewport"))
  .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/source/css/'}))
  .pipe(gulp.dest('./workplace/css'));

  return gulp.src('./workplace/css/all.css')
              .pipe(plumber())
              .pipe(gulp.dest('./dist/css/'));
});