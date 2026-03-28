import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Flame, Library, Star } from 'lucide-react';
import { useStore } from '../lib/store';


type Tab = 'reading' | 'read' | 'wantToRead';

export function Bookshelf() {
  const { books, stats, setSelectedBookId } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('reading');

  const filteredBooks = books.filter(b => b.status === activeTab);

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="bg-white px-6 pt-16 pb-6 rounded-b-[2rem] shadow-sm flex flex-col gap-6 relative z-10 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Minha Estante</h1>
          <p className="text-slate-500 text-sm mt-1 flex gap-4">
            <span><Flame size={14} className="inline text-orange-500 mb-0.5" /> {stats.streak} dias de fogo</span>
            <span><BookOpen size={14} className="inline text-blue-500 mb-0.5" /> {stats.booksReadThisYear} lidos esse ano</span>
          </p>
        </div>

        {/* Top Tabs */}
        <div className="flex gap-2">
          {[
            { id: 'reading', label: 'Lendo' },
            { id: 'read', label: 'Lidos' },
            { id: 'wantToRead', label: 'Quero Ler' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 flex flex-col gap-4">
        {filteredBooks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center mt-10">
            <Library size={48} className="mb-4 opacity-50" />
            <h3 className="text-lg font-serif">Sua estante está vazia</h3>
            <p className="text-sm mt-2">Vá para 'Descobrir' para encontrar sua próxima grande aventura.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedBookId(book.id)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Capa */}
                <div className={`w-20 h-32 rounded flex flex-col items-center justify-center text-white shrink-0 shadow-inner relative overflow-hidden ${book.coverColor}`}>
                   {book.coverUrl ? (
                     <img src={book.coverUrl} alt={`Capa ${book.title}`} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                   ) : (
                     <>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                       <span className="font-serif text-xs text-center z-10 font-bold px-1">{book.title}</span>
                     </>
                   )}
                </div>

                {/* Detalhes */}
                <div className="flex flex-col flex-1 py-1">
                  <h4 className="font-serif font-bold text-slate-800 text-lg leading-tight truncate">
                    {book.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">{book.author}</p>
                  
                  {activeTab === 'reading' && (
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs font-semibold text-primary mb-1">
                        <span>{Math.round((book.pagesRead / book.pages) * 100)}% lido</span>
                        <span>{book.pagesRead} de {book.pages}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${(book.pagesRead / book.pages) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'read' && (
                    <div className="mt-auto flex flex-col gap-2 relative">
                      {book.rating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} fill={i < (book.rating || 0) ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      )}
                      {book.notes && book.notes.length > 0 && (
                        <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 italic line-clamp-2">
                          "{book.notes[0]}"
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'wantToRead' && (
                    <div className="mt-auto flex items-center gap-2">
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{book.pages} páginas</span>
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">{book.tags[0]}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
