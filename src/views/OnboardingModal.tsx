import * as React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardTitle, CardDescription } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { BookOpen, Target, Clock } from 'lucide-react'

type OnboardingModalProps = {
  onComplete: () => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState({ feeling: '', goal: '', time: '' })

  const handleNext = () => {
    if (step < 2) {
      setStep(s => s + 1)
    } else {
      // Finish Onboarding
      localStorage.setItem('@livroai:persona', JSON.stringify({
        ...answers,
        persona: 'Leitor em busca de escapismo', // Mocado conforme spec
      }))
      onComplete()
    }
  }

  const steps = [
    {
      title: 'Como você se sente hoje?',
      desc: 'Sua leitura acompanha seu humor.',
      icon: <BookOpen className="w-8 h-8 text-primary mb-2" />,
      options: ['Melancólico', 'Inspirado', 'Ansioso', 'Curioso', 'Cansado'],
      field: 'feeling' as const
    },
    {
      title: 'Qual seu objetivo?',
      desc: 'O que você quer extrair destas páginas?',
      icon: <Target className="w-8 h-8 text-secondary mb-2" />,
      options: ['Aprender algo novo', 'Focar profundamente', 'Fugir da realidade', 'Refletir sobre a vida', 'Diversão rápida'],
      field: 'goal' as const
    },
    {
      title: 'Tempo disponível',
      desc: 'Encontraremos páginas perfeitas para sua janela.',
      icon: <Clock className="w-8 h-8 text-accent mb-2" />,
      options: ['< 15 min', '30 min', '1 Hora', 'Toda a noite'],
      field: 'time' as const
    }
  ]

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        className="w-full max-w-sm"
      >
        <Card className="border-0 shadow-xl shadow-primary/5">
          <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
            {current.icon}
            <CardTitle className="mb-2">{current.title}</CardTitle>
            <CardDescription className="mb-6">{current.desc}</CardDescription>

            <div className="w-full flex justify-center flex-wrap gap-2 mb-8">
              {current.options.map(opt => (
                <Button 
                  key={opt}
                  variant={answers[current.field] === opt ? 'default' : 'outline'}
                  className="rounded-full font-sans text-xs"
                  onClick={() => setAnswers(prev => ({ ...prev, [current.field]: opt }))}
                >
                  {opt}
                </Button>
              ))}
            </div>

            <div className="flex w-full space-x-2">
              <Button 
                variant="ghost" 
                className="flex-1 rounded-full text-slate-500" 
                onClick={handleNext}
              >
                Pular
              </Button>
              <Button 
                className="flex-1 rounded-full" 
                onClick={handleNext}
                disabled={!answers[current.field]} // Opcionalmente obrigar
              >
                {step === 2 ? 'Iniciar' : 'Próximo'}
              </Button>
            </div>
            
            <div className="flex space-x-1 mt-6">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-primary' : 'bg-slate-200'}`} />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
