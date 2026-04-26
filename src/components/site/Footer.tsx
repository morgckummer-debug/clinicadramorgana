export const Footer = () => {
  return (
    <footer className="bg-wine-deep text-wine-foreground/70 border-t border-champagne/15 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wide">
        <div>© {new Date().getFullYear()} Clínica Dra. Morgana Kummer · Sete Lagoas / MG</div>
        <div className="text-champagne/80">Para momentos importantes, cuidados únicos.</div>
      </div>
    </footer>
  );
};
