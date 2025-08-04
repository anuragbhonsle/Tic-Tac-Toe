import { useState, useCallback, useEffect } from "react";
import Square from "./Square";
import ScoreBoard from "./ScoreBoard";
import PlayerSettings from "./PlayerSettings";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const Board = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [playerNames, setPlayerNames] = useState(() => {
    const savedNames = localStorage.getItem("playerNames");
    return savedNames ? JSON.parse(savedNames) : { X: "Player X", O: "Player O" };
  });

  useEffect(() => {
    localStorage.setItem("playerNames", JSON.stringify(playerNames));
  }, [playerNames]);

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const handleClick = useCallback((i: number) => {
    const result = calculateWinner(squares);
    if (result || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const newResult = calculateWinner(newSquares);
    if (newResult) {
      setWinningLine(newResult.line);
      setScores(prev => ({
        ...prev,
        [newResult.winner as keyof typeof prev]: prev[newResult.winner as keyof typeof prev] + 1
      }));
    }
  }, [squares, xIsNext]);

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine([]);
  };

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;

  if (result && winningLine.length === 0) {
    setWinningLine(result.line);
  }

  const { theme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
      } relative`}
    >
      <PlayerSettings 
        playerNames={playerNames}
        onSaveNames={setPlayerNames}
      />
      
      <ScoreBoard 
        scores={scores} 
        xIsNext={xIsNext} 
        winner={winner}
        playerNames={playerNames}
      />
      
      <div className={`grid grid-cols-3 gap-3 p-4 rounded-xl ${
        theme === 'light' ? 'bg-gray-100' : 'bg-zinc-900/50'
      } backdrop-blur-lg`}>
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => handleClick(i)}
            isWinning={winningLine.includes(i)}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-8 px-6 py-2 rounded-lg ${
          theme === 'light' 
            ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' 
            : 'bg-white/10 text-white hover:bg-white/20'
        } transition-colors duration-300`}
        onClick={resetGame}
      >
        Reset Game
      </motion.button>
    </motion.div>
  );
};

export default Board;
