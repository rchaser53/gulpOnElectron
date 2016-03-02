import * as React from "react";
import test from "testStdout";
const {start,stop} = test;

const tmpStyle= {
	width:150,
	height:30,
	display:"block"
};

export class App extends React.Component{
	constructor(props){
    super();

    this.state = {};
    this.state.tasks = props.getGulp().tasks;
    this.state.messeage = [];

    this.state.stdout = [];
    this.state.stderr = [];

    this.state.processes = {};
    this.state.directories = {};
	}
  makeTasks(){
    const tasks = this.state.tasks;

    return Object.keys(tasks).map((key)=>{
        return (<div key={"task" + key} style={{display:"flex",width:250,marginTop:5}}>
                  <div style={{width:150,float:"left"}}>{key}</div>
                  <button style={{float:"right"}} onClick={()=>{this.doTask(tasks[key].name)}}>do Task</button>
                </div>);
    })
  }
  getColor(obj){
    return (obj.type === "normal")?"black":"red";
  }
  getMesseage(){
    const messeage = this.state.messeage;

    return Object.keys(messeage).map((key)=>{
        return (<div key={"messege" + key} style={{color:this.getColor(messeage[key])}} >
                {messeage[key].content}
                </div>)
    });
  }
  getDirectories(){
    const {walk} = this.props;
    walk(this.refs.inputPathRef.value,(err,results)=>{
        if (err) throw err;
        this.setState({directories:results})
    });
  }
  doTask(key){    
    this.setState({stdout:[],stderr:[]});
    const ls = start(key,"./src",true);
    let tempObj = this.state.processes;
    tempObj[key] = ls;

    this.setState({processes:tempObj});

    ls.stdout.on('data', (data) => {
      let tempArray = this.state.stdout;
      tempArray.push(data.toString());

      this.setState({stdout:tempArray});
    });

    ls.stderr.on('data', (data) => {
      let tempArray = this.state.stderr;
      tempArray.push(data.toString());

      this.setState({stderr:tempArray});
    });

    ls.on('close', (message,socket) => {
      console.log(message);
    });
  }
  makeDirectories(){
    const {directories} = this.state;

    return Object.keys(directories).map((key)=>{
        return (<div style={{display:"flex",width:150,position:"relative"}}>
                    <div ref={key} key={key}>{directories[key].name}</div>
                    <button style={{position:"absolute",right:0}} onClick={()=>{this.getDirectories()}}>setPath</button>
                </div>);
    });
  }
  makeMessageRow(dataArray,color){
    let i = 0;
    return dataArray.map((elem)=>{
      return (<div key={(i++) + elem} style={{color:color}}>{elem}</div>)
    });
  }
  setPath(key){
    this.refs.inputPathRef.value += "/" + this.refs[key].textContent;
  }
  killProcess(){
    const processes = this.state.processes;
    Object.keys(processes).forEach((key)=>{
        processes[key].send("a");
    });
  }
	render(){
		return (<div>
                <div style={{display:"flex"}}>
                    <input ref="inputPathRef" type="text" id="inputGetPath" style={{width:150}} />
                    <button onClick={()=>{this.getDirectories()}} >...</button>
                </div>
                <div style={{display:"flex",height:300}}>
                    <div>{this.makeTasks()}</div>
                    <div>{this.makeDirectories()}</div>
                </div>
                <button onClick={()=>{this.killProcess()}} >kill</button>
                {this.makeMessageRow(this.state.stdout,"black")}
                {this.makeMessageRow(this.state.stderr,"red")}
            </div>);
	}
}
export default App;

// TBD childrenを使って再起処理