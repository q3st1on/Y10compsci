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
      history: [
        {
          id: 0, 
          value: "Welcome To My Website"
        }
      ], 
      path: "/home", 
      filesystem: [
        {id: "/home", folder: "True",
          value:[
            {id: 0, value: "About Me"},
            {id: 0, value: "My Projects"},
            {id: 0, value: "Gay-Ming, the homosexual vietnamese prostitute"}
          ]
        },
        {id: "/home/About Me", folder: "True", value: []},
        {id: "/home/My Projects", folder: "True", value: [
          {id: 0, value: "This Low Quality Website"},
        ]},
        {id: "/home/My Projects/This Low Quality Website", folder: "False", value: [
          {id: 0, value: "this website is shit lol"}]
        },
        {id: "/home/Gay-Ming, the homosexual vietnamese prostitute", folder: "True", 
        value:[
          {id: 0, value: "I"},
          {id: 0, value: "D"},
          {id: 0, value: "F"},
          {id: 0, value: "k"}
        ]},
        {id: "/home/About Me/I", folder: "False", 
        value:[ {id: 0, value: "cunt"}
        ]},
        {id: "/home/About Me/D", folder: "False", 
        value:[ {id: 0, value: "cunt"}
        ]},
        {id: "/home/About Me/F", folder: "False", 
        value:[ {id: 0, value: "cunt"}
        ]},
        {id: "/home/About Me/K", folder: "False", 
        value:[ {id: 0, value: "cunt"}
        ]},
      ]
    };
    this.counter = 0;
    this.commands = ["ls", "cd", "./"];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.counter= this.counter+1;
    this.setState(previousState => ({
      history: [...previousState.history, {id: this.counter, value: this.state.path+"$ "+this.state.value}]
    }));
    console.log(this.state.value.charAt(2));
    if (this.state.value.slice(0, 3) === "ls") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, value: ls(this.state.filesystem, this.state.path)}]
      }));

    }
    else if (this.state.value === "pwd") {
      this.setState((previousState) => ({
        history: [...previousState.history, {id: this.counter, value: this.state.path}]
      }));

    }
    else if (this.state.value.slice(0,3) === "cd ") {
      if ((cd(this.state.value.slice(-(this.state.value.length-3)), this.state.filesystem, this.state.path)).ret1 !== "error"){
        this.setState((state) => {
          return {path: (cd(this.state.value.slice(-(this.state.value.length-3)), this.state.filesystem, this.state.path)).ret1};
        });
      } else {
        this.setState((previousState) => ({
          history: [...previousState.history, {id: this.counter, value: ((cd(this.state.value.slice(-(this.state.value.length-3)), this.state.filesystem, this.state.path)).ret2)}]
        }));
      }
    }
    else {
      this.setState(previousState => ({
        history: [...previousState.history, {id: this.counter, value: "jsh: command not found: "+this.state.value}]
      }));
    }
    this.setState((state) => {
      return {value: state.value = ""};
    });
    event.preventDefault();
  }
  createHistory(history) {
    return history.map[history];
  }

  
  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <div>
              {this.state.history.map(id => (
                <p>{id.value}</p>
              ))}
        </div>
        {this.commandout}
        <label>
          {this.state.path}{"$ "}      
          <AutosizeInput autocomplete="off" nname="inputLine" class="no-outline" type="text" value={this.state.value} onChange={this.handleChange} />
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
