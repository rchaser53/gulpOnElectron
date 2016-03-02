const gulp = require('gulp-help')(require('gulp'));
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
require('babel-core/register');
const plumber = require('gulp-plumber');
const getTime = require("./getTime");
const fs = require('fs');

global.IMG_RESOURCE_PATH = "";

const Base = require('mocha').reporters.Base;

const TestReporter = function(runner){
  Base.call(this, runner);

  runner.on('pending', ()=> {
    // mainWindow.webContents.send('menu-clicked', 'メッセージの引数');
  });

  runner.on('pass', ()=> {
    writeDiv("divSuccess","pass:" + this.stats.passes);
  });

  runner.on('fail', ()=> {
    writeDiv("divFailure","fail:" + this.stats.failures);
  });

  runner.on('end', ()=>{
    if(this.failures.length === 0){
      writeDiv("divFailure","fail:0");
      writeDiv("divResult","test done");
      return;
    }

    this.failures.forEach((elem)=>{
      writeDiv("divResult","error file path:" + elem.file,"error");
      writeDiv("divErrContent",elem.err);
    });
  });
}

gulp.task('test', () => {
    return gulp.src('test/**/*.js', {read: false})
    			.pipe(plumber())
				.pipe(mocha({
								// reporter:TestReporter,
								reporter:"dot",
							 	compilers:'js:babel/register'}))
});