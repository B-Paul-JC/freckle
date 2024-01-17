import { useState } from "react";
import { Board } from "./components/Board";
import { Box } from "./components/Box";
import "./App.css";
import { InfoScreen } from "./components/InfoScreen";
import { ResultAnnouncement } from "./components/ResultAnnouncement";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <>
      <InfoScreen />
      <Board>
        {board.map((value, index) => (
          <Box key={index} {...{ clicker: () => handleClick(index) }}>
            {value}
          </Box>
        ))}
      </Board>
      <ResultAnnouncement />
    </>
  );
};

export default App;
