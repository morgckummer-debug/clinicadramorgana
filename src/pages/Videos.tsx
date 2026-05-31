import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";

const ULTRASTUDIO_URL =
  "https://customer.ultrastudio.com.br/index.html?locator=b1f9a9c4-00eb-471a-a288-d5b359418fa7&nl=1";
const RESIZER_SRC =
  "https://customer.ultrastudio.com.br/iframe-resizer/iframeResizer.min.js";

const Videos = () => {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RESIZER_SRC}"]`,
    );

    const init = () => {
      const w = window as unknown as {
        iFrameResize?: (opts: Record<string, unknown>, target: string) => void;
      };
      if (typeof w.iFrameResize === "function") {
        try {
          w.iFrameResize({ log: false, checkOrigin: false }, "#ultrastudio");
        } catch {
          /* noop */
        }
      }
    };

    if (existing) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.src = RESIZER_SRC;
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Vídeos | Clínica Dra. Morgana Kummer</title>
        <meta
          name="description"
          content="Acesse o vídeo do seu ultrassom. Digite a senha recebida na clínica para visualizar o vídeo do seu bebê."
        />
        <link rel="canonical" href="https://clinicadramorgana.com.br/videos" />
      </Helmet>

      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-[10px] tracking-[0.35em] uppercase text-wine-deep/60">
              Área exclusiva
            </span>
            <h1 className="font-comfortaa text-4xl md:text-5xl font-light text-wine-deep mt-3">
              Vídeos
            </h1>
            <p className="mt-5 text-base text-foreground/70 leading-relaxed max-w-xl mx-auto">
              Digite a senha recebida na clínica no campo abaixo e curta o
              vídeo do seu bebê.
            </p>
            <p className="mt-2 text-xs text-foreground/50">
              Para visualização online, recomendamos uma velocidade de internet
              superior a 2 Mbps.
            </p>
          </div>

          <div className="rounded-2xl bg-card shadow-elegant border border-border/40 overflow-hidden">
            <iframe
              id="ultrastudio"
              title="Portal de vídeos Ultrastudio"
              src={ULTRASTUDIO_URL}
              allowFullScreen
              style={{ border: "none", width: "1px", minWidth: "100%" }}
            >
              <a href={ULTRASTUDIO_URL}>Acesse aqui</a>
            </iframe>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Videos;
