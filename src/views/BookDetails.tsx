import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, BookOpen, Star, Sparkles, Navigation } from 'lucide-react';
import { useStore } from '../lib/store';
import type { BookStatus } from '../lib/store';
import { cn } from '../lib/utils';

export function BookDetails() {
  const { books, selectedBookId, setSelectedBookId, changeBookStatus, updateBookProgress, removeBook } = useStore();
  const book = books.find(b => b.id === selectedBookId);
  
  const [pagesInput, setPagesInput] = useState<string>('');

  useEffect(() => {
    if (book) {
      setPagesInput(book.pagesRead.toString());
    }
  }, [book]);

  if (!book) return null;

  const handleUpdateProgress = () => {
    const pages = parseInt(pagesInput, 10);
    if (!isNaN(pages) && pages >= 0) {
      updateBookProgress(book.id, pages);
    }
  };

  const handleStatusChange = (status: BookStatus) => {
    changeBookStatus(book.id, status);
  };

  return (
    <AnimatePresence>
      <motion.div 
        key="book-details"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-background overflow-y-auto flex flex-col"
      >
        {/* Cover Section */}
        <div className={cn("relative pt-12 pb-8 px-6 flex flex-col items-center justify-center shrink-0", book.coverColor)}>
          <button 
            onClick={() => setSelectedBookId(null)}
            className="absolute top-12 left-4 w-10 h-10 bg-black/20 text-white rounded-full flex items-center justify-center backdrop-blur-md"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="w-40 h-60 rounded-lg shadow-2xl overflow-hidden mt-8 mb-4 border border-white/10 relative">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
                <div className="absolute inset-x-0 bottom-4 z-10 p-2 text-center text-white">
                  <h2 className="font-serif font-bold text-lg leading-tight">{book.title}</h2>
                </div>
              </>
            )}
          </div>
          
          {book.status === 'discover' && book.matchPercentage && (
            <div className="absolute top-12 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
              <Sparkles size={14} className="text-yellow-300" />
              {book.matchPercentage}% Match
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-white -mt-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative z-10 px-6 pt-8 pb-32 flex flex-col gap-6">
          
          {/* Header Info */}
          <div className="text-center">
            <h1 className="text-2xl font-serif font-bold text-slate-900 leading-tight">{book.title}</h1>
            <p className="text-slate-500 font-medium mt-1">{book.author}</p>
            <div className="flex items-center justify-center gap-4 mt-3 text-sm text-slate-400">
               <span>{book.pages} páginas</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded-md font-semibold">
                 {book.tags[0]}
               </span>
            </div>
          </div>

          {/* Reason For You / Deep Summary */}
          {book.reasonForYou && (
            <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-xl">
              <div className="flex items-center gap-2 text-secondary font-semibold font-serif mb-2">
                <Sparkles size={16} /> 
                <h3>Por que escolhi para você</h3>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic">"{book.reasonForYou}"</p>
            </div>
          )}

          {/* Actions Based on Status */}
          <div className="border border-slate-100 rounded-2xl p-5 shadow-sm bg-slate-50 flex flex-col gap-4">
            
            {book.status === 'discover' && (
              <div className="flex flex-col gap-3">
                <h3 className="font-serif font-semibold text-slate-800">Interesse despertado?</h3>
                <button 
                  onClick={() => handleStatusChange('reading')}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-md active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                  <BookOpen size={18} /> Começar a Ler
                </button>
                <button 
                  onClick={() => handleStatusChange('wantToRead')}
                  className="w-full bg-white text-primary border-2 border-primary/20 py-3.5 rounded-xl font-semibold active:scale-95 transition-all"
                >
                  Adicionar à "Quero Ler"
                </button>
              </div>
            )}

            {book.status === 'wantToRead' && (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleStatusChange('reading')}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold shadow-md active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                  <BookOpen size={18} /> Iniciar Leitura Agora
                </button>
              </div>
            )}

            {(book.status === 'reading' || book.status === 'read') && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-serif font-semibold text-slate-800">Seu Progresso</h3>
                  <span className="text-primary font-bold">{Math.round((book.pagesRead / book.pages) * 100)}%</span>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.round((book.pagesRead / book.pages) * 100)}%` }}
                  />
                </div>

                {book.status === 'reading' && (
                  <div className="flex gap-2 items-center mt-2">
                    <span className="text-sm text-slate-500 font-medium">Pág. atual:</span>
                    <input 
                      type="number" 
                      value={pagesInput}
                      onChange={(e) => setPagesInput(e.target.value)}
                      className="w-20 bg-white border border-slate-300 rounded-lg text-center py-2 font-bold focus:ring-2 focus:ring-primary outline-none"
                    />
                    <span className="text-sm text-slate-400">/ {book.pages}</span>
                    <button 
                      onClick={handleUpdateProgress}
                      className="ml-auto bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-700"
                    >
                      Salvar
                    </button>
                  </div>
                )}
                
                {book.status === 'read' && (
                  <div className="bg-green-100 text-green-800 p-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                    <Star size={16} className="fill-green-600 text-green-600" /> Leitura Concluída!
                  </div>
                )}
              </div>
            )}

            {book.status !== 'discover' && (
              <button 
                onClick={() => removeBook(book.id)}
                className="mt-2 text-red-500/80 text-xs font-semibold hover:text-red-600 text-center"
              >
                Remover da Estante
              </button>
            )}
          </div>

          {/* Notes Section (Read/Reading) */}
          {(book.status === 'reading' || book.status === 'read') && book.notes.length > 0 && (
            <div className="mt-4">
               <h3 className="font-serif font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                 <Navigation size={18} className="text-primary" /> Seus Insights
               </h3>
               <div className="flex flex-col gap-3">
                 {book.notes.map((note, idx) => (
                   <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-700 text-sm italic relative">
                     <span className="absolute -left-2 -top-2 text-3xl text-secondary/30 font-serif">"</span>
                     {note}
                   </div>
                 ))}
               </div>
            </div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
