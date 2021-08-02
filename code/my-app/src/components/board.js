import React, { useState } from "react";
import Square from "./square";
import CalculateWinner from "../utils/calculateWinner";

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xturn, setXTurn] = useState(true);
  const [history, setHistory] = useState([]);

  const onSquareClick = (idx) => {
    if (squares[idx] == null) {
      if (xturn) {
        setHistory([...history, {square}])
        let squares = [...square];
        squares[idx] = "X";
        setSquare(squares);
        setXTurn(!xturn);
      } else {
        setHistory([...history, {square}])
        let squares = [...square];
        squares[idx] = "O";
        setSquare(squares);
        setXTurn(!xturn);
      }
    }
  };

  const winner = CalculateWinner(square);

  const renderBoard = () => {
    const color = winner === 'X' ? 'text-green-500' : 'text-red-500'; 
    const nextPlayerColor = xturn ? 'text-green-500' : 'text-red-500';
    if (winner) {
      return (
        <div>
          <span className="block text-center font-extrabold text-3xl tracking-wider">Winner is: 
            <span className={`${color}`}> {winner} </span>
          </span>
          <div className="grid grid-cols-3 mx-auto w-64 border-black border-solid border-2">
            {square.map((item, idx) => {
              return (
                <Square
                  key={idx}
                  value={item}
                  index={idx}
                  handleClick={onSquareClick}
                />
              );
            })}
          </div>
        </div>
      );
    }
    // 9 moves done, its a draw
    else if(!winner && history.length === 9) {
        return <div>
          <span className="block text-center font-extrabold text-3xl tracking-wider"> It's a draw! </span>
          <div className="grid grid-cols-3 mx-auto w-64 border-black border-solid border-2">
            {square.map((item, idx) => {
              return (
                <Square
                  key={idx}
                  value={item}
                  index={idx}
                  handleClick={onSquareClick}
                />
              );
            })}
          </div>
        </div>
    } 
    else {
      return (
        <div>
          <span className="block text-center p-3 text-xl font-extrabold tracking-wider">
            Next player is: <div className={`animate-bounce text-black font-extrabold ${nextPlayerColor}`}> {xturn ? "X" : "O"} </div>
          </span>
          <div className="grid grid-cols-3 mx-auto w-64 border-black border-solid border-2">
            {square.map((item, idx) => {
              return (
                <Square
                  key={idx}
                  value={item}
                  index={idx}
                  handleClick={onSquareClick}
                />
              );
            })}
          </div>
        </div>
      );
    }
  };

  const moveToHistory = (idx) => {
    console.log(idx)
    setSquare([...history[idx].square]);
    let newHistory = [...history].slice(0, idx);
    // Change xTurn
    newHistory.length % 2 === 0 ? setXTurn(true) : setXTurn(false);
    setHistory(newHistory);
  }

  const renderHistoryButtons = () => {
    return history.map((item, idx) => {
        return (<div className="flex flex-col justify-center items-center m-2" key={idx}>
            <button className="transition duration-500 ease-in-out
            transform hover:scale-110 hover:-translate-y-1 text-white bg-blue-500 hover:bg-blue-700 p-1 m-2" onClick={() => {
                moveToHistory(idx)
            }}>
            {idx === 0 && 'Restart Game'}
            { idx !==0 && `Jump to move - ${idx}`}
            </button>
        </div>)
    })
  }
  return <div>
      {
          renderBoard()
      }
      {
        renderHistoryButtons()
       }
      </div>;
}
