import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/painel/ProtectedRoute";
import { exams } from "./data/exams";

const IndexV2 = lazy(() => import("./pages/IndexV2.tsx"));
const Index = lazy(() => import("./pages/Index.tsx"));
const ExamDetail = lazy(() => import("./pages/ExamDetail.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PreAgendamento = lazy(() => import("./pages/PreAgendamento.tsx"));
const Agendar = lazy(() => import("./pages/Agendar.tsx"));
const PatientPortal = lazy(() => import("./pages/PatientPortal.tsx"));
const PainelLogin = lazy(() => import("./pages/painel/Login.tsx"));
const PainelDashboard = lazy(() => import("./pages/painel/Dashboard.tsx"));
const PainelDetalhe = lazy(() => import("./pages/painel/Detalhe.tsx"));
const PainelListaNegra = lazy(() => import("./pages/painel/ListaNegra.tsx"));
const Preparo = lazy(() => import("./pages/Preparo.tsx"));
const ComoChegar = lazy(() => import("./pages/ComoChegar.tsx"));
const FalarSecretaria = lazy(() => import("./pages/FalarSecretaria.tsx"));

const queryClient = new QueryClient();

const legacyRoutes = exams
  .map((e) => e.legacySlug)
  .filter((s): s is string => Boolean(s));

const HomeSkeleton = () => (
  <div className="w-full h-screen bg-gradient-to-b from-slate-100 to-slate-50 animate-pulse" />
);

const AppContent = () => {
  useEffect(() => {
    // Cleanup antigos SWs registrados na raiz em página pública (apenas uma vez)
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        registrations.forEach((reg) => {
          if (reg.scope === window.location.origin + '/') {
            console.log('🗑️  Desregistrando SW antigo da raiz')
            reg.unregister()
          }
        })
      })
      .catch(() => {})
  }, [])

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
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={null}>
          <AppContent />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthProvider>
  </LanguageProvider>
);

export default App;
