## Contexto

O usuário quer adicionar o Google Analytics 4 ao projeto antes de conectar o domínio customizado. O ID da propriedade é **G-7FQ0YH08X1**.

A documentação do Lovable não oferece integração nativa com GA4 (não há campo no Project Settings para isso). A abordagem padrão é inserir o script `gtag.js` diretamente no `<head>` do `index.html`.

## Plano

1. **Inserir o snippet GA4 no `index.html`**
   - Adicionar o script de carregamento assíncrono do `gtag.js` com o ID `G-7FQ0YH08X1`.
   - Incluir o script inline de configuração (`gtag('config', 'G-7FQ0YH08X1')`) logo abaixo.
   - Posicionar no `<head>`, após as meta tags principais e antes das fontes, para garantir que o rastreamento inicie o mais cedo possível.

2. **Verificar consistência**
   - Confirmar que não há conflitos com outros scripts de terceiros já presentes no `<head>`.

## O que será alterado

- `index.html`: adição do snippet GA4 oficial do Google.

## Não será alterado

- Nenhum outro arquivo do projeto.
- Nenhuma configuração de backend ou roteamento.

## Nota sobre o domínio

Quando o domínio `dramorgana.com.br` for conectado posteriormente, o GA4 continuará funcionando normalmente desde que o mesmo ID de propriedade seja mantido. O histórico de dados do GA4 fica no Google, não no servidor. A propriedade atual (`clinicadramorgana.lovable.app`) e o domínio futuro podem compartilhar o mesmo ID GA4 sem perda de dados.
