import * as React from 'react'
import { Card, CardTitle, CardDescription } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Search, Compass, Sparkles, BookOpen } from 'lucide-react'
import { BookCover } from '../components/ui/BookCover'
import { booksDB } from '../data/mockDB'
import type { Book } from '../data/mockDB'
import { motion } from 'framer-motion'

// Mapa reverso para "curar" dores emocionais do usuário fornecendo virtudes de livros opostas
const moodMap: Record<string, string[]> = {
  ansioso: ['calma', 'foco', 'aceitação', 'resiliência'],
  ansiedade: ['calma', 'foco', 'aceitação', 'resiliência'],
  triste: ['esperança', 'superação', 'motivação'],
  tristeza: ['esperança', 'superação', 'motivação'],
  perdido: ['jornada', 'clareza', 'perspectiva'],
  desespero: ['resiliência', 'coragem', 'força'],
  cansado: ['calma', 'aceitação', 'beleza'],
  raiva: ['perspectiva', 'paciência', 'reflexão']
}

export function Discover() {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState<(Book & { match: number, reason: string })[]>([])
  const [isSearching, setIsSearching] = React.useState(false)

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!query) return;
    
    setIsSearching(true)
    
    setTimeout(() => {
      const lowerQuery = query.toLowerCase()
      
      // Checar se a query atinge algum Mood mapeado (ex: "ansioso")
      let activeTargetTags: string[] = []
      Object.keys(moodMap).forEach(key => {
        if (lowerQuery.includes(key)) {
          activeTargetTags = [...activeTargetTags, ...moodMap[key]]
        }
      })

      const scoredBooks = booksDB.map(book => {
        let score = 0;
        let reasons: string[] = [];
        
        // Avalia match cruzado com o MoodMap
        if (activeTargetTags.length > 0) {
          book.tags_emocionais.forEach(tag => {
             if (activeTargetTags.includes(tag.toLowerCase())) {
                score += 40;
                reasons.push(`oferece ${tag.toLowerCase()}`);
             }
          })
        }

        // Avalia match direto (caso o usuário digite "foco" e o livro tenha "foco")
        book.tags_emocionais.forEach(tag => {
          if (lowerQuery.includes(tag.toLowerCase())) {
             score += 35;
             if(!reasons.includes(`foca em ${tag.toLowerCase()}`)) reasons.push(`foca em ${tag.toLowerCase()}`);
          }
        })
        
        // Avalia titulo e autor
        if(lowerQuery.includes(book.author.toLowerCase())) score += 30;
        if(book.title.toLowerCase().includes(lowerQuery)) score += 50;

        // Análise simples na sinopse 
        if (book.resumos.quick.toLowerCase().includes(lowerQuery)) score += 15;

        let finalScore = score > 100 ? 98 : score;
        if (score === 0) finalScore = Math.floor(Math.random() * 20) + 15;
        
        let reasonStr = "Combina com a energia geral do seu momento."
        if (reasons.length > 0) {
           reasonStr = `Ideal para você agora pois ${reasons.slice(0,2).join(' e ')}.`
        }

        return { ...book, match: finalScore, reason: reasonStr }
      }).sort((a,b) => b.match - a.match)

      // Exclui lixo muito baixo ou trunca
      setResults(scoredBooks.filter(s => s.match > 20).slice(0, 3) || scoredBooks.slice(0,1))
      setIsSearching(false)
    }, 900)
  }

  return (
    <div className="p-4 flex flex-col gap-6 min-h-[calc(100vh-80px)]">
      <header className="pt-4">
        <h1 className="text-3xl font-serif text-slate-900">Descobrir</h1>
        <p className="text-slate-500 font-sans mt-1">Converse comigo. Como posso ajudá-lo hoje?</p>
      </header>

      <div className="relative">
        <form onSubmit={handleSearch}>
          <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden shadow-primary/5">
            <div className="absolute left-3 text-slate-400">
               <Compass className="w-5 h-5" />
            </div>
            <Input 
              className="pl-10 pr-12 h-14 bg-white border-slate-200 text-base"
              placeholder="Ex: Estou ansioso com o futuro..." 
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="default" 
              size="icon" 
              className="absolute right-1 rounded-lg h-12 w-12"
              disabled={isSearching}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>

      <div className="flex-1 space-y-4">
         {isSearching ? (
           <div className="flex justify-center items-center h-40">
             <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
             <span className="ml-3 text-sm text-slate-500 font-serif">Interpretando conexões semânticas...</span>
           </div>
         ) : results.length > 0 ? (
           results.map((book, i) => (
             <motion.div 
               key={book.id} 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
             >
               <Card className="overflow-hidden border-slate-200 shadow-sm relative pr-2">
                 <div className="absolute -top-2 -right-2 bg-accent/10 border-accent/20 border pt-3 pb-1 pl-3 pr-2 rounded-bl-3xl rounded-tr-xl flex flex-col items-center justify-center">
                    <span className="text-accent font-bold text-sm">{book.match}%</span>
                    <span className="text-[9px] uppercase font-bold text-accent/70 tracking-wider">Match</span>
                 </div>

                 <div className="flex p-4 pb-2">
                   <BookCover title={book.title} isbn={book.isbn} size="S" className="w-16 h-24 mr-4" />
                   <div className="flex-1 pt-1">
                     <CardTitle className="text-lg leading-tight mb-1">{book.title}</CardTitle>
                     <CardDescription className="text-xs mb-2">{book.author}</CardDescription>
                     <div className="flex flex-wrap gap-1 mb-2">
                       {book.tags_emocionais.map(m => (
                         <Badge key={m} variant="outline" className="text-[10px] py-0 bg-slate-50">{m}</Badge>
                       ))}
                     </div>
                   </div>
                 </div>
                 <div className="bg-indigo-50/50 px-4 py-3 border-t border-indigo-50 flex items-start">
                   <Sparkles className="w-4 h-4 text-primary shrink-0 mr-2 mt-0.5" />
                   <div>
                     <span className="text-xs font-semibold text-primary block mb-1">Por que ler agora?</span>
                     <p className="text-xs text-slate-600 leading-relaxed capitalize-first">{book.reason}</p>
                   </div>
                 </div>
               </Card>
             </motion.div>
           ))
         ) : (
           <div className="flex flex-col items-center justify-center h-48 text-center px-4 mt-8">
             <BookOpen className="w-12 h-12 text-slate-200 mb-2" />
             <p className="text-slate-400 font-serif text-lg">A vasta biblioteca aguarda.</p>
             <p className="text-slate-400 font-sans text-sm mt-1">Descreva seu momento atual e eu traduzirei na literatura perfeita.</p>
           </div>
         )}
      </div>
    </div>
  )
}
