import React from 'react';

export const Square = ({ value, onClick }) => {
  return (
    <button
      className={`w-24 h-24 bg-gray-200 border border-gray-400 text-3xl font-bold ${
        value === 'X' ? 'text-red-500' : 'text-green-500'
      } disabled:bg-gray-300 transition-colors duration-300`}
      onClick={onClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
};