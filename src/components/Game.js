import React, { useState, useCallback } from 'react';
import Board from './Board';
import { findBestMove } from '../utils/minimax';
import { checkWinCondition } from '../utils/checkWinCondition';
import './Game.css';

const Game = () => {
  const [grid, setGrid] = useState(() => Array(4).fill().map(() => Array(4).fill().map(() => Array(4).fill(null))));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleClick = useCallback((level, row, col) => {
    if (grid[level][row][col] !== null || winner !== null || isThinking) return;

    setGrid(prevGrid => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      newGrid[level][row][col] = isPlayerTurn ? 'X' : 'O';
      return newGrid;
    });

    setIsPlayerTurn(prev => !prev);
  }, [grid, isPlayerTurn, winner, isThinking]);

  const checkAndSetWinner = useCallback((currentGrid) => {
    const result = checkWinCondition(currentGrid);
    if (result) setWinner(result);
    return result;
  }, []);

  const computerMove = useCallback(() => {
    setIsThinking(true);
    setTimeout(() => {
      setGrid(prevGrid => {
        const newGrid = JSON.parse(JSON.stringify(prevGrid));
        const bestMove = findBestMove(newGrid);
        newGrid[bestMove.lvl][bestMove.row][bestMove.col] = 'O';
        checkAndSetWinner(newGrid);
        return newGrid;
      });
      setIsThinking(false);
      setIsPlayerTurn(true);
    }, 500);
  }, [checkAndSetWinner]);

  React.useEffect(() => {
    if (!isPlayerTurn && !winner) {
      computerMove();
    }
  }, [isPlayerTurn, winner, computerMove]);

  React.useEffect(() => {
    checkAndSetWinner(grid);
  }, [grid, checkAndSetWinner]);

  const resetGame = useCallback(() => {
    setGrid(Array(4).fill().map(() => Array(4).fill().map(() => Array(4).fill(null))));
    setIsPlayerTurn(true);
    setWinner(null);
    setIsThinking(false);
  }, []);

  return (
    <div className="game-container">
      <div className="game-info">
        <h1 className="game-title">Qubic Game</h1>
        <div className="game-controls">
          <button onClick={resetGame} disabled={isThinking}>New Game</button>
          <button onClick={() => {resetGame(); setIsPlayerTurn(true);}} disabled={isThinking}>Player First</button>
          <button onClick={() => {resetGame(); setIsPlayerTurn(false);}} disabled={isThinking}>Computer First</button>
        </div>
        {winner && <h2 className="game-winner">{winner === 'Draw' ? "It's a Draw!" : `${winner} wins!`}</h2>}
        {!winner && <h2 className="game-status">{isThinking ? "Computer is thinking..." : (isPlayerTurn ? "Player's Turn" : "Computer's Turn")}</h2>}
      </div>
      <Board grid={grid} handleClick={handleClick} isDisabled={!isPlayerTurn || winner !== null || isThinking} />
    </div>
  );
};

export default Game;