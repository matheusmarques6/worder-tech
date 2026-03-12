// Mock data for /recovery page

export type RecoveryStatus =
  | "abandoned" | "recovering" | "recovered" | "expired"   // Carrinhos
  | "awaiting_payment" | "paid" | "pix_expired"            // PIX
  | "due_today" | "due_tomorrow" | "overdue" | "boleto_paid" | "not_paid" // Boletos
  | "declined" | "retried" | "card_recovered";             // Cartões

export type IAStatus = "sent" | "waiting" | "not_tried";
export type RecoveryTab = "carts" | "pix" | "boletos_due" | "boletos_overdue" | "cards";

export interface RecoveryProduct {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface RecoveryAttempt {
  channel: "whatsapp" | "email" | "sms";
  date: string;
  status: "sent" | "delivered" | "read" | "clicked" | "failed";
  message: string;
}

export interface RecoveryItem {
  id: string;
  orderId: string;
  tab: RecoveryTab;
  status: RecoveryStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  products: RecoveryProduct[];
  value: number;
  createdAt: string;
  iaStatus: IAStatus;
  attempts: RecoveryAttempt[];
  // PIX specific
  expiresAt?: string;
  // Boleto specific
  boletoUrl?: string;
  dueDate?: string;
  // Card specific
  declineReason?: string;
}

export interface RecoveryHeroData {
  recoveredAmount: number;
  recoveryRate: number;
  savedOrders: number;
  changePercent: number;
}

export const recoveryHeroData: RecoveryHeroData = {
  recoveredAmount: 47280.0,
  recoveryRate: 32,
  savedOrders: 156,
  changePercent: 18.5,
};

export const recoveryKPIs = [
  {
    label: "Carrinhos Abandonados",
    value: "R$ 228.100",
    change: -12,
    changeLabel: "vs. mês anterior",
    icon: "cart",
  },
  {
    label: "Recuperados pela IA",
    value: "R$ 47.280",
    change: 24,
    changeLabel: "vs. mês anterior",
    icon: "ai",
  },
  {
    label: "Recuperados Manual",
    value: "R$ 8.430",
    change: 8,
    changeLabel: "vs. mês anterior",
    icon: "customers",
  },
  {
    label: "Taxa de Recuperação",
    value: "32%",
    change: 5,
    changeLabel: "vs. mês anterior",
    icon: "recovery",
  },
];

export const tabCounts: Record<RecoveryTab, number> = {
  carts: 48,
  pix: 23,
  boletos_due: 15,
  boletos_overdue: 8,
  cards: 12,
};

const cartItems: RecoveryItem[] = [
  {
    id: "rec-001",
    orderId: "#WD-4821",
    tab: "carts",
    status: "abandoned",
    customerName: "Ana Paula Ferreira",
    customerPhone: "(11) 98765-4321",
    customerEmail: "ana.ferreira@gmail.com",
    products: [
      { name: "Vestido Midi Floral", image: "/products/vestido.jpg", quantity: 1, price: 289.9 },
      { name: "Sandália Rasteira Dourada", image: "/products/sandalia.jpg", quantity: 1, price: 159.9 },
    ],
    value: 449.8,
    createdAt: "2026-03-12T08:30:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-12T09:15:00Z", status: "read", message: "Oi Ana! Vi que você se interessou pelo Vestido Midi Floral. Ainda temos disponível com 10% off!" },
    ],
  },
  {
    id: "rec-002",
    orderId: "#WD-4819",
    tab: "carts",
    status: "recovering",
    customerName: "Carlos Eduardo Silva",
    customerPhone: "(21) 97654-3210",
    customerEmail: "carlos.silva@hotmail.com",
    products: [
      { name: "Fone Bluetooth JBL Tune 520BT", image: "/products/fone.jpg", quantity: 1, price: 349.9 },
    ],
    value: 349.9,
    createdAt: "2026-03-12T07:45:00Z",
    iaStatus: "waiting",
    attempts: [
      { channel: "email", date: "2026-03-12T08:30:00Z", status: "delivered", message: "Carlos, seu carrinho está esperando! Complete sua compra e ganhe frete grátis." },
    ],
  },
  {
    id: "rec-003",
    orderId: "#WD-4815",
    tab: "carts",
    status: "recovered",
    customerName: "Juliana Costa Santos",
    customerPhone: "(31) 99876-5432",
    customerEmail: "juliana.costa@gmail.com",
    products: [
      { name: "Kit Skincare Completo", image: "/products/skincare.jpg", quantity: 1, price: 429.0 },
      { name: "Sérum Vitamina C", image: "/products/serum.jpg", quantity: 2, price: 89.9 },
    ],
    value: 608.8,
    createdAt: "2026-03-11T22:10:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-11T23:00:00Z", status: "read", message: "Oi Juliana! Seu Kit Skincare está com 15% de desconto por tempo limitado!" },
      { channel: "whatsapp", date: "2026-03-12T06:00:00Z", status: "clicked", message: "Última chance! Seu desconto expira em 2h. Finalize agora: [link]" },
    ],
  },
  {
    id: "rec-004",
    orderId: "#WD-4812",
    tab: "carts",
    status: "expired",
    customerName: "Roberto Almeida",
    customerPhone: "(41) 98765-1234",
    customerEmail: "roberto.almeida@yahoo.com",
    products: [
      { name: "Tênis Nike Air Max 90", image: "/products/tenis.jpg", quantity: 1, price: 899.9 },
    ],
    value: 899.9,
    createdAt: "2026-03-09T14:20:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "email", date: "2026-03-09T15:00:00Z", status: "sent", message: "Roberto, seu tênis Nike Air Max 90 está te esperando!" },
      { channel: "whatsapp", date: "2026-03-10T10:00:00Z", status: "delivered", message: "Oi Roberto! Ainda dá tempo de garantir seu Nike Air Max 90 com desconto!" },
    ],
  },
  {
    id: "rec-005",
    orderId: "#WD-4808",
    tab: "carts",
    status: "abandoned",
    customerName: "Mariana Oliveira",
    customerPhone: "(51) 99234-5678",
    customerEmail: "mariana.oliveira@gmail.com",
    products: [
      { name: "Smartwatch Galaxy Watch 6", image: "/products/smartwatch.jpg", quantity: 1, price: 1599.0 },
      { name: "Pulseira Extra Silicone", image: "/products/pulseira.jpg", quantity: 1, price: 79.9 },
    ],
    value: 1678.9,
    createdAt: "2026-03-12T10:05:00Z",
    iaStatus: "not_tried",
    attempts: [],
  },
  {
    id: "rec-006",
    orderId: "#WD-4805",
    tab: "carts",
    status: "recovering",
    customerName: "Fernando Ribeiro",
    customerPhone: "(61) 98432-1098",
    customerEmail: "fernando.ribeiro@outlook.com",
    products: [
      { name: "Cadeira Gamer ThunderX3", image: "/products/cadeira.jpg", quantity: 1, price: 1299.0 },
    ],
    value: 1299.0,
    createdAt: "2026-03-11T16:30:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-11T17:15:00Z", status: "delivered", message: "Oi Fernando! A Cadeira Gamer ThunderX3 é a mais vendida. Garanta a sua antes que acabe!" },
    ],
  },
  {
    id: "rec-007",
    orderId: "#WD-4801",
    tab: "carts",
    status: "abandoned",
    customerName: "Patrícia Mendes",
    customerPhone: "(71) 99654-3210",
    customerEmail: "patricia.mendes@gmail.com",
    products: [
      { name: "Perfume Dolce & Gabbana Light Blue", image: "/products/perfume.jpg", quantity: 1, price: 489.9 },
      { name: "Hidratante Corporal 400ml", image: "/products/hidratante.jpg", quantity: 1, price: 69.9 },
    ],
    value: 559.8,
    createdAt: "2026-03-12T06:20:00Z",
    iaStatus: "waiting",
    attempts: [],
  },
  {
    id: "rec-008",
    orderId: "#WD-4798",
    tab: "carts",
    status: "recovered",
    customerName: "Lucas Pereira",
    customerPhone: "(85) 98321-0987",
    customerEmail: "lucas.pereira@gmail.com",
    products: [
      { name: "Notebook Lenovo IdeaPad 3", image: "/products/notebook.jpg", quantity: 1, price: 3299.0 },
    ],
    value: 3299.0,
    createdAt: "2026-03-10T19:45:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "email", date: "2026-03-10T20:30:00Z", status: "read", message: "Lucas, o Notebook Lenovo IdeaPad 3 está com condições especiais!" },
      { channel: "whatsapp", date: "2026-03-11T08:00:00Z", status: "clicked", message: "Última unidade do Lenovo IdeaPad 3! Não perca a chance." },
    ],
  },
];

