import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Board } from './Board';

const calculateWinner = (squares) => {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (squares) => {
  return squares.every((square) => square !== null);
};

Modal.setAppElement('#root');

export const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerX, setPlayerX] = useState('');
  const [playerO, setPlayerO] = useState('');
  const [markerX, setMarkerX] = useState('X');
  const [markerO, setMarkerO] = useState('O');
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState('');
  const winner = calculateWinner(board);
  const isFull = isBoardFull(board);

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? markerX : markerO;
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleStart = () => {
    if (!playerX || !playerO) {
      setError('Both player names are required');
      return;
    }
    if (markerX === markerO) {
      setError('Players must choose different markers');
      return;
    }
    setShowModal(false);
    setError('');
    handleReset();
  };

  const handleToggleMarkerX = () => {
    setMarkerX(markerX === 'X' ? 'O' : 'X');
    setMarkerO(markerX === 'X' ? 'X' : 'O');
  };

  const handleToggleMarkerO = () => {
    setMarkerO(markerO === 'X' ? 'O' : 'X');
    setMarkerX(markerO === 'X' ? 'X' : 'O');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Player Names"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Enter Player Names</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <input
              className="p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Player X"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
            />
            <button
              onClick={handleToggleMarkerX}
              className={`bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded ${markerX === 'X' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
            >
              {markerX}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              className="p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Player O"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
            />
            <button
              onClick={handleToggleMarkerO}
              className={`bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded ${markerO === 'X' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
            >
              {markerO}
            </button>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            onClick={handleStart}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Game
          </button>
        </div>
      </Modal>

      <h1 className="text-5xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className={`text-2xl mb-4 ${winner ? 'winner-announcement' : ''}`}>
        {winner ? `Winner: ${winner === markerX ? playerX : playerO}` : isFull ? 'Tie! Start again' : `Next Player: ${xIsNext ? playerX : playerO}`}
      </div>
      <Board squares={board} onClick={handleClick} />
      <div className="mt-4">
        <button
          onClick={handleReset}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};