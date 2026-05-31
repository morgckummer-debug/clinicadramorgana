import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import IndexV2 from "./pages/IndexV2.tsx";
import ExamDetail from "./pages/ExamDetail.tsx";
import Videos from "./pages/Videos.tsx";
import NotFound from "./pages/NotFound.tsx";
import { exams } from "./data/exams";

const queryClient = new QueryClient();

/**
 * URLs históricas que devem permanecer ativas indefinidamente
 * (indexação no Google, campanhas no Google Ads, dados no Analytics).
 * Cada exame guarda seu legacySlug e essa rota é registrada
 * automaticamente abaixo.
 */
const legacyRoutes = exams
  .map((e) => e.legacySlug)
  .filter((s): s is string => Boolean(s));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexV2 />} />
          <Route path="/v1" element={<Index />} />
          <Route path="/v2" element={<IndexV2 />} />

          {/* Rotas dos exames pelo slug novo */}
          <Route path="/exames/:slug" element={<ExamDetail />} />
          <Route path="/videos" element={<Videos />} />

          {/* Rotas históricas preservadas para SEO / Ads / Analytics */}
          {legacyRoutes.map((path) => (
            <Route key={path} path={path} element={<ExamDetail />} />
          ))}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
