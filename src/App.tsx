import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/painel/ProtectedRoute";
import IndexV2 from "./pages/IndexV2.tsx";
import { exams } from "./data/exams";

const Index = lazy(() => import("./pages/Index.tsx"));
const ExamDetail = lazy(() => import("./pages/ExamDetail.tsx"));
const Videos = lazy(() => import("./pages/Videos.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const PreAgendamento = lazy(() => import("./pages/PreAgendamento.tsx"));
const PainelLogin = lazy(() => import("./pages/painel/Login.tsx"));
const PainelDashboard = lazy(() => import("./pages/painel/Dashboard.tsx"));
const PainelDetalhe = lazy(() => import("./pages/painel/Detalhe.tsx"));

const queryClient = new QueryClient();

const legacyRoutes = exams
  .map((e) => e.legacySlug)
  .filter((s): s is string => Boolean(s));

const App = () => (
  <LanguageProvider>
  <AuthProvider>
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
            <Route path="/exames/:slug" element={<ExamDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/pre-agendamento" element={<PreAgendamento />} />

            {/* Painel interno */}
            <Route path="/painel/login" element={<PainelLogin />} />
            <Route path="/painel" element={<ProtectedRoute><PainelDashboard /></ProtectedRoute>} />
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