const pixItems: RecoveryItem[] = [
  {
    id: "rec-101",
    orderId: "#WD-4820",
    tab: "pix",
    status: "awaiting_payment",
    customerName: "Beatriz Nascimento",
    customerPhone: "(11) 99876-5432",
    customerEmail: "beatriz.nasc@gmail.com",
    products: [
      { name: "Bolsa de Couro Arezzo", image: "/products/bolsa.jpg", quantity: 1, price: 699.0 },
    ],
    value: 699.0,
    createdAt: "2026-03-12T09:00:00Z",
    expiresAt: "2026-03-12T15:00:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-12T10:00:00Z", status: "read", message: "Oi Beatriz! Seu PIX para a Bolsa Arezzo expira em breve. Finalize o pagamento!" },
    ],
  },
  {
    id: "rec-102",
    orderId: "#WD-4817",
    tab: "pix",
    status: "awaiting_payment",
    customerName: "Diego Martins",
    customerPhone: "(21) 98765-4321",
    customerEmail: "diego.martins@hotmail.com",
    products: [
      { name: "Console PS5 Digital", image: "/products/ps5.jpg", quantity: 1, price: 3799.0 },
    ],
    value: 3799.0,
    createdAt: "2026-03-12T08:15:00Z",
    expiresAt: "2026-03-12T12:15:00Z",
    iaStatus: "waiting",
    attempts: [],
  },
  {
    id: "rec-103",
    orderId: "#WD-4814",
    tab: "pix",
    status: "paid",
    customerName: "Camila Rodrigues",
    customerPhone: "(31) 99654-3210",
    customerEmail: "camila.rodrigues@gmail.com",
    products: [
      { name: "AirPods Pro 2ª Geração", image: "/products/airpods.jpg", quantity: 1, price: 1849.0 },
    ],
    value: 1849.0,
    createdAt: "2026-03-11T20:30:00Z",
    expiresAt: "2026-03-12T02:30:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-11T21:00:00Z", status: "clicked", message: "Camila, falta pouco! Finalize o PIX do seu AirPods Pro e receba amanhã!" },
    ],
  },
  {
    id: "rec-104",
    orderId: "#WD-4810",
    tab: "pix",
    status: "pix_expired",
    customerName: "Thiago Souza",
    customerPhone: "(41) 97654-3210",
    customerEmail: "thiago.souza@yahoo.com",
    products: [
      { name: "Mochila Executiva Samsonite", image: "/products/mochila.jpg", quantity: 1, price: 549.0 },
    ],
    value: 549.0,
    createdAt: "2026-03-10T14:00:00Z",
    expiresAt: "2026-03-10T20:00:00Z",
    iaStatus: "sent",
    attempts: [
      { channel: "email", date: "2026-03-10T15:00:00Z", status: "sent", message: "Thiago, seu PIX da Mochila Samsonite expira em algumas horas!" },
    ],
  },
  {
    id: "rec-105",
    orderId: "#WD-4807",
    tab: "pix",
    status: "awaiting_payment",
    customerName: "Larissa Fernandes",
    customerPhone: "(51) 98321-6543",
    customerEmail: "larissa.fern@gmail.com",
    products: [
      { name: "Paleta de Sombras MAC", image: "/products/paleta.jpg", quantity: 2, price: 289.0 },
    ],
    value: 578.0,
    createdAt: "2026-03-12T07:30:00Z",
    expiresAt: "2026-03-12T19:30:00Z",
    iaStatus: "not_tried",
    attempts: [],
  },
];

