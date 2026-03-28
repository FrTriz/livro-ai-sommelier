import type { Book } from '../lib/store';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface BookProgressCardProps {
  book: Book;
  onClick?: () => void;
  className?: string;
}

export function BookProgressCard({ book, onClick, className }: BookProgressCardProps) {
  const percentage = Math.round((book.pagesRead / book.pages) * 100);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex flex-row gap-4 p-4 rounded-2xl cursor-pointer bg-white border border-slate-100 shadow-md",
        "transition-all duration-300",
        className
      )}
    >
      {/* Mini Cover */}
      <div className={cn(
        "w-20 h-28 rounded-md shadow-inner flex flex-col items-center justify-center p-2 text-white shrink-0 relative overflow-hidden",
        book.coverColor
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="font-serif text-xs text-center z-10 font-medium leading-tight">{book.title}</span>
      </div>

      <div className="flex flex-col flex-1 justify-center py-1">
        <h4 className="font-serif font-bold text-slate-800 text-lg leading-tight truncate">
          {book.title}
        </h4>
        <p className="text-sm text-slate-500 mb-4">{book.author}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-primary h-2 rounded-full"
          />
        </div>
        
        <div className="flex justify-between items-center text-xs font-medium text-slate-500">
          <span>{percentage}% lido</span>
          <span>{book.pagesRead} / {book.pages} p.</span>
        </div>
      </div>
    </motion.div>
  );
}
