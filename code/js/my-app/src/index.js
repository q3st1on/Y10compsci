import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TerminalForm } from './programs/Terminal';
import { TlqsForm } from './programs/tlqs';

export const progs = {
  jsh: 'jsh',
  tlqs: 'tlqs'
};

export const currentProgContext = React.createContext({
  program: progs.jsh,
  toggleProg: () => {},
});


class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.toggleProg = () => {
      this.setState(state => ({
        prog:
          state.prog === progs.jsh
            ?progs.jsh
            :progs.tlqs,
      }));
    };
    this.state = {
      prog: progs.jsh,
      toggleprog: this.toggleProg,
    };
  }
  renderCheck(cprog)  {
    if (cprog === 'jsh') {
      let ret = <TerminalForm />
      return(ret);
    } else if (cprog === 'tlqs') {
      let ret = <TlqsForm />;
      return(ret);
    } else {
      return(<TerminalForm />);
    }
  }

  render () {
    console.log(this.state.prog);
    return(
      <currentProgContext.Provider value={this.state}>
        {this.renderCheck(this.state.prog)}
      </currentProgContext.Provider>
    )
  }
}


ReactDOM.render(
  <React.StrictMode>
    <MasterForm />
  </React.StrictMode>,
  document.getElementById('root')
);