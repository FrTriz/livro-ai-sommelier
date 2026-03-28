import * as React from 'react'
import { Card, CardContent, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Flame, Brain, BookOpen, LogOut } from 'lucide-react'

export function Profile() {
  const [persona, setPersona] = React.useState<any>(null)
  const [insightsCount, setInsightsCount] = React.useState(0)

  React.useEffect(() => {
    const p = localStorage.getItem('@livroai:persona')
    if (p) setPersona(JSON.parse(p))

    try {
      const insights = localStorage.getItem('@livroai:insights:list');
      if (insights) setInsightsCount(JSON.parse(insights).length)
    } catch {}
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('@livroai:persona')
    window.location.reload()
  }

  return (
    <div className="p-4 flex flex-col gap-6 min-h-[calc(100vh-80px)]">
      <header className="pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-serif text-slate-900 mb-1">Identidade</h1>
          <p className="text-slate-500 font-sans mt-1 text-sm">O espelho do seu acervo.</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-400 hover:text-red-500">
           <LogOut className="w-5 h-5" />
        </Button>
      </header>

      <Card className="bg-primary text-white border-0 shadow-xl shadow-primary/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 transform translate-x-1/2 -translate-y-1/2">
           <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        </div>
        <CardContent className="p-6 relative z-10">
          <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 mb-4 font-sans uppercase text-[10px] tracking-widest pl-2">
            Perfil Atual
          </Badge>
          <CardTitle className="text-2xl mb-2 text-white font-serif">{persona?.persona || 'Explorador Literário'}</CardTitle>
          <div className="flex flex-col gap-1 text-sm text-primary-50 text-white/80">
            <span className="flex items-center gap-2">
               <Brain className="w-4 h-4" /> Humor Base: {persona?.feeling || 'Curioso'}
            </span>
            <span className="flex items-center gap-2">
               <Flame className="w-4 h-4" /> Intenção: {persona?.goal || 'Aprender algo novo'}
            </span>
            <span className="flex items-center gap-2">
               <BookOpen className="w-4 h-4" /> Disponibilidade: {persona?.time || '1 Hora'}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
             <span className="text-3xl font-serif text-slate-800 mb-1">{insightsCount}</span>
             <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Insights Retidos</span>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
             <span className="text-3xl font-serif text-slate-800 mb-1">1</span>
             <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Lendo</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
