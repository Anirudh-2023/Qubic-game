import React, { memo } from 'react';
import './Board.css';
import xIcon from '../assets/x-icon.png';
import oIcon from '../assets/o-icon.png';

const Cell = memo(({ value, onClick }) => (
  <div className="cell" onClick={onClick}>
    {value === 'X' && <img src={xIcon} alt="X" />}
    {value === 'O' && <img src={oIcon} alt="O" />}
  </div>
));

const Board = ({ grid, handleClick, isDisabled }) => {
  return (
    <div className="board-container">
      {grid.map((level, lvlIdx) => (
        <div key={lvlIdx} className="level">
          <h3>Level {lvlIdx + 1}</h3>
          {level.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cell, colIdx) => (
                <Cell
                  key={colIdx}
                  value={cell}
                  onClick={() => !isDisabled && handleClick(lvlIdx, rowIdx, colIdx)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(Board);