import * as React from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { BookCover } from '../components/ui/BookCover'
import { Send, ScrollText, Check, ChevronLeft } from 'lucide-react'
import { booksDB } from '../data/mockDB'
import type { Book } from '../data/mockDB'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  isActionable?: boolean;
}

export function Discussion() {
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [questionIndex, setQuestionIndex] = React.useState(0)
  
  const [inputMsg, setInputMsg] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const [savedInsightId, setSavedInsightId] = React.useState<string | null>(null)
  const endRef = React.useRef<HTMLDivElement>(null)

  // Initialization when a book is selected
  React.useEffect(() => {
    if (selectedBook) {
      setMessages([
        { 
          id: '1', 
          role: 'ai', 
          text: `Excelente escolha mergulhar em "${selectedBook.title}". A literatura é um espelho formidável. Vamos à nossa reflexão inicial:\n\n${selectedBook.deep_questions[0]}`
        }
      ])
      setQuestionIndex(0)
    }
  }, [selectedBook])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if(!inputMsg.trim() || !selectedBook) return

    const userText = inputMsg.trim()
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', text: userText }
    
    setMessages(prev => [...prev, newUserMsg])
    setInputMsg('')
    setIsTyping(true)

    // Avaliação Heurística de NLP e Contexto Modificados
    setTimeout(() => {
      let aiResponseText = ""
      let advanceQuestion = false;

      const lowerText = userText.toLowerCase();
      // Regex simples para detectar pedidos de informação (Intent Parsing)
      const isInfoRequest = /(expliqu|resuma|sobre o que|quem|o que aconte|história|o que é|do que se trata|fala sobre|resumo)/i.test(lowerText);
      
      if (isInfoRequest) {
        // Intercepta e responde objetivamente com os dados do livro, e repete a pergunta atual
        const info = selectedBook.resumos.medium || selectedBook.resumos.quick;
        aiResponseText = `Claro. Trazendo o contexto da obra: ${info}\n\nCom essa premissa na mesa, retorno à reflexão:\n${selectedBook.deep_questions[questionIndex]}`
      } 
      else if (userText.length < 40) {
        // Resposta Curta -> Puxa aprofundamento usando as TAGS emocionais do livro (Contextualização Real)
        const principalTag = selectedBook.tags_emocionais[0] || 'transformação';
        aiResponseText = `A sua resposta me soa um pouco superficial para o peso dessa obra. Em "${selectedBook.title}", a ideia de "${principalTag}" exige um mergulho mais profundo e desconfortável. Você acha que consegue expandir um pouco mais sobre como isso impacta pontualmente sua vida hoje?`
      } 
      else {
        // Resposta Longa/Adequada -> Elogio contextualizado com o autor e avança
        advanceQuestion = true;
        
        if (questionIndex + 1 < selectedBook.deep_questions.length) {
          aiResponseText = `Uma reflexão densa e muito pertinente. Eu acredito que ${selectedBook.author} veria muito sentido nessa sua perspectiva. Seguindo adiante na nossa jornada:\n\n${selectedBook.deep_questions[questionIndex + 1]}`
        } else {
          aiResponseText = `Chegamos ao cerne da questão. Os ecos de "${selectedBook.title}" parecem refletir muito nitidamente onde você se encontra hoje. Esta janela de discussão filosófica termina aqui, mas você pode reter esse pensamento.\n\nQue essa verdade o acompanhe.`
        }
      }

      const newAIPrompt: Message = { 
        id: (Date.now()+1).toString(), 
        role: 'ai', 
        text: aiResponseText,
        isActionable: advanceQuestion // Permite salvar se ele concluiu um bom raciocínio
      }

      setMessages(prev => [...prev, newAIPrompt])
      if (advanceQuestion) setQuestionIndex(prev => prev + 1)
      setIsTyping(false)

    }, 1800)
  }

  const saveInsight = (msg: Message) => {
    try {
      const existing = localStorage.getItem('@livroai:insights:list');
      let insights: any[] = [];
      if (existing) {
        insights = JSON.parse(existing);
      }
      insights.unshift({
        id: msg.id,
        text: msg.text.replace(/(\r\n|\n|\r)/gm, " "), // strip break lines
        book: selectedBook?.title,
        date: new Date().toISOString()
      });
      localStorage.setItem('@livroai:insights:list', JSON.stringify(insights));
      
      setSavedInsightId(msg.id)
      setTimeout(() => setSavedInsightId(null), 2500)
    } catch {}
  }

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  if (!selectedBook) {
    return (
      <div className="p-4 flex flex-col gap-6 min-h-[calc(100vh-80px)]">
        <header className="pt-4">
          <h1 className="text-3xl font-serif text-slate-900">Diálogos</h1>
          <p className="text-slate-500 font-sans mt-1">Selecione uma obra para iniciar a introspecção.</p>
        </header>
        
        <div className="flex-1 space-y-3 pb-8">
           {booksDB.slice(0, 8).map(book => (
             <Card 
               key={book.id} 
               onClick={() => setSelectedBook(book)}
               className="p-3 flex items-center gap-4 cursor-pointer hover:border-primary/50 transition-colors shadow-sm"
             >
                <BookCover title={book.title} isbn={book.isbn} size="S" className="w-12 h-16" />
                <div className="flex-1">
                   <h3 className="font-serif text-base font-bold text-slate-800 leading-tight mb-1">{book.title}</h3>
                   <p className="text-xs text-slate-500 font-medium">{book.author}</p>
                </div>
                <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
                   Debater
                </div>
             </Card>
           ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <header className="pt-6 pb-4 px-4 bg-white/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100 flex items-center">
        <button onClick={() => setSelectedBook(null)} className="mr-3 text-slate-400 hover:text-slate-700">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 truncate">
          <h1 className="text-xl font-serif text-slate-900 truncate">{selectedBook.title}</h1>
          <p className="text-slate-500 font-sans text-xs">Aprofundamento Socrático</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-sm' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
              }`}>
                <p className="text-[15px] leading-relaxed font-serif whitespace-pre-wrap">{msg.text}</p>
                {msg.role === 'ai' && msg.id !== '1' && msg.isActionable && (
                  <button 
                    onClick={() => saveInsight(msg)}
                    disabled={savedInsightId === msg.id}
                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-secondary/80 bg-secondary/10 px-2.5 py-1.5 rounded-full transition-colors"
                  >
                    {savedInsightId === msg.id ? <Check size={14} /> : <ScrollText size={14} />}
                    {savedInsightId === msg.id ? 'Salvo no Ninho' : 'Salvar Insight da Obra'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-4 flex gap-1">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
             </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 pb-safe">
        <form onSubmit={handleSend} className="relative flex items-center shadow-sm rounded-xl overflow-hidden shadow-primary/5 bg-slate-50 border border-slate-200">
          <textarea 
             className="w-full pl-4 pr-12 py-3 bg-transparent text-sm resize-none outline-none min-h-[50px] max-h-[120px]"
             placeholder="Pense alto aqui (busque profundidade)..." 
             value={inputMsg}
             rows={inputMsg.length > 50 ? 3 : 1}
             onChange={e => setInputMsg(e.target.value)}
          />
          <Button 
             type="submit" 
             variant="ghost" 
             size="icon" 
             className="absolute bottom-1 right-1 hover:bg-transparent rounded-lg h-10 w-10 text-primary"
             disabled={!inputMsg.trim() || isTyping || questionIndex > selectedBook.deep_questions.length}
          >
             <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
