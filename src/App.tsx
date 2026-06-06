import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import IndexV2 from "./pages/IndexV2.tsx";
import { exams } from "./data/exams";

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

const App = () => (
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
);

export default App;
