import React, { useState } from 'react';

const Ministries = () => {
  const [board, setBoard] = useState(Array(7).fill(Array(6).fill(null))); // Represents the game board (7 columns, 6 rows)
  const [player, setPlayer] = useState('red'); // Current player ('red' or 'yellow')
  const [winner, setWinner] = useState(null); // Stores the winner ('red', 'yellow', or null)

  // Function to handle a player making a move
  const handleMove = (colIndex) => {
    if (!winner) {
      const newBoard = [...board];
      const column = newBoard[colIndex];

      // Find the lowest empty cell in the selected column
      const rowIndex = column.findIndex(cell => cell === null);
      
      if (rowIndex !== -1) {
        column[rowIndex] = player;
        setBoard(newBoard);
        checkWinner(newBoard);
        setPlayer(player === 'red' ? 'yellow' : 'red'); // Switch player
      }
    }
  };

  // Function to check if there's a winner after each move
  const checkWinner = (currentBoard) => {
    // Function to check if there are four cells in a row with the same color
    const checkLine = (a, b, c, d) => {
      return (a !== null && a === b && a === c && a === d);
    };

    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 3; r++) {
        if (checkLine(currentBoard[c][r], currentBoard[c][r + 1], currentBoard[c][r + 2], currentBoard[c][r + 3])) {
          setWinner(currentBoard[c][r]);
          return;
        }
      }
    }

    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 6; r++) {
        if (checkLine(currentBoard[c][r], currentBoard[c + 1][r], currentBoard[c + 2][r], currentBoard[c + 3][r])) {
          setWinner(currentBoard[c][r]);
          return;
        }
      }
    }

    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 3; r++) {
        if (checkLine(currentBoard[c][r], currentBoard[c + 1][r + 1], currentBoard[c + 2][r + 2], currentBoard[c + 3][r + 3])) {
          setWinner(currentBoard[c][r]);
          return;
        }
      }
    }

    for (let c = 0; c < 4; c++) {
      for (let r = 5; r > 2; r--) {
        if (checkLine(currentBoard[c][r], currentBoard[c + 1][r - 1], currentBoard[c + 2][r - 2], currentBoard[c + 3][r - 3])) {
          setWinner(currentBoard[c][r]);
          return;
        }
      }
    }

    // Check for a draw
    if (currentBoard.every(column => column.every(cell => cell !== null))) {
      setWinner('draw');
    }
  };

  // Function to reset the game
  const resetGame = () => {
    const newBoard = Array(7).fill(null).map(() => Array(6).fill(null));
    setBoard(newBoard);
    setPlayer('red');
    setWinner(null);
  };

  // Render the game board
  const renderBoard = () => {
    return board.map((column, colIndex) => (
      <div key={colIndex} className="column" onClick={() => handleMove(colIndex)}>
        {column.map((cell, rowIndex) => (
          <div key={rowIndex} className={`cell ${cell}`} />
        ))}
      </div>
    ));
  };

  return (
    <div className="connect-four">
      <h1>Connect Four</h1>
      <div className="board">{renderBoard()}</div>
      {winner && winner !== 'draw' && <h2>{`Player ${winner} wins!`}</h2>}
      {winner === 'draw' && <h2>It's a draw!</h2>}
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default Ministries;
