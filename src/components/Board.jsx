import React from 'react';

const Square = ({ value, onClick }) => {
  const squareStyle = value
    ? value === 'X'
      ? 'text-red-500'
      : 'text-green-500'
    : 'text-black';
  
  const squareDisabled = value ? 'cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={`h-24 w-24 border border-gray-300 text-5xl font-bold ${squareStyle} ${squareDisabled} flex items-center justify-center`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
};

export const Board = ({ squares, onClick }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};