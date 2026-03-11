**WORDER**

Guia Completo de UI/UX & Frontend

Mapa de Páginas • Árvore Hierárquica • Fluxos de Usuário

Referências Visuais de Concorrentes • Diretrizes de Diferenciação

**Documento para Desenvolvimento Frontend**

Convertfy • Março 2026 • Confidencial

**1. Princípios de Design & Diferenciação**

A Worder se inspira em plataformas líderes como Klaviyo e Reportana, mas DEVE ter identidade visual própria e nunca parecer uma cópia. Este documento estabelece as regras para garantir um produto premium, sofisticado e original.

**1.1 Regras de Diferenciação (O que MUDAR dos concorrentes)**

**O que NÃO copiar e o que FAZER diferente**

  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**            **Especificação**

  **Sidebar**             Klaviyo usa sidebar branca minimalista com ícones simples line-style. Worder: usar sidebar DARK (#1A1A1A) com ícones premium filled/duotone. Item ativo com barra lateral laranja + background sutil. Sensação premium, não genérica.

  **Cor de Fundo**        Klaviyo usa fundo branco puro (#FFF). Worder: usar fundo levemente acinzentado (#FAFAFA ou #F8F8F8) para criar profundidade e separar visualmente cards do background. Cards em branco puro.

  **Botões**              Klaviyo usa botões pretos simples. Worder: botões primários com gradiente laranja sutil (F26B2A → F5A623), border-radius 10px, shadow sutil. Hover com animação suave. Premium feel.

  **Tabelas**             Klaviyo tem tabelas muito planas. Worder: headers com background dark (#1A1A1A) e texto branco. Hover row com borda esquerda laranja. Mais contraste e hierarquia.

  **Cards de Métricas**   Klaviyo usa cards com borda simples. Worder: cards com shadow mais pronunciada, ícone colorido à esquerda (dentro de círculo com fundo gradiente), indicador de tendência com animação.

  **Empty States**        Evitar ilustrações genéricas de IA. Usar ilustrações custom da Worder (com a paleta laranja/preto) ou micro-animations (Lottie). NUNCA usar ilustrações que pareçam geradas por IA.

  **Ícones**              NÃO usar Lucide/Heroicons padrão que todos usam. Usar: Phosphor Icons (duotone/fill), Remix Icons, ou Tabler Icons (bold). Preferência por estilo duotone com laranja como cor de destaque. Consistência: TODOS os ícones do mesmo pacote.

  **Tipografia**          Klaviyo usa uma fonte genérica. Worder: usar Inter para UI + Plus Jakarta Sans para headings. Combinação premium e única.

  **Micro-interações**    Adicionar transições suaves (200-300ms ease) em TUDO: hover de cards, abertura de dropdowns, troca de tabs, loading states. Framer Motion para React.

  **Flow Builder**        Klaviyo é vertical rígido. Reportana é bagunçado. Worder: flow builder HORIZONTAL com zoom/pan suave, mini-map, snap-to-grid. Visual limpo com cards arredondados e conectores curvos com animação.

  **Dashboard**           Não copiar layout 1:1. Worder: seção hero no topo com métrica principal grande + gradiente sutil dark→laranja (ref: dashboard dark enviado). Depois cards de KPI, depois gráficos. Personalidade própria.

  **Modo Escuro**         Nenhum concorrente analisado tem dark mode. Worder: implementar dark mode desde o dia 1 como diferencial. A paleta preto/laranja se encaixa perfeitamente.
  ----------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**1.2 Paleta de Cores Worder**

**Cores da Marca (do Brand Guide)**

  -------------------- -------------------------------------------------------------------------------------------------------------
  **Elemento**         **Especificação**

  **Primária**         #F26B2A --- Laranja Worder. CTAs, links, sidebar ativa, estados de foco, destaques.

  **Secundária**       #F5A623 --- Amarelo dourado. Gradientes com laranja, hover states, badges, alertas.

  **Dark**             #1A1A1A --- Preto carvão. Sidebar, headers de tabela, textos primários, modo escuro.

  **Gradiente Hero**   linear-gradient(135deg, #F26B2A 0%, #F5A623 100%) --- Usado em botões primários, hero cards, progress bars.

  **Background**       #FAFAFA --- Fundo da área de conteúdo. Levemente off-white para profundidade.

  **Card BG**          #FFFFFF --- Background de cards, modais, dropdowns.

  **Sucesso**          #22C55E --- Pagamento aprovado, status ativo, métricas positivas.

  **Erro**             #EF4444 --- Cartão recusado, status erro, métricas negativas.

  **Alerta**           #F59E0B --- PIX pendente, boleto vencendo, warnings.

  **Info**             #3B82F6 --- Links, badges informativos, tooltips.
  -------------------- -------------------------------------------------------------------------------------------------------------

**1.3 Iconografia Premium**

A escolha de ícones é CRÍTICA para que o sistema não pareça genérico. Nunca usar ícones line-style finos que todos os SaaS usam. A Worder deve ter ícones com personalidade.

**Recomendações de Ícones**

  -------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**         **Especificação**

  **Pack Principal**   Phosphor Icons (https://phosphoricons.com) --- Estilo: Duotone ou Fill. Sofisticados, com boa variedade para e-commerce. Cor primária do ícone: #1A1A1A, cor de destaque duotone: #F26B2A.

  **Alternativa**      Remix Icon (https://remixicon.com) --- Estilo: Fill. Mais robustos e premium que Lucide/Heroicons.

  **Sidebar**          Ícones em tamanho 22-24px, estilo filled quando ativo, outline suave quando inativo. Transição suave ao mudar de estado.

  **Tabelas**          Ícones 16-18px inline. Cores contextuais: verde para WhatsApp, roxo para Instagram, laranja para Chat Web, azul para E-mail.

  **Proibido**         NUNCA usar ícones Heroicons outline finos (padrão de 90% dos SaaS genéricos). NUNCA misturar packs diferentes na mesma tela.
  -------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2. Árvore Hierárquica de Páginas**

Mapa completo de TODAS as rotas e páginas do sistema. Use esta árvore como referência para estruturar o router do frontend e entender as conexões entre telas.

**Autenticação (Públicas)**

**/auth**

    ├─ /login --- Tela de login

    ├─ /signup --- Cadastro de nova conta

    ├─ /forgot-password --- Esqueceu a senha

    ├─ /reset-password --- Redefinir senha

**Área Logada --- Onboarding**

**/onboarding**

    ├─ /onboarding/connect-store --- Conectar plataforma de e-commerce

    ├─ /onboarding/install-pixel --- Instalar pixel de tracking

    ├─ /onboarding/connect-whatsapp --- Conectar WhatsApp Business API

    ├─ /onboarding/import-contacts --- Importar contatos

    ├─ /onboarding/first-form --- Criar primeiro formulário

    ├─ /onboarding/first-automation --- Ativar primeira automação

**Área Logada --- Aplicação**

**/dashboard --- Dashboard principal com KPIs**

**/inbox --- Central de Atendimento (3 colunas)**

    ├─ /inbox?filter=me --- Minhas conversas

    ├─ /inbox?filter=team --- Equipe

    ├─ /inbox?filter=waiting --- Aguardando

    ├─ /inbox?filter=bot --- Bot/IA

    ├─ /inbox?filter=done --- Concluídos

**/contacts --- Contatos & CRM**

    ├─ /contacts --- Lista de todos os contatos

    ├─ /contacts/:id --- Perfil individual do contato

        │  ├─ /contacts/:id/details --- Tab: Detalhes + Timeline

        │  ├─ /contacts/:id/metrics --- Tab: Métricas & Insights (CLV, RFM)

        │  ├─ /contacts/:id/lists --- Tab: Listas & Segmentos

        │  ├─ /contacts/:id/orders --- Tab: Pedidos

        │  ├─ /contacts/:id/conversations --- Tab: Conversas

    ├─ /contacts/lists --- Listas & Segmentos

        │  ├─ /contacts/lists/library --- Biblioteca de segmentos pré-construídos

        │  ├─ /contacts/lists/create --- Builder de segmento

    ├─ /contacts/import --- Importar contatos (CSV/Excel)

**/campaigns --- Campanhas**

    ├─ /campaigns --- Lista de campanhas (tabela + filtros)

    ├─ /campaigns/create --- Wizard: criar campanha

        │  ├─ /campaigns/create/channel --- Passo 1: Escolher canal

        │  ├─ /campaigns/create/audience --- Passo 2: Definir público

        │  ├─ /campaigns/create/content --- Passo 3: Montar conteúdo

        │  ├─ /campaigns/create/review --- Passo 4: Revisar e enviar

    ├─ /campaigns/:id --- Detalhes/relatório da campanha

    ├─ /campaigns/:id/editor --- Editor de e-mail (drag-and-drop)

**/automations --- Automações (Flows)**

    ├─ /automations --- Lista de fluxos

    ├─ /automations/templates --- Galeria de templates

    ├─ /automations/:id/builder --- Flow Builder visual

**/recovery --- Recuperação de Vendas**

    ├─ /recovery?tab=cart --- Carrinhos abandonados

    ├─ /recovery?tab=pix --- PIX pendente

    ├─ /recovery?tab=boleto --- Boletos vencendo

    ├─ /recovery?tab=card --- Cartões recusados

**/site --- Site (Captura)**

    ├─ /site/forms --- Formulários de registro

    ├─ /site/forms/:id/editor --- Editor de formulário/popup

    ├─ /site/chat-widget --- Configuração do Chat Web widget

**/content --- Conteúdo**

    ├─ /content/templates --- Templates de e-mail

    ├─ /content/templates/whatsapp --- Templates de WhatsApp

    ├─ /content/products --- Catálogo de produtos

    ├─ /content/media --- Biblioteca de mídia

    ├─ /content/coupons --- Cupons

**/analytics --- Analytics**

    ├─ /analytics --- Painel geral

    ├─ /analytics/deliverability --- Entregabilidade

    ├─ /analytics/metrics --- Métricas detalhadas

    ├─ /analytics/benchmarks --- Benchmarks do setor

    ├─ /analytics/reports --- Relatórios personalizados

**/integrations --- Integrações**

    ├─ /integrations --- Lista de apps disponíveis e conectados

    ├─ /integrations/:id --- Detalhe/config da integração

**/settings --- Configurações**

    ├─ /settings/account --- Conta (pessoal, organização)

    ├─ /settings/users --- Usuários e permissões

    ├─ /settings/billing --- Cobrança e plano

    ├─ /settings/email --- E-mail (domínios, remetente)

    ├─ /settings/whatsapp --- WhatsApp API

    ├─ /settings/instagram --- Instagram

    ├─ /settings/chat-web --- Chat Web

    ├─ /settings/tracking --- Dados e rastreamento

    ├─ /settings/attribution --- Atribuição

    ├─ /settings/utm --- Rastreamento de UTM

    ├─ /settings/api --- Chaves de API

    ├─ /settings/security --- Segurança (2FA, audit log)

**TOTAL:** 47 páginas/rotas únicas para desenvolvimento frontend.

**3. Referências Visuais dos Concorrentes**

Abaixo estão TODAS as prints dos concorrentes analisados, organizadas por área. Cada imagem tem anotações sobre o que ADOTAR (adaptar para Worder) e o que EVITAR.

**3.1 Klaviyo --- Onboarding & Dashboard**

![](/home/claude/media-uiux/media/2a12a9da4f5922587de5e667c65dc51f4ef53765.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K01: Onboarding com checklist progressivo. ADOTAR: conceito de wizard com etapas visuais e progresso. MUDAR: usar sidebar dark, progress bar com gradiente laranja, cards com sombra.*

![](/home/claude/media-uiux/media/73c16bad088799b4e72961973072151e5d237b4e.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K02: Dashboard/Home com KPIs e receita atribuída. ADOTAR: conceito de métricas com comparação de período. MUDAR: hero card com gradiente no topo (ref: dashboard dark), ícones premium nos cards.*

**3.2 Klaviyo --- Campanhas**

![](/home/claude/media-uiux/media/dc676438d9bff56dbe0436da2501a7e0a9d88987.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K03: Lista de campanhas com KPIs no topo. ADOTAR: KPIs de performance no topo + tabela filtrada abaixo. MUDAR: headers de tabela escuros, indicadores de saúde mais sofisticados (gauge mini ao invés de texto Bom/Ruim).*

![](/home/claude/media-uiux/media/c2178b068d1792897351900847c61f498a882009.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K04: Lista de Fluxos. ADOTAR: tabela com status, tipo e métricas. MUDAR: ícones de tipo mais descritivos, preview miniatura do fluxo na listagem.*

**3.3 Klaviyo --- Site & Formulários**

![](/home/claude/media-uiux/media/2708a0039c7e3ac81fdc281fb3d4a5cf4d4c5757.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K05: Lista de formulários de registro. ADOTAR: tabela com tipo, status, métricas. MUDAR: adicionar preview thumbnail do popup na listagem.*

![](/home/claude/media-uiux/media/cb0beb1e7568ab55b051699358ea6afd77091df3.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K06: Editor de popup (visão geral). ADOTAR: layout sidebar esquerda + preview central em device mockup. MUDAR: sidebar dark, blocos com ícones filled, preview com borda laranja quando ativo.*

![](/home/claude/media-uiux/media/37116ae42a4fcaa0ab32427677704083922ddca3.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K07: Editor de popup (segmentação). ADOTAR: regras de exibição (exit intent, delay, scroll). MUDAR: toggles com estilo custom (laranja quando ativo), layout mais limpo.*

![](/home/claude/media-uiux/media/82bfbe3aed44dac81f44e550a70653496b3bad76.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K08: Editor de popup (blocos drag-and-drop). ADOTAR: variedade de blocos. MUDAR: organização em grid com ícones premium, drag indicator sutil.*

**3.4 Klaviyo --- Público (Contatos, Listas, Perfis)**

![](/home/claude/media-uiux/media/a6da98cc2d239a977fbc5f5b63b5298ac7fcdbfc.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K09: Listas e segmentos. ADOTAR: tabs Listas/Biblioteca, tabela com contagem de membros. MUDAR: badges de tipo mais coloridos, ícone de segmento dinâmico animado.*

![](/home/claude/media-uiux/media/b3fae80b95d3f692544b4391f359533cdf75d275.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K10: Lista de perfis com contagens. ADOTAR: KPIs no topo (total, ativos, suprimidos), tabela com busca. MUDAR: cards de KPI com ícones, avatar do contato na tabela.*

![](/home/claude/media-uiux/media/90fc7a6f12765d65c51085de6cffebc47c549e4c.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K11: Perfil individual --- Detalhes + Timeline. ADOTAR: layout split (dados à esquerda, timeline à direita). MUDAR: timeline com ícones coloridos por tipo de evento, card de canal com design mais visual.*

![](/home/claude/media-uiux/media/8d8984092b0b3eee15055ab18ef1d6415475174d.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K12: Perfil --- Métricas e Insights (CLV). ADOTAR: cards de métricas, análise preditiva de CLV, data prevista de próxima compra. MUDAR: visualização do CLV com gráfico radial ao invés de barra, cores Worder.*

**3.5 Klaviyo --- Conteúdo**

![](/home/claude/media-uiux/media/b4ff492be1ba1fa813c2bfc7168f33622f0c4724.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K13: Biblioteca de templates de e-mail (grid). ADOTAR: visão grid com preview visual, filtros por tipo/temporada. MUDAR: cards com borda arredondada, hover com zoom sutil, botão de preview overlay.*

![](/home/claude/media-uiux/media/4035ec3a56ab1dc74714ccff2461b26b2bf70375.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K14: Conteúdo universal (blocos salvos). ADOTAR: conceito de blocos reutilizáveis. MUDAR: grid maior, preview mais destacado.*

![](/home/claude/media-uiux/media/d1febf151ba7fa3d4dd8691382d94d992cc22bab.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K15: Catálogo de produtos. ADOTAR: tabela com imagem, nome, status, ID. MUDAR: imagens maiores, status com badge colorido, preview rápido ao hover.*

**3.6 Klaviyo --- Analytics**

![](/home/claude/media-uiux/media/ab86cb45d24f573369a07b69d6f89e747797e307.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K16: Análise comercial (overview). ADOTAR: visão de receita com gráfico + breakdown por canal. MUDAR: gráficos com cores da Worder, cards com shadow, layout com hero metric.*

![](/home/claude/media-uiux/media/e85b84c2ed29f8fba3866ca6c2666a4d8cfe7c57.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K17: Entregabilidade (pontuação). ADOTAR: gauge chart de pontuação, métricas com recomendações, central de ações. MUDAR: gauge com gradiente laranja, action cards mais visuais.*

**3.7 Klaviyo --- Configurações**

![](/home/claude/media-uiux/media/f43133a70332dfdf82a35996c4eb523c7e258cc7.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K18: Settings --- Conta (pessoal, idioma). ADOTAR: tabs horizontais no topo + submenu vertical esquerdo. MUDAR: tabs com underline laranja, campos com focus laranja, layout mais espaçado.*

![](/home/claude/media-uiux/media/eaea6564704eed8e833140a9c85aa657577425ae.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K19: Settings --- Cobrança. ADOTAR: visão de plano, ciclo, uso. MUDAR: progress bar de uso com gradiente, card de plano mais visual com badge.*

![](/home/claude/media-uiux/media/c415f5923611fc3ed3f1ba7e2799644436496933.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K20: Settings --- Domínios de envio. ADOTAR: lista de domínios com status. MUDAR: status com badge verde/vermelho mais destaque.*

![](/home/claude/media-uiux/media/616076befc1de507847d52061301821393027821.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K21: Settings --- Organização + Chaves de API. ADOTAR: formulário de dados da empresa. MUDAR: campos com labels flutuantes, botões com estilo Worder.*

![](/home/claude/media-uiux/media/1ab35ed1a6f6ea897562f34c786b18ec397ec052.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K22: Settings --- Usuários e permissões. ADOTAR: tabela de usuários com funções custom. MUDAR: avatares dos usuários, badges de função coloridos.*

![](/home/claude/media-uiux/media/67d756fc7e3e7749c7d7d3b424ba76d76a890d3a.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K23: Settings --- Atribuição. ADOTAR: configuração de períodos por canal. MUDAR: layout mais visual com ícones de canal.*

![](/home/claude/media-uiux/media/8f63260851c052c5700c73685d144166a4b8ddd7.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K24: Settings --- Dados (rastreamento). ADOTAR: toggles de rastreamento anônimo e comportamental. MUDAR: cards mais descritivos com ícones.*

![](/home/claude/media-uiux/media/9ff9be8e97ef412de3bc7a719162d73c05580aa5.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K25: Settings --- UTM tracking. ADOTAR: configuração de parâmetros UTM. MUDAR: dropdowns com estilo custom.*

**3.8 Klaviyo --- Aprendizado, Flow Builder, Editor de E-mail, Integrações**

![](/home/claude/media-uiux/media/0f8d92b2a020fd9597954726317b285c3ec7f1ea.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K26: Área de aprendizado/academy. ADOTAR: cards de cursos e guias com estimativa de tempo. CONSIDERAR: implementar seção de ajuda contextual similar.*

![](/home/claude/media-uiux/media/8ebba6a19f78ded52ae01943cbcfc0e40fcd7e08.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K27: Flow Builder (visão geral). ADOTAR: layout sidebar ações + canvas central. MUDAR: flow HORIZONTAL (não vertical), cards mais arredondados, conectores curvos com animação, mini-map.*

![](/home/claude/media-uiux/media/7c792ab518a5f364108b2fdabd38ced71dd13b32.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K28: Flow Builder (detalhes do nó). ADOTAR: painel lateral ao clicar em nó. MUDAR: painel slide-in suave, preview maior do template.*

![](/home/claude/media-uiux/media/acee3c5c3a28abb45b073d5c210b6120635167da.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K29: Editor de e-mail drag-and-drop. ADOTAR: sidebar de blocos + canvas de edição + toggle desktop/mobile. MUDAR: sidebar dark, blocos com preview visual, toolbar flutuante.*

![](/home/claude/media-uiux/media/fc1a905a6feaaef1e53a71b72119e93938600b11.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K30: Preview de e-mail com dados reais. ADOTAR: preview com perfil real, verificar tamanho, enviar teste. MUDAR: painel lateral mais limpo, cards de informação com design Worder.*

![](/home/claude/media-uiux/media/d4b047a00a3ed770e64c4506a358eb3fbfbb2ea2.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K31: Integrações (lista). ADOTAR: seção "Descubra" + "Meus apps". MUDAR: cards de app com ícone maior, status badge laranja/verde.*

![](/home/claude/media-uiux/media/7f83a4153fdb02b5f4e94d02413018a35ebde487.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref K32: Detalhe da integração Shopify. ADOTAR: config de sincronização, rastreamento. MUDAR: accordion sections com ícones, toggle com estilo Worder.*

**3.9 Reportana --- Dashboard, Chat, Recuperação, Automações**

![](/home/claude/media-uiux/media/e21fbcab03d32c9c28ad18e008671272725aa518.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R01: Dashboard e-commerce (Reportana). ADOTAR: KPIs de e-commerce (pedidos, aprovados, ticket médio, recuperados). MUDAR: layout com hero metric no topo (não cards planos), ícones premium, cores Worder.*

![](/home/claude/media-uiux/media/c66ad0dc80410dbd499f21de336996cfbf6b9e16.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R02: Chat/Inbox do WhatsApp. ADOTAR: layout 3 colunas (lista + chat + contexto). Tabs (Você, Equipe, Aguardando, Chatbot, Concluído). MUDAR: bolhas de chat com design sofisticado, contexto do cliente mais rico com dados do CRM Worder.*

![](/home/claude/media-uiux/media/eaec055463f47ce39c444a4efe87ad754e7cf8d0.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R03: Pedidos com tabs PIX/Boleto/Cartão. ADOTAR: tabs por tipo de pagamento, status badges, ações rápidas de WhatsApp. MUDAR: tabela com design Worder (header dark), filtros mais limpos, botões de ação com ícones.*

![](/home/claude/media-uiux/media/c9791bffa282c41aa4dbfcc7508bc64cc1cf3a4b.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R04: Carrinhos abandonados. ADOTAR: lista com status (Abandonado/Recusado), valor, link de checkout. MUDAR: adicionar coluna de "IA Status" mostrando se a automação já tentou recuperar.*

![](/home/claude/media-uiux/media/ee9c31595ecf701bddf12f14c82c10a5095ead51.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R05: Galeria de templates de automação. ADOTAR: categorias (E-commerce, Chatbot, Suporte etc.) com contagem, grid de cards com preview. MUDAR: cards com thumbnail mais visual, badge de canal (WhatsApp/E-mail), rating/popularidade.*

![](/home/claude/media-uiux/media/4cb4b716cd2306c2598771d3326ac4666b1ceb3e.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R06: Flow builder visual (Reportana). ADOTAR: conceito de fluxo multicanal com condições múltiplas, E-mail + WhatsApp + SMS + Webhook. MUDAR: layout horizontal com zoom, cards mais limpos, minimap, snap-to-grid.*

![](/home/claude/media-uiux/media/d495eee02822ac2c99730ad94fa987a443775426.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref R07: Configurações (Reportana). ADOTAR: lista de conexões (Plataforma, WhatsApp, Facebook, Google etc.). MUDAR: cards com ícone da plataforma + status de conexão (conectado/desconectado), estilo mais visual.*

**3.10 Outros CRMs & Dashboard Dark**

![](/home/claude/media-uiux/media/ef30b27f572fec00bc31f28da23aa76eed8b2212.png){width="5.208333333333333in" height="3.65625in"}

*▲ Ref D01: Dashboard dark mode de referência. INSPIRAÇÃO FORTE: hero card com gradiente azul/roxo no topo, sidebar dark com ícones, gráficos sofisticados. Worder deve usar esse conceito adaptado com gradiente laranja/preto.*

![](/home/claude/media-uiux/media/d0c9d93db93dd10d6f2245c088b0b06991fe91f1.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref C01: CRM Dashboard com métricas de negócios. ADOTAR: tabs (Negócios/Multiatendimento/Atividades), KPI cards com sparklines. MUDAR: design Worder, ícones premium.*

![](/home/claude/media-uiux/media/674bc0cdc3243023198f3b3dbbac809044367921.png){width="6.014873140857393in" height="2.810586176727909in"}

*▲ Ref C02: CRM Inbox/Conversas. ADOTAR: layout de inbox com lista de conversas + área de chat + filtros (Aguardando, etc.). MUDAR: design Worder, integrar com dados do CDP.*

**4. Especificação Detalhada por Página**

Nesta seção, cada página é especificada com seus componentes, comportamentos e referências visuais. O desenvolvedor deve seguir estas specs para construir cada tela.

**4.1 /dashboard**

**Dashboard Principal**

  ------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**             **Especificação**

  **Layout**               Área única com scroll vertical. Seções empilhadas: Hero → KPIs → Gráficos → Tabelas.

  **Hero Card**            Card full-width com gradiente dark→laranja. Métrica principal: "Receita Recuperada pela Worder" em destaque grande (48px bold). Ref: Dashboard dark (Ref D01). Este card é o DIFERENCIAL visual.

  **KPIs Primários**       4 cards em row: Receita Total, Pedidos, Ticket Médio, Novos Leads. Cada card: ícone premium em círculo colorido + valor grande + % variação + sparkline. Ref: Reportana R01 (adaptar).

  **KPIs Secundários**     6 cards menores em row: Carrinhos abandonados (R\$), Recuperados (R\$), PIX pendentes, Atendimentos ativos, Mensagens enviadas, Taxa de recuperação. Ref: Reportana R01.

  **Gráfico de Receita**   Line chart (Recharts/Chart.js): Receita total vs. Receita atribuída. Cores: laranja para atribuída, cinza para total. Tooltip sofisticado. Ref: Klaviyo K02.

  **Receita por Canal**    Bar chart horizontal: E-mail, WhatsApp, SMS, Chat Web. Cores distintas por canal. Ref: Klaviyo K02.

  **Top Automações**       Tabela: 5 melhores flows por receita. Colunas: Nome, Status, Canal, Receita, Variação. Ref: Klaviyo K02.

  **Campanhas Recentes**   Tabela: 5 últimas campanhas. Taxa abertura, cliques, receita. Ref: Klaviyo K02.

  **Seletor de Período**   Dropdown no topo direito: Hoje, 7d, 30d, 90d, Custom. Comparação com período anterior automática.
  ------------------------ --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.2 /inbox**

**Inbox (Central de Atendimento)**

  ------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**             **Especificação**

  **Layout**               3 colunas fixas. Coluna 1: 300px (lista). Coluna 2: flex (chat). Coluna 3: 320px (contexto, toggle). Ref: Reportana R02 + CRM C02.

  **Coluna 1: Lista**      Topo: busca + filtros. Tabs: Você (badge), Equipe, Aguardando, IA/Bot, Concluído. Cada conversa: avatar, nome, última msg (truncada), timestamp, badge de canal (ícone WhatsApp/Instagram/Chat), indicador não lido (dot laranja).

  **Coluna 2: Chat**       Cabeçalho: nome + canal + botões (transferir, resolver, flag, mute). Área de mensagens: bolhas verde (enviadas) e branco (recebidas). Input: texto + emojis + anexos + áudio + respostas rápidas. Tab "Nota" para notas internas (fundo amarelo claro). Ref: Reportana R02.

  **Coluna 3: Contexto**   Dados do CRM: avatar grande, nome, e-mail, telefone, tags. Abas: Perfil (dados básicos), Pedidos (últimas compras), Timeline (eventos recentes), Notas (internas). Métricas: LTV, total de compras, última compra. Ref: Reportana R02 (painel direito).

  **IA Assist**            Botão "Worder IA" na barra de input. Gera sugestão de resposta baseada no contexto. Atendente edita antes de enviar. Ícone de IA com animação sutil.

  **Transferência**        Modal para transferir conversa: selecionar agente, adicionar nota interna opcional.
  ------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.3 /recovery**

**Recuperação de Vendas**

  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**        **Especificação**

  **Layout**          KPI cards no topo + tabs abaixo + tabela. Ref: Reportana R03 + R04.

  **KPIs**            Cards: Valor total em carrinhos abandonados, Valor recuperado (pela Worder), Taxa de recuperação (%), ROI da IA. Hero card com gradiente para o valor recuperado.

  **Tabs**            Carrinhos Abandonados \| PIX Pendente \| Boletos Vencendo \| Boletos Vencidos \| Cartões Recusados. Badge de contagem em cada tab. Ref: Reportana R03.

  **Tabela**          Colunas: \# Pedido, Status (badge: Abandonado/Recuperado/Expirado/Pago/Não Pago), Cliente (nome + contato), Valor, Data, IA Status (tentou/não tentou/recuperado), Ações (enviar WhatsApp, enviar e-mail, ver detalhes).

  **Ações Rápidas**   Ícones inline na tabela para enviar mensagem via WhatsApp ou e-mail com 1 clique. Ref: Reportana R03 (ícones de WhatsApp).

  **IA Dashboard**    Card lateral ou topo mostrando: IA ativa/inativa, conversas em andamento, taxa de sucesso, últimas recuperações.
  ------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.4 /automations/:id/builder**

**Flow Builder Visual**

  ---------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**                 **Especificação**

  **Layout**                   Full-screen: sidebar fixa esquerda (ações) + canvas infinito com zoom/pan. Navbar no topo com nome do flow + status + botões (Salvar, Ativar). Ref: Klaviyo K27/K28 + Reportana R06.

  **Sidebar Ações**            Mensagens: E-mail, WhatsApp, SMS. Dados: Atualizar contato, Webhook, Alerta interno. Lógica: Atraso, Divisão condicional, Condição múltipla, Randomizador. IA: ChatGPT/Worder IA. Ref: Reportana R06.

  **Canvas**                   Fluxo HORIZONTAL (diferencial vs. Klaviyo vertical). Cards arredondados (border-radius 12px) com ícone + nome + preview. Conectores curvos com animação de flow. Mini-map no canto inferior direito. Zoom: scroll + botões +/-. Snap-to-grid.

  **Triggers**                 Nó especial no início: Checkout Started, Cart Abandoned, Placed Order, PIX Pendente, Boleto Emitido, Cartão Recusado, Active on Site, Added to List, Date-based, Custom event.

  **Painel de Detalhes**       Ao clicar em nó: slide-in panel à direita com config completa. Para e-mail: nome, assunto, preview, template, métricas. Para WhatsApp: template, variáveis. Para condição: builder de regras. Ref: Klaviyo K28.

  **Diferença de Reportana**   Reportana é visualmente bagunçado (nós sobrepostos, sem grid). Worder DEVE ter grid, alinhamento automático, layout limpo.
  ---------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.5 /campaigns/:id/editor**

**Editor de E-mail Drag-and-Drop**

  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**       **Especificação**

  **Layout**         Full-screen: sidebar esquerda (blocos) + canvas central (preview) + toolbar superior. Ref: Klaviyo K29.

  **Sidebar**        Tabs: Conteúdo \| Estilos. Blocos: Texto, Imagem, Botão, Divisor, Espaçador, Produto, Cupom, Timer, Tabela, Vídeo, HTML, Colunas, Seção, Avaliação, Link Social. Ref: Klaviyo K29. MUDAR: sidebar dark, ícones filled.

  **Canvas**         Preview em tempo real. Toggle Desktop/Mobile no topo. Ref: Klaviyo K29/K30. MUDAR: borda do canvas com sombra, background FAFAFA.

  **Preview**        Botão "Visualizar e testar" abre modal: preview com dados reais de um contato, tamanho do e-mail, enviar teste. Ref: Klaviyo K30.

  **Variáveis**      Menu de merge tags: {{ first_name }}, {{ product.name }}, {{ coupon.code }}, dados do evento, etc.
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.6 /settings**

**Configurações**

  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**       **Especificação**

  **Layout**         Tabs horizontais no topo (Conta, Cobrança, E-mail, WhatsApp, Instagram, Chat Web, Dados, Atribuição, Outros) + submenu vertical à esquerda dentro de cada tab. Ref: Klaviyo K18-K25. MUDAR: tab ativa com underline laranja (não preto).

  **Conta**          Pessoal (nome, e-mail, idioma) + Organização (empresa, CNPJ, endereço) + Usuários (tabela com funções). Ref: K18/K21/K22.

  **Cobrança**       Plano atual (card visual), ciclo de cobrança, uso (progress bars com gradiente laranja), histórico. Ref: K19.

  **E-mail**         Domínios (lista com status verde/vermelho), remetente padrão, configurações de envio. Ref: K20.

  **WhatsApp**       Número conectado, status API, templates aprovados/pendentes, config da IA (persona, limites).

  **Dados**          Rastreamento anônimo, eventos comportamentais, ID estendida. Ref: K24.

  **Atribuição**     Períodos por canal, excluir bots. Ref: K23.
  ------------------ ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**5. Fluxos de Usuário**

**5.1 Primeiro Acesso**

Signup → Onboarding wizard (6 etapas) → Conectar loja → Instalar pixel → Conectar WhatsApp → Importar contatos → Criar formulário → Ativar automação → Dashboard com dados reais. O onboarding pode ser pulado mas fica acessível na sidebar até 100% completo.

**5.2 Criar e Enviar Campanha**

/campaigns → Botão "Criar campanha" → Step 1: Escolher canal (E-mail/WhatsApp/SMS) → Step 2: Selecionar público (lista ou segmento) → Step 3: Editor de conteúdo (drag-and-drop para e-mail, template para WhatsApp) → Step 4: Configurar assunto/remetente → Step 5: Preview + teste → Step 6: Revisar resumo → Enviar agora ou Agendar. A cada passo, botões Voltar e Próximo.

**5.3 Criar Automação**

/automations → "Criar fluxo" → Modal com templates por categoria (ou "Criar do zero") → Definir trigger → Flow Builder: arrastar ações da sidebar para o canvas → Configurar cada nó (clicar abre painel lateral) → Salvar → "Analisar e ativar" (validação automática de erros).

**5.4 Recuperação com IA**

Evento na loja (carrinho abandonado/PIX/boleto/cartão) → Webhook recebido → Worder Data registra → Aparece em /recovery com status "Pendente" → Automação de IA dispara WhatsApp personalizado → IA conversa com cliente → Se recuperou: status "Recuperado" + receita atribuída → Se não: escala para Inbox humano → Analytics registra tudo.

**5.5 Atendimento Humano**

Cliente envia mensagem (WhatsApp/Instagram/Chat Web) → IA Worder tenta resolver (FAQ, recomendação) → Se resolveu: marca concluído → Se não: escala para /inbox humano → Atendente vê conversa com contexto completo do CRM (coluna 3) → Usa respostas rápidas ou sugestão da IA → Resolve → Categoriza (tags) → Métricas atualizadas.

**5.6 Navegação da Sidebar**

A sidebar tem 3 níveis: ícone (sidebar colapsada) → menu principal (sidebar expandida) → submenu (expande inline). O usuário pode colapsar/expandir a sidebar. Badge de notificação no Inbox mostra conversas não lidas. Em mobile: sidebar vira drawer com gesto swipe.

**6. Resumo Final**

**Totais para Desenvolvimento**

  ------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------
  **Elemento**              **Especificação**

  **Páginas únicas**        47 rotas/páginas

  **Telas complexas**       Inbox (3 colunas), Flow Builder (canvas infinito), Editor de E-mail (drag-and-drop), Editor de Popup

  **Componentes globais**   Sidebar, Top Bar, Cards de KPI, Tabelas, Modais, Toasts, Empty States, Loading Skeletons

  **Referências visuais**   42 prints de concorrentes anexadas neste documento

  **Diferenciação**         Sidebar dark, ícones premium (Phosphor/Remix), gradiente laranja, flow horizontal, dark mode, micro-interactions

  **Brand**                 Paleta: #F26B2A + #F5A623 + #1A1A1A. Fontes: Inter + Plus Jakarta Sans. Ícones: Phosphor Duotone.

  **Prioridade**            Fase 1: Dashboard + Inbox + Contatos + Recovery + Settings. Fase 2: Campaigns + Automations + Email Editor. Fase 3: Analytics + Site/Forms + Content.
  ------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------

*Worder by Convertfy • UI/UX Frontend Guide • 2026*
