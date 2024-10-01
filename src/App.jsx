import { useState, useEffect } from 'react';
import './App.css';
import { solveSudoku } from './solver';
import { Toaster, toast } from 'react-hot-toast';
import { generateSudoku } from 'sudoku-puzzle'; // Import the sudoku-puzzle package

function App() {
  // Initialize a 9x9 grid with empty strings
  const array2D = [];
  for (let i = 0; i < 9; i++) {
    array2D[i] = new Array(9).fill('');
  }

  const [grid, setGrid] = useState(array2D);

  // Function to generate a new Sudoku grid
  const GenerateSudoku = () => {
    const puzzle = generateSudoku(9, 5); // Use the correct method to generate the puzzle
    // console.log(puzzle);

    const formattedPuzzle = puzzle.map(row => row.map(cell => (cell === 0 ? '' : cell))); // Format for display 
    setGrid(formattedPuzzle); // Update grid state
    toast.success('Sudoku puzzle generated successfully!'); // Notify user
  };

  // Handle change in a specific grid cell
  const handleChange = (row, col, value) => {
    const newGrid = [...grid];

    // Allow only empty values or numbers between 1 and 9
    if (value === '' || (/^[1-9]$/.test(value))) {
      newGrid[row][col] = value; // Set value as string or empty string
      setGrid(newGrid);
    }
  };

  // Function to clear the grid
  const clearGrid = () => {
    const temp = [];
    for (let i = 0; i < 9; i++) {
      temp[i] = new Array(9).fill('');
    }
    setGrid(temp);
    toast.success('Sudoku puzzle cleared successfully!');
  };

  const solveGrid = () => {
    let newGrid = [];
    for (let i = 0; i < 9; i++) {
      newGrid[i] = new Array(9).fill(0);
    }
    let cnt = 0;
    let numCnt = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === '') {
          newGrid[i][j] = 0;
          cnt++;
        } else {
          newGrid[i][j] = parseInt(grid[i][j], 10);  // Convert string to number
          numCnt++;
        }
      }
    }
    if (cnt === 81) {
      toast.error('Fill Sudoku puzzle to solve!');
      return;
    }

    if (numCnt < 17) {
      toast.error('At least 17 clues required to solve the puzzle!');
      return;
    }
    // console.log(newGrid);
    let solvedGrid = solveSudoku(newGrid);
    if (solvedGrid) {
      setGrid(solvedGrid);
      toast.success('Sudoku puzzle solved successfully.');
    } else {
      toast.error('Sudoku puzzle cannot be solved.');
    }
  };

  const showTips = () => {
    toast(
      "You can fill the puzzle by hovering on each cell.\n\n And also you can fill the puzzle automatically.",
      {
        duration: 6000,
      }
    );
  }

  return (
    <>
      <div>
        <h1 className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-gray-800 text-5xl font-bold text-center shadow-lg rounded-lg tracking-wide">
          Sudoku Solver by Arvind
        </h1>

      </div>

      <div className='sudoku-grid'>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className='sudoku-row'>
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type='text'
                className='sudoku-cell'
                maxLength='1'
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Buttons for Auto-fill and Solve */}
      <div className="flex space-x-4 justify-center mt-6">
        <button
          onClick={showTips}
          className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-3xl shadow-md hover:from-orange-500 hover:to-orange-600 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Tips!
        </button>
        <button
          onClick={clearGrid}
          className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-3xl shadow-md hover:from-red-500 hover:to-red-700 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Clear Grid
        </button>

        <button
          onClick={GenerateSudoku}
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-3xl shadow-md hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Fill Automatically
        </button>

        <button
          onClick={solveGrid}
          className="px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-3xl shadow-md hover:from-blue-500 hover:to-blue-700 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Solve Sudoku
        </button>
      </div>


      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
