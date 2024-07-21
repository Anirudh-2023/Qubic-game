export const checkWinCondition = (grid) => {
    const lines = [
      // Horizontal lines
      ...grid.flatMap((level, z) => level.map((row, y) => row.map((_, x) => ({x, y, z})))),
      // Vertical lines
      ...grid.flatMap((level, z) => level[0].map((_, x) => level.map((__, y) => ({x, y, z})))),
      ...grid[0].flatMap((row, y) => row.map((_, x) => grid.map((__, z) => ({x, y, z})))),
      // Diagonal lines
      [0, 1, 2, 3].map(i => ({x: i, y: i, z: i})),
      [0, 1, 2, 3].map(i => ({x: i, y: i, z: 3-i})),
      [0, 1, 2, 3].map(i => ({x: i, y: 3-i, z: i})),
      [0, 1, 2, 3].map(i => ({x: 3-i, y: i, z: i})),
    ];
  
    for (let line of lines) {
      const values = line.map(({x, y, z}) => grid[z][y][x]);
      if (values.every(v => v === 'X')) return 'X';
      if (values.every(v => v === 'O')) return 'O';
    }
  
    if (grid.every(level => level.every(row => row.every(cell => cell !== null)))) {
      return 'Draw';
    }
  
    return null;
  };