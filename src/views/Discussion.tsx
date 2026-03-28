import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, ChevronDown, CheckCircle } from 'lucide-react';
import { useStore } from '../lib/store';
import { booksDB } from '../data/mockDB';

export function Discussion() {
  const { books, addNoteToBook } = useStore();
  const readBooks = books.filter(b => b.status === 'read' || b.status === 'reading');
  
  const [selectedBookId, setSelectedBookId] = useState<string>(readBooks[0]?.id || '');
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);

  // When book changes, reset discussion with a relevant question
  useEffect(() => {
    if (!selectedBookId) return;
    const dbEntry = booksDB.find(b => b.id === selectedBookId);
    const question = dbEntry?.deep_questions?.[0] || 'O que você achou dos temas desta obra até agora?';
    setMessages([{ role: 'ai', text: question }]);
    setSavedStatus(false);
  }, [selectedBookId]);

  const handleSend = () => {
    if (!input.trim() || !selectedBookId) return;
    
    const newMessages = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setSavedStatus(false);

    // Mock AI response pulling a random question
    setTimeout(() => {
      const dbEntry = booksDB.find(b => b.id === selectedBookId);
      const questions = dbEntry?.deep_questions || ['Pode elaborar mais?', 'Como isso se aplica à sua rotina?'];
      const nextQ = questions[Math.floor(Math.random() * questions.length)];
      setMessages(prev => [...prev, { role: 'ai', text: `Excelente reflexão. ${nextQ}` }]);
    }, 1500);
  };

  const handleSaveInsight = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg && selectedBookId) {
      addNoteToBook(selectedBookId, lastUserMsg.text);
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 3000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="bg-white px-6 pt-16 pb-4 border-b border-slate-200 shadow-sm relative z-10 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-2">
            Sala de Debate <Sparkles size={20} className="text-primary" />
          </h1>
          <p className="text-slate-500 text-sm">Aprofunde-se nas ideias e conecte com sua vida.</p>
        </div>

        {/* Book Selector */}
        <div className="relative">
          <select 
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            className="w-full appearance-none bg-slate-100 border border-slate-200 text-slate-700 py-3 pl-4 pr-10 rounded-xl font-serif font-bold focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {readBooks.map(book => (
              <option key={book.id} value={book.id}>{book.title}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-br-none shadow-md' 
                : 'bg-white text-slate-800 rounded-bl-none shadow-sm border border-slate-100 font-serif leading-relaxed text-[15px]'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-20 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="relative flex items-center">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Compartilhe sua reflexão..."
            className="w-full bg-slate-100 text-slate-800 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-1 p-2 bg-primary text-white rounded-full disabled:opacity-50 transition"
          >
            <Send size={18} className="translate-x-[-1px] translate-y-[1px]" />
          </button>
        </div>
        <div className="text-center mt-2 h-6 flex justify-center items-center">
          {savedStatus ? (
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
              <CheckCircle size={12} /> Insight Salvo na Estante!
            </span>
          ) : (
            <button 
              onClick={handleSaveInsight}
              disabled={!messages.some(m => m.role === 'user')}
              className="text-xs font-semibold text-primary hover:underline disabled:opacity-50"
            >
              Salvar Último Insight na Estante
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
