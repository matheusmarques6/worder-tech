**WORDER**

CRM Inteligente para E-commerce

**Arquitetura de Funcionalidades**

Briefing Técnico & Plano de Produto

Convertfy • Março 2026

*Documento Confidencial*

**1. Visão Geral da Plataforma**

A Worder é uma plataforma all-in-one de CRM inteligente para e-commerce, desenvolvida pela Convertfy. Ela unifica dados, comunicação, automações e inteligência artificial em um único produto modular, permitindo que lojistas vendam mais, atendam melhor e tomem decisões baseadas em dados.

A plataforma é composta por uma camada de dados (tracking) que alimenta todos os módulos, e quatro módulos principais de ação: CRM, IA Conversacional, Inbox de Atendimento e Campanhas Multicanal.

**Arquitetura Modular**

  ----------------- ------------------- -------------------- --------------------
  **Worder Data**   **Worder CRM**      **Worder AI**        **Worder Inbox**

  Tracking & CDP    Perfis & Pipeline   WhatsApp & Chat IA   Atendimento Humano
  ----------------- ------------------- -------------------- --------------------

  -----------------------------------------------------------------------
  **Worder Campaigns --- E-mail, SMS, WhatsApp, Chat Web**

  -----------------------------------------------------------------------

**2. Worder Data --- Tracking, CDP & Analytics**

Camada fundamental que alimenta todos os outros módulos. Responsável por coletar, unificar e analisar dados de comportamento e compra dos clientes do e-commerce. Sem essa camada, a plataforma seria "cega" --- com ela, toda automação e IA se torna personalizada e inteligente.

**2.1 Tracking & Coleta de Dados**

  --------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**                **Descrição**

  **Pixel/Script de Tracking**      Script leve (JS) instalado na loja que captura eventos em tempo real: pageview, product_viewed, add_to_cart, checkout_started, order_completed, order_refunded, search, wishlist.

  **Identificação de Visitantes**   Fingerprinting + cookies first-party para identificar visitantes anônimos e vinculá-los ao perfil após login ou compra.

  **Integrações Nativas**           Conector direto com Shopify, WooCommerce, Nuvemshop, VTEX, Tray, Loja Integrada, Magento via API para sincronizar pedidos, produtos, clientes e estoque.

  **Webhooks de Pagamento**         Recepção de eventos de gateways (Stripe, PagSeguro, Mercado Pago, Asaas) para status de PIX, boleto, cartão aprovado/recusado.

  **Atribuição (UTM)**              Rastreamento completo de UTM source, medium, campaign, content e term para atribuir cada venda ao canal/campanha de origem.

  **Consent Management**            Gestão de consentimento LGPD/GDPR integrada ao pixel para coleta ética de dados.

  **Importação de Dados**           Import CSV/Excel de base de clientes existente com mapeamento inteligente de campos.

  **API de Eventos**                API REST para envio de eventos customizados de qualquer fonte (app mobile, POS, ERP).
  --------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2.2 Customer Data Platform (CDP)**

  -------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**               **Descrição**

  **Perfil Unificado 360°**        Consolidação automática de todos os dados do cliente em um único perfil: dados pessoais, histórico de compras, interações por canal, páginas visitadas, produtos vistos.

  **Timeline de Atividades**       Linha do tempo visual com toda interação do cliente: e-mails abertos, mensagens WhatsApp, chats, visitas ao site, compras, devoluções.

  **Scoring Automático**           Cálculo automático de métricas: LTV (Lifetime Value), frequência de compra, ticket médio, recenticidade, risco de churn.

  **Análise RFM**                  Segmentação automática por Recenticidade, Frequência e Valor Monetário com categorização (Campeões, Em Risco, Perdidos etc.).

  **Segmentação Dinâmica**         Criação de segmentos com regras combinadas: comportamento + perfil + compras + engajamento. Atualização em tempo real.

  **Predicted CLV**                Predição de valor futuro do cliente usando modelos de machine learning para priorizar ações.

  **Merge de Perfis**              Detecção e unificação automática de perfis duplicados (mesmo e-mail, telefone ou documento).

  **Tags & Propriedades Custom**   Campos personalizados e tags manuais ou automáticas para enriquecer perfis.
  -------------------------------- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**2.3 Analytics & Relatórios**

  ------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**              **Descrição**

  **Dashboard Principal**         Visão geral de receita, pedidos, taxa de conversão, ticket médio, novos clientes e clientes recorrentes em tempo real.

  **Atribuição de Receita**       Quanto cada canal (e-mail, WhatsApp, SMS, chat, orgânico) e cada campanha/automação gerou de receita direta e assistida.

  **Funil de Conversão**          Visualização completa: visitou → viu produto → add to cart → checkout → comprou, com taxa de drop-off em cada etapa.

  **Análise de Cohort**           Retenção por coorte de aquisição (mês de primeira compra) para medir qualidade dos clientes ao longo do tempo.

  **Relatórios de Produto**       Quais produtos geram mais receita, recompra, são mais vistos mas não comprados, e combinações frequentes (bought together).

  **Benchmarks & Insights IA**    Comparação de métricas com benchmarks do setor e insights automáticos gerados por IA (ex: "Sua taxa de recompra caiu 12% --- sugerimos campanha de win-back").

  **Relatórios de Performance**   Performance por canal de atendimento: tempo médio de resposta, CSAT, resolução no primeiro contato, tickets por agente.

  **Export & API**                Exportação de relatórios em CSV/PDF e API de dados para integração com BI externo (Google Data Studio, Power BI).
  ------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------

