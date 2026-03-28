import { useState } from 'react';
import { Sparkles, Filter, Search, Loader2 } from 'lucide-react';
import { useStore } from '../lib/store';
import { BookCard } from '../components/BookCard';
import { booksDB } from '../data/mockDB';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['Fantasia', 'Autoajuda', 'Curtos (<200p)', 'Esperançoso', 'Clássicos', 'Ficção'];

export function Discover() {
  const { books, addBook } = useStore();
  const discoverBooks = books.filter(b => b.status === 'discover');
  
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const colors = ['bg-indigo-900', 'bg-rose-800', 'bg-emerald-800', 'bg-cyan-800', 'bg-amber-700', 'bg-purple-900', 'bg-slate-800'];

  const handleSearch = () => {
    if (!query.trim() && !activeFilter) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      // Find 2 books that aren't already in the store
      const available = booksDB.filter(b => !books.some(storeBook => storeBook.id === b.id));
      
      let filtered = available;
      if (activeFilter) {
        filtered = filtered.filter(b => b.tags_emocionais.includes(activeFilter));
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        filtered = filtered.filter(b => 
          b.title.toLowerCase().includes(q) || 
          b.author.toLowerCase().includes(q) || 
          b.tags_emocionais.some(t => t.toLowerCase().includes(q)) ||
          b.resumos.quick.toLowerCase().includes(q)
        );
      }
      
      // If nothing matches, fallback to random from available to avoid empty state ruining the "sommelier" experience
      if (filtered.length === 0) {
        filtered = available;
      }
      
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 2);
      
      selected.forEach(sb => {
        addBook({
          id: sb.id,
          title: sb.title,
          author: sb.author,
          coverColor: colors[Math.floor(Math.random() * colors.length)],
          coverUrl: `https://covers.openlibrary.org/b/isbn/${sb.isbn}-L.jpg`,
          progress: 0,
          status: 'discover',
          notes: [],
          tags: sb.tags_emocionais,
          pages: Math.floor(Math.random() * 400) + 150,
          pagesRead: 0,
          reasonForYou: sb.resumos.medium,
          matchPercentage: Math.floor(Math.random() * 10) + 90, // 90-99%
        });
      });
      
      setIsSearching(false);
      setQuery('');
    }, 1500);
  };


  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Top Header & Search Area */}
      <div className="bg-primary px-6 pt-16 pb-12 rounded-b-[2.5rem] shadow-md relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full blur-xl -translate-x-1/4 translate-y-1/2" />

        <div className="relative z-10 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Descoberta</h1>
            <p className="text-blue-100 text-sm">Qual momento da vida você está vivendo?</p>
          </div>

          {/* Conversational Search */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Sparkles size={20} className="text-primary" />
            </div>
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ex: Quero algo esperançoso após um término..."
              className="w-full bg-white text-slate-900 rounded-2xl py-4 pl-12 pr-12 shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 placeholder:text-slate-400 font-medium"
            />
            <button 
              onClick={handleSearch}
              className="absolute inset-y-2 right-2 px-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors flex items-center justify-center"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Filters (Pills) */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar snap-x">
            <button className="shrink-0 snap-start bg-white/20 p-2 rounded-full text-white backdrop-blur-sm border border-white/10">
              <Filter size={16} />
            </button>
            {FILTERS.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm border ${
                  activeFilter === filter 
                    ? 'bg-white text-primary border-white' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Results */}
      <div className="flex-1 overflow-y-auto p-6 pb-24 relative">
        <h2 className="text-xl font-serif font-bold text-slate-800 mb-6 flex items-center gap-2">
          Seleção do Sommelier
        </h2>
        
        {isSearching ? (
          <div className="absolute inset-0 z-20 bg-slate-50/80 backdrop-blur-sm flex flex-col items-center pt-20">
             <Loader2 size={32} className="text-primary animate-spin mb-4" />
             <p className="font-serif font-semibold text-slate-600 animate-pulse">Lendo as entrelinhas da sua alma...</p>
             <p className="text-sm text-slate-500 mt-2">Buscando na biblioteca cósmica</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <AnimatePresence>
              {discoverBooks.map(book => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  layout
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Quer mais opções?</p>
          <button className="text-secondary font-semibold hover:underline mt-1">
            Refinar sua busca
          </button>
        </div>
      </div>
    </div>
  );
}
