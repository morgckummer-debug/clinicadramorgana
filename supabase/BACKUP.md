# Proteção contra perda de dados

## O risco

O banco está num projeto Supabase do **plano gratuito**. Nesse plano:

- Projeto sem atividade de banco por cerca de **uma semana** é **pausado**.
  Enquanto pausado, o formulário e o painel param de funcionar.
- O plano gratuito **não guarda backup nenhum**. Não existe um botão de
  "restaurar de ontem" — se o projeto for descartado, some tudo: pacientes,
  pré-agendamentos e os pedidos médicos anexados.

Ou seja: a única cópia dos dados é a que a gente fizer.

## As três proteções

| Proteção | O que faz | Onde vive |
|---|---|---|
| **Keep-alive** | Escreve no banco todo dia, para o projeto nunca ser pausado | `.github/workflows/supabase-keepalive.yml` |
| **Backup automático** | Toda madrugada, baixa tudo e guarda criptografado por 90 dias | `.github/workflows/supabase-backup.yml` |
| **Backup manual** | Botão 💾 no painel: baixa tudo na hora, para o seu computador | Cabeçalho do painel |

E, para o dia ruim, o `scripts/supabase-restore.ts` devolve qualquer um desses
backups para dentro de um projeto Supabase novo.

---

## O que você precisa fazer (uma vez só)

### 1. Aplicar a migration do keep-alive

Supabase Dashboard → **SQL Editor** → **New query** → cole o conteúdo de
`supabase/migrations/20260825_keepalive.sql` → **Run**.

(Num projeto novo isso não é preciso: o `bootstrap.sql` já traz.)

### 2. Escolher a senha do backup

Peça ao seu gerenciador de senhas para gerar **seis palavras aleatórias** (ou
30 caracteres aleatórios) e **guarde lá dentro**, não só na cabeça.

O backup se recusa a rodar, de propósito, se a senha não passar em duas regras:

- pelo menos **20 caracteres**;
- pelo menos **8 caracteres diferentes** entre si — repetir a mesma palavra
  (`clinica-clinica-clinica`) ou uma sequência (`12341234123412341234`) fica
  longo mas é rápido de quebrar.

> ⚠️ **Esta senha é a única coisa que protege os dados das pacientes.** Como o
> repositório é público, o arquivo do backup pode ser baixado por qualquer
> pessoa — e quem baixou pode tentar adivinhar a senha à vontade, no computador
> dela, sem pressa e sem ninguém ver. Senha curta ou "adivinhável" (nome da
> clínica, ano, data de nascimento) não protege nada. Palavras aleatórias, sim.

> ⚠️ **Sem essa senha o backup não abre.** Ninguém consegue recuperar por você:
> é isso que impede que outra pessoa leia os dados das pacientes.

### 3. Cadastrar os dois segredos no GitHub

No repositório: **Settings → Secrets and variables → Actions → New repository
secret**. Crie os dois:

| Nome | Valor |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → chave **service_role** |
| `BACKUP_PASSPHRASE` | a senha do passo 2 |

> A chave `service_role` enxerga tudo no banco. Ela só pode existir aqui, nos
> segredos do GitHub — nunca no código, nunca no site, nunca no WhatsApp.

Se o projeto Supabase mudar de endereço um dia, cadastre também a variável
`SUPABASE_URL` (aba **Variables**, ao lado de Secrets).

### 4. Conferir que funcionou

Aba **Actions** do repositório → **Backup do Supabase** → **Run workflow**.
Em um ou dois minutos aparece um ✓ verde e, dentro da rodada, o resumo com as
contagens e o artifact `backup-supabase-...` para baixar.

Faça o mesmo com **Keep-alive do Supabase**.

---

## No dia a dia

**Não precisa fazer nada.** As duas rotinas rodam sozinhas:

- keep-alive todo dia às 06:20 (horário de Brasília);
- backup todo dia às 03:40.

Se alguma delas falhar, o GitHub manda e-mail para você. Falha do keep-alive
quase sempre quer dizer *projeto pausado* — e o próprio erro traz o passo a
passo para despausar.