**3. Worder CRM --- Gestão de Clientes & Pipeline**

Módulo central de gestão de relacionamento com clientes, desenhado especificamente para as necessidades de e-commerce. Vai além do CRM tradicional ao integrar dados de loja, canais de comunicação e inteligência de dados.

**3.1 Gestão de Contatos**

  -------------------------- --------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**         **Descrição**

  **Base de Contatos**       Lista completa de todos os contatos com busca avançada, filtros e ordenação por qualquer campo (LTV, última compra, segmento etc.).

  **Ficha do Cliente**       Página individual com todos os dados: perfil, histórico de compras, timeline de interações, segmentos, tags, notas internas e score.

  **Listas & Segmentos**     Listas estáticas (import/manual) e segmentos dinâmicos (regras automáticas) para organizar a base.

  **Campos Customizáveis**   Criação de campos personalizados (texto, número, data, dropdown, checkbox) para adaptar o CRM ao negócio.

  **Notas & Atividades**     Registro de notas internas e atividades (ligações, reuniões, follow-ups) vinculadas ao contato.

  **Opt-in/Opt-out**         Gestão de consentimento por canal (e-mail, SMS, WhatsApp) com histórico de alterações.
  -------------------------- --------------------------------------------------------------------------------------------------------------------------------------

**3.2 Pipeline de Vendas**

  --------------------------- ----------------------------------------------------------------------------------------------------------------
  **Funcionalidade**          **Descrição**

  **Kanban Visual**           Pipeline drag-and-drop com estágios customizáveis (ex: Novo Lead → Contatado → Proposta → Fechado).

  **Múltiplos Pipelines**     Pipelines diferentes para cenários distintos: B2B, marketplace, wholesale, pós-venda.

  **Automação de Estágios**   Regras automáticas: mover deal ao receber pagamento, criar tarefa ao entrar em estágio, notificar responsável.

  **Valor & Previsão**        Valor estimado por deal e previsão de receita por período baseada no pipeline.
  --------------------------- ----------------------------------------------------------------------------------------------------------------

**3.3 Tarefas & Produtividade**

  ------------------------ ----------------------------------------------------------------------------------
  **Funcionalidade**       **Descrição**

  **Tarefas**              Criação de tarefas com prazo, prioridade, responsável e vínculo ao contato/deal.

  **Lembretes**            Notificações automáticas de follow-up e tarefas pendentes.

  **Visão de Equipe**      Dashboard do gestor com visão de atividades por membro da equipe.

  **Roles & Permissões**   Controle de acesso por papel: admin, gestor, atendente, visualizador.
  ------------------------ ----------------------------------------------------------------------------------

