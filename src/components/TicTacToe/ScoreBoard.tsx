
import { motion } from "framer-motion";

interface ScoreBoardProps {
  scores: { X: number; O: number };
  xIsNext: boolean;
  winner: string | null;
  playerNames: { X: string; O: string };
}

const ScoreBoard = ({ scores, xIsNext, winner, playerNames }: ScoreBoardProps) => {
  return (
    <div className="mb-8 text-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4 text-white"
      >
        {winner 
          ? `Winner: ${playerNames[winner as keyof typeof playerNames]}` 
          : `Next Player: ${playerNames[xIsNext ? 'X' : 'O']}`}
      </motion.div>
      
      <div className="flex justify-center gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 rounded-lg bg-zinc-900/80 backdrop-blur-sm"
        >
          <div className="text-zinc-400">{playerNames.X}</div>
          <div className="text-2xl font-bold text-white">{scores.X}</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 rounded-lg bg-zinc-800/80 backdrop-blur-sm"
        >
          <div className="text-zinc-400">{playerNames.O}</div>
          <div className="text-2xl font-bold text-zinc-300">{scores.O}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScoreBoard;