const boletosDueItems: RecoveryItem[] = [
  {
    id: "rec-201",
    orderId: "#WD-4816",
    tab: "boletos_due",
    status: "due_today",
    customerName: "Marcos Antônio Lima",
    customerPhone: "(11) 98432-1098",
    customerEmail: "marcos.lima@outlook.com",
    products: [
      { name: "TV Samsung 55\" Crystal UHD", image: "/products/tv.jpg", quantity: 1, price: 2899.0 },
    ],
    value: 2899.0,
    createdAt: "2026-03-09T10:00:00Z",
    dueDate: "2026-03-12",
    boletoUrl: "https://boleto.example.com/12345",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-12T07:00:00Z", status: "read", message: "Marcos, seu boleto da TV Samsung vence HOJE! Pague agora e garanta sua entrega." },
    ],
  },
  {
    id: "rec-202",
    orderId: "#WD-4813",
    tab: "boletos_due",
    status: "due_tomorrow",
    customerName: "Renata Vieira",
    customerPhone: "(21) 99876-5432",
    customerEmail: "renata.vieira@gmail.com",
    products: [
      { name: "Cafeteira Nespresso Vertuo", image: "/products/cafeteira.jpg", quantity: 1, price: 899.0 },
    ],
    value: 899.0,
    createdAt: "2026-03-10T11:00:00Z",
    dueDate: "2026-03-13",
    boletoUrl: "https://boleto.example.com/12346",
    iaStatus: "waiting",
    attempts: [],
  },
  {
    id: "rec-203",
    orderId: "#WD-4809",
    tab: "boletos_due",
    status: "boleto_paid",
    customerName: "Anderson Carvalho",
    customerPhone: "(31) 98765-4321",
    customerEmail: "anderson.carvalho@hotmail.com",
    products: [
      { name: "Câmera Canon EOS R50", image: "/products/camera.jpg", quantity: 1, price: 4599.0 },
    ],
    value: 4599.0,
    createdAt: "2026-03-08T09:00:00Z",
    dueDate: "2026-03-11",
    boletoUrl: "https://boleto.example.com/12347",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-11T07:00:00Z", status: "clicked", message: "Anderson, hoje é o último dia do boleto da sua Câmera Canon! Pague e receba em até 3 dias." },
    ],
  },
  {
    id: "rec-204",
    orderId: "#WD-4806",
    tab: "boletos_due",
    status: "due_today",
    customerName: "Gabriela Moreira",
    customerPhone: "(41) 99654-3210",
    customerEmail: "gabriela.moreira@gmail.com",
    products: [
      { name: "Robô Aspirador Xiaomi", image: "/products/robo.jpg", quantity: 1, price: 1899.0 },
    ],
    value: 1899.0,
    createdAt: "2026-03-09T14:00:00Z",
    dueDate: "2026-03-12",
    boletoUrl: "https://boleto.example.com/12348",
    iaStatus: "sent",
    attempts: [
      { channel: "email", date: "2026-03-11T08:00:00Z", status: "delivered", message: "Gabriela, lembrete: seu boleto do Robô Aspirador Xiaomi vence amanhã!" },
      { channel: "whatsapp", date: "2026-03-12T07:30:00Z", status: "read", message: "Último dia! Pague o boleto do seu Robô Aspirador e garanta a entrega." },
    ],
  },
];

