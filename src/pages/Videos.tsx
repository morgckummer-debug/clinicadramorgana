import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar, Footer, WhatsAppFab } from "@/pages/IndexV2";

const setMeta = (name: string, content: string) => {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
};

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

  useEffect(() => {
    const prev = document.title;
    document.title = "Vídeos | Clínica Dra. Morgana Kummer";
    setMeta(
      "description",
      "Acesse o vídeo do seu ultrassom. Digite a senha recebida na clínica para visualizar o vídeo do seu bebê.",
    );
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="container max-w-3xl">
          <div className="flex justify-between items-start mb-12">
            <Link
              to="/"
              className="flex items-center gap-2 text-wine-deep/70 hover:text-wine-deep transition-colors duration-300 text-sm font-medium"
            >
              <ArrowLeft size={18} />
              Voltar
            </Link>
          </div>
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
