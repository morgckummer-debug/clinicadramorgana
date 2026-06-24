# Manual do Sistema — Secretarias
## Clínica Dra. Morgana Kummer

---

## Sumário

1. [O que é esse sistema](#1-o-que-é-esse-sistema)
2. [Acesso e Login](#2-acesso-e-login)
3. [Painel Principal (Dashboard)](#3-painel-principal-dashboard)
4. [Ficha do Paciente](#4-ficha-do-paciente)
5. [Status do Pré-agendamento](#5-status-do-pré-agendamento)
6. [Contato via WhatsApp](#6-contato-via-whatsapp)
7. [Lista Negra (Bloqueio de Pacientes)](#7-lista-negra-bloqueio-de-pacientes)
8. [Informações Obstétricas](#8-informações-obstétricas)
9. [Notificações em Tempo Real](#9-notificações-em-tempo-real)
10. [Alterar Senha e Sair](#10-alterar-senha-e-sair)
11. [Fluxo de Trabalho do Dia a Dia](#11-fluxo-de-trabalho-do-dia-a-dia)

---

## 1. O que é esse sistema

O sistema é a ferramenta de gestão de **pré-agendamentos** da clínica. Quando um paciente pede um agendamento pelo site, o pedido aparece aqui para a secretária dar continuidade — entrar em contato, confirmar o exame e registrar o agendamento.

O sistema **não** agenda automaticamente: ele organiza a fila de pedidos e ajuda a secretária a acompanhar cada caso.

---

## 2. Acesso e Login

**Endereço do painel:** `/painel/login`

- Entre com o e-mail e senha fornecidos pela clínica.
- Caso esqueça a senha, use o link de recuperação por e-mail.
- Para **alterar sua senha**, clique no ícone de chave no canto superior direito do painel.

---

## 3. Painel Principal (Dashboard)

Ao fazer login, você cai direto na lista de pré-agendamentos.

### O que você vê na tela

- **Caixa "Pendentes para agendar"**: mostra quantos pedidos ainda não foram atendidos. O número aparece também na aba do navegador (ex: `(3) Painel · MK`).
- **Barra de pesquisa**: busque por nome do paciente, tipo de exame ou telefone (basta digitar os últimos dígitos).
- **Lista de pacientes**: cada linha mostra nome, exame solicitado, turno preferido e o status atual.

### Filtros de status

Use os botões na parte superior para filtrar a lista:

| Botão | O que mostra |
|---|---|
| **Pendentes** | Pedidos novos, ainda sem atendimento |
| **Atendido** | Você (ou outra secretária) está em contato |
| **Aguardando Resposta** | Aguardando retorno do paciente |
| **Agendados** | Exame já confirmado |
| **Todos** | Todos os pedidos, independente do status |

Os botões **Pendentes** e **Aguardando Resposta** mostram um número vermelho/âmbar com a quantidade de casos naquela situação.

### Avisos na lista

- **Triângulo amarelo** ao lado do nome: o paciente tem mais de um pré-agendamento cadastrado.
- **Ícone vermelho de bloqueio**: o paciente está na lista negra.

---

## 4. Ficha do Paciente

Clique em qualquer linha da lista para abrir a ficha completa do paciente.

### Informações do paciente (coluna esquerda)

| Campo | Detalhe |
|---|---|
| **Nome** | Nome completo |
| **CPF** | Com botão de copiar ao lado |
| **Data de nascimento** | Exibe também a idade calculada automaticamente |
| **Telefone** | Número formatado |

### Informações do pedido (coluna direita)

| Campo | Detalhe |
|---|---|
| **Exame** | Tipo de exame solicitado |
| **Turno** | Manhã, Tarde ou Indiferente |
| **Médico preferido** | Preferência do paciente (pode ser "Sem preferência") |
| **Convênio** | Plano de saúde informado |

### Observações do paciente

Se o paciente escreveu alguma observação ao preencher o formulário, ela aparece aqui em uma caixa cinza.

### Editar dados do paciente

Clique no **ícone de lápis** ao lado do nome para corrigir ou atualizar qualquer dado (nome, CPF, telefone, data de nascimento).

### Documentos anexados

Se o paciente enviou pedido médico, exame anterior ou beta-hCG, os documentos aparecem com botões para visualizar. Clique para abrir o arquivo.

### Histórico de pré-agendamentos

No final da ficha, aparece se esse paciente já fez outros pedidos. Se o mesmo exame foi pedido em menos de 7 dias, o histórico fica em **vermelho** como alerta.

---

## 5. Status do Pré-agendamento

Cada pré-agendamento passa por etapas. Na ficha do paciente, os botões de status ficam na parte inferior da tela.

### Etapas em ordem

```
Pendente → Em Atendimento → Aguardando Resposta → Agendado
                                                 ↘ Cancelado
```

| Status | Cor | Significado |
|---|---|---|
| **Pendente** | Amarelo/Âmbar | Pedido novo, ninguém atendeu ainda |
| **Em Atendimento** | Azul | Uma secretária está cuidando do caso |
| **Aguardando Resposta** | Laranja (pisca) | Secretária entrou em contato e aguarda o paciente responder |
| **Agendado** | Verde | Exame confirmado e agendado |
| **Cancelado** | Vermelho | Pedido cancelado |

### Botão "Devolver para fila"

Aparece quando o status **não é Pendente**. Usado quando você precisa devolver o caso para a fila — por exemplo, se outra secretária deve retomar o atendimento.

### Recado entre secretárias (Aguardando Resposta)

Ao marcar como **"Aguardando Resposta"**, o sistema abre uma janela para você escrever um **recado opcional** para a colega que for retomar o caso.

Esse recado aparece em um **banner laranja** na ficha, mostrando:
- Nome da secretária que iniciou o contato
- Horário e data
- O texto do recado em itálico

> **Exemplo de uso:** "Já mandei o WhatsApp, paciente disse que vai confirmar amanhã de manhã."

---

## 6. Contato via WhatsApp

Na ficha do paciente, o botão verde **"Entrar em contato com [Nome]"** abre diretamente uma conversa no WhatsApp com o paciente.

- A mensagem inicial já vem **preenchida automaticamente** com seu nome e o tipo de exame.
- Ao clicar, o status muda automaticamente para **"Em Atendimento"** (se ainda estava Pendente).

---

## 7. Lista Negra (Bloqueio de Pacientes)

Acesse pelo link **"Lista negra"** no canto superior direito do painel (ícone de proibido).

### Para que serve

Pacientes na lista negra continuam conseguindo preencher o formulário do site, mas **a secretária é avisada** que aquela pessoa está bloqueada. Isso evita enganos ao agendar.

### Bloquear um paciente

Na ficha do paciente, clique no **ícone de bloqueio** (círculo com traço) no topo da tela.

- Um campo de **motivo** aparece (opcional, mas recomendado).
- O motivo fica visível só para as secretárias — não aparece para o paciente.
- O sistema registra **quem bloqueou e quando**.

> **Dica:** sempre escreva o motivo. Se outra secretária encontrar esse paciente mais tarde, ela vai entender o contexto sem precisar perguntar.

### Desbloquear um paciente

Para desbloquear, você pode:
- Acessar a **Lista Negra** e clicar em "Desbloquear" no card do paciente; ou
- Abrir a ficha do paciente e clicar no mesmo ícone de bloqueio (que estará vermelho).

**Importante:** ao desbloquear, o **motivo da nota continua salvo** no sistema para referência futura. Isso significa que, mesmo depois do desbloqueio, qualquer secretária consegue ler o histórico e entender por que aquela pessoa já foi bloqueada. O desbloqueio também registra **quem desbloqueou e quando**.

### Avisos visuais

- **Ícone vermelho** na ficha: paciente está bloqueado no momento.
- **Badge amarelo de alerta** na lista: paciente já foi bloqueado em algum momento (mesmo que hoje esteja desbloqueado).
- **Banner vermelho** na ficha: mostra o motivo do bloqueio atual.

### O que aparece na tela da Lista Negra

Para cada paciente bloqueado, você vê:
- Nome, CPF e telefone
- Motivo do bloqueio (se foi registrado)
- Quem bloqueou e quando
- Botão para desbloquear

---

## 8. Informações Obstétricas

Quando o exame solicitado é **obstétrico**, o sistema calcula automaticamente algumas informações com base na DUM (Data da Última Menstruação) informada pela paciente.

### O que aparece na ficha

- **DUM**: data da última menstruação
- **IG (Idade Gestacional)**: calculada em semanas e dias
- **Janelas ideais de agendamento** (caixa roxa):

| Exame | Período ideal |
|---|---|
| Morfológico 1º Trimestre / TN | 84 a 97 dias após a DUM |
| Morfológico 2º Trimestre | 147 a 182 dias após a DUM |
| 3D Completo | 175 a 195 dias após a DUM |

- **Ultrassom anterior**: se a paciente informou um exame anterior, a data e a idade gestacional daquele exame são exibidos para referência.

### Rastreamento de Ovulação

Para exames de rastreamento de ovulação, o sistema mostra os **dias ideais do ciclo** para o exame (10º, 12º e 14º dia), calculados a partir da data do ciclo informada.

---

## 9. Notificações em Tempo Real

O painel se atualiza automaticamente. Você não precisa ficar atualizando a página.

- **Som + mensagem (toast)**: quando um novo pré-agendamento chega, você ouve um som e vê uma notificação com o nome do paciente e o exame.
- **Número na aba do navegador**: mostra os pendentes em tempo real (`(n) Painel · MK`).
- **Aviso ao logar**: se você tem casos em "Aguardando Resposta" atribuídos a você, um aviso aparece na tela. Esse aviso reaparece a cada 10 minutos enquanto houver casos pendentes.
- **Atualização automática**: a lista é atualizada silenciosamente a cada 20 segundos.

---

## 10. Alterar Senha e Sair

No canto superior direito do painel:

- **Ícone de chave (🔑)**: alterar senha — informe a senha atual e a nova senha.
- **"Sair"**: encerra sua sessão.

---

## 11. Fluxo de Trabalho do Dia a Dia

```
1. Fazer login no painel
2. Ver os pedidos "Pendentes" no dashboard
3. Clicar no paciente para abrir a ficha
4. Clicar no botão verde para abrir o WhatsApp e entrar em contato
   → Status muda automaticamente para "Em Atendimento"
5. Se precisar aguardar resposta → marcar "Aguardando Resposta"
   → Escrever recado para a colega (opcional, mas recomendado)
6. Quando o exame for confirmado → marcar "Agendado"
7. Se o paciente desistir ou não responder → marcar "Cancelado"
8. Se precisar alertar sobre um paciente problemático → usar "Bloquear"
   e escrever o motivo na nota
```

### Dicas rápidas

- Use a **barra de pesquisa** para encontrar um paciente pelo telefone (basta os últimos dígitos).
- O **recado entre secretárias** é fundamental quando o plantão muda com casos em aberto.
- A **nota de bloqueio** é a memória coletiva da equipe — sempre escreva o motivo para quem vier depois entender.
- Fique de olho no **badge vermelho** de pendentes — quanto menor, melhor!

---

*Documento gerado em junho de 2026 — Clínica Dra. Morgana Kummer*