const boletosOverdueItems: RecoveryItem[] = [
  {
    id: "rec-301",
    orderId: "#WD-4796",
    tab: "boletos_overdue",
    status: "overdue",
    customerName: "Pedro Henrique Costa",
    customerPhone: "(11) 97654-3210",
    customerEmail: "pedro.costa@gmail.com",
    products: [
      { name: "Tablet iPad Air M2", image: "/products/ipad.jpg", quantity: 1, price: 6499.0 },
    ],
    value: 6499.0,
    createdAt: "2026-03-05T10:00:00Z",
    dueDate: "2026-03-08",
    boletoUrl: "https://boleto.example.com/12349",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-08T07:00:00Z", status: "delivered", message: "Pedro, seu boleto do iPad Air venceu hoje! Gere um novo boleto para não perder sua compra." },
      { channel: "email", date: "2026-03-09T10:00:00Z", status: "sent", message: "Pedro, ainda dá tempo! Geramos um novo boleto para seu iPad Air M2." },
    ],
  },
  {
    id: "rec-302",
    orderId: "#WD-4792",
    tab: "boletos_overdue",
    status: "not_paid",
    customerName: "Vanessa Alves",
    customerPhone: "(21) 98321-6543",
    customerEmail: "vanessa.alves@outlook.com",
    products: [
      { name: "Colar Vivara Prata 925", image: "/products/colar.jpg", quantity: 1, price: 389.0 },
      { name: "Brinco Argola Vivara", image: "/products/brinco.jpg", quantity: 1, price: 249.0 },
    ],
    value: 638.0,
    createdAt: "2026-03-04T16:00:00Z",
    dueDate: "2026-03-07",
    boletoUrl: "https://boleto.example.com/12350",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-07T08:00:00Z", status: "read", message: "Vanessa, seu boleto das joias Vivara vence hoje!" },
    ],
  },
  {
    id: "rec-303",
    orderId: "#WD-4788",
    tab: "boletos_overdue",
    status: "overdue",
    customerName: "Ricardo Nogueira",
    customerPhone: "(31) 97654-8765",
    customerEmail: "ricardo.nogueira@gmail.com",
    products: [
      { name: "Cooktop 5 Bocas Brastemp", image: "/products/cooktop.jpg", quantity: 1, price: 1599.0 },
    ],
    value: 1599.0,
    createdAt: "2026-03-03T11:00:00Z",
    dueDate: "2026-03-06",
    boletoUrl: "https://boleto.example.com/12351",
    iaStatus: "sent",
    attempts: [
      { channel: "email", date: "2026-03-06T07:00:00Z", status: "delivered", message: "Ricardo, seu boleto vence hoje! Pague agora." },
      { channel: "whatsapp", date: "2026-03-07T10:00:00Z", status: "delivered", message: "Ricardo, geramos um novo boleto para o Cooktop Brastemp. Não perca sua compra!" },
    ],
  },
];