### Baixar um backup automático

Actions → **Backup do Supabase** → clique na rodada que você quer → seção
**Artifacts** no fim da página → baixe o `.zip`. Dentro dele vem:

- `backup-clinica-....cdmk` — os dados, criptografados;
- `backup-clinica-....-resumo.txt` — as contagens, em texto puro (dá para
  conferir a rodada sem usar a senha).

### Backup manual, na hora

No painel, botão 💾 no canto superior direito → **Gerar e baixar**. Sai um
`.json` com tudo, direto na pasta de downloads. Bom antes de mexer no banco,
ou quando você quiser uma cópia sua.

> O arquivo tem nome, CPF, telefone e os pedidos médicos das pacientes. Guarde
> no computador da clínica ou num pendrive/HD seu. Não mande por WhatsApp,
> e-mail nem pasta compartilhada.

---

## Restaurar

### Caso 1 — o projeto foi pausado (o comum)

Não precisa de backup. <https://supabase.com/dashboard> → entre no projeto →
**Restore project**. Os dados voltam junto. Depois confira se o keep-alive está
rodando, para não acontecer de novo.

### Caso 2 — o projeto sumiu

1. Crie um projeto Supabase novo e vazio.
2. **SQL Editor** → cole todo o `supabase/bootstrap.sql` → **Run**.
   (Isso recria tabelas, RLS, funções, bucket e realtime.)
3. Devolva os dados:

   ```bash
   # confere o que tem no arquivo, sem escrever nada
   BACKUP_PASSPHRASE='sua-senha' \
     bun run restore caminho/backup-clinica-....cdmk

   # restaura de verdade
   SUPABASE_URL=https://seu-projeto-novo.supabase.co \
   SUPABASE_SERVICE_ROLE_KEY='chave-service_role-do-projeto-novo' \
   BACKUP_PASSPHRASE='sua-senha' \
     bun run restore caminho/backup-clinica-....cdmk --confirmar
   ```

   O mesmo comando aceita o `.json` do botão do painel (esse não pede senha).

4. **Authentication → Users**: recrie os logins das secretárias com *Auto
   Confirm User* marcado. Senhas não saem no backup, de propósito.
5. Atualize `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` na Vercel e faça o
   deploy.

As linhas voltam com o `id` original, então rodar a restauração duas vezes não
duplica nada.

---

## Coisas que valem saber

- **O GitHub desliga rotinas agendadas depois de 60 dias sem nenhuma atividade
  no repositório.** Ele avisa por e-mail antes. Para religar: Actions → o
  workflow → **Enable workflow**. Se você mexe no site de vez em quando, isso
  nunca chega a acontecer.
- **O artifact do backup vive 90 dias** e some sozinho. Como o backup é diário,
  sempre existem uns 90 arquivos disponíveis. Se quiser guardar um marco (fim
  de ano, por exemplo), baixe e salve num HD seu.
- **Este repositório é público**, e isso foi uma decisão consciente: o backup
  automático só sai criptografado, então o que fica público é um bloco de bytes
  ilegível. Em compensação, tudo depende da senha ser forte (veja o passo 2). E
  nenhum backup pode ser commitado aqui — o `.gitignore` já barra
  `backup-saida/`, `*.cdmk` e `backup-clinica-*.json`.
- Se um dia o repositório virar **privado**, lembre que o plano gratuito passa a
  ter teto de 500 MB de artifact. Aí vale reduzir a retenção do backup (por
  exemplo, diário guardado 14 dias + uma cópia mensal guardada 90).
- **LGPD.** Todo backup é um pacote de dados pessoais e de saúde. Guarde poucas
  cópias, em lugar controlado, e apague as que não servem mais.

## Rodar na mão

```bash
# backup para a sua máquina
SUPABASE_SERVICE_ROLE_KEY='...' BACKUP_PASSPHRASE='...' bun run backup

# batida do keep-alive (não precisa de chave nenhuma)
bun run keepalive
```