**4. Worder AI --- Inteligência Artificial Conversacional**

Agente de IA plug-and-play conectado à API Oficial do WhatsApp e ao Chat Web. Atua 24/7 para recuperar vendas, responder dúvidas, recomendar produtos e fechar vendas automaticamente. Inspirado na Infynia.app com tecnologia proprietária.

**4.1 Recuperação Inteligente de Vendas**

  ------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**              **Descrição**

  **Carrinho Abandonado**         Detecção automática de abandono + envio de mensagem personalizada via WhatsApp com nome do cliente, produtos, imagens e link direto para checkout. Sequência de até 3 tentativas com timing inteligente.

  **PIX Pendente**                Monitoramento de PIX gerados e não pagos. Envio de lembrete com QR code e link de pagamento antes da expiração.

  **Boleto Pendente**             Acompanhamento de boletos emitidos com lembretes escalonados antes e após vencimento, incluindo opção de gerar novo boleto ou trocar forma de pagamento.

  **Cartão Recusado**             Notificação automática ao cliente com motivo simplificado e link para tentar novamente com outro cartão ou forma de pagamento alternativa.

  **Follow-up Pós-Recuperação**   Após tentativa de recuperação, a IA continua a conversa: tira dúvidas, oferece cupom progressivo, sugere produtos alternativos.

  **Incentivos Inteligentes**     Sistema de cupons progressivos: 1ª tentativa sem desconto, 2ª com frete grátis, 3ª com % de desconto. Regras configuráveis pelo lojista.
  ------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**4.2 Agente de IA para Vendas & Suporte**

  ------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**             **Descrição**

  **Chat Web com IA**            Widget de chat para o site que responde dúvidas, recomenda produtos e conduz o cliente até a compra. Funciona 24/7 sem intervenção humana.

  **WhatsApp IA**                Agente conectado à API Oficial do WhatsApp que entende texto, áudio e imagem. Responde com linguagem natural e personalidade da marca.

  **Recomendação de Produtos**   Com base no histórico de navegação, compras anteriores e preferências, a IA sugere produtos relevantes durante a conversa.

  **FAQ Inteligente**            Base de conhecimento alimentável pelo lojista. A IA responde perguntas sobre frete, trocas, políticas, tamanhos, materiais etc.

  **Catálogo Conversacional**    Cliente pode navegar pelo catálogo de produtos dentro da conversa, ver fotos, preços e adicionar ao carrinho.

  **Handoff para Humano**        Detecção automática de quando a IA não consegue resolver e transferência para atendente humano com contexto completo.

  **Persona Configurável**       O lojista define tom de voz, nome do agente, regras de negócio e limites de desconto que a IA pode oferecer.

  **Treinamento Contínuo**       Painel para o lojista revisar conversas, corrigir respostas e melhorar a base de conhecimento da IA.
  ------------------------------ --------------------------------------------------------------------------------------------------------------------------------------------

**4.3 Automações Pós-Venda com IA**

  ---------------------------- -------------------------------------------------------------------------------------------------------------
  **Funcionalidade**           **Descrição**

  **Confirmação de Pedido**    Mensagem automática com resumo do pedido, prazo estimado e link de rastreamento.

  **Atualização de Envio**     Notificações automáticas de cada etapa: pedido despachado, em trânsito, saiu para entrega, entregue.

  **Pesquisa de Satisfação**   NPS ou CSAT automático após entrega com coleta de avaliação via conversa.

  **Cross-sell/Upsell**        Recomendação de produtos complementares após a compra baseada em padrões (quem comprou X também comprou Y).

  **Win-back Automático**      Detecção de clientes inativos e envio de campanha personalizada para reativação.
  ---------------------------- -------------------------------------------------------------------------------------------------------------

**5. Worder Inbox --- Central de Atendimento**

Hub unificado de atendimento que centraliza WhatsApp, Instagram e Chat Web em uma única caixa de entrada. Permite atendimento humano, multiatendimento e colaboração entre equipe com todo o contexto do CRM.

