import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AutosizeInput from 'react-input-autosize';
import { ls } from  './commands/ls.js';
import { cd } from  './commands/cd.js';
import { cat } from './commands/cat.js';
import { help } from './commands/help.js';
import { exec } from './commands/exec.js';

class TlqsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
}

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      currentprogram: 'jsh',
    }
    this.state = {
      currentprogram: 'jsh',
    }
  }
  renderCheck(cprog)  {
    if (cprog === 'jsh') {
      let ret = <TerminalForm />
      this.setState((state) => {
        return {currentprogram: state.currentprogram = this.props.currentprogram}
      });
      console.log("prog: ");
      console.log(this.props.currentprogram);
      console.log(this.props);
      console.log(this.state);
      return(ret);
    } else if (cprog === 'tlqs') {
      let ret = new TlqsForm();
      this.setState((state) => {
        return {currentprogram: state.currentprogram = ret.current_program}
      });
      return(ret);
    } else {
      return(new TerminalForm());
    }
  }

  render () {
    return(this.renderCheck(this.state.currentprogram))
  }
}

class TerminalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      current_program: 'jsh',
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
        {id: "/home", x: false, folder: true,
          value:[
            {id: 0, value: "About Me"},
            {id: 0, value: "My Projects"},
            {id: 0, value: "Gaming"}
          ]
        },
        {id: "/home/About Me", x: false, folder: true, value: []},
        {id: "/home/My Projects", x: false, folder: true, value: [
          {id: 0, value: "This Low Quality Website"},
        ]},
        {id: "/home/My Projects/This Low Quality Website", x: true, folder: false, value: [
          {id: 0, value: "this website is shit lol"}]
        },
        {id: "/home/Gaming", x: false, folder: true, 
        value:[
          {id: 0, value: "I"},
          {id: 0, value: "D"},
          {id: 0, value: "F"},
          {id: 0, value: "k"}
        ]},
        {id: "/home/About Me/I", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/About Me/D", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/About Me/F", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/About Me/K", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/I", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/D", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/F", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
        {id: "/home/Gaming/K", x: false, folder: false, 
        value:[ {id: 0, value: "idfk"}
        ]},
      ]
    };
    this.counter = 0;
    this.handleChange = this.handleChange.bind(this);
    this.handlettySubmit = this.handlettySubmit.bind(this);
  }
  /*THIS CODE IS FOR RENDERING THE TTY*/
  componentDidMount () {
    this.scrollToBottom()
  }
  componentDidUpdate () {
    this.scrollToBottom()
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  scrolldownRef = React.createRef();

  scrollToBottom = () => {
    this.scrolldownRef.current?.scrollIntoView({ behavior: "smooth" })
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

  handlettySubmit(event) {
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
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: "q3st1on"}]
      }));
    }
    else if (this.state.value === "id") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: "uid=1000(q3st1on) gid=1000(q3st1on) groups=1000(q3st1on),5(tty)"}]
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
    else if (this.state.value.slice(0,4) === "sudo") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, command: false, style: {color: `red`}, prompt: false, value: "As If I'd Trust You With That :)"}]
      }));
    }
    else if ((this.state.value.slice(0,4) === "help") || (this.state.value.slice(0,1) === "?")) {
      if (((this.state.value.slice(0,4) === "help") && (this.state.value.length > 4))) {
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(this.getTime(), this.state.path, this.state.value.slice(5, this.state.value.length))}]
        }));
      } else if (((this.state.value.slice(0,1) === "?") && (this.state.value.length > 1))) {
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(this.getTime(), this.state.path, this.state.value.slice(2, this.state.value.length))}]
        }));
      } else {
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(this.getTime(), this.state.path, "")}]
        }));
      }
    } else if (this.state.value.slice(0,2) === "./") {
      let ret = exec(this.state.value.slice(2, this.state.value.length), this.state.filesystem, this.state.path);
      this.setState(previousState => ({
        history: [...previousState.history, {id: this.counter, command: false, style: ret.style, prompt: false, value: ret.value}]
      }));
      this.setState(previousState => ({
        history: [...previousState.history, {id: this.counter, command: false, style: ret.style, prompt: false, value: ret.value}]
      }));
      this.setState((state) => {
        return {current_program: state.current_program = ret.value};
      });
    }else if (this.state.value === "") {

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
            <span style={{color: `limegreen`}}> {"q3st1on"}</span>
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
  /*THIS IS THE END OF CODE FOR RENDERING THE TTY*/
  
  render() {
    <MasterForm current_program={this.state.currentprogram} />
    if (this.state.current_program === "jsh") {
      return (
        <>
        <form onSubmit={this.handlettySubmit}>
          <div>
            {this.renderHistory(this.state.history)}
          </div>
          {this.commandout}
          <label id = "inputbox" ref={this.messagesEndRef} >
            {this.getPrompt(this.getTime(), this.state.path)}
            <label>
              <AutosizeInput onKeyDown={this.onKeyDownHandler}
              autoComplete="off" nname="inputLine" class="no-outline"
              type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
          </label>
        </form>
        </>
      );
    } else if (this.state.current_program === "This Low Quality Website") {
      this.setState((state) => {
        return {current_program: state.current_program = "jsh"};
      });
      return(
        {prog: "tlqw"}
      );
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <MasterForm />
  </React.StrictMode>,
  document.getElementById('root')
);