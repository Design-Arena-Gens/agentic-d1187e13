'use client';

import { useState } from 'react';

type SquareValue = 'X' | 'O' | null;
type Board = SquareValue[];

function calculateWinner(squares: Board): { winner: SquareValue; line: number[] | null } {
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

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
}

function Square({
  value,
  onClick,
  isWinner
}: {
  value: SquareValue;
  onClick: () => void;
  isWinner: boolean;
}) {
  return (
    <button
      className={`square ${value?.toLowerCase() || ''} ${isWinner ? 'winner' : ''}`}
      onClick={onClick}
      disabled={value !== null}
    >
      {value}
    </button>
  );
}

export default function Game() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = calculateWinner(board);
  const isBoardFull = board.every(square => square !== null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-status">{status}</div>
      <div className="board">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinner={line?.includes(index) || false}
          />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}
