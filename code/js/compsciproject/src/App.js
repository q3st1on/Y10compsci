import React, { useState } from 'react';
import authContext from "./components/authcontext.js";
import Login from './components/Login.js';
import './App.css';

const App= () => {
  const [authenticated, setAuthenticated] = useState(false);
    return(
      <div className="App">
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        <div> user is {`${authenticated ? "" : "not"} authenticated`} </div>
        <Login />
      </authContext.Provider>
      </div>
    )
}

export default App;