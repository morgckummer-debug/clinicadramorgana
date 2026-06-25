import { useEffect, useRef, useState } from "react";
import pregnantImg from "@/assets/pregnant-happy.webp";

export const PremiumExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes slowpulse {
          0%, 100% { opacity: 0.22; }
          50% { opacity: 0.38; }
        }

        .pe-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          min-height: 690px;
        }
        .pe-image-slot {
          height: 690px;
        }
        .pe-content {
          padding: 72px 64px 72px 40px;
        }
        .pe-title {
          font-size: 52px;
        }
        .pe-desc {
          font-size: 15.5px;
          max-width: 400px;
        }

        @media (max-width: 768px) {
          .pe-grid {
            grid-template-columns: 1fr;
            min-height: unset;
          }
          .pe-image-col {
            height: 360px;
            overflow: hidden;
          }
          .pe-image-slot {
            height: 360px !important;
          }
          .pe-fade-right {
            display: none;
          }
          .pe-fade-bottom {
            height: 100px;
          }
          .pe-content {
            padding: 40px 24px 48px;
            text-align: center;
          }
          .pe-title {
            font-size: 36px;
            line-height: 1.2;
          }
          .pe-desc {
            font-size: 15px;
            max-width: 100%;
            margin: 0 auto;
          }
          .pe-chips {
            gap: 6px;
            justify-content: center;
          }
        }
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#25152F",
        }}
      >
        {/* Linha dourada topo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, #D4A843 25%, #C4AED8 55%, transparent)",
            opacity: 0.6,
            zIndex: 2,
          }}
        />

        {/* Orb glow fundo */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #5C3878 0%, transparent 60%)",
            opacity: 0.5,
            filter: "blur(70px)",
            pointerEvents: "none",
            animation: "slowpulse 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "10%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #8B5C2A 0%, transparent 65%)",
            opacity: 0.25,
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          className="pe-grid"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* IMAGEM ESQUERDA */}
          <div
            className="pe-image-col"
            style={{
              position: "relative",
            }}
          >
            <img
              src="/pregnant-happy-transp.png"
              alt="Gestante feliz"
              className="pe-image-slot"
              style={{
                width: "100%",
                display: "block",
                objectFit: "contain",
              }}
            />
            {/* Fade direita (desktop) */}
            <div
              className="pe-fade-right"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "120px",
                background: "linear-gradient(to right, transparent, #25152F)",
                pointerEvents: "none",
              }}
            />
            {/* Fade baixo (mobile) */}
            <div
              className="pe-fade-bottom"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(37,21,47,0.7), transparent)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* CONTEÚDO DIREITA */}
          <div
            className="pe-content"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {/* Eyebrow label */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "#D4A843",
                  opacity: 0.65,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "8.5px",
                  letterSpacing: "0.52em",
                  textTransform: "uppercase",
                  color: "rgba(196,174,216,0.6)",
                  fontWeight: 300,
                }}
              >
                Medicina Fetal · Ultrassom Especializado
              </span>
            </div>

            {/* Título */}
            <h2
              className="pe-title"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.15,
                color: "#FAF7FC",
                letterSpacing: "-0.015em",
                fontWeight: 400,
                margin: 0,
              }}
            >
              Seu bebê merece<br />
              o mais cuidadoso<br />
              <em
                style={{
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#C4AED8",
                }}
              >
                olhar clínico da cidade
              </em>
            </h2>

            {/* Divisor dourado */}
            <div
              style={{
                width: "52px",
                height: "2px",
                borderRadius: "1px",
                background: "linear-gradient(to right, #D4A843, rgba(196,174,216,0.3))",
              }}
            />

            {/* Descrição */}
            <p
              className="pe-desc"
              style={{
                fontFamily: "'Jost', sans-serif",
                lineHeight: 1.88,
                color: "rgba(196,174,216,0.82)",
                fontWeight: 300,
                margin: 0,
                textWrap: "pretty",
              }}
            >
              Com especialização em medicina fetal e dedicação exclusiva à sua gestação, cada exame é conduzido com precisão técnica e sensibilidade humana — porque ver seu bebê com clareza transforma tudo.
            </p>

            {/* Chips de credenciais */}
            <div
              className="pe-chips"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {["Especialista em Medicina Fetal", "Laudos Personalizados", "Referência Local"].map(
                (chip, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "10.5px",
                      letterSpacing: "0.06em",
                      color: "rgba(196,174,216,0.85)",
                      background: "rgba(196,174,216,0.1)",
                      border: "1px solid rgba(196,174,216,0.2)",
                      borderRadius: "9999px",
                      padding: "7px 15px",
                      textTransform: "uppercase",
                    }}
                  >
                    {chip}
                  </span>
                )
              )}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
              <a
                href="/agendar"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "15px 32px",
                  background: "#D4A843",
                  color: "#25152F",
                  borderRadius: "9999px",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 500,
                  letterSpacing: "0.07em",
                  textDecoration: "none",
                  width: "fit-content",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  margin: "0 auto",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#C4A843")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#D4A843")}
              >
                Agende seu ultrassom
                <span style={{ opacity: 0.7, fontWeight: 400 }}>→</span>
              </a>
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(196,174,216,0.3)",
                }}
              >
                Vagas limitadas · Atendimento exclusivo
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumExperience;
