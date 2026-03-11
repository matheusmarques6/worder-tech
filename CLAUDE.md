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

## Referências Visuais dos Concorrentes (42 prints analisadas)
PDF completo em: /imgs-inspiracao/Worder-UIUX-Frontend-Guide-Completo (1) (1).pdf

### Klaviyo — O que ADOTAR (adaptado) e MUDAR

**K01 - Onboarding (p.7):** Checklist progressivo com steps visuais. Klaviyo usa sidebar branca e progress simples. WORDER: sidebar dark, progress bar com gradiente laranja, cards com sombra.

**K02 - Dashboard/Home (p.7):** KPIs com comparação de período + gráfico de receita atribuída. Klaviyo layout plano. WORDER: Hero card com gradiente dark→laranja no topo (inspirado no D01), ícones premium nos cards.

**K03 - Campanhas (p.8):** KPIs de performance no topo + tabela com filtros. Klaviyo usa texto "Bom/Ruim". WORDER: headers de tabela escuros (#1A1A1A), indicadores de saúde com gauge mini.

**K04 - Fluxos/Automações (p.8):** Tabela com status, tipo e métricas. Klaviyo ícones genéricos. WORDER: ícones de tipo mais descritivos, preview miniatura do fluxo na listagem.

**K05 - Formulários (p.9):** Lista com tipo, status, métricas. WORDER: adicionar preview thumbnail do popup.

**K06 - Editor de Popup (p.9):** Sidebar esquerda + preview central em device mockup (iPhone). WORDER: sidebar dark, blocos com ícones filled, preview com borda laranja quando ativo.

**K07 - Popup Segmentação (p.10):** Regras de exibição (exit intent, delay, scroll). WORDER: toggles com estilo custom (laranja quando ativo), layout mais limpo.

**K08 - Popup Blocos DnD (p.10):** Variedade de blocos arrastáveis (texto, botão, imagem, etc). WORDER: organização em grid com ícones premium, drag indicator sutil.

**K09 - Listas e Segmentos (p.11):** Tabs Listas/Biblioteca, tabela com contagem. WORDER: badges de tipo mais coloridos, ícone de segmento dinâmico animado.

**K10 - Lista de Perfis (p.11):** KPIs no topo (45.718 total, 27.464 ativos, 6.976 suprimidos) + tabela com busca. WORDER: cards de KPI com ícones, avatar do contato na tabela.

**K11 - Perfil Individual (p.12):** Layout split (dados esquerda, timeline direita). Informações de contato + canal + propriedades. WORDER: timeline com ícones coloridos por tipo de evento, card de canal com design mais visual.

**K12 - Perfil Métricas/CLV (p.12):** Cards de métricas, análise preditiva de CLV, data prevista de próxima compra. Gráfico de barras amarelo/azul. WORDER: visualização do CLV com gráfico radial (não barra), cores Worder.

**K13 - Templates de E-mail (p.13):** Grid com preview visual, filtros por tipo/temporada. Thumbnails coloridos. WORDER: cards com borda arredondada, hover com zoom sutil, botão de preview overlay.

**K14 - Conteúdo Universal (p.13):** Blocos reutilizáveis salvos. WORDER: grid maior, preview mais destacado.

**K15 - Catálogo de Produtos (p.14):** Tabela com imagem do produto, nome, status, SKU, ID. WORDER: imagens maiores, status com badge colorido, preview rápido ao hover.

**K16 - Analytics Overview (p.15):** Receita total (ARS 472M) + gráfico de barras por canal (verde/laranja) + breakdown de campanhas. WORDER: gráficos com cores da Worder, cards com shadow, layout com hero metric.

**K17 - Entregabilidade (p.15):** Gauge chart de pontuação (56), métricas de bounce/spam, central de ações. WORDER: gauge com gradiente laranja, action cards mais visuais.

**K18 - Settings Conta (p.16):** Tabs horizontais + submenu vertical. Formulário pessoal (nome, sobrenome, idioma). WORDER: tabs com underline laranja, campos com focus laranja, layout mais espaçado.

**K19 - Settings Cobrança (p.16):** Plano atual + ciclo + uso (progress bars amarelas mostrando 68% e 0%). WORDER: progress bar de uso com gradiente laranja, card de plano mais visual com badge.

**K20 - Settings Domínios (p.17):** Lista de domínios com status (verde = ativo). WORDER: status com badge verde/vermelho mais destaque.

**K21 - Settings Organização (p.17):** Formulário de dados da empresa + chaves de API. WORDER: campos com labels flutuantes, botões com estilo Worder.

**K22 - Settings Usuários (p.18):** Modal de funções personalizadas + tabela de usuários com avatar. WORDER: avatares dos usuários, badges de função coloridos.

**K23 - Settings Atribuição (p.18):** Períodos de atribuição por canal (E-mail 5 dias, SMS 1 dia, etc) + configuração de rastreamento. WORDER: layout mais visual com ícones de canal.

**K24 - Settings Dados (p.19):** Toggles de rastreamento anônimo e comportamental do Shopify + ID estendida. WORDER: cards mais descritivos com ícones.

**K25 - Settings UTM (p.19):** Configuração de parâmetros UTM com dropdowns e campos highlight amarelo. WORDER: dropdowns com estilo custom laranja.

**K26 - Academy/Aprendizado (p.20):** Cards de cursos com thumbnails, estimativa de tempo, categorias. WORDER: considerar seção de ajuda contextual similar.

**K27 - Flow Builder (p.20):** Layout sidebar ações esquerda + canvas central. Fluxo VERTICAL com nós (Checkout Abandoned → Wait → Email). WORDER: flow HORIZONTAL (diferencial), cards mais arredondados, conectores curvos com animação, mini-map.

**K28 - Flow Builder Detalhes (p.21):** Painel lateral esquerdo ao clicar em nó: "Detalhes do e-mail", remetente, assunto, preview miniatura do template. WORDER: painel slide-in suave, preview maior do template.

**K29 - Editor de E-mail (p.21):** Sidebar de blocos esquerda (Texto, Imagem, Botão, etc) + canvas central com preview do e-mail (YAXTRON DOURADO). Toggle Desktop/Mobile. WORDER: sidebar dark, blocos com preview visual, toolbar flutuante.

**K30 - Preview de E-mail (p.22):** Modal com preview usando dados reais de contato + painel lateral com tamanho do e-mail, enviar teste, configurações. WORDER: painel lateral mais limpo, cards de informação com design Worder.

**K31 - Integrações Lista (p.23):** Seção "Descubra aplicativos" (Web Ads, Google Ads, Mailbox) + "Meus aplicativos" (Shopify conectado). WORDER: cards de app com ícone maior, status badge laranja/verde.

**K32 - Integração Shopify (p.23):** Config detalhada: URL da loja, rastreamento no site, sincronização de pedidos/produtos. WORDER: accordion sections com ícones, toggle com estilo Worder.

### Reportana — O que ADOTAR e MUDAR

**R01 - Dashboard (p.24):** KPIs de e-commerce (R$ 134.414,70 pedidos, R$ 96.049,05 aprovados, ticket médio, R$ 9.722,22 recuperados). Layout com cards planos azuis. WORDER: hero metric no topo (não cards planos), ícones premium, cores Worder laranja/preto.

**R02 - Chat/Inbox WhatsApp (p.24):** Layout 3 colunas: lista esquerda com tabs (Você, Equipe, Aguardando, Chatbot, Concluído) + chat central com bolhas verde/branco + contexto direito com dados do cliente. Badges azuis/amarelos/verdes. WORDER: bolhas de chat com design sofisticado, contexto do cliente mais rico com dados do CRM Worder, cores da marca.

**R03 - Pedidos PIX/Boleto/Cartão (p.25):** Tabela com tabs por tipo de pagamento. Status badges (Aprovado verde, Recusado vermelho). Botões de ação WhatsApp inline (ícone verde). WORDER: tabela com design Worder (header dark #1A1A1A), filtros mais limpos, botões de ação com ícones Phosphor.

**R04 - Carrinhos Abandonados (p.25):** Lista com status (Abandonado/Recusado), valor, link de checkout. Layout simples com badges vermelhos. WORDER: adicionar coluna de "IA Status" mostrando se a automação já tentou recuperar.

**R05 - Templates de Automação (p.26):** Galeria com categorias à esquerda (E-commerce, Chatbot, Suporte com contagem) + grid de cards com preview visual (ícones check/whatsapp). WORDER: cards com thumbnail mais visual, badge de canal (WhatsApp/E-mail), rating/popularidade.

**R06 - Flow Builder (p.26):** Fluxo visual multicanal com condições (E-mail + WhatsApp + SMS + Webhook). Nós coloridos (azul email, verde whatsapp). Layout visualmente bagunçado com nós sobrepostos. WORDER: layout horizontal com zoom, cards mais limpos, minimap, snap-to-grid. NUNCA sobrepor nós.

**R07 - Configurações (p.27):** Lista vertical de conexões: Plataforma, Integrações Adicionais, WhatsApp, Facebook, Google, TikTok, Taboola. Cards simples com ícone + seta. WORDER: cards com ícone da plataforma maior + status de conexão (conectado/desconectado), estilo mais visual.

### Outros CRMs & Dashboard Dark

**D01 - Dashboard Dark (p.28):** INSPIRAÇÃO FORTE. Dashboard escuro com: hero card no topo com gradiente azul→roxo, sidebar dark com ícones, gráficos sofisticados com linhas curvas azuis/verdes, KPIs em cards escuros. Estilo premium. WORDER: usar esse conceito adaptado com gradiente laranja/preto (#1A1A1A → #F26B2A). Este é o visual TARGET do dashboard.

**C01 - CRM Dashboard (p.28):** Dashboard claro com tabs (Negócios/Multiatendimento/Atividades). KPI cards (R$ 0,00) com sparklines de tendência. Gráfico de barras roxo. WORDER: design Worder, ícones premium, sparklines nos KPI cards.

**C02 - CRM Inbox (p.29):** Layout de inbox com lista de conversas à esquerda + área central com empty state (ilustração "Conversas"). Sidebar com ícones variados, filtros "Aguardando". Banner de upgrade no bottom. WORDER: design Worder, integrar com dados do CDP, sem ilustrações genéricas de IA.

### Resumo Visual para Desenvolvimento
- **Dashboard**: Inspirar-se fortemente no D01 (dark hero) + R01 (KPIs e-commerce) + K02 (receita atribuída)
- **Inbox**: Combinar R02 (3 colunas WhatsApp) + C02 (filtros) com design Worder
- **Recovery**: Seguir R03/R04 (tabs pagamento + carrinhos) com header dark e IA Status
- **Flow Builder**: Base K27/R06 mas HORIZONTAL, limpo, com grid
- **Editor E-mail**: Base K29/K30 com sidebar dark
- **Settings**: Base K18-K25 com underline laranja e campos focus laranja
- **Campanhas**: Base K03 com header dark e gauges
- **Contatos**: Base K10/K11/K12 com avatares e timeline visual
- **Templates**: Base K13 com grid e hover zoom
- **Integrações**: Base K31/R07 com cards visuais e status badges
