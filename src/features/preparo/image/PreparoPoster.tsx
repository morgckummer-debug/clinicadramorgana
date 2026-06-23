import { forwardRef } from 'react'
import { getIcon } from '@/data/preparos/icons'
import type { PreparoGroup } from '@/data/preparos/preparos'
import { CLINICA } from '@/lib/contato'
import { preparoContent } from '@/content/preparo'

type PreparoPosterProps = {
  examNome: string
  preparo: PreparoGroup
}

export const PreparoPoster = forwardRef<HTMLDivElement, PreparoPosterProps>(
  function PreparoPoster({ examNome, preparo }, ref) {
    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          minHeight: 1920,
          fontFamily: 'Jost, system-ui, sans-serif',
          backgroundColor: '#faf6f2',
          color: '#3a1f33',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: '64px 80px 40px',
            borderBottom: '1px solid rgba(165, 102, 182, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src="/logo-horiz.png"
            alt={CLINICA.nome}
            style={{ height: 110, width: 'auto' }}
            crossOrigin="anonymous"
          />
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: 16,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#a566b6',
              }}
            >
              {preparoContent.poster.eyebrow}
            </div>
          </div>
        </div>

        {/* Exam title band */}
        <div
          style={{
            padding: '56px 80px 48px',
            background:
              'linear-gradient(135deg, rgba(227,191,230,0.35) 0%, rgba(250,246,242,0) 100%)',
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#a566b6',
              marginBottom: 16,
            }}
          >
            Exame
          </div>
          <h1
            style={{
              fontFamily: 'Comfortaa, cursive',
              fontWeight: 300,
              fontSize: 72,
              lineHeight: 1.1,
              margin: 0,
              color: '#6d3263',
              letterSpacing: '-0.015em',
            }}
          >
            {examNome}
          </h1>
          <div
            style={{
              marginTop: 32,
              height: 1,
              width: 96,
              backgroundColor: '#e3bfe6',
            }}
          />
        </div>

        {/* Blocks */}
        <div style={{ padding: '24px 80px 56px' }}>
          {preparo.semPreparoEspecifico ? (
            <div
              style={{
                padding: 48,
                borderRadius: 32,
                backgroundColor: '#ffffff',
                border: '1px solid rgba(227,191,230,0.6)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'Comfortaa, cursive',
                  fontWeight: 400,
                  fontSize: 36,
                  margin: 0,
                  marginBottom: 20,
                  color: '#6d3263',
                }}
              >
                {preparoContent.semPreparo.titulo}
              </h2>
              <p
                style={{
                  fontSize: 26,
                  lineHeight: 1.55,
                  color: 'rgba(58,31,51,0.78)',
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {preparoContent.semPreparo.mensagem}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {preparo.blocos.map((b, i) => {
                const Icon = getIcon(b.icon)
                return (
                  <div key={i} style={{ display: 'flex', gap: 28 }}>
                    <div
                      style={{
                        width: 88,
                        height: 88,
                        borderRadius: 24,
                        backgroundColor: '#f4e2f5',
                        color: '#6d3263',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                    <div style={{ flex: 1, paddingTop: 6 }}>
                      <div
                        style={{
                          fontSize: 18,
                          letterSpacing: '0.28em',
                          textTransform: 'uppercase',
                          color: '#a566b6',
                          fontWeight: 600,
                          marginBottom: 12,
                        }}
                      >
                        {b.title}
                      </div>
                      <ul
                        style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        {b.items.map((item, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: 28,
                              lineHeight: 1.45,
                              color: 'rgba(58,31,51,0.82)',
                              fontWeight: 300,
                              display: 'flex',
                              gap: 14,
                            }}
                          >
                            <span
                              style={{
                                marginTop: 18,
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#e3bfe6',
                                flexShrink: 0,
                              }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}

              {preparo.observacoes && preparo.observacoes.length > 0 && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 32,
                    borderRadius: 24,
                    backgroundColor: 'rgba(227,191,230,0.35)',
                    border: '1px solid rgba(165,102,182,0.3)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: '#6d3263',
                      fontWeight: 600,
                      marginBottom: 14,
                    }}
                  >
                    Observações importantes
                  </div>
                  {preparo.observacoes.map((o, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: 26,
                        lineHeight: 1.5,
                        margin: 0,
                        color: 'rgba(58,31,51,0.82)',
                        fontWeight: 300,
                      }}
                    >
                      {o}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '40px 80px',
            borderTop: '1px solid rgba(165,102,182,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            backgroundColor: '#faf6f2',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Comfortaa, cursive',
                fontSize: 22,
                color: '#6d3263',
                fontWeight: 500,
              }}
            >
              {CLINICA.nome}
            </div>
            <div
              style={{
                fontSize: 18,
                color: 'rgba(58,31,51,0.6)',
                marginTop: 6,
                fontWeight: 300,
              }}
            >
              {CLINICA.telefone} · {CLINICA.site}
            </div>
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#a566b6',
            }}
          >
            {preparoContent.poster.rodape}
          </div>
        </div>
      </div>
    )
  },
)
