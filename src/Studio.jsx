import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './App.jsx';

window.onload = ()=>{
	ReactDom.render(<App getGulp={window.getGulp} walk={window.walk} />,
		document.getElementById('megroApps')
	);
}

// ReactDom.render(<App getGulp={window.getGulp()} ipcRenderer={window.ipcRenderer} />,