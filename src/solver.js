export const solveSudoku = (grid) => {
    // Function to check if placing num in grid[row][col] is safe
    const isSafe = (grid, row, col, num) => {
        // Check if num is in the same row or column
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num || grid[x][col] === num) {
                return false;
            }
        }

        // Check the 3x3 box
        const boxRowStart = 3 * Math.floor(row / 3);
        const boxColStart = 3 * Math.floor(col / 3);
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (grid[boxRowStart + r][boxColStart + c] === num) {
                    return false;
                }
            }
        }
        return true;
    };

    // Function to validate the initial grid
    const isValidGrid = (grid) => {
        for (let row = 0; row < 9; row++) {
            const rowSet = new Set();
            const colSet = new Set();
            const boxSet = new Set();

            for (let col = 0; col < 9; col++) {
                const numRow = grid[row][col];
                const numCol = grid[col][row];
                const boxRow = 3 * Math.floor(row / 3) + Math.floor(col / 3);
                const boxCol = 3 * (row % 3) + (col % 3);
                const numBox = grid[boxRow][boxCol];

                // Check row
                if (numRow !== 0) {
                    if (rowSet.has(numRow)) return false; // Duplicate in row
                    rowSet.add(numRow);
                }

                // Check column
                if (numCol !== 0) {
                    if (colSet.has(numCol)) return false; // Duplicate in column
                    colSet.add(numCol);
                }

                // Check 3x3 box
                if (numBox !== 0) {
                    if (boxSet.has(numBox)) return false; // Duplicate in box
                    boxSet.add(numBox);
                }
            }
        }
        return true; // If no duplicates are found, the grid is valid
    };

    // Backtracking function to solve the puzzle
    const solve = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) { // Find an empty cell
                    for (let num = 1; num <= 9; num++) { // Try numbers 1-9
                        if (isSafe(grid, row, col, num)) {
                            grid[row][col] = num; // Place the number

                            if (solve()) {
                                return true; // If solved, return true
                            }

                            grid[row][col] = 0; // Backtrack
                        }
                    }
                    return false; // No number can be placed, return false
                }
            }
        }
        return true; // All cells are filled
    };

    // Check if the initial grid is valid before solving
    if (!isValidGrid(grid)) {
        return null; // Return null if the initial grid is invalid
    }

    // Start solving the Sudoku puzzle
    if (solve()) {
        return grid; // Return the solved grid
    } else {
        return null; // Return null if no solution
    }
};
