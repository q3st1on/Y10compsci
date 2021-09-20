import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import progContext from './progContext.js';
import AutosizeInput from 'react-input-autosize';
import { ls } from  './commands/ls.js';
import { cd } from  './commands/cd.js';
import { cat } from './commands/cat.js';
import { help } from './commands/help.js';
import { exec } from './commands/exec.js';
import useKeyPress from './programs/useKeyPress';

const renderFunc = (program) => {
  if (program === "jsh") {
    return(<TerminalForm />);
  } else if (program === "tqls") {
    return(<TlqsForm />);
  } else  if (program === "meme") {
    return(<MemeForm />);
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

const TlqsForm = (props) => {
  const [current_program, setCurrent_program]= useState('Unfinished testing program');
  const changeToJsh = () => changeProg("jsh");
  const { changeProg } = useContext(progContext);
  const Q = () => {
    setCurrent_program("jsh");
  };
  useKeyPress({ key: "q", onKeyDown: Q})
  if(current_program === "Unfinished testing program") {
    return(
      <div>
        <h1>I TOLD YOU IT WAS UNFINISHED</h1>
        <br></br>
        <p>This is unfinished work, like, actaully disfunctionally unfinished</p>
        <p>As such it has been removed from this version of JSH</p>
        <p></p>
        <p>Dont worry, as usual you can just press q to get back to jsh</p>
      </div>
    );
  } else {
    setCurrent_program("Unfinished testing program");
    changeToJsh();
    return
  }

}

const MemeForm = (props) => {
  const [current_program, setCurrent_program]= useState('tlqs');
  const [counter, setCounter] = useState(0);
  const focusDiv = useRef(null);
  const copyPasta = useState(
    [
      "1'd ju57 l1k3 70 1n73rj3c7 f0r 4 m0m3n7. wh47 y0u'r3 r3f3rr1n6 70 45 l1nux, 15 1n f4c7, 6nu/l1nux,",
      "0r 45 1'v3 r3c3n7ly 74k3n 70 c4ll1n6 17, 6nu plu5 l1nux. l1nux 15 n07 4n 0p3r471n6 5y573m un70 1753lf,",
      "bu7 r47h3r 4n07h3r fr33 c0mp0n3n7 0f 4 fully func710n1n6 6nu 5y573m m4d3 u53ful by 7h3 6nu c0r3l1b5,",
      "5h3ll u71l17135 4nd v174l 5y573m c0mp0n3n75 c0mpr151n6 4 full 05 45 d3f1n3d by p051x.",
      "",
      "m4ny c0mpu73r u53r5 run 4 m0d1f13d v3r510n 0f 7h3 6nu 5y573m 3v3ry d4y, w17h0u7 r34l1z1n6 17. 7hr0u6h",
      "4 p3cul14r 7urn 0f 3v3n75, 7h3 v3r510n 0f 6nu wh1ch 15 w1d3ly u53d 70d4y 15 0f73n c4ll3d 'l1nux', 4nd",
      "m4ny 0f 175 u53r5 4r3 n07 4w4r3 7h47 17 15 b451c4lly 7h3 6nu 5y573m, d3v3l0p3d by 7h3 6nu pr0j3c7.",
      "",
      "7h3r3 r34lly 15 4 l1nux, 4nd 7h353 p30pl3 4r3 u51n6 17, bu7 17 15 ju57 4 p4r7 0f 7h3 5y573m 7h3y u53.",
      "l1nux 15 7h3 k3rn3l: 7h3 pr06r4m 1n 7h3 5y573m 7h47 4ll0c4735 7h3 m4ch1n3'5 r350urc35 70 7h3 07h3r",
      "pr06r4m5 7h47 y0u run. 7h3 k3rn3l 15 4n 3553n714l p4r7 0f 4n 0p3r471n6 5y573m, bu7 u53l355 by 1753lf;",
      "17 c4n 0nly func710n 1n 7h3 c0n73x7 0f 4 c0mpl373 0p3r471n6 5y573m. l1nux 15 n0rm4lly u53d 1n c0mb1n4710n",
      "w17h 7h3 6nu 0p3r471n6 5y573m: 7h3 wh0l3 5y573m 15 b451c4lly 6nu w17h l1nux 4dd3d, 0r 6nu/l1nux. 4ll 7h3",
      "50-c4ll3d 'l1nux' d157r1bu710n5 4r3 r34lly d157r1bu710n5 0f 6nu/l1nux.",
    ]
  );
  const { changeProg } = useContext(progContext);
  /*THIS CODE IS FOR RENDERING THE TTY*/
  const scrolldownRef = React.createRef();
  
  const scrollToBottom = () => {
    scrolldownRef.current?.scrollIntoView({ behavior: "smooth" })
  };
  useEffect(() => {
    focusDiv.current.focus(); 
   });
  useEffect(() => {
    scrollToBottom();
  })
  
  /*const Control = () => {
    if (!ctrlPressed) {
      updateCpressed(true);
    }
    else {
      updateCpressed(false);
    }
  }
  const C = () => {
    if (ctrlPressed) {
      updateCpressed(false);
      setCurrent_program("jsh");
    }
  }
  const Enter = () => {
    if(counter <= 15) {
      console.log(counter);
      setCounter(counter+1);
    }
  };*/
  const Q = () => {
    setCurrent_program("jsh");
  };
  /*useKeyPress({ key: "Enter", onKeyDown: Enter})
  useKeyPress({ key: "Ctrl", onKeyDown: Control})*/
  useKeyPress({ key: "q", onKeyDown: Q})
  
  const renderMeme = () => {
    let printdict = [];
    for (var i = 0; i<15;i++) {
      if(copyPasta[0][i] == "") {
        printdict.push("\n\n")
      } else {
        printdict.push(copyPasta[0][i])
      }
    }
    return(
      <>
      <div style={{"white-space": "pre"}}>
        {printdict.map((line) => (
          <p style={{colour: `lightblue`}}>{line}</p>
        ))}
      </div>
      </>
    );
  };
  const changeToJsh = () => changeProg("jsh");
  if (current_program === "tlqs") {
    return (
      <>
      <h1 style={{color: `green`, font: `Comic-Sans-Ms`}}>AND NOW: A MESSAGE FROM RICHARD MATTHEW STALLMAN</h1>
      <div ref={focusDiv} autoFocus>
        {renderMeme(counter)}
      </div>
      </>
    );
  } else {
    setCurrent_program("tlqs");
    changeToJsh();
    console.log("jsh lmao");
    console.log(progContext);
    return (
      <>
      <div ref={focusDiv} autoFocus>
        {renderMeme(counter)}
      </div>
      </>
    );
  };
};

const TerminalForm = (props) => {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [value, setValue]= useState('');
  const [current_program, setCurrent_program]= useState('jsh');
  const [currentid, setCurrentid]= useState(1); 
  const [history, setHistory] = useState([
    {
      id: 0,
      command: false, 
      style: {color: `white`},
      prompt: false,
      date: {},
      path: {},
      value: "Welcome To JSH, run \"help\" to find out more"
    }
  ]);
  const [path, setPath]= useState("/home"); 
  const [filesystem, setFilesystem] = useState([
    {id: "/home", x: false, folder: true,
      value:[
        {id: 0, value: "About Me"},
        {id: 0, value: "My Projects"},
      ]
    },
    {id: "/home/About Me", x: false, folder: true, value: []},
    {id: "/home/My Projects", x: false, folder: true, value: [
      {id: 0, value: "Unfinished testing program"},
      {id: 0, value: "meme"},
    ]},
    {id: "/home/My Projects/Unfinished testing program", x: true, folder: false, value: [
      {id: 0, value: "Unfinished testing program"}]
    },
    {id: "/home/My Projects/meme", x: true, folder: false, value: [
      {id: 0, value: "meme"}]
    },
    {id: "/home/About Me/I", x: false, folder: false, 
    value:[ {id: 0, value: "idk"}
    ]},
    {id: "/home/About Me/D", x: false, folder: false, 
    value:[ {id: 0, value: "idk"}
    ]},
    {id: "/home/About Me/K", x: false, folder: false, 
    value:[ {id: 0, value: "idk"}
    ]},
  ]);
  const [counter, setCounter] = useState(0);
  const { changeProg } = useContext(progContext);
  /*THIS CODE IS FOR RENDERING THE TTY*/
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const scrolldownRef = React.createRef();

  const scrollToBottom = () => {
    scrolldownRef.current?.scrollIntoView({ behavior: "smooth" })
  };
  useEffect(()=>{
    scrollToBottom();
  },[])
  useEffect(() => {
    scrollToBottom();
  })
  const onKeyDownHandler = event => {
    if (counter === 0 || currentid === 0) {return(null);}
    if (event.keyCode === 38) {
      let histout = history.find(histout => histout.id === currentid && histout.command === true).value;
      setValue(histout.slice(histout.indexOf("$", 1)+2, histout.length));
      setCurrentid(currentid-1);

    }
  };

  const handlettySubmit = (event) => {
    event.preventDefault();
    setCounter(counter+1);
    history.push({id: counter, command: true, style: {color: `purple`}, prompt: true, date: getTime(), path: path, value: value});
    forceUpdate();
    if (value.slice(0, 3) === "ls") {
      history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: ls(filesystem, path)});
    }
    else if (value === "pwd") {
      history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: path});

    }
    else if (value === "cls" || value === "clear") {
      setHistory([]);
    }
    else if (value === "whoami") {
      history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: "q3st1on"});
    }
    else if (value === "id") {
      history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: "uid=1000(q3st1on) gid=1000(q3st1on) groups=1000(q3st1on),5(tty)"});
    }
    else if (value.slice(0,3) === "cd ") {
      let val = (cd(value.slice(-(value.length-3)), filesystem, path));
      if (val.ret1 !== "error"){
        setPath(val.ret1);
      } else {
        history.push({id: counter, command: false, style: {color: `red`}, prompt: false, value: val.ret2});
      }
    }
    else if (value.slice(0,4) === "cat ") {
      let val = (cat(value.slice(4), filesystem, path));
      if (val.ret1 === "error"){
          history.push({id: counter, command: false, style: {color: `red`}, prompt: false, value: (val.ret2)});
      } else {
        history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: (val.ret1)});
      }
    }
    else if (value.slice(0,4) === "sudo") {
      history.push({id: counter, command: false, style: {color: `red`}, prompt: false, value: "As If I'd Trust You With That :)"});
    }
    else if ((value.slice(0,4) === "help") || (value.slice(0,1) === "?")) {
      if (((value.slice(0,4) === "help") && (value.length > 4))) {
          history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(getTime(), path, value.slice(5, value.length))});
      } else if (((value.slice(0,1) === "?") && (value.length > 1))) {
        history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(getTime(), path, value.slice(2, value.length))});
      } else {
        history.push({id: counter, command: false, style: {color: `lightblue`}, prompt: false, value: help(getTime(), path, "")});
      }
    } else if (value.slice(0,2) === "./") {
      let ret = exec(value.slice(2, value.length), filesystem, path);
        history.push({id: counter, command: false, style: ret.style, prompt: false, value: ret.value});
      if (ret.errorcheck !== 'a' && ret.errorcheck !== 'b') {
        console.log("changingprog");
        setCurrent_program(ret.value);
      }
    }else if (value === "") {

    }
    else {
        history.push({id: counter, command: false, style: {color: `red`}, prompt: false, value: "jsh: command not found: "+value});
    }
    console.log("current_program");console.log(current_program);
    setValue('');
    setCurrentid(counter);
    event.preventDefault();
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
  const changeToProg = (prog) => changeProg(prog);
  if (current_program === "jsh") {
    return (
      <>
      <form onSubmit={(event) => handlettySubmit(event)}>
        <div>
          {renderHistory(history)}
        </div>
        <label id = "inputbox">
          {getPrompt(getTime(), path)}
          <label>
            <AutosizeInput onKeyDown={(event) => onKeyDownHandler(event)}
            autoComplete="off" nname="inputLine" className="no-outline"
            type="text" value={value} onChange={(event) => handleChange(event)} />
          </label>
        </label>
      </form>
      </>
    );
  } else if (current_program === "meme"){
    setCurrent_program("jsh");
    changeToProg("meme");
    console.log("meme lmao");
    console.log(props);
    console.log(progContext);
    return(
      <>
      <form onSubmit={(event) => handlettySubmit(event)}>
        <div>
          {renderHistory(history)}
        </div>
        <label id = "inputbox">
          {getPrompt(getTime(), path)}
          <label>
            <AutosizeInput onKeyDown={(event) => onKeyDownHandler(event)}
            autoComplete="off" nname="inputLine" className="no-outline"
            type="text" value={value} onChange={(event) => handleChange(event)} />
          </label>
        </label>
      </form>
      </>
    );
  } else if (current_program === "tqls"){
    setCurrent_program("jsh");
    changeToProg("tqls");
    console.log("tqls lmao");
    console.log(props);
    console.log(progContext);
    return(
      <>
      <form onSubmit={(event) => handlettySubmit(event)}>
        <div>
          {renderHistory(history)}
        </div>
        <label id = "inputbox">
          {getPrompt(getTime(), path)}
          <label>
            <AutosizeInput autoFocus onKeyDown={(event) => onKeyDownHandler(event)}
            autoComplete="off" nname="inputLine" className="no-outline"
            type="text" value={value} onChange={(event) => handleChange(event)} />
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