**5.1 Caixa de Entrada Unificada**

  ------------------------- ------------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**        **Descrição**

  **Inbox Omnichannel**     Todas as conversas de WhatsApp, Instagram DM e Chat Web em uma única interface com visualização unificada.

  **Contexto do Cliente**   Ao abrir uma conversa, o atendente vê automaticamente: perfil do CRM, últimas compras, histórico de interações, segmentos e notas.

  **Filtros & Filas**       Filtragem por canal, status (aberto/pendente/resolvido), atendente, prioridade e tags. Filas automáticas por departamento.

  **Busca Global**          Busca em todas as conversas por palavra-chave, cliente, número do pedido ou período.

  **Status & Prioridade**   Categorização de conversas: novo, em andamento, aguardando cliente, resolvido. Prioridade alta/média/baixa.
  ------------------------- ------------------------------------------------------------------------------------------------------------------------------------

**5.2 Multiatendimento & Equipe**

  --------------------------------- ------------------------------------------------------------------------------------------------------------
  **Funcionalidade**                **Descrição**

  **Múltiplos Atendentes**          Vários atendentes conectados ao mesmo número de WhatsApp e canais, cada um com suas conversas atribuídas.

  **Distribuição Automática**       Round-robin, por capacidade ou por especialidade. Regras de atribuição configuráveis.

  **Transferência entre Agentes**   Transferência de conversa entre atendentes com todo o histórico preservado e nota interna opcional.

  **Respostas Rápidas**             Biblioteca de respostas pré-configuradas com atalhos de teclado e variáveis dinâmicas (nome, pedido etc.).

  **Notas Internas**                Comentários internos na conversa visíveis apenas para a equipe, sem enviar ao cliente.

  **Horário de Atendimento**        Configuração de horários por canal e resposta automática fora do expediente.

  **Métricas do Agente**            Tempo médio de resposta, resolução, CSAT e volume por atendente.
  --------------------------------- ------------------------------------------------------------------------------------------------------------

**5.3 Integrações do Inbox**

  --------------------------- ---------------------------------------------------------------------------------------------------------------
  **Funcionalidade**          **Descrição**

  **WhatsApp Business API**   Conexão oficial via API do WhatsApp Business com suporte a templates, mídia, botões interativos e listas.

  **Instagram DM**            Integração via API do Instagram para receber e responder DMs, comentários e menções em stories.

  **Chat Web (Widget)**       Widget customizável para instalar no site com design adaptável à marca do lojista.

  **IA + Humano**             Transição suave entre IA e atendente. A IA resolve o que consegue e escala automaticamente quando necessário.
  --------------------------- ---------------------------------------------------------------------------------------------------------------

**6. Worder Campaigns --- Automações & Campanhas Multicanal**

Motor de automação e campanhas que permite criar fluxos inteligentes e disparos em múltiplos canais. Inspirado na Klaviyo, com foco no mercado brasileiro e integração nativa com os dados da Worder.

**6.1 E-mail Marketing**

  ----------------------------- ------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**            **Descrição**

  **Editor Drag-and-Drop**      Editor visual de e-mails com blocos arrastráveis: texto, imagem, botão, produto, cupom, timer, colunas, espaçamento.

  **Templates Prontos**         Biblioteca de templates otimizados para e-commerce: boas-vindas, promoção, lançamento, abandono, pós-compra, win-back.

  **Personalização Dinâmica**   Variáveis de merge: nome, produtos vistos, última compra, recomendações personalizadas, cupom exclusivo.

  **A/B Testing**               Teste de assunto, remetente, conteúdo e horário de envio com determinação automática do vencedor.

  **Blocos de Produto**         Inserção dinâmica de produtos do catálogo com foto, preço e botão de compra.

  **Agendamento & Envio**       Envio imediato, agendado ou com Smart Send (horário ótimo por destinatário baseado em histórico de abertura).

  **Entregabilidade**           SPF, DKIM, DMARC configurados. Domínio de envio próprio. Monitoramento de reputação e bounce rate.
  ----------------------------- ------------------------------------------------------------------------------------------------------------------------

