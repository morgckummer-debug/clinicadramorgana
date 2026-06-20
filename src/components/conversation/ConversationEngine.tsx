import { useState, useCallback } from 'react'
import { ConversationFlow } from '@/data/conversation/preAgendamento'
import { supabase } from '@/lib/supabase'
import { ConversationHeader } from './ConversationHeader'
import { ProgressBar } from './ProgressBar'
import { WelcomeScreen } from './WelcomeScreen'
import { QuestionCard } from './QuestionCard'
import { QuestionRenderer } from './QuestionRenderer'
import { NavigationButtons } from './NavigationButtons'
import { SuccessScreen } from './SuccessScreen'

type Step = 'welcome' | 'question' | 'saving' | 'success' | 'error'

interface ConversationEngineProps {
  flow: ConversationFlow
}

async function savePreAgendamento(answers: Record<string, string | string[]>) {
  // 1. Upsert paciente por CPF
  const { data: paciente, error: pacienteError } = await supabase
    .from('pacientes')
    .upsert(
      {
        nome: answers['q3'] as string,
        cpf: (answers['q4'] as string).replace(/\D/g, ''),
        data_nascimento: answers['q5'] as string,
        telefone: (answers['q6'] as string).replace(/\D/g, ''),
      },
      { onConflict: 'cpf' }
    )
    .select('id')
    .single()

  if (pacienteError) throw pacienteError

  // 2. Inserir pré-agendamento
  const convenio = answers['q7']
  const { error: agendError } = await supabase.from('pre_agendamentos').insert({
    paciente_id: paciente.id,
    canal: 'site',
    categoria: answers['q1'] as string,
    exame: answers['q2'] as string,
    convenio: Array.isArray(convenio) ? convenio : [convenio],
    preferencia_turno: answers['q8'] as string,
    medico_preferido: answers['q9'] as string,
    observacoes: (answers['q11'] as string) || null,
  })

  if (agendError) throw agendError
}

export function ConversationEngine({ flow }: ConversationEngineProps) {
  const [step, setStep] = useState<Step>('welcome')
  const [currentId, setCurrentId] = useState(flow.firstQuestion)
  const [history, setHistory] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const questionIds = Object.keys(flow.questions)
  const totalQuestions = questionIds.length
  const currentIndex = questionIds.indexOf(currentId) + 1

  const currentQuestion = flow.questions[currentId]
  const currentAnswer = answers[currentId] ?? ''

  const isAnswered = useCallback(() => {
    const type = currentQuestion?.type
    if (type === 'upload' || type === 'textarea') return true
    if (type === 'multi') return Array.isArray(currentAnswer) && currentAnswer.length > 0
    return typeof currentAnswer === 'string' && currentAnswer.trim() !== ''
  }, [currentQuestion, currentAnswer])

  const advance = useCallback(async () => {
    const next = currentQuestion?.next
    if (next === null) {
      setStep('saving')
      try {
        await savePreAgendamento(answers)
        setStep('success')
      } catch {
        setStep('error')
      }
    } else if (next) {
      setHistory((h) => [...h, currentId])
      setCurrentId(next)
    }
  }, [currentQuestion, currentId, answers])

  const goBack = useCallback(() => {
    if (history.length === 0) {
      setStep('welcome')
      return
    }
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    setCurrentId(prev)
  }, [history])

  const setAnswer = useCallback(
    (value: string | string[]) => {
      setAnswers((a) => ({ ...a, [currentId]: value }))
    },
    [currentId]
  )

  const isOptional =
    currentQuestion?.type === 'upload' || currentQuestion?.type === 'textarea'

  if (step === 'welcome') {
    return (
      <>
        <ConversationHeader />
        <WelcomeScreen flow={flow} onStart={() => setStep('question')} />
      </>
    )
  }

  if (step === 'saving') {
    return (
      <>
        <ConversationHeader />
        <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
          <div className="w-8 h-8 rounded-full border-2 border-champagne border-t-wine-deep animate-spin" />
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            Registrando suas informações…
          </p>
        </div>
      </>
    )
  }

  if (step === 'error') {
    return (
      <>
        <ConversationHeader />
        <div className="animate-fade-up text-center py-12">
          <p className="text-wine-deep font-comfortaa text-xl mb-3">Algo deu errado</p>
          <p className="text-muted-foreground font-light text-sm mb-8">
            Não conseguimos registrar suas informações agora. Tente novamente ou entre em contato pelo WhatsApp.
          </p>
          <button
            onClick={() => setStep('question')}
            className="text-[11px] tracking-[0.2em] uppercase text-wine-deep underline underline-offset-4"
          >
            Tentar novamente
          </button>
        </div>
      </>
    )
  }

  if (step === 'success') {
    return (
      <>
        <ConversationHeader />
        <SuccessScreen />
      </>
    )
  }

  return (
    <>
      <ConversationHeader />
      <ProgressBar current={currentIndex} total={totalQuestions} />
      <QuestionCard
        title={currentQuestion.title}
        subtitle={currentQuestion.subtitle}
        animationKey={currentId}
      >
        <QuestionRenderer
          question={currentQuestion}
          value={currentAnswer}
          onChange={setAnswer}
          answers={answers}
          onAutoAdvance={
            currentQuestion.type === 'buttons' ? advance : undefined
          }
        />
      </QuestionCard>
      <NavigationButtons
        showBack={history.length > 0 || step === 'question'}
        onBack={goBack}
        onNext={advance}
        nextDisabled={!isAnswered()}
        optional={isOptional}
      />
    </>
  )
}
