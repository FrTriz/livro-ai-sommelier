import * as React from 'react'
import { Card, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { BookCover } from '../components/ui/BookCover'
import { BookMarked, Layers } from 'lucide-react'
import { booksDB } from '../data/mockDB'
import type { Book } from '../data/mockDB'
import { motion, AnimatePresence } from 'framer-motion'

export function Bookshelf() {
  const [activeTab, setActiveTab] = React.useState<'Lendo' | 'Lidos' | 'Quero Ler'>('Lidos')

  // Mocking separation
  const lendo = booksDB.filter(b => b.id === '3') // Duna
  const lidos = booksDB.filter(b => ['1', '2', '4', '5'].includes(b.id)) 
  const queroLer = booksDB.filter(b => ['6', '7'].includes(b.id))

  const currentBooks = activeTab === 'Lendo' ? lendo : activeTab === 'Lidos' ? lidos : queroLer;

  return (
    <div className="p-4 flex flex-col gap-6 min-h-[calc(100vh-80px)]">
      <header className="pt-4">
        <h1 className="text-3xl font-serif text-slate-900 mb-1">Minha Estante</h1>
        <p className="text-slate-500 font-sans mt-1 text-sm">Seu acervo consolidado e retido.</p>
      </header>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-full shadow-inner mb-2">
        {['Lendo', 'Lidos', 'Quero Ler'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              activeTab === tab 
                ? 'bg-white text-primary shadow-sm ring-1 ring-slate-900/5' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4">
         <AnimatePresence mode="popLayout">
            {currentBooks.map((book) => (
              <motion.div
                 key={book.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 transition={{ duration: 0.2 }}
              >
                  {activeTab === 'Lidos' ? (
                     <ReadBookCard book={book} />
                  ) : (
                    <Card className="flex border-slate-200 overflow-hidden shadow-sm pt-0 pb-0">
                      <BookCover title={book.title} isbn={book.isbn} size="S" className="w-20 border-r-0 rounded-none shadow-none" />
                      <div className="p-4 flex flex-col justify-center flex-1">
                        <CardTitle className="text-lg mb-1 leading-tight">{book.title}</CardTitle>
                        <CardDescription>{book.author}</CardDescription>
                      </div>
                    </Card>
                  )}
              </motion.div>
            ))}
         </AnimatePresence>
      </div>
    </div>
  )
}

function ReadBookCard({ book }: { book: Book }) {
  const [level, setLevel] = React.useState<'quick'|'medium'|'deep'|null>(null)

  return (
     <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div className="flex p-4 pb-3">
          <BookCover title={book.title} isbn={book.isbn} size="M" className="w-16 h-24 mr-4 shadow-sm" />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <CardTitle className="text-lg leading-tight mb-0.5 line-clamp-2">{book.title}</CardTitle>
              <CardDescription className="text-sm line-clamp-1">{book.author}</CardDescription>
            </div>
            <div className="flex gap-2">
               <Badge className="bg-emerald-50 text-emerald-700 border-none font-sans text-[10px] uppercase pl-1.5 h-5">
                 <BookMarked size={12} className="mr-1 inline-block" /> Retido
               </Badge>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-100">
           <div className="flex items-center gap-2 mb-3">
             <Layers className="w-4 h-4 text-slate-400" />
             <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Expandir Conhecimento</span>
           </div>
           
           <div className="flex w-full bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
             {['quick', 'medium', 'deep'].map(lvl => (
               <button 
                 key={lvl}
                 onClick={() => setLevel(level === lvl ? null : lvl as any)}
                 className={`flex-1 py-1.5 text-xs font-bold transition-colors border-r last:border-0 border-slate-100 ${
                   level === lvl ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'
                 }`}
               >
                 {lvl === 'quick' ? '1 MIN' : lvl === 'medium' ? '5 MIN' : '15 MIN'}
               </button>
             ))}
           </div>

           <AnimatePresence>
             {level && (
               <motion.div 
                 initial={{ height: 0, opacity: 0 }}
                 animate={{ height: 'auto', opacity: 1 }}
                 exit={{ height: 0, opacity: 0 }}
                 className="overflow-hidden mt-3"
               >
                 <div className="bg-white border text-[13px] leading-relaxed text-slate-700 font-serif border-slate-200 rounded-lg p-3 pt-4 shadow-sm relative">
                   <div className="absolute top-0 left-4 w-8 h-1 bg-primary rounded-b-md" />
                   <p>{book.resumos[level]}</p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
     </Card>
  )
}
