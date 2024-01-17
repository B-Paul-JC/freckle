import { useState } from "react";
import "./App.css";
import "./styles/board.css";
import "./styles/helper-elems.css";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [scores, setScores] = useState([]);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, lines] = calculateWinner(board);
  const xScore = calculateXwins(scores);
  const oScore = calculateOwins(scores);
  const ties = calculateTies(scores);

  function calculateXwins(scores) {
    return scores.filter((score) => score === "X").length;
  }

  function calculateOwins(scores) {
    return scores.filter((score) => score === "O").length;
  }

  function calculateTies(scores) {
    return scores.filter((score) => score === "T").length;
  }

  const handleClick = (index) => {
    if (board[index] || winner !== "T") return;
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
        return [squares[a], lines[i]];
      }
    }
    return ["T", []];
  }
  const hasAvailableMoves = board.filter((value) => value === "").length > 0;
  let gameState;

  if (winner && winner !== "T") {
    gameState = { text: `${winner} Wins!`, state: "over" };
  } else {
    if (hasAvailableMoves) {
      gameState = { text: `Game in progress`, state: "ongoing" };
    } else {
      gameState = { text: `Game drawn`, state: "over" };
    }
  }

  const gameOver = gameState.state === "over";

  const squares = board.map((value, index) => {
    return (
      <button
        key={index}
        onClick={() => handleClick(index)}
        className={`box-spaces ${lines.includes(index) ? "win" : ""}`}
        disabled={gameOver}
      >
        {value}
      </button>
    );
  });

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setScores((prev) => [...prev, winner]);
    setIsXNext(true);
  };

  return (
    <>
      <section id="info">
        <span>
          Next <br />
          {isXNext ? "X" : "O"}
        </span>
        <span>
          Games: <br />
          Scoreboard
          <br />
          X: {xScore}
          <br />
          O: {oScore}
          <br />
          Ties: {ties}
        </span>
      </section>
      <div id="board">{squares}</div>
      <section id="results">
        {gameState.text}
        <br />
        <br />
        {gameOver && (
          <button
            className="reset-game"
            onClick={() => {
              resetGame();
            }}
          >
            New Game
          </button>
        )}
      </section>
    </>
  );
};

export default App;
