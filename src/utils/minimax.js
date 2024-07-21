import { checkWinCondition } from './checkWinCondition';

const MAX_DEPTH = 3;

const evaluate = (result) => {
  if (result === 'O') return 10;
  if (result === 'X') return -10;
  return 0;
};

export const minimax = (grid, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
  const result = checkWinCondition(grid);
  if (result !== null || depth === MAX_DEPTH) return evaluate(result);

  if (isMaximizing) {
    let best = -Infinity;
    for (let lvl = 0; lvl < 4; lvl++) {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (grid[lvl][row][col] === null) {
            grid[lvl][row][col] = 'O';
            best = Math.max(best, minimax(grid, depth + 1, false, alpha, beta));
            grid[lvl][row][col] = null;
            alpha = Math.max(alpha, best);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let lvl = 0; lvl < 4; lvl++) {
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          if (grid[lvl][row][col] === null) {
            grid[lvl][row][col] = 'X';
            best = Math.min(best, minimax(grid, depth + 1, true, alpha, beta));
            grid[lvl][row][col] = null;
            beta = Math.min(beta, best);
            if (beta <= alpha) break;
          }
        }
      }
    }
    return best;
  }
};

export const findBestMove = (grid) => {
  let bestVal = -Infinity;
  let bestMove = null;

  for (let lvl = 0; lvl < 4; lvl++) {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (grid[lvl][row][col] === null) {
          grid[lvl][row][col] = 'O';
          let moveVal = minimax(grid, 0, false);
          grid[lvl][row][col] = null;

          if (moveVal > bestVal) {
            bestMove = { lvl, row, col };
            bestVal = moveVal;
          }
        }
      }
    }
  }
  return bestMove;
};