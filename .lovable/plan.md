Existem dois menus no projeto:

1. **Navbar compartilhado** (`src/components/site/Navbar.tsx`) — já tem "Vídeos", precisa remover "Sobre" e o botão "Agendar".
2. **Navbar inline da homepage** (`src/pages/IndexV2.tsx`, linhas 45-117) — precisa remover "Sobre", remover o botão "Agendar" e adicionar o item "Vídeos".

## Mudanças

**`src/components/site/Navbar.tsx`**
- Remover `{ href: "/#sobre", label: "Sobre" }` do array `links`.
- Remover o `<a>` "Agendar" do nav desktop.

**`src/pages/IndexV2.tsx`**
- Remover `{ href: "#sobre", label: "Sobre" }` do `navLinks`.
- Adicionar `{ href: "/videos", label: "Vídeos" }` ao `navLinks`.
- Ajustar o `to=` dos `<Link>` (desktop e mobile) para tratar tanto rotas absolutas (`/videos`) quanto âncoras (`#exames`):
  ```tsx
  to={l.href.startsWith("/") ? l.href : `/${l.href}`}
  ```
- Remover o `<a>` "Agendar" do nav desktop.

A seção `#sobre` continua existindo na página; apenas sai do menu. Nenhuma outra alteração.