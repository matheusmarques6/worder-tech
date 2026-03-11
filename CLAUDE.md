# WORDER — CRM Inteligente para E-commerce (Convertfy)

## Visão Geral
Plataforma all-in-one de CRM inteligente para e-commerce. Unifica dados, comunicação, automações e IA em produto modular.

## Arquitetura Modular (5 Módulos)
- **Worder Data** — Tracking & CDP: pixel JS, integrações (Shopify, WooCommerce, Nuvemshop, VTEX, Tray), webhooks pagamento, UTM, LGPD, CDP 360°, RFM, Predicted CLV
- **Worder CRM** — Contatos, Pipeline Kanban, Tarefas, Permissões
- **Worder AI** — Recuperação (carrinho, PIX, boleto, cartão), Agente WhatsApp/Chat, FAQ, Catálogo Conversacional, Handoff humano
- **Worder Inbox** — Omnichannel (WhatsApp, Instagram, Chat Web), 3 colunas, multiatendimento, distribuição, transferência
- **Worder Campaigns** — E-mail (drag-and-drop), SMS, WhatsApp Broadcast, Chat Web (popups), Automações (Flows)

## Design System & Regras Visuais

### Paleta de Cores
- Primária: #F26B2A (Laranja Worder)
- Secundária: #F5A623 (Amarelo dourado)
- Dark: #1A1A1A (Preto carvão)
- Gradiente Hero: linear-gradient(135deg, #F26B2A 0%, #F5A623 100%)
- Background: #FAFAFA
- Card BG: #FFFFFF
- Sucesso: #22C55E | Erro: #EF4444 | Alerta: #F59E0B | Info: #3B82F6

### Tipografia
- UI: Inter | Headings: Plus Jakarta Sans | Mono: JetBrains Mono

### Ícones
- USAR: Phosphor Icons (duotone/fill) ou Remix Icons
- PROIBIDO: Lucide, Heroicons (genéricos)

### Regras de Diferenciação (vs. Klaviyo/Reportana)
- Sidebar DARK #1A1A1A com ícones filled/duotone, item ativo com barra lateral laranja
- Fundo #FAFAFA (não branco puro), cards em #FFF
- Botões primários com gradiente laranja, border-radius 10px, shadow sutil
- Tabelas: headers dark #1A1A1A texto branco, hover row com borda esquerda laranja
- Cards KPI: shadow pronunciada, ícone em círculo gradiente, indicador tendência
- Flow Builder HORIZONTAL (não vertical), mini-map, snap-to-grid
- Dashboard: Hero card no topo com gradiente dark→laranja, métrica principal 48px
- Dark mode desde dia 1
- Micro-interações (200-300ms ease) em TUDO via Framer Motion

## Mapa de Rotas (47 páginas)

### Autenticação
- /login, /signup, /forgot-password, /reset-password

### Onboarding (6 etapas)
- /onboarding, /onboarding/connect-store, /onboarding/install-pixel, /onboarding/connect-whatsapp, /onboarding/import-contacts, /onboarding/first-form, /onboarding/first-automation

### Aplicação
- /dashboard — Hero card + 4 KPIs primários + 6 secundários + gráficos + tabelas
- /inbox — 3 colunas (lista|chat|contexto), tabs: Você, Equipe, Aguardando, IA/Bot, Concluído
- /contacts — Lista, /contacts/:id (tabs: details, metrics, lists, orders, conversations), /contacts/lists (library, create), /contacts/import
- /campaigns — Lista, /create (wizard: channel→audience→content→review), /:id, /:id/editor
- /automations — Lista, /templates, /:id/builder (flow horizontal)
- /recovery — KPIs + tabs: Carrinhos, PIX, Boletos, Cartões
- /site — /forms, /forms/:id/editor, /chat-widget
- /content — /templates, /templates/whatsapp, /products, /media, /coupons
- /analytics — Overview, /deliverability, /metrics, /benchmarks, /reports
- /integrations — Lista, /:id
- /settings — account, users, billing, email, whatsapp, instagram, chat-web, tracking, attribution, utm, api, security

## Specs de Páginas Principais

### Dashboard (Seção 4.1)
1. **Hero Card** — Full-width, gradiente dark→laranja, "Receita Recuperada pela Worder" 48px bold
2. **4 KPIs Primários** — Receita Total, Pedidos, Ticket Médio, Novos Leads (ícone gradiente + sparkline)
3. **6 KPIs Secundários** — Carrinhos abandonados (R$), Recuperados (R$), PIX pendentes, Atendimentos ativos, Mensagens enviadas, Taxa de recuperação
4. **Gráfico Receita** — Line chart: Receita Total vs. Receita Atribuída (laranja atribuída, cinza total)
5. **Receita por Canal** — Bar chart horizontal: E-mail, WhatsApp, SMS, Chat Web
6. **Top Automações** — Tabela 5 melhores por receita
7. **Campanhas Recentes** — Tabela 5 últimas
8. **Seletor de Período** — Dropdown: Hoje, 7d, 30d, 90d, Custom

### Inbox (Seção 4.2)
- 3 colunas: Lista (300px) | Chat (flex) | Contexto (320px toggle)
- Coluna 1: busca + filtros + tabs + cards de conversa com avatar/canal/badge não lido
- Coluna 2: header + bolhas de chat + input com emojis/anexos/áudio + tab "Nota" + botão "Worder IA"
- Coluna 3: dados CRM, abas Perfil/Pedidos/Timeline/Notas, métricas LTV

### Recovery (Seção 4.3)
- KPI cards no topo + tabs por tipo + tabela com IA Status + ações rápidas WhatsApp/e-mail

### Flow Builder (Seção 4.4)
- Full-screen: sidebar ações + canvas infinito HORIZONTAL + navbar topo
- Triggers: Checkout Started, Cart Abandoned, Placed Order, PIX, Boleto, Cartão, etc.
- Conectores curvos, mini-map, snap-to-grid

### Editor de E-mail (Seção 4.5)
- Full-screen: sidebar blocos (dark) + canvas preview + toolbar
- Toggle Desktop/Mobile, merge tags, preview com dados reais

### Settings (Seção 4.6)
- Tabs horizontais no topo + submenu vertical esquerdo
- Tab ativa: underline laranja

## Fluxos de Usuário
1. Primeiro Acesso: Signup → Onboarding wizard 6 etapas → Dashboard
2. Criar Campanha: Wizard 6 steps (canal → público → editor → config → preview → enviar)
3. Criar Automação: Templates ou do zero → Flow Builder → Ativar
4. Recuperação IA: Evento loja → Webhook → /recovery → IA WhatsApp → Recuperado/Escalar
5. Atendimento: Msg cliente → IA tenta → Se não resolve → Inbox humano + contexto CRM

## Planos
- Starter: CRM 1k contatos, Email, 5 flows, 1 agente
- Growth: 10k contatos, Email+WhatsApp, 20 flows, 5 agentes, IA WhatsApp
- Pro: Ilimitado, todos os canais, IA completa, CSM dedicado

## Tech Stack Frontend
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4
- Phosphor Icons (duotone/fill)
- Framer Motion
- Recharts
- Zustand (state)
- React Query (data fetching)
- dnd-kit (drag-and-drop)
- date-fns (datas)

## Roadmap
- Fase 1 (Mês 1-4): Data + CRM + Campaigns (e-mail)
- Fase 2 (Mês 5-8): AI + Inbox + CDP avançado
- Fase 3 (Mês 9-12): SMS + WhatsApp Broadcast + Instagram + Chat Web IA + Analytics
- Fase 4 (Mês 13-16): Pipeline avançado + Mobile + API pública + Enterprise
