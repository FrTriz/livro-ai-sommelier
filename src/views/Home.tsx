import * as React from 'react'
import { Card, CardContent, CardTitle, CardDescription } from '../components/ui/Card'
import { Progress } from '../components/ui/Progress'
import { Badge } from '../components/ui/Badge'
import { Sparkles, BookOpen } from 'lucide-react'
import { booksDB } from '../data/mockDB'
import { BookCover } from '../components/ui/BookCover'

export function Home() {
  const [insight, setInsight] = React.useState<{ text: string; date: string, book?: string } | null>(null)

  React.useEffect(() => {
    try {
      const listStr = localStorage.getItem('@livroai:insights:list')
      if (listStr) {
        const list = JSON.parse(listStr)
        if (list.length > 0) {
          setInsight(list[0]) // Get the most recent
        }
      }
    } catch {}
  }, [])

  // Mocking current reading
  const currentRead = booksDB.find(b => b.id === '3') // Duna
  const pagesReadDaily = 15;
  const pagesGoalDaily = 30;
  const dailyProgress = Math.min((pagesReadDaily / pagesGoalDaily) * 100, 100);
  
  const bookProgress = 65; 

  return (
    <div className="p-4 flex flex-col gap-6">
      <header className="pt-4 pb-2">
        <h1 className="text-3xl font-serif text-slate-900">O Ninho de Leitura</h1>
        <p className="text-slate-500 font-sans mt-1">Bem-vindo ao seu santuário diário.</p>
      </header>

      {/* Widget Spaced Repetition / Insight do Dia */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-semibold font-serif text-secondary">Insight do Dia</h2>
        </div>
        <Card className="bg-secondary/5 border-secondary/20 shadow-none">
          <CardContent className="p-4 relative">
            <span className="text-4xl absolute -top-1 -left-1 text-secondary/10 font-serif">"</span>
            <p className="text-slate-700 italic font-serif leading-relaxed px-4 pt-2 text-sm">
              {insight ? insight.text : "A jornada central reflete a ideia do Panteísmo: de que a Alma do Mundo se nutre de nossa felicidade ou miséria."}
            </p>
            <div className="flex justify-between items-end mt-4">
              <span className="text-[10px] text-slate-400 font-medium uppercase font-sans">
                {insight?.book || 'O Alquimista'}
              </span>
              <Badge variant="secondary" className="text-[10px] font-sans">Spaced Repetition</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Leitura Atual */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold font-serif text-primary">Leitura Atual</h2>
        </div>
        <Card className="overflow-hidden">
          <div className="flex h-36 border-b border-slate-100">
            <BookCover title={currentRead?.title || ''} isbn={currentRead?.isbn} size="L" className="w-24 border-0 rounded-none shadow-none" />
            <div className="flex flex-col flex-1 p-4 justify-between">
              <div>
                <CardTitle className="text-xl mb-1 line-clamp-2">{currentRead?.title}</CardTitle>
                <CardDescription className="line-clamp-1">{currentRead?.author}</CardDescription>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Progresso Geral</span>
                  <span>{bookProgress}%</span>
                </div>
                <Progress value={bookProgress} />
              </div>
            </div>
          </div>
          <CardContent className="p-4 bg-slate-50 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">Meta Diária</p>
              <p className="text-xs text-slate-500 mt-1">{pagesReadDaily} de {pagesGoalDaily} páginas</p>
            </div>
            
            {/* Circular Progress Gamificado */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-200" />
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                        strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * dailyProgress) / 100}
                        className="text-accent transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                {Math.round(dailyProgress)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  )
}
