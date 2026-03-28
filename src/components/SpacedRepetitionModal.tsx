import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Brain, ChevronRight } from 'lucide-react';
import { useStore } from '../lib/store';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  bookTitle: string;
}

const flashcards: Flashcard[] = [
  {
    id: '1',
    front: 'O que é a Simpatia em O Nome do Vento?',
    back: 'A magia baseada na crença (Alar) e na conexão simpática entre dois objetos, permitindo a transferência de energia.',
    bookTitle: 'O Nome do Vento'
  },
  {
    id: '2',
    front: 'Qual o principal aprendizado sobre vulnerabilidade?',
    back: 'Vulnerabilidade não é fraqueza, mas sim a nossa maior medida de coragem, sendo essencial para conexões verdadeiras.',
    bookTitle: 'A Coragem de Ser Imperfeito'
  }
];

export function SpacedRepetitionModal({ onClose }: { onClose: () => void }) {
  const { completeSpacedRep } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionCompleted(true);
      completeSpacedRep();
    }
  };

  const currentCard = flashcards[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md pt-safe"
    >
      <div className="flex justify-between items-center p-6 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <Brain className="text-secondary" size={24} />
          <h2 className="font-serif font-bold text-xl text-primary">Revisão Diária</h2>
        </div>
        <button onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!sessionCompleted ? (
            <motion.div
              key={currentCard.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm aspect-[3/4] perspective-1000"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="w-full h-full relative preserve-3d cursor-pointer duration-500" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col p-8 items-center justify-center text-center">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider mb-6">{currentCard.bookTitle}</span>
                  <p className="font-serif text-2xl text-slate-800 leading-snug">{currentCard.front}</p>
                  <p className="absolute bottom-6 text-sm text-slate-400">Toque para revelar</p>
                </div>
                
                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-primary text-white border border-primary-light rounded-2xl shadow-xl flex flex-col p-8 items-center justify-center text-center rotate-y-180">
                  <p className="font-serif text-xl leading-relaxed">{currentCard.back}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center gap-6"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Check size={48} />
              </div>
              <h3 className="font-serif text-3xl font-bold text-primary">Sessão Concluída!</h3>
              <p className="text-slate-600">Sua retenção de leitura está aumentando. Continue assim!</p>
              <button 
                onClick={onClose}
                className="mt-4 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition shadow-lg"
              >
                Voltar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!sessionCompleted && (
        <div className="p-8 flex flex-col items-center gap-4 border-t border-slate-100 bg-white">
          <p className="text-sm font-medium text-slate-400 mb-2">Cartão {currentIndex + 1} de {flashcards.length}</p>
          <div className="flex w-full gap-4 max-w-sm">
            <button 
              disabled={!isFlipped}
              onClick={handleNext}
              className="flex-1 py-4 bg-slate-100 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-200 transition"
            >
              Ainda aprendendo
            </button>
            <button 
              disabled={!isFlipped}
              onClick={handleNext}
              className="flex-1 py-4 bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-secondary/90 transition shadow-md shadow-secondary/20"
            >
              Me lembrei <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