const cardItems: RecoveryItem[] = [
  {
    id: "rec-401",
    orderId: "#WD-4818",
    tab: "cards",
    status: "declined",
    customerName: "Isabela Martins",
    customerPhone: "(11) 99234-5678",
    customerEmail: "isabela.martins@gmail.com",
    products: [
      { name: "Tênis Adidas Ultraboost 23", image: "/products/adidas.jpg", quantity: 1, price: 999.9 },
    ],
    value: 999.9,
    createdAt: "2026-03-12T09:30:00Z",
    declineReason: "Saldo insuficiente",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-12T10:00:00Z", status: "read", message: "Isabela, houve um problema no pagamento do seu Adidas Ultraboost. Tente novamente ou use outro cartão!" },
    ],
  },
  {
    id: "rec-402",
    orderId: "#WD-4811",
    tab: "cards",
    status: "retried",
    customerName: "Gustavo Henrique Ramos",
    customerPhone: "(21) 98765-4321",
    customerEmail: "gustavo.ramos@hotmail.com",
    products: [
      { name: "Monitor LG UltraWide 34\"", image: "/products/monitor.jpg", quantity: 1, price: 2499.0 },
    ],
    value: 2499.0,
    createdAt: "2026-03-11T15:00:00Z",
    declineReason: "Limite excedido",
    iaStatus: "sent",
    attempts: [
      { channel: "email", date: "2026-03-11T16:00:00Z", status: "delivered", message: "Gustavo, o pagamento do Monitor LG UltraWide não foi aprovado. Tente com outro cartão!" },
      { channel: "whatsapp", date: "2026-03-12T08:00:00Z", status: "read", message: "Gustavo, parcelamos em até 12x sem juros! Tente novamente o Monitor LG." },
    ],
  },
  {
    id: "rec-403",
    orderId: "#WD-4804",
    tab: "cards",
    status: "card_recovered",
    customerName: "Fernanda Lopes",
    customerPhone: "(31) 99876-5432",
    customerEmail: "fernanda.lopes@gmail.com",
    products: [
      { name: "iPhone 15 Pro 256GB", image: "/products/iphone.jpg", quantity: 1, price: 8499.0 },
    ],
    value: 8499.0,
    createdAt: "2026-03-10T12:00:00Z",
    declineReason: "Cartão expirado",
    iaStatus: "sent",
    attempts: [
      { channel: "whatsapp", date: "2026-03-10T13:00:00Z", status: "read", message: "Fernanda, o cartão usado no iPhone 15 Pro está expirado. Atualize os dados de pagamento!" },
      { channel: "whatsapp", date: "2026-03-11T09:00:00Z", status: "clicked", message: "Fernanda, não perca seu iPhone 15 Pro! Use o link para atualizar o pagamento: [link]" },
    ],
  },
  {
    id: "rec-404",
    orderId: "#WD-4800",
    tab: "cards",
    status: "declined",
    customerName: "Rafael Santos",
    customerPhone: "(41) 98432-1098",
    customerEmail: "rafael.santos@yahoo.com",
    products: [
      { name: "Drone DJI Mini 3 Pro", image: "/products/drone.jpg", quantity: 1, price: 5199.0 },
    ],
    value: 5199.0,
    createdAt: "2026-03-11T18:00:00Z",
    declineReason: "Saldo insuficiente",
    iaStatus: "waiting",
    attempts: [
      { channel: "email", date: "2026-03-11T19:00:00Z", status: "delivered", message: "Rafael, o pagamento do DJI Mini 3 Pro não foi aprovado. Tente com outro cartão!" },
    ],
  },
  {
    id: "rec-405",
    orderId: "#WD-4795",
    tab: "cards",
    status: "declined",
    customerName: "Aline Barbosa",
    customerPhone: "(51) 99654-3210",
    customerEmail: "aline.barbosa@gmail.com",
    products: [
      { name: "Máquina de Lavar Electrolux 12kg", image: "/products/lavadora.jpg", quantity: 1, price: 2199.0 },
    ],
    value: 2199.0,
    createdAt: "2026-03-12T06:45:00Z",
    declineReason: "Limite excedido",
    iaStatus: "not_tried",
    attempts: [],
  },
];

export const recoveryItems: RecoveryItem[] = [
  ...cartItems,
  ...pixItems,
  ...boletosDueItems,
  ...boletosOverdueItems,
  ...cardItems,
];

export function getItemsByTab(tab: RecoveryTab): RecoveryItem[] {
  return recoveryItems.filter((item) => item.tab === tab);
}
