import React from "react";
import Board from "./components/board";
import "./App.css";
import "./styles/main.css";
function App() {
  return (
    <div className="mycontainer">
      <h2 className="text-center font py-5 uppercase text-4xl font-extrabold tracking-wider">
        Tic tac toe
      </h2>
      <Board />
    </div>
  );
}

export default App;
