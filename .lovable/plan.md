## Problema

`/painel` e `/painel/login` quebram porque o `App.tsx` não envolve as rotas no `AuthProvider`. Como `Login`, `Dashboard` e `Detalhe` chamam `useAuth()`, o hook lança `"useAuth must be used within AuthProvider"` e a página fica em branco. Além disso, faltam rotas para `/painel/:id` (Detalhe) e `/painel/lista-negra`, e o `Dashboard` não está protegido por `ProtectedRoute`.

## Correções

1. **`src/App.tsx`**
   - Importar `AuthProvider` (`@/contexts/AuthContext`) e `ProtectedRoute` (`@/components/painel/ProtectedRoute`).
   - Lazy-load `PainelDetalhe` (`./pages/painel/Detalhe.tsx`) e `PainelListaNegra` (`./pages/painel/ListaNegra.tsx`).
   - Envolver `<BrowserRouter>` (ou só o grupo de rotas `/painel*`) com `<AuthProvider>`.
   - Atualizar rotas do painel:
     - `/painel/login` → `<PainelLogin />`
     - `/painel` → `<ProtectedRoute><PainelDashboard /></ProtectedRoute>`
     - `/painel/lista-negra` → `<ProtectedRoute><PainelListaNegra /></ProtectedRoute>`
     - `/painel/:id` → `<ProtectedRoute><PainelDetalhe /></ProtectedRoute>`

Sem mudanças em demais rotas, conteúdo ou estilos.