const getTime = ()=>{
	const DD = new Date();
	const hours = DD.getHours();
	const minutes = DD.getMinutes();
	const seconds = DD.getSeconds();
	return (`${hours}:${minutes}:${seconds}`);
}

module.exports = getTime;