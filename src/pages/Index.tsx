import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Credentials } from "@/components/site/Credentials";
import { About } from "@/components/site/About";
import { Exams } from "@/components/site/Exams";
import { Convenios } from "@/components/site/Convenios";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { ScheduleFab } from "@/components/site/ScheduleFab";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Dra. Morgana Kummer · Clínica de Ultrassom em Sete Lagoas";
    const meta = document.querySelector('meta[name="description"]');
    const content = "Ultrassonografia obstétrica, ginecológica e fetal em Sete Lagoas. Atendimento humanizado, equipamento de ponta e laudo na hora com a Dra. Morgana Kummer.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Credentials />
      <About />
      <Exams />
      <Convenios />
      <Contact />
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

export default Index;
