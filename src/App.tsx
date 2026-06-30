import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
const PatientPortal = lazy(() => import("./pages/PatientPortal.tsx"));
const PreAgendamento = lazy(() => import("./pages/PreAgendamento.tsx"));
const Preparo = lazy(() => import("./pages/Preparo.tsx"));
const ComoChegar = lazy(() => import("./pages/ComoChegar.tsx"));
const FalarSecretaria = lazy(() => import("./pages/FalarSecretaria.tsx"));
const PainelLogin = lazy(() => import("./pages/painel/Login.tsx"));
const PainelDashboard = lazy(() => import("./pages/painel/Dashboard.tsx"));
const PainelDetalhe = lazy(() => import("./pages/painel/Detalhe.tsx"));
const PainelListaNegra = lazy(() => import("./pages/painel/ListaNegra.tsx"));

const queryClient = new QueryClient();

const legacyRoutes = exams
  .map((e) => e.legacySlug)
  .filter((s): s is string => Boolean(s));

/**
 * Esqueleto leve renderizado enquanto o chunk da rota carrega.
 * Espelha apenas o que o navbar real mostra (logo), evitando
 * elementos que somem assim que a página real entra.
 */
const RouteFallback = () => (
  <div className="min-h-screen bg-background">
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="container flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo-horiz.png"
            alt="Clínica de Ultrassom Dra. Morgana Kummer"
            width={200}
            height={48}
            className="h-12 w-auto"
          />
        </a>
      </div>
    </header>
  </div>
);

const App = () => (
  <LanguageProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<IndexV2 />} />
                <Route path="/v1" element={<Index />} />
                <Route path="/v2" element={<IndexV2 />} />
                <Route path="/inicio" element={<Navigate to="/" replace />} />
                <Route path="/exames/:slug" element={<ExamDetail />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/agendar" element={<PatientPortal />} />
                <Route path="/pre-agendamento" element={<PreAgendamento />} />
                <Route path="/preparo" element={<Preparo />} />
                <Route path="/como-chegar" element={<ComoChegar />} />
                <Route path="/falar-secretaria" element={<FalarSecretaria />} />
                <Route path="/painel/login" element={<PainelLogin />} />
                <Route path="/painel" element={<ProtectedRoute><PainelDashboard /></ProtectedRoute>} />
                <Route path="/painel/lista-negra" element={<ProtectedRoute><PainelListaNegra /></ProtectedRoute>} />
                <Route path="/painel/:id" element={<ProtectedRoute><PainelDetalhe /></ProtectedRoute>} />
                {legacyRoutes.map((path) => (
                  <Route key={path} path={path} element={<ExamDetail />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </LanguageProvider>
);

export default App;
