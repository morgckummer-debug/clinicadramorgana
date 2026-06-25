import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import IndexV2 from "./pages/IndexV2.tsx";
import { exams } from "./data/exams";

const IndexV2 = lazy(() => import("./pages/IndexV2.tsx"));
const Index = lazy(() => import("./pages/Index.tsx"));
const ExamDetail = lazy(() => import("./pages/ExamDetail.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

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

const HomeSkeleton = () => (
  <div className="w-full h-screen bg-gradient-to-b from-slate-100 to-slate-50 animate-pulse" />
);

const AppContent = () => {
  useServiceWorker()

  return (
    <Routes>
      <Route path="/" element={<Suspense fallback={<HomeSkeleton />}><IndexV2 /></Suspense>} />
      <Route path="/v1" element={<Index />} />
      <Route path="/v2" element={<IndexV2 />} />
      <Route path="/exames/:slug" element={<ExamDetail />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/agendar" element={<PatientPortal />} />
      <Route path="/pre-agendamento" element={<PreAgendamento />} />
      <Route path="/preparo" element={<Preparo />} />
      <Route path="/como-chegar" element={<ComoChegar />} />
      <Route path="/falar-secretaria" element={<FalarSecretaria />} />

      {/* Painel interno */}
      <Route path="/painel/login" element={<PainelLogin />} />
      <Route path="/painel" element={<ProtectedRoute><PainelDashboard /></ProtectedRoute>} />
      <Route path="/painel/lista-negra" element={<ProtectedRoute><PainelListaNegra /></ProtectedRoute>} />
      <Route path="/painel/:id" element={<ProtectedRoute><PainelDetalhe /></ProtectedRoute>} />

      {legacyRoutes.map((path) => (
        <Route key={path} path={path} element={<ExamDetail />} />
      ))}

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <LanguageProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </LanguageProvider>
);

export default App;
