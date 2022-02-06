import React from 'react';

export const Button = ({ color }) => (
  <button
    className={`rounded-lg py-2 px-2.5 text-black ${
      color === 'blue'
        ? 'bg-blue-100'
        : color === 'green'
        ? 'bg-green-100'
        : 'bg-red-200'
    }`}
  >
    Click me
  </button>
);

export default Button;
