import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TerminalForm } from './programs/Terminal';
import { TlqsForm } from './programs/tlqs';
import currentProgContext from './progContext.js';

export const progs = {
  jsh: 'jsh',
  tlqs: 'tlqs'
};

function MasterForm() {
  const [prog, setProg] = React.useState('jsh');

  const toggleProg = () => {
    setProg((prog) => {
      return prog === 'jsh' ? 'tqls' : 'jsh'
    });
  };

  const value = React.useMemo(() => ({
    prog,
    toggleProg
  }), [prog]);
  
  try{
  if (prog === 'jsh') {
    let ret = <currentProgContext.Provider value={value}><TerminalForm /></currentProgContext.Provider>;
    return(ret);
  } else if (prog === 'tlqs') {
    let ret = <currentProgContext.Provider value={value}><TlqsForm /></currentProgContext.Provider>;
    return(ret);
  } else {
    return(<currentProgContext.Provider value={value}><TerminalForm /></currentProgContext.Provider>);
  }} catch(e) {
    console.log("Error: "+e);
    let ret = <currentProgContext.Provider value={value}><TlqsForm /></currentProgContext.Provider>;
    return(ret);
  }
}


ReactDOM.render(
  <React.StrictMode>
    <MasterForm />
  </React.StrictMode>,
  document.getElementById('root')
);