**6.2 SMS Marketing**

  ---------------------- ---------------------------------------------------------------------------------------------------------
  **Funcionalidade**     **Descrição**

  **Envio de SMS**       Disparo de SMS via integração com provedores (Twilio, Zenvia, Infobip) com suporte a links e variáveis.

  **SMS Transacional**   Confirmação de pedido, código de rastreio, lembrete de pagamento via SMS.

  **Segmentação**        Uso dos mesmos segmentos do CDP para direcionar SMS para públicos específicos.

  **Compliance**         Gestão automática de opt-in/opt-out e horários permitidos (respeitando legislação brasileira).
  ---------------------- ---------------------------------------------------------------------------------------------------------

**6.3 WhatsApp Marketing (Broadcast)**

  --------------------------- -----------------------------------------------------------------------------------------
  **Funcionalidade**          **Descrição**

  **Campanhas em Massa**      Envio de mensagens em massa via templates aprovados pela Meta com segmentação avançada.

  **Templates Interativos**   Botões de resposta rápida, listas de opções, carroséis de produtos e links diretos.

  **Personalização**          Variáveis dinâmicas: nome, produto recomendado, cupom exclusivo, status do pedido.

  **Gestão de Templates**     Criação, submissão para aprovação da Meta e monitoramento de status dos templates.

  **Custo & ROI**             Tracking de custo por mensagem e receita atribuída a cada campanha de WhatsApp.
  --------------------------- -----------------------------------------------------------------------------------------

**6.4 Chat Web Marketing**

  ---------------------------- -----------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**           **Descrição**

  **Pop-ups Inteligentes**     Pop-ups de captura contextuais: baseados em tempo na página, intenção de saída, página específica ou segmento do visitante.

  **Banners & Barras**         Barras de notificação (top bar) e banners embutidos para promoções, frete grátis e lançamentos.

  **Formulários de Captura**   Formulários inline e flyout para captura de e-mail, telefone e WhatsApp com incentivo (cupom, conteúdo).

  **Segmentação On-site**      Exibição de mensagens diferentes para visitantes novos vs. recorrentes, por fonte de tráfego ou comportamento.
  ---------------------------- -----------------------------------------------------------------------------------------------------------------------------

**6.5 Automações (Flows)**

  ----------------------------- ----------------------------------------------------------------------------------------------------------------------------------
  **Funcionalidade**            **Descrição**

  **Editor Visual de Fluxos**   Builder drag-and-drop para criar automações multicanal com triggers, condições, ações e delays.

  **Triggers Disponíveis**      Evento de e-commerce (compra, abandono, PIX pendente), comportamento (visitou página, abriu e-mail), data (aniversário), manual.

  **Ações Multicanal**          Enviar e-mail, SMS, WhatsApp, notificação push, adicionar tag, mover no pipeline, criar tarefa, atualizar campo.

  **Condições & Splits**        Branch por perfil, segmento, engajamento, compra anterior, ou resultado de ação anterior (abriu e-mail? clicou?).

  **Delays & Timing**           Delays fixos (esperar 2h) ou inteligentes (esperar até horário ótimo). Respeita horário de envio e fuso horário.

  **Flows Pré-Construídos**     Templates de automação prontos: boas-vindas, abandono de carrinho, pós-compra, win-back, aniversário, review request.

  **Análise de Flow**           Métricas por etapa do fluxo: quantos entraram, avançaram, converteram, receita gerada.
  ----------------------------- ----------------------------------------------------------------------------------------------------------------------------------

**7. Integrações & Infraestrutura**

**7.1 Plataformas de E-commerce**

  --------------------- -----------------------------------------------------------------------------------------------------------
  **Funcionalidade**    **Descrição**

  **Shopify**           Integração nativa bidirecional: pedidos, produtos, clientes, carrinho abandonado, webhooks em tempo real.

  **WooCommerce**       Plugin dedicado + API para sincronização completa de dados.

  **Nuvemshop**         App nativo no ecossistema Nuvemshop com instalação em 1 clique.

  **VTEX**              Conector via API VTEX IO para grandes operações.

  **Tray**              Integração via API da Tray Commerce.

  **Loja Integrada**    Conexão via API e webhooks.

  **Outros**            API aberta para integração com qualquer plataforma via webhooks e REST API.
  --------------------- -----------------------------------------------------------------------------------------------------------

