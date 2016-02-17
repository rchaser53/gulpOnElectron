
const poke = (task)=>{
	// const execFile = require('child_process').execFile;
	const spawn = require('child_process').spawn;

	return spawn('C:/Users/takayuki/AppData/Roaming/npm/gulp.cmd', [task]);

	// ls.stdout.on('data', (data) => {
	// 	// console.log(data)
	//   console.log(`stdout: ${data}`);
	// });

	// ls.stderr.on('data', (data) => {
	// 	// console.log(data)
	//   console.log(`stderr: ${data}`);
	// });

	// ls.on('close', (code) => {
	// 	// console.log(code)
	//   console.log(`child process exited with code ${code}`);
	// });
		// execFile('C:/Users/takayuki/AppData/Roaming/npm/gulp.cmd', ['test'], (error, stdout, stderr) => {
	 //    	console.log(stdout)
		// });
}
module.exports = poke;