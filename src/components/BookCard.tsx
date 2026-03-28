import type { Book } from '../lib/store';
import { useStore } from '../lib/store';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
  onClick?: () => void;
  className?: string;
  featured?: boolean;
}

export function BookCard({ book, onClick, className, featured = false }: BookCardProps) {
  const { setSelectedBookId } = useStore();
  
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick || (() => setSelectedBookId(book.id))}
      className={cn(
        "flex flex-col gap-3 p-4 rounded-xl cursor-pointer bg-white border border-slate-100 shadow-sm",
        "transition-all duration-300",
        className
      )}
    >
      <div className={cn(
        "relative rounded-lg shadow-inner overflow-hidden flex items-center justify-center text-white",
        book.coverColor,
        !book.coverUrl && "p-4",
        featured ? "aspect-[3/4]" : "aspect-[2/3]"
      )}>
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={`Capa do livro ${book.title}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <h3 className="font-serif z-10 text-center leading-snug break-words">
              {book.title}
            </h3>
          </>
        )}
        
        {book.matchPercentage && (
          <div className="absolute top-2 right-2 bg-white/90 text-primary px-2 py-1 rounded-full text-xs font-semibold shadow-sm z-10 backdrop-blur-sm">
            {book.matchPercentage}% Match
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-serif font-semibold text-slate-900 leading-tight">
          {book.title}
        </h4>
        <p className="text-xs text-slate-500">{book.author}</p>
        
        {book.reasonForYou && (
          <p className="text-xs text-slate-600 mt-2 italic border-l-2 border-primary/30 pl-2">
            "{book.reasonForYou}"
          </p>
        )}
      </div>
    </motion.div>
  );
}
