const fs = require("fs");
const path = require("path");

const walk = (p, callback)=>{
    var results = [];

    fs.readdir(p, function (err, files) {
      if (err) throw err;

      var pending = files.length;
      if (!pending) return callback(null, results); //全てのファイル取得が終わったらコールバックを呼び出す

      files.map(function (file) { //リスト取得
        return path.join(p, file);
      }).filter(function (file) {
        if(fs.statSync(file).isDirectory()) walk(file, function(err, res) { //ディレクトリだったら再帰
          results.push({name:path.basename(file), children:res}); //子ディレクトリをchildrenインデックス配下に保存
          if (!--pending) callback(null, results);
         });
        return fs.statSync(file).isFile();
      }).forEach(function (file) { //ファイル名を保存
        var stat = fs.statSync(file);
        results.push({file:path.basename(file), size:stat.size});
        if (!--pending) callback(null, results);
      });

    });
}

const getGulp = () =>{
	var gulp = require("gulp");

	const requireDir = require('require-dir');
    requireDir('../tasks', { recurse: true });

  	return gulp;
}


const gulpHeader = 
(`		const gulp = require("gulp");
		const runSequence = require('run-sequence');\r\n
`);

const start = (task,src,isWatch)=>{
	// const spawn = require('child_process').spawn;
	const fork = require('child_process').fork;

	const spawnSync = require('child_process').spawnSync;
	const fs = require("fs");

	const tempTask = (Array.isArray(task) === true)?task.split():task || "";
	const tempSrc = (Array.isArray(src) === true)?src.split():src || "";

	if(isWatch === true){
		const srcStr = 	`const temp = gulp.watch(["${tempSrc}/**/*.jsx"],["${tempTask}"]);`;

		const abc = (gulpHeader + 
			`gulp.task("poyo",()=>{
				${srcStr};
				process.on("message",()=>{
					temp.end();
				});
			});`);
		fs.writeFileSync("./tasks/aaa.js",abc);
	}

	return fork("C:/Users/takayuki/Desktop/gulpOnElectron/node_modules/gulp/bin/gulp.js",
				["poyo"],
				{silent:true,
				 execPath: 'C:/Program Files/nodejs/node.exe'});
}

const stop = (task,src,isWatch)=>{
	const spawn = require('child_process').spawn;
	const spawnSync = require('child_process').spawnSync;
	const fs = require("fs");

	const tempTask = (Array.isArray(task) === true)?task.split():task || "";
	const tempSrc = (Array.isArray(src) === true)?src.split():src || "";

	const srcStr = 	`gulp.unwatch(["${tempSrc}/**/*.jsx"],["${tempTask}"]);`;

	const abc = (gulpHeader + 
		`gulp.task("poyo",()=>{
			${srcStr}
		});`);
	fs.writeFileSync("./tasks/aaa.js",abc);

	spawnSync('C:/Users/takayuki/AppData/Roaming/npm/gulp.cmd', ["poyo"])

	return;
}
module.exports = {walk,getGulp,start,stop};