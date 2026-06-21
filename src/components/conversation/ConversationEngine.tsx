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

function parseDateBR(ddmmaaaa: string): string {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) return ddmmaaaa
  return `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`
}

function calcIdadeGestacional(ddmmaaaa: string): string | null {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const dum = new Date(
    parseInt(digits.slice(4, 8)),
    parseInt(digits.slice(2, 4)) - 1,
    parseInt(digits.slice(0, 2))
  )
  const diffDays = Math.floor((Date.now() - dum.getTime()) / 86400000)
  if (diffDays < 0 || diffDays > 300) return null
  const weeks = Math.floor(diffDays / 7)
  const days = diffDays % 7
  return `${weeks} semanas e ${days} dia${days !== 1 ? 's' : ''}`
}

const EXAMES_COM_DUM = new Set(['Rastreamento de Ovulação'])

function precisaDUM(answers: Record<string, string | string[]>): boolean {
  const categoria = answers['q1'] as string
  const exame = answers['q2'] as string
  return categoria === 'gestacao' || EXAMES_COM_DUM.has(exame)
}

async function savePreAgendamento(answers: Record<string, string | string[]>) {
  const cpf = (answers['q4'] as string).replace(/\D/g, '')
  const telefone = (answers['q6'] as string).replace(/\D/g, '')
  const convenio = answers['q7']

  // Calcula IG a partir da DUM e inclui nas observações
  const dum = answers['q2c'] as string | undefined
  const dumLinhas: string[] = []
  if (dum) {
    dumLinhas.push(`DUM: ${dum}`)
    const ig = calcIdadeGestacional(dum)
    if (ig) dumLinhas.push(`Idade gestacional estimada: ${ig}`)
  }
  const obsExtra = dumLinhas.join(' — ')
  const obsUsuario = (answers['q11'] as string) || ''
  const observacoes = [obsExtra, obsUsuario].filter(Boolean).join('\n') || null

  // Merge ultrassom anterior (q2d) + pedido médico (q10)
  const toArray = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v : v ? [v] : []
  const allUrls = [...toArray(answers['q2d']), ...toArray(answers['q10'])]
  const pedidoUrl = allUrls.length ? allUrls.join(',') : null

  const { error } = await supabase.rpc('criar_pre_agendamento', {
    p_nome: answers['q3'] as string,
    p_cpf: cpf,
    p_data_nascimento: parseDateBR(answers['q5'] as string),
    p_telefone: telefone,
    p_canal: 'site',
    p_categoria: answers['q1'] as string,
    p_exame: answers['q2'] as string,
    p_convenio: Array.isArray(convenio) ? convenio : [convenio],
    p_preferencia_turno: answers['q8'] as string,
    p_medico_preferido: answers['q9'] as string,
    p_pedido_url: pedidoUrl,
    p_observacoes: observacoes,
  })

  if (error) throw error
}

export function ConversationEngine({ flow }: ConversationEngineProps) {
  const [step, setStep] = useState<Step>('welcome')
  const [currentId, setCurrentId] = useState(flow.firstQuestion)
  const [history, setHistory] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const mainQuestionIds = Object.keys(flow.questions).filter(
    (id) => !flow.questions[id].branch
  )
  const totalQuestions = mainQuestionIds.length
  const currentIndex = mainQuestionIds.indexOf(currentId) + 1 || mainQuestionIds.length

  const currentQuestion = flow.questions[currentId]
  const currentAnswer = answers[currentId] ?? ''

  const isAnswered = useCallback(() => {
    const type = currentQuestion?.type
    if (type === 'upload' || type === 'textarea') return true
    if (type === 'multi') return Array.isArray(currentAnswer) && currentAnswer.length > 0
    return typeof currentAnswer === 'string' && currentAnswer.trim() !== ''
  }, [currentQuestion, currentAnswer])

  const getNextId = useCallback((): string | null => {
    if (currentId === 'q2') {
      return precisaDUM(answers) ? 'q2b' : 'q3'
    }
    if (currentId === 'q2b') {
      return (currentAnswer as string) === 'sim' ? 'q2c' : 'q2d'
    }
    return currentQuestion?.next ?? null
  }, [currentId, currentAnswer, currentQuestion, answers])

  const advance = useCallback(async () => {
    const next = getNextId()
    if (next === null) {
      setStep('saving')
      try {
        await savePreAgendamento(answers)
        setStep('success')
      } catch {
        setStep('error')
      }
    } else {
      setHistory((h) => [...h, currentId])
      setCurrentId(next)
    }
  }, [getNextId, currentId, answers])

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

  const showNext =
    currentQuestion?.type === 'input' ||
    currentQuestion?.type === 'textarea' ||
    currentQuestion?.type === 'upload' ||
    currentQuestion?.type === 'multi'

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
        showNext={showNext}
        optional={isOptional}
      />
    </>
  )
}
