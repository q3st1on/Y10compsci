import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TlqsForm } from './programs/tlqs';
import progContext from './progContext.js';
import AutosizeInput from 'react-input-autosize';
import { ls } from  './commands/ls.js';
import { cd } from  './commands/cd.js';
import { cat } from './commands/cat.js';
import { help } from './commands/help.js';
import { exec } from './commands/exec.js';;

const renderFunc = (program) => {
  if (program === "jsh") {
    return(<TerminalForm />);
  } else if (program === "tqls") {
    return(<TlqsForm />);
  } else {
    return(<TerminalForm />);
  }
};

const MasterForm = () => {
  const [program, changeProg] = useState(false);

  return(
    <progContext.Provider value={{program, changeProg}}>
      {renderFunc(program)}
    </progContext.Provider>
  );
};

const TerminalForm = (props) => {
  const [value, setValue]= useState('');
  const [current_program, setCurrent_program]= useState('jsh');
  const [currentid, setCurrentid]= useState(1); 
  const [history, setHistory]= useState([
    {
      id: 0,
      command: false, 
      style: {color: `white`},
      prompt: false,
      date: {},
      path: {},
      value: "Welcome To My Website"
    }
  ]); 
  const [path, setPath]= useState("/home"); 
  const [filesystem, setFilesystem] = useState([
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
      {id: 0, value: "tlqs"}]
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
  ]);
  const [counter, setCounter] = useState(0);
  const { changeProg } = useContext(progContext);
  /*THIS CODE IS FOR RENDERING THE TTY*/
  useEffect(()=>{
    scrollToBottom();
  },[])
  useEffect(() => {
    scrollToBottom();
  })

  const handleChange = (event) => {
    setValue('');
  };
  const scrolldownRef = React.createRef();

  const scrollToBottom = () => {
    scrolldownRef.current?.scrollIntoView({ behavior: "smooth" })
  };
  const onKeyDownHandler = (event) => {
    if (counter === 0 || currentid === 0) {return(null);}
    if (event.keyCode === 38) {
      let histout = history.find(histout => histout.id === currentid && histout.command === true).value;
      setValue(histout.slice(histout.indexOf("$", 1)+2, histout.length));
      setCurrentid(currentid-1);

    }
  };

  const handlettySubmit = (event) => {
    setCounter(counter+1);
    setHistory([history, {id: counter, command: true, style: {color: `purple`}, prompt: true, date: getTime(), path: path, value: value}]);
    if (value.slice(0, 3) === "ls") {
      setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: ls(filesystem, path)}]);
    }
    else if (value === "pwd") {
      setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: path}]);

    }
    else if (value === "cls" || value === "clear") {
      setHistory([]);
    }
    else if (value === "whoami") {
      setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: "q3st1on"}]);
    }
    else if (value === "id") {
      setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: "uid=1000(q3st1on) gid=1000(q3st1on) groups=1000(q3st1on),5(tty)"}]);
    }
    else if (value.slice(0,3) === "cd ") {
      let val = (cd(value.slice(-(value.length-3)), filesystem, path));
      if (val.ret1 !== "error"){
        setPath(val.ret1);
      } else {
        setHistory([history, {id: counter, command: false, style: {color: `red`}, prompt: false, value: val.ret2}]);
      }
    }
    else if (value.slice(0,4) === "cat ") {
      let val = (cat(value.slice(4), filesystem, path));
      if (val.ret1 === "error"){
          setHistory([history, {id: counter, command: false, style: {color: `red`}, prompt: false, value: (val.ret2)}]);
      } else {
        setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: (val.ret1)}]);
      }
    }
    else if (value.slice(0,4) === "sudo") {
      setHistory([history, {id: counter, command: false, style: {color: `red`}, prompt: false, value: "As If I'd Trust You With That :)"}]);
    }
    else if ((value.slice(0,4) === "help") || (value.slice(0,1) === "?")) {
      if (((value.slice(0,4) === "help") && (value.length > 4))) {
          setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(this.getTime(), path, value.slice(5, value.length))}]);
      } else if (((value.slice(0,1) === "?") && (value.length > 1))) {
        setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(this.getTime(), path, value.slice(2, value.length))}]);
      } else {
        setHistory([history, {id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(this.getTime(), path, "")}]);
      }
    } else if (value.slice(0,2) === "./") {
      let ret = exec(value.slice(2, value.length), filesystem, path);
        setHistory([history, {id: counter, command: false, style: ret.style, prompt: false, value: ret.value}]);
      if (ret.errorcheck !== 'a' && ret.errorcheck !== 'b') {
        setCurrent_program(ret.value);
      }
    }else if (value === "") {

    }
    else {
        setHistory( [history, {id: counter, command: false, style: {color: `red`}, prompt: false, value: "jsh: command not found: "+value}]);
    }
    setValue("");
    //event.preventDefault();
    setCurrentid(counter);
  };

  const createHistory = (history) => {
    return history.map[history];
  };

  const getTime = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",  "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    var currentDate = new Date(); 
    var dateTime = days[currentDate.getDay()] + " "+ months[currentDate.getMonth()]  + " " + currentDate.getDate() + ", "  + currentDate.getHours() + ":"  + currentDate.getMinutes();
    return(dateTime)
  };

  const getPrompt = (time, path) => {
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
  };

  const renderHistory = (history) => {
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
             {getPrompt(id[0].date, id[0].path)}
             {id[0].value} 
            </span>
            <span style={id[1].style}>
              {id[1].value}
            </span>
          </div>
        ))}
      </div>
    )
  };
  /*THIS IS THE END OF CODE FOR RENDERING THE TTY*/
  const changeToTqls = () => changeProg("tqls");


    console.log(current_program)
    if (current_program === "jsh") {
      return (
        <>
        <form onSubmit={handlettySubmit()}>
          <div>
            {renderHistory(history)}
          </div>
          <label id = "inputbox">
            {getPrompt(getTime(), path)}
            <label>
              <AutosizeInput onKeyDown={onKeyDownHandler()}
              autoComplete="off" nname="inputLine" class="no-outline"
              type="text" value={value} onChange={handleChange()} />
            </label>
          </label>
        </form>
        </>
      );
    } else {
      setCurrent_program("jsh");
      try {
        this.changeToTqls();
      } catch(e) {
        console.log("Error: "+e)
      }
      console.log("tlqs lmao");
      console.log(props);
      console.log(progContext);
      return(
        <>
        <form onSubmit={handlettySubmit()}>
          <div>
            {renderHistory(history)}
          </div>
          <label id = "inputbox">
            {getPrompt(getTime(), path)}
            <label>
              <AutosizeInput onKeyDown={onKeyDownHandler()}
              autoComplete="off" nname="inputLine" class="no-outline"
              type="text" value={value} onChange={handleChange()} />
            </label>
          </label>
        </form>
        </>
      );
    };
};

ReactDOM.render(
  <React.StrictMode>
    <MasterForm />
  </React.StrictMode>,
  document.getElementById('root')
);