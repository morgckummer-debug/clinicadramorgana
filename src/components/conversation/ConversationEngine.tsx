import { useState, useCallback, useEffect } from 'react'
import { ConversationFlow, examsByCategory } from '@/data/conversation/preAgendamento'
import { supabasePublic as supabase } from '@/lib/supabase'
import { isValidDateBR, isValidCPF } from '@/lib/utils'
import { ConversationHeader } from './ConversationHeader'
import { ProgressBar } from './ProgressBar'
import { WelcomeScreen } from './WelcomeScreen'
import { QuestionCard } from './QuestionCard'
import { QuestionRenderer } from './QuestionRenderer'
import { NavigationButtons } from './NavigationButtons'
import { SuccessScreen } from './SuccessScreen'

type Step = 'welcome' | 'question' | 'saving' | 'success' | 'error' | 'blocked'

interface ConversationEngineProps {
  flow: ConversationFlow
}

function parseDateBR(ddmmaaaa: string): string {
  const digits = ddmmaaaa.replace(/\D/g, '')
  if (digits.length !== 8) {
    console.error('Data inválida:', ddmmaaaa)
    return ''
  }
  return `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`
}

function calcIGFromUltrassom(usDate: string, usWeeks: string): string | null {
  const digits = usDate.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const us = new Date(
    parseInt(digits.slice(4, 8)),
    parseInt(digits.slice(2, 4)) - 1,
    parseInt(digits.slice(0, 2))
  )
  const match = usWeeks.trim().match(/^(\d+)(?:\+(\d+))?$/)
  if (!match) return null
  const igDaysAtUS = parseInt(match[1]) * 7 + (match[2] ? parseInt(match[2]) : 0)
  const daysSinceUS = Math.floor((Date.now() - us.getTime()) / 86400000)
  if (daysSinceUS < 0) return null
  const totalDays = igDaysAtUS + daysSinceUS
  const w = Math.floor(totalDays / 7)
  const d = totalDays % 7
  return `${w} semanas e ${d} dia${d !== 1 ? 's' : ''}`
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

// Exames que NÃO exigem pedido médico (podem ser feitos sem prescrição)
// Obstétrico do 1º Trimestre também não exige, mas tem fluxo próprio (ob1_*)
const EXAMES_SEM_PEDIDO_OBRIGATORIO = new Set([
  'Obstétrico - Sexo Fetal',
  '3D Completo',
])

// Exames com médico fixo — pula a seleção de médico e usa o valor abaixo
const EXAME_MEDICO_FIXO: Record<string, string> = {
  'Rastreamento de Ovulação':           'dra-morgana',
  'Transvaginal 3D':                    'dra-morgana',
  'Morfológico do 3º Trimestre':        'dra-morgana',
  '3D Completo':                        'dra-morgana',
  'Mapeamento de Endometriose Profunda':'dra-barbara',
  'Ecocardiograma Fetal':               'dr-darlei',
}


function precisaDUM(answers: Record<string, string | string[]>): boolean {
  const categoria = answers['q1'] as string
  const exame = answers['q2'] as string
  if (exame === 'nao-sei') return false
  return categoria === 'gestacao' || EXAMES_COM_DUM.has(exame)
}


async function savePreAgendamento(answers: Record<string, string | string[]>) {
  // Garante que o RPC é chamado com o papel 'anon', não com sessão anônima
  // que pode ter sido criada durante o upload de arquivo.
  const { data: { session } } = await supabase.auth.getSession()
  if (session) await supabase.auth.signOut({ scope: 'local' }).catch(() => {})

  const cpf = (answers['q4'] as string).replace(/\D/g, '')
  const telefone = (answers['q6'] as string).replace(/\D/g, '')
  const convenio = answers['q7']

  // Calcula IG a partir da DUM (q2c = fluxo genérico, ob1_b = Obstétrico 1º Trimestre)
  const dum = (answers['ob1_b'] || answers['q2c']) as string | undefined
  const isOvulacao = (answers['q2'] as string) === 'Rastreamento de Ovulação'
  const dumLinhas: string[] = []
  if (dum) {
    dumLinhas.push(`DUM: ${dum}`)
    if (!isOvulacao) {
      const ig = calcIdadeGestacional(dum)
      if (ig) dumLinhas.push(`Idade gestacional estimada: ${ig}`)
    }
  }
  const usData = answers['q2b_us_data'] as string | undefined
  const usSem = answers['q2b_us_sem'] as string | undefined
  if (usData && usSem) {
    dumLinhas.push(`US anterior: ${usData} (${usSem}sem)`)
    const igFromUS = calcIGFromUltrassom(usData, usSem)
    if (igFromUS) dumLinhas.push(`Idade gestacional estimada: ${igFromUS}`)
  }
  const obsExtra = dumLinhas.join(' — ')
  const obsUsuario = (answers['q11'] as string) || ''
  const observacoes = [obsExtra, obsUsuario].filter(Boolean).join('\n') || null

  const toArray = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v : v ? [v] : []
  const allUrls = [
    ...toArray(answers['q2f']),
    ...toArray(answers['q2g']),
    ...toArray(answers['ob1_d']),
    ...toArray(answers['ob1_g']),
    ...toArray(answers['ob1_h']),
    ...toArray(answers['q10']),
  ]
  const pedidoUrl = allUrls.length ? allUrls.join(',') : null

  const payload = {
    p_nome: answers['q3'] as string,
    p_cpf: cpf,
    p_data_nascimento: parseDateBR(answers['q5'] as string),
    p_telefone: telefone,
    p_canal: 'site',
    p_categoria: answers['q1'] as string,
    p_exame: answers['q2'] as string,
    p_convenio: convenio ? (Array.isArray(convenio) ? convenio : [convenio]) : ['particular'],
    p_preferencia_turno: (answers['q8'] as string) || 'indiferente',
    p_medico_preferido: (answers['q9'] as string) || EXAME_MEDICO_FIXO[answers['q2'] as string] || 'dra-morgana',
    p_pedido_url: pedidoUrl,
    p_observacoes: observacoes,
  }

  console.log('📝 Enviando para RPC:', payload)
  const { data, error } = await supabase.rpc('criar_pre_agendamento', payload)

  if (error) {
    console.error('❌ Erro do RPC:', error)
    throw error
  }

  if (!data) {
    console.error('❌ RPC retornou sem id — pré-agendamento não foi criado.')
    throw new Error('Pré-agendamento não foi criado (sem id de retorno).')
  }

  console.log('✅ Pré-agendamento criado, id:', data)
}




function q10JaRespondido(answers: Record<string, string | string[]>): boolean {
  const v = answers['q10']
  return Array.isArray(v) ? v.length > 0 : !!v
}

export function ConversationEngine({ flow }: ConversationEngineProps) {
  const [step, setStep] = useState<Step>('welcome')
  const [currentId, setCurrentId] = useState(flow.firstQuestion)
  const [history, setHistory] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [blockedReturnId, setBlockedReturnId] = useState<string>('q2g')
  const [blockedMessage, setBlockedMessage] = useState<string>('')
  const [saveErrorMessage, setSaveErrorMessage] = useState<string>('')

  const mainQuestionIds = Object.keys(flow.questions).filter(
    (id) => !flow.questions[id].branch
  )
  const totalQuestions = mainQuestionIds.length
  const currentIndex = mainQuestionIds.indexOf(currentId) + 1 || mainQuestionIds.length

  const currentQuestion = flow.questions[currentId]
  const currentAnswer = answers[currentId] ?? ''

  const isAnswered = useCallback(() => {
    const type = currentQuestion?.type
    if (type === 'textarea') return true
    if (type === 'upload') {
      // ob1_d, ob1_g, ob1_h são opcionais — botão sempre habilitado
      if (currentId === 'ob1_d' || currentId === 'ob1_g' || currentId === 'ob1_h') return true
      // q2f é opcional para exames que não exigem pedido
      if (currentId === 'q2f' && EXAMES_SEM_PEDIDO_OBRIGATORIO.has(answers['q2'] as string)) return true
      // q10 e q2f exigem ao menos um arquivo para habilitar "Continuar"
      const v = currentAnswer
      return Array.isArray(v) ? v.length > 0 : (typeof v === 'string' && v.length > 0)
    }
    if (type === 'multi') return Array.isArray(currentAnswer) && currentAnswer.length > 0
    if (type === 'input') {
      const strValue = typeof currentAnswer === 'string' ? currentAnswer : ''
      if (currentQuestion?.mask === 'date') {
        const digits = strValue.replace(/\D/g, '')
        return digits.length === 8 && isValidDateBR(strValue)
      }
      if (currentQuestion?.mask === 'cpf') {
        return isValidCPF(strValue)
      }
      return strValue.trim() !== ''
    }
    return typeof currentAnswer === 'string' && currentAnswer.trim() !== ''
  }, [currentQuestion, currentAnswer, currentId, answers])

  const getNextId = useCallback((selectedValue?: string): string | null => {
    if (currentId === 'q2') {
      const answersComQ2 = selectedValue ? { ...answers, q2: selectedValue } : answers
      const exame = (answersComQ2['q2'] as string) ?? ''
      // Obstétrico do 1º Trimestre tem fluxo próprio
      if (exame === 'Obstétrico do 1º Trimestre') return 'ob1_a'
      // Gestação e Rastreamento de Ovulação: pede DUM antes de qualquer coisa
      if (precisaDUM(answersComQ2)) return 'q2b'
      // Demais categorias: pede pedido médico antes dos dados pessoais
      return 'q10'
    }

    // ── Fluxo exclusivo: Obstétrico do 1º Trimestre ──
    if (currentId === 'ob1_a') {
      const val = selectedValue ?? (currentAnswer as string)
      return val === 'sim' ? 'ob1_b' : 'ob1_c'
    }
    if (currentId === 'ob1_b') return 'ob1_c'
    if (currentId === 'ob1_c') {
      const val = selectedValue ?? (currentAnswer as string)
      return val === 'sim' ? 'ob1_d' : 'ob1_e'
    }
    if (currentId === 'ob1_d') return 'ob1_f'
    if (currentId === 'ob1_e') {
      const val = selectedValue ?? (currentAnswer as string)
      return val === 'sim' ? 'ob1_g' : null // 'nao' → blocked, tratado em advance
    }
    if (currentId === 'ob1_g') return 'ob1_f'
    if (currentId === 'ob1_f') {
      const val = selectedValue ?? (currentAnswer as string)
      return val === 'sim' ? 'ob1_h' : 'q3'
    }
    if (currentId === 'ob1_h') return 'q3'
    // ── Fim do fluxo exclusivo ────────────────────────

    if (currentId === 'q2b') {
      const val = selectedValue ?? (currentAnswer as string)
      return val === 'sim' ? 'q2c' : 'q2b_us'
    }
    if (currentId === 'q2b_us') {
      const val = selectedValue ?? (currentAnswer as string)
      return val === 'sim' ? 'q2b_us_data' : 'q2d'
    }
    if (currentId === 'q2b_us_data') return 'q2b_us_sem'
    if (currentId === 'q2b_us_sem') return 'q2d'
    if (currentId === 'q2c') {
      const categoria = answers['q1'] as string
      return categoria === 'gestacao' ? 'q2e' : 'q3'
    }
    if (currentId === 'q2d') {
      const val = selectedValue ?? (currentAnswer as string)
      if (val === 'nao' && EXAMES_SEM_PEDIDO_OBRIGATORIO.has(answers['q2'] as string)) return 'q3'
      return val === 'sim' ? 'q2f' : 'q2g'
    }
    if (currentId === 'q2e') {
      const val = selectedValue ?? (currentAnswer as string)
      if (val === 'nao' && EXAMES_SEM_PEDIDO_OBRIGATORIO.has(answers['q2'] as string)) return 'q3'
      return val === 'sim' ? 'q2f' : 'q2h'
    }
    if (currentId === 'q2h') {
      return 'q2g'
    }
    if (currentId === 'q6') {
      return (answers['q2'] as string) === 'Rastreamento de Ovulação' ? 'q8' : 'q7'
    }
    if (currentId === 'q8') {
      const pedidoJaRespondido = !!(answers['q2d'] || answers['q2e'] || answers['ob1_c']) || q10JaRespondido(answers)
      if ((answers['q2'] as string) in EXAME_MEDICO_FIXO) {
        return pedidoJaRespondido ? 'q11' : 'q10'
      }
      return 'q9'
    }
    if (currentId === 'q9') {
      const pedidoJaRespondido = !!(answers['q2d'] || answers['q2e'] || answers['ob1_c']) || q10JaRespondido(answers)
      return pedidoJaRespondido ? 'q11' : 'q10'
    }
    // q10 visitado cedo (antes dos dados pessoais) → segue para q3
    // q10 visitado tarde (após q9, só por segurança) → segue para q11
    if (currentId === 'q10') {
      return answers['q3'] ? 'q11' : 'q3'
    }
    return currentQuestion?.next ?? null
  }, [currentId, currentAnswer, currentQuestion, answers, flow.questions])

  const advance = useCallback(async (selectedValue?: string) => {
    let nextAnswers = selectedValue ? { ...answers, [currentId]: selectedValue } : answers

    // Auto-seleciona exame se há apenas 1 opção (ex: mama → "Mamas e Axilas")
    // Pula q2 inteiramente para não causar flash — calcula destino direto
    if (currentId === 'q1' && selectedValue) {
      const examesDisponiveis = examsByCategory[selectedValue] ?? []
      if (examesDisponiveis.length === 1) {
        const exameUnico = examesDisponiveis[0]
        nextAnswers = { ...nextAnswers, q2: exameUnico }
        setAnswers(nextAnswers)
        let nextAfterQ2: string
        if (exameUnico === 'Obstétrico do 1º Trimestre') {
          nextAfterQ2 = 'ob1_a'
        } else if (precisaDUM(nextAnswers)) {
          nextAfterQ2 = 'q2b'
        } else {
          nextAfterQ2 = 'q10'
        }
        setHistory((h) => [...h, currentId, 'q2'])
        setCurrentId(nextAfterQ2)
        return
      }
    }

    // Bloqueio do fluxo Obstétrico do 1º Trimestre: sem pedido NEM beta-hCG
    if (currentId === 'ob1_e') {
      const val = selectedValue ?? (nextAnswers['ob1_e'] as string)
      if (val === 'nao') {
        setBlockedReturnId('ob1_e')
        setBlockedMessage('Para agendar um ultrassom obstétrico de 1º trimestre é necessário possuir um pedido médico ou um exame de beta-hCG positivo.')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
    }

    if (currentId === 'q2d' || currentId === 'q2e') {
      const val = selectedValue ?? (nextAnswers[currentId] as string)
      if (val === 'nao' && !EXAMES_SEM_PEDIDO_OBRIGATORIO.has(answers['q2'] as string)) {
        setBlockedReturnId(currentId)
        setBlockedMessage('Para agendar um ultrassom é necessário possuir um pedido médico ou um resultado de beta-hCG. Assim que tiver em mãos, entre em contato pelo WhatsApp para continuar.')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
    }
    if (currentId === 'q2h') {
      const val = selectedValue ?? (nextAnswers['q2h'] as string)
      if (val === 'nao') {
        setBlockedReturnId('q2h')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
    }
    if (currentId === 'q10') {
      const q10 = nextAnswers['q10']
      const isEmpty = !q10 || (Array.isArray(q10) && q10.length === 0)
      if (isEmpty) {
        setBlockedReturnId('q10')
        setBlockedMessage('Para realizar o pré-agendamento é obrigatório anexar o pedido médico. Assim que tiver o pedido em mãos, volte e tente novamente.')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
    }
    if (currentId === 'q2f') {
      const q2f = nextAnswers['q2f']
      const isEmpty = !q2f || (Array.isArray(q2f) && q2f.length === 0)
      if (isEmpty) {
        setBlockedReturnId('q2f')
        setBlockedMessage('Para realizar o pré-agendamento é obrigatório anexar o pedido médico. Assim que tiver o pedido em mãos, volte e tente novamente.')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
    }
    if (currentId === 'q2g') {
      const q2g = nextAnswers['q2g']
      const isEmpty = !q2g || (Array.isArray(q2g) && q2g.length === 0)
      if (isEmpty) {
        setBlockedReturnId('q2g')
        setBlockedMessage('Para finalizar o pré-agendamento é necessário anexar o resultado do beta-hCG. Assim que tiver em mãos, volte e complete o formulário.')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
    }
    const next = getNextId(selectedValue)
    if (next === null) {
      // Guarda final: ao menos um arquivo (pedido ou beta-hCG) deve ter sido anexado
      const toArr = (v: string | string[] | undefined) =>
        Array.isArray(v) ? v : v ? [v] : []
      const hasFile = [
        ...toArr(nextAnswers['q10']),
        ...toArr(nextAnswers['q2f']),
        ...toArr(nextAnswers['ob1_d']),
        ...toArr(nextAnswers['ob1_g']),
      ].some(Boolean)
      if (!hasFile && !EXAMES_SEM_PEDIDO_OBRIGATORIO.has(nextAnswers['q2'] as string)) {
        const returnId = nextAnswers['q2d'] !== undefined || nextAnswers['q2e'] !== undefined
          ? 'q2f'
          : 'q10'
        setBlockedReturnId(returnId)
        setBlockedMessage('Para finalizar o pré-agendamento é obrigatório anexar o pedido médico. Volte e tente novamente.')
        setHistory((h) => [...h, currentId])
        setStep('blocked')
        return
      }
      setStep('saving')
      try {
        await savePreAgendamento(nextAnswers)
        setStep('success')
      } catch (e) {
        const msg = e instanceof Error ? e.message : ''
        setSaveErrorMessage(msg)
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

  const isOptional = (() => {
    if (currentQuestion?.type === 'textarea') return true
    if (currentQuestion?.type !== 'upload') return false
    if (currentId === 'q10') return false
    if (currentId === 'q2f') return EXAMES_SEM_PEDIDO_OBRIGATORIO.has(answers['q2'] as string)
    return true // ob1_d, ob1_g, ob1_h são opcionais
  })()

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
        <div className="animate-fade-up text-center py-12 px-4">
          <p className="text-wine-deep font-comfortaa text-xl mb-3">Algo deu errado</p>
          <p className="text-muted-foreground font-light text-sm mb-3 leading-relaxed">
            Não conseguimos registrar suas informações agora. Tente novamente em alguns instantes ou entre em contato pelo WhatsApp.
          </p>
          {saveErrorMessage && (
            <p className="text-[11px] text-muted-foreground/70 font-light mb-8 italic">
              Detalhe: {saveErrorMessage}
            </p>
          )}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => { setSaveErrorMessage(''); setStep('question') }}
              className="text-[11px] tracking-[0.2em] uppercase text-wine-deep underline underline-offset-4"
            >
              Tentar novamente
            </button>
            <a
              href="https://wa.me/5531993910212"
              target="whatsapp"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold"
              style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </>
    )
  }

  if (step === 'blocked') {
    return (
      <>
        <ConversationHeader />
        <div className="animate-fade-up text-center py-8 sm:py-12 px-3 sm:px-4">
          <div className="mb-4 sm:mb-6 text-3xl sm:text-4xl">⚠️</div>
          <p className="text-wine-deep font-comfortaa text-lg sm:text-xl mb-2 sm:mb-3 font-light">
            Não conseguimos finalizar o pré-agendamento
          </p>
          <p className="text-muted-foreground font-light text-xs sm:text-sm mb-6 sm:mb-8 leading-relaxed">
            {blockedMessage || 'Para agendar um ultrassom obstétrico, precisamos de pelo menos um destes documentos: pedido médico ou resultado do exame de beta-HCG (no caso de gestação inicial). Assim que tiver um desses documentos em mãos, entre em contato diretamente com nossa equipe pelo WhatsApp.'}
          </p>
          <a
            href="https://wa.me/5531993910212"
            target="whatsapp"
            className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-500 shadow-soft whitespace-nowrap"
            style={{ backgroundColor: '#FDDCB5', color: '#5B2D8E', border: '1px solid #5B2D8E' }}
          >
            Falar pelo WhatsApp
          </a>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => { setStep('question'); setCurrentId(blockedReturnId) }}
              className="text-[10px] text-muted-foreground hover:text-wine-deep transition-colors duration-300 tracking-wide underline underline-offset-4"
            >
              {['q2f', 'q2g', 'q10'].includes(blockedReturnId) ? 'Voltar e anexar documento' : 'Tentar novamente'}
            </button>
          </div>
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
          optional={isOptional}
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
