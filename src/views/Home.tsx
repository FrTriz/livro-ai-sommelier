import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Flame, ArrowRight, MessageCircle } from 'lucide-react';
import { useStore } from '../lib/store';
import { BookProgressCard } from '../components/BookProgressCard';
import { BookCard } from '../components/BookCard';
import { SpacedRepetitionModal } from '../components/SpacedRepetitionModal';

export function Home() {
  const { books, stats } = useStore();
  const [showSpacedRep, setShowSpacedRep] = useState(false);

  const currentBook = books.find(b => b.status === 'reading');
  const suggestedBook = books.find(b => b.status === 'discover');

  return (
    <div className="flex flex-col gap-8 p-6 pb-24 h-full overflow-y-auto w-full">
      <AnimatePresence>
        {showSpacedRep && <SpacedRepetitionModal onClose={() => setShowSpacedRep(false)} />}
      </AnimatePresence>

      {/* Header & Streak */}
      <header className="flex justify-between items-end mt-4">
        <div>
          <p className="text-slate-500 font-medium">Boa tarde,</p>
          <h1 className="text-3xl font-bold font-serif text-slate-800">Leitor</h1>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full border border-orange-100 shadow-sm">
          <Flame size={18} fill="currentColor" className="text-orange-500" />
          <span className="font-bold">{stats.streak} dias</span>
        </div>
      </header>

      {/* Spaced Repetition Card */}
      {stats.spacedRepPending ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSpacedRep(true)}
          className="w-full bg-secondary text-white rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-secondary/20 border border-secondary"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="bg-white/20 p-3 rounded-full">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Review Diária Pendente</h3>
              <p className="text-secondary-100 text-sm opacity-90">2 flashcards de suas leituras</p>
            </div>
          </div>
          <ArrowRight size={20} className="text-white/80" />
        </motion.button>
      ) : (
        <div className="w-full bg-slate-50 text-slate-500 rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Brain size={20} />
          </div>
          <p className="font-medium text-sm">Review diária concluída! Retenção em {stats.spacedRepRetention}%.</p>
        </div>
      )}

      {/* Current Reading */}
      {currentBook && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
            Continuar Lendo
          </h2>
          <BookProgressCard book={currentBook} />
        </section>
      )}

      {/* Pending Discussion */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-serif font-bold text-slate-800">Discussão Pendente</h2>
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-start gap-4 cursor-pointer hover:border-primary/50 transition">
          <div className="bg-blue-50 text-primary p-3 rounded-full mt-1">
            <MessageCircle size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-800 text-sm">Reflexão sobre A Coragem de Ser Imperfeito</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">"Você mencionou o conceito de armadura, como você acha que isso se aplica no seu dia a dia?"</p>
          </div>
          <span className="text-xs font-semibold text-primary bg-blue-50 px-2 py-1 rounded">Nova</span>
        </div>
      </section>

      {/* Next Suggestion */}
      {suggestedBook && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-serif font-bold text-slate-800">Próxima Sugestão</h2>
          <BookCard book={suggestedBook} className="!flex-row" featured />
        </section>
      )}

    </div>
  );
}