**7.2 Canais & Serviços**

  --------------------------- ----------------------------------------------------------------------------------------------------
  **Funcionalidade**          **Descrição**

  **WhatsApp Business API**   Conexão oficial como BSP (Business Solution Provider) ou via parceiro (360dialog, Gupshup).

  **Instagram API**           Instagram Messaging API para DMs e comentários.

  **Gateways de Pagamento**   Webhooks de Stripe, PagSeguro, Mercado Pago, Asaas para status de transações.

  **Provedores de SMS**       Twilio, Zenvia, Infobip para envio de SMS.

  **Provedores de E-mail**    Infraestrutura própria (Postfix/SES) ou integração com SendGrid, Mailgun.

  **Transportadoras**         Integração com APIs de rastreamento (Correios, Melhor Envio, Kangu) para atualizações automáticas.
  --------------------------- ----------------------------------------------------------------------------------------------------

**7.3 Segurança & Compliance**

  --------------------- ---------------------------------------------------------------------------------------
  **Funcionalidade**    **Descrição**

  **LGPD Compliance**   Consent management, direito ao esquecimento, portabilidade de dados, DPO configurado.

  **Criptografia**      Dados em repouso criptografados (AES-256) e em trânsito (TLS 1.3).

  **Auditoria**         Log de todas as ações de usuários (quem fez o quê, quando).

  **Multi-tenant**      Arquitetura isolada por loja com dados segregados.

  **SSO & 2FA**         Login único e autenticação em duas etapas para segurança de acesso.

  **SLA & Uptime**      Infraestrutura em nuvem com 99.9% de uptime e monitoramento 24/7.
  --------------------- ---------------------------------------------------------------------------------------

**8. Estrutura de Planos Sugerida**

Estrutura modular de preços que permite escalar conforme o cliente cresce:

  ---------------------- ---------------------- --------------------- -----------------------
                         **Starter**            **Growth**            **Pro**

  **Worder Data**        ✓ Básico               ✓ Avançado            ✓ Completo + IA

  **Worder CRM**         ✓ Até 1.000 contatos   ✓ Até 10.000          ✓ Ilimitado

  **Worder AI**          ---                    ✓ WhatsApp IA         ✓ WhatsApp + Chat Web

  **Worder Inbox**       ✓ 1 agente             ✓ 5 agentes           ✓ Ilimitado

  **Worder Campaigns**   ✓ E-mail               ✓ E-mail + WhatsApp   ✓ Todos os canais

  **Automações**         ✓ 5 flows              ✓ 20 flows            ✓ Ilimitado

  **Suporte**            Chat                   Chat + Onboarding     Dedicado + CSM
  ---------------------- ---------------------- --------------------- -----------------------

**9. Roadmap Sugerido de Desenvolvimento**

**Fase 1 --- Fundação (Mês 1--4)**

Worder Data (pixel + integrações com Shopify/Nuvemshop) + Worder CRM (contatos, perfis, segmentação básica) + Worder Campaigns (e-mail marketing com editor e automações básicas).

**Fase 2 --- IA & Recuperação (Mês 5--8)**

Worder AI (recuperação de carrinho, PIX, boleto, cartão via WhatsApp IA) + Worder Inbox (caixa unificada com WhatsApp + Chat Web) + CDP avançado (RFM, scoring, predicted CLV).

**Fase 3 --- Expansão Multicanal (Mês 9--12)**

SMS Marketing + WhatsApp Broadcast + Instagram DM no Inbox + Agente IA no Chat Web + Analytics avançado (atribuição, cohort, benchmarks).

**Fase 4 --- Escala & Enterprise (Mês 13--16)**

Pipeline avançado + App Mobile (push notifications) + API pública + Marketplace de integrações + Plano Enterprise com SSO/SLA.

*Worder by Convertfy • 2026*
