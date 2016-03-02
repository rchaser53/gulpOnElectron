import * as React from 'react';
import * as ReactDom from 'react-dom';
import App from './App.jsx';
import test from "testStdout";
const {getGulp,walk} = test;

// window.onload = ()=>{
	ReactDom.render(<App getGulp={getGulp} walk={walk} />,
		document.getElementById('megroApps')
	);
// }