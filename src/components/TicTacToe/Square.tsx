
import { memo } from "react";
import { motion } from "framer-motion";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinning?: boolean;
}

const Square = ({ value, onClick, isWinning }: SquareProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-20 h-20 bg-zinc-800/80 backdrop-blur-sm rounded-xl border-2 
                 ${isWinning ? 'border-white' : 'border-zinc-700'} 
                 flex items-center justify-center text-4xl font-bold
                 transition-colors duration-300 hover:bg-zinc-700/80`}
      onClick={onClick}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={value === 'X' ? 'text-white' : 'text-zinc-400'}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default memo(Square);
