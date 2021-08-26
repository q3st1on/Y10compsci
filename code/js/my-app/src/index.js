import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AutosizeInput from 'react-input-autosize';
import { ls } from  './commands/ls.js';
import { cd } from  './commands/cd.js';
import { cat } from './commands/cat.js';

class TerminalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentid: 1, 
      history: [
        {
          id: 0,
          command: false, 
          style: {color: `white`},
          prompt: false,
          date: {},
          path: {},
          value: "Welcome To My Website"
        }
      ], 
      path: "/home", 
      filesystem: [
        {id: "/home", folder: "True",
          value:[
            {id: 0, value: "About Me"},
            {id: 0, value: "My Projects"},
            {id: 0, value: "Gaming"}
          ]
        },
        {id: "/home/About Me", folder: "True", value: []},
        {id: "/home/My Projects", folder: "True", value: [
          {id: 0, value: "This Low Quality Website"},
        ]},
        {id: "/home/My Projects/This Low Quality Website", folder: "False", value: [
          {id: 0, value: "this website is shit lol"}]
        },
        {id: "/home/Gaming", folder: "True", 
        value:[
          {id: 0, value: "I"},
          {id: 0, value: "D"},
          {id: 0, value: "F"},
          {id: 0, value: "k"}
        ]},
        {id: "/home/About Me/I", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/About Me/D", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/About Me/F", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/About Me/K", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/I", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/D", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/F", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/K", folder: "False", 
        value:[ {id: 0, value: "idfk"}
        ]},
      ]
    };
    this.counter = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  onKeyDownHandler = e => {
    if (this.counter === 0 || this.state.currentid === 0) {return(null);}
    if (e.keyCode === 38) {
      this.setState((state) => {
        let histout = this.state.history.find(histout => histout.id === this.state.currentid && histout.command === true).value;
        return {value: state.value = histout.slice(histout.indexOf("$", 1)+2, histout.length)};
      });
      this.setState((state) => {
        return {currentid: state.currentid = this.state.currentid-1};
      });

    }
  };

  handleSubmit(event) {
    this.counter= this.counter+1;
    console.log(this.getPrompt());
    this.setState(previousState => ({
      history: [...previousState.history, {id: this.counter, command: true, style: {color: `purple`}, prompt: true, date: this.getTime(), path: this.state.path, value: this.state.value}]
    }));
    if (this.state.value.slice(0, 3) === "ls") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: ls(this.state.filesystem, this.state.path)}]
      }));
    }
    else if (this.state.value === "pwd") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: this.state.path}]
      }));

    }
    else if (this.state.value === "cls" || this.state.value === "clear") {
      this.setState((previousState) => ({
        history: []
      }));
    }
    else if (this.state.value === "whoami") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: "root"}]
      }));
    }
    else if (this.state.value === "id") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: "uid=0(root) gid=0(root) groups=0(root)"}]
      }));
    }
    else if (this.state.value.slice(0,3) === "cd ") {
      let val = (cd(this.state.value.slice(-(this.state.value.length-3)), this.state.filesystem, this.state.path));
      if (val.ret1 !== "error"){
        this.setState((state) => {
          return {path: val.ret1};
        });
      } else {
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, command: false, style: {color: `red`}, prompt: false, value: val.ret2}]
        }));
      }
    }
    else if (this.state.value.slice(0,4) === "cat ") {
      let val = (cat(this.state.value.slice(4), this.state.filesystem, this.state.path));
      if (val.ret1 === "error"){
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, command: false, style: {color: `red`}, prompt: false, value: (val.ret2)}]
        }));
      } else {
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: (val.ret1)}]
        }));
      }
    }
    else {
      this.setState(previousState => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `red`}, prompt: false, value: "jsh: command not found: "+this.state.value}]
      }));
    }
    this.setState((state) => {
      return {value: state.value = ""};
    });
    event.preventDefault();
    this.setState((state) => {
      return {currentid: state.currentid = this.counter};
    });
  }

  createHistory(history) {
    return history.map[history];
  }

  getTime() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",  "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    var currentDate = new Date(); 
    var dateTime = days[currentDate.getDay()] + " "+ months[currentDate.getMonth()]  + " " + currentDate.getDate() + ", "  + currentDate.getHours() + ":"  + currentDate.getMinutes();
    return(dateTime)
  }

  getPrompt(time, path) {
    if (time !== "" && path !== "") {
      return(
        <label>
          <div >
            <span style = {{color: `blue`}}>    {"┌─["}</span>
            <span style={{color: `limegreen`}}> {"root"}</span>
            <span style={{color: `gray`}}>      {"@"}</span>
            <span style={{color: `#009ba1`}}>   {"jshtest"}</span>
            <span style = {{color: `blue`}}>    {"]"}</span>
            <span style={{color: `white`}}>     {" - "}</span>
            <span style = {{color: `blue`}}>    {"["}</span>
            <span style={{color: `white`}}>     {path}</span>
            <span style = {{color: `blue`}}>    {"]"}</span>
            <span style={{color: `white`}}>     {" - "}</span>
            <span style = {{color: `blue`}}>    {"["}</span>
            <span style={{color: `yellow`}}>    {time}</span>
            <span style = {{color: `blue`}}>    {"]"} </span>  
          </div>
          <label >
            <span style = {{color: `blue`}}>    {"└─["}</span>
            <span style = {{color: `#ff05f7`}}> {"#"}</span>
            <span style = {{color: `blue`}}>    {"] <>"}</span>
          </label>
        </label>
      )
    }
  }

  renderHistory(history) {
    const zip = (a, b) => Array(Math.max(b.length, a.length)).fill().map((_,i) => [a[i], b[i]]);
    let promptdict = [];
    let plaindict = [];
    for(var i in history) {
      if(history[i].prompt === true){
        promptdict[i]=history[i]
        plaindict[i] = {
          id: i,
          command: false, 
          style: {color: `white`},
          prompt: false,
          date: "",
          path: "",
          value: ""
      }
      } else {
        plaindict[i]=history[i]
        promptdict[i] = {
          id: i,
          command: false, 
          style: {color: `white`},
          prompt: false,
          date: "",
          path: "",
          value: ""
      }
      }
    }
    let printdict = zip(promptdict, plaindict);
    return(
      <div>
        {printdict.map( id => (
          <div>
            <span>
             {this.getPrompt(id[0].date, id[0].path)}
             {id[0].value} 
            </span>
            <span style={id[1].style}>
              {id[1].value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  
  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <div>
          {this.renderHistory(this.state.history)}
        </div>
        {this.commandout}
        <label>
          {this.getPrompt(this.getTime(), this.state.path)}
          <label>
            <AutosizeInput onKeyDown={this.onKeyDownHandler}
            autocomplete="off" nname="inputLine" class="no-outline"
            type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <TerminalForm />
  </React.StrictMode>,
  document.getElementById('root')
);