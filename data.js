// data.js - CASHFLOW 101 Game Data (Brazilian Portuguese)

const professions = [
    {
        name: "Médico",
        salary: 13200,
        savings: 3000,
        monthlyExpenses: {
            tax: 3420,
            housing: 1900,
            car: 760,
            studentLoan: 750,
            creditCard: 270,
            otherExpenses: 2880,
            children: 640 // per child
        },
        liabilities: [
            { type: "mortgage", description: "Hipoteca Casa", amount: 202000, monthlyPayment: 1900 },
            { type: "carLoan", description: "Empréstimo Carro", amount: 19000, monthlyPayment: 760 },
            { type: "studentLoan", description: "Empréstimo Estudantil", amount: 150000, monthlyPayment: 750 },
            { type: "creditCard", description: "Dívida Cartão de Crédito", amount: 9000, monthlyPayment: 270 }
        ],
        assets: []
    },
    {
        name: "Engenheiro",
        salary: 7500,
        savings: 1500,
        monthlyExpenses: {
            tax: 1800,
            housing: 1100,
            car: 480,
            studentLoan: 450,
            creditCard: 180,
            otherExpenses: 1650,
            children: 380
        },
        liabilities: [
            { type: "mortgage", description: "Hipoteca Casa", amount: 115000, monthlyPayment: 1100 },
            { type: "carLoan", description: "Empréstimo Carro", amount: 12000, monthlyPayment: 480 },
            { type: "studentLoan", description: "Empréstimo Estudantil", amount: 90000, monthlyPayment: 450 },
            { type: "creditCard", description: "Dívida Cartão de Crédito", amount: 6000, monthlyPayment: 180 }
        ],
        assets: []
    },
    {
        name: "Caminhoneiro",
        salary: 2500,
        savings: 750,
        monthlyExpenses: {
            tax: 460,
            housing: 400,
            car: 0,
            studentLoan: 0,
            creditCard: 60,
            otherExpenses: 570,
            children: 140
        },
        liabilities: [
            { type: "mortgage", description: "Hipoteca Casa", amount: 38000, monthlyPayment: 400 },
            { type: "creditCard", description: "Dívida Cartão de Crédito", amount: 2000, monthlyPayment: 60 }
        ],
        assets: []
    },
    {
        name: "Secretária",
        salary: 2500,
        savings: 710,
        monthlyExpenses: {
            tax: 460,
            housing: 400,
            car: 100,
            studentLoan: 0,
            creditCard: 50,
            otherExpenses: 760,
            children: 140
        },
        liabilities: [
            { type: "mortgage", description: "Hipoteca Casa", amount: 38000, monthlyPayment: 400 },
            { type: "carLoan", description: "Empréstimo Carro", amount: 3000, monthlyPayment: 100 },
            { type: "creditCard", description: "Dívida Cartão de Crédito", amount: 1000, monthlyPayment: 50 }
        ],
        assets: []
    },
    {
        name: "Professor",
        salary: 3300,
        savings: 400,
        monthlyExpenses: {
            tax: 630,
            housing: 500,
            car: 160,
            studentLoan: 60,
            creditCard: 90,
            otherExpenses: 760,
            children: 150
        },
        liabilities: [
            { type: "mortgage", description: "Hipoteca Casa", amount: 50000, monthlyPayment: 500 },
            { type: "carLoan", description: "Empréstimo Carro", amount: 4000, monthlyPayment: 160 },
            { type: "studentLoan", description: "Empréstimo Estudantil", amount: 12000, monthlyPayment: 60 },
            { type: "creditCard", description: "Dívida Cartão de Crédito", amount: 3000, monthlyPayment: 90 }
        ],
        assets: []
    },
    {
        name: "Mecânico",
        salary: 2000,
        savings: 670,
        monthlyExpenses: {
            tax: 360,
            housing: 300,
            car: 100,
            studentLoan: 0,
            creditCard: 60,
            otherExpenses: 450,
            children: 110
        },
        liabilities: [
            { type: "mortgage", description: "Hipoteca Casa", amount: 31000, monthlyPayment: 300 },
            { type: "carLoan", description: "Empréstimo Carro", amount: 2000, monthlyPayment: 100 },
            { type: "creditCard", description: "Dívida Cartão de Crédito", amount: 2000, monthlyPayment: 60 }
        ],
        assets: []
    }
];

const opportunityCards = [
    // Small Business Opportunities
    {
        id: "opp_small_1",
        title: "Ações da MYT4U",
        description: "Compre até 1000 ações da MYT4U por R$ 10,00 cada. Range: R$ 5,00 - R$ 40,00",
        type: "stock",
        size: "small",
        cost: 10,
        priceRange: { min: 5, max: 40 },
        maxShares: 1000,
        dividendPerShare: 0,
        symbol: "MYT4U"
    },
    {
        id: "opp_small_2",
        title: "Ações da OK4U",
        description: "Compre até 1000 ações da OK4U por R$ 5,00 cada. Range: R$ 1,00 - R$ 20,00",
        type: "stock",
        size: "small",
        cost: 5,
        priceRange: { min: 1, max: 20 },
        maxShares: 1000,
        dividendPerShare: 0,
        symbol: "OK4U"
    },
    {
        id: "opp_small_3",
        title: "Casa 2/1",
        description: "Casa de 2 quartos e 1 banheiro. Entrada: R$ 5.000. Custo: R$ 50.000. Fluxo de Caixa: R$ 100/mês.",
        type: "realEstate",
        size: "small",
        cost: 50000,
        downPayment: 5000,
        cashFlow: 100,
        description2: "2 quartos, 1 banheiro"
    },
    {
        id: "opp_small_4",
        title: "Duplex 2/1",
        description: "Duplex 2/1 para alugar. Entrada: R$ 6.000. Custo: R$ 60.000. Fluxo de Caixa: R$ 160/mês.",
        type: "realEstate",
        size: "small",
        cost: 60000,
        downPayment: 6000,
        cashFlow: 160,
        description2: "Duplex 2 quartos, 1 banheiro"
    },
    {
        id: "opp_small_5",
        title: "Casa 3/2",
        description: "Casa de 3 quartos e 2 banheiros. Entrada: R$ 10.000. Custo: R$ 100.000. Fluxo de Caixa: R$ 200/mês.",
        type: "realEstate",
        size: "small",
        cost: 100000,
        downPayment: 10000,
        cashFlow: 200,
        description2: "3 quartos, 2 banheiros"
    },
    {
        id: "opp_small_6",
        title: "Condomínio 3/2",
        description: "Condomínio de 3 quartos e 2 banheiros. Entrada: R$ 15.000. Custo: R$ 150.000. Fluxo de Caixa: R$ 440/mês.",
        type: "realEstate",
        size: "small",
        cost: 150000,
        downPayment: 15000,
        cashFlow: 440,
        description2: "Condomínio 3 quartos, 2 banheiros"
    },
    // Large Business Opportunities
    {
        id: "opp_large_1",
        title: "Franquia de Lava-Rápido",
        description: "Franquia de lava-rápido. Entrada: R$ 50.000. Custo: R$ 200.000. Fluxo de Caixa: R$ 5.000/mês.",
        type: "business",
        size: "large",
        cost: 200000,
        downPayment: 50000,
        cashFlow: 5000,
        description2: "Franquia de lava-rápido"
    },
    {
        id: "opp_large_2",
        title: "Prédio de Apartamentos 8 unidades",
        description: "Prédio com 8 apartamentos. Entrada: R$ 100.000. Custo: R$ 400.000. Fluxo de Caixa: R$ 10.000/mês.",
        type: "realEstate",
        size: "large",
        cost: 400000,
        downPayment: 100000,
        cashFlow: 10000,
        description2: "8 unidades"
    },
    {
        id: "opp_large_3",
        title: "Prédio de Apartamentos 12 unidades",
        description: "Prédio com 12 apartamentos. Entrada: R$ 150.000. Custo: R$ 600.000. Fluxo de Caixa: R$ 15.000/mês.",
        type: "realEstate",
        size: "large",
        cost: 600000,
        downPayment: 150000,
        cashFlow: 15000,
        description2: "12 unidades"
    },
    {
        id: "opp_large_4",
        title: "Restaurante Delivery",
        description: "Restaurante com serviço de delivery. Entrada: R$ 30.000. Custo: R$ 120.000. Fluxo de Caixa: R$ 3.500/mês.",
        type: "business",
        size: "large",
        cost: 120000,
        downPayment: 30000,
        cashFlow: 3500,
        description2: "Restaurante com delivery"
    },
    {
        id: "opp_large_5",
        title: "Shopping Center",
        description: "Investimento em shopping center. Entrada: R$ 250.000. Custo: R$ 1.000.000. Fluxo de Caixa: R$ 30.000/mês.",
        type: "realEstate",
        size: "large",
        cost: 1000000,
        downPayment: 250000,
        cashFlow: 30000,
        description2: "Shopping center"
    }
];

const marketCards = [
    {
        id: "market_1",
        title: "Ações da MYT4U em Alta!",
        description: "Comprador quer todas as suas ações da MYT4U por R$ 40,00 cada.",
        type: "stock",
        targetAsset: "MYT4U",
        sellPrice: 40
    },
    {
        id: "market_2",
        title: "Ações da MYT4U Caíram",
        description: "Comprador quer todas as suas ações da MYT4U por R$ 5,00 cada.",
        type: "stock",
        targetAsset: "MYT4U",
        sellPrice: 5
    },
    {
        id: "market_3",
        title: "Ações da OK4U Dispararam!",
        description: "Comprador quer todas as suas ações da OK4U por R$ 20,00 cada.",
        type: "stock",
        targetAsset: "OK4U",
        sellPrice: 20
    },
    {
        id: "market_4",
        title: "Ações da OK4U em Queda",
        description: "Comprador quer todas as suas ações da OK4U por R$ 1,00 cada.",
        type: "stock",
        targetAsset: "OK4U",
        sellPrice: 1
    },
    {
        id: "market_5",
        title: "Mercado Imobiliário Aquecido - Casa 2/1",
        description: "Comprador oferece R$ 65.000 por sua Casa 2/1.",
        type: "realEstate",
        targetAsset: "Casa 2/1",
        sellPrice: 65000
    },
    {
        id: "market_6",
        title: "Mercado Imobiliário em Alta - Duplex 2/1",
        description: "Comprador oferece R$ 80.000 por seu Duplex 2/1.",
        type: "realEstate",
        targetAsset: "Duplex 2/1",
        sellPrice: 80000
    },
    {
        id: "market_7",
        title: "Valorização - Casa 3/2",
        description: "Comprador oferece R$ 135.000 por sua Casa 3/2.",
        type: "realEstate",
        targetAsset: "Casa 3/2",
        sellPrice: 135000
    },
    {
        id: "market_8",
        title: "Condomínio Valorizado",
        description: "Comprador oferece R$ 200.000 por seu Condomínio 3/2.",
        type: "realEstate",
        targetAsset: "Condomínio 3/2",
        sellPrice: 200000
    },
    {
        id: "market_9",
        title: "Investidor Interessado - Prédio 8 unidades",
        description: "Investidor oferece R$ 520.000 por seu Prédio de 8 unidades.",
        type: "realEstate",
        targetAsset: "Prédio de Apartamentos 8 unidades",
        sellPrice: 520000
    },
    {
        id: "market_10",
        title: "Grande Negócio - Prédio 12 unidades",
        description: "Investidor oferece R$ 750.000 por seu Prédio de 12 unidades.",
        type: "realEstate",
        targetAsset: "Prédio de Apartamentos 12 unidades",
        sellPrice: 750000
    }
];

const doodadCards = [
    {
        id: "doodad_1",
        title: "Férias Inesperadas!",
        description: "Você gastou em uma viagem de última hora.",
        cost: 1000
    },
    {
        id: "doodad_2",
        title: "Reparo no Carro",
        description: "Seu carro precisou de um reparo caro.",
        cost: 500
    },
    {
        id: "doodad_3",
        title: "Novo Celular",
        description: "Você não resistiu e comprou o último lançamento.",
        cost: 2000
    },
    {
        id: "doodad_4",
        title: "Jantar Luxuoso",
        description: "Jantar especial em um restaurante caro.",
        cost: 400
    },
    {
        id: "doodad_5",
        title: "Roupas Novas",
        description: "Renovação completa do guarda-roupa.",
        cost: 1500
    },
    {
        id: "doodad_6",
        title: "TV de Última Geração",
        description: "Não resistiu à promoção da nova TV 4K.",
        cost: 3000
    },
    {
        id: "doodad_7",
        title: "Festa de Aniversário",
        description: "Uma festa memorável custou caro.",
        cost: 800
    },
    {
        id: "doodad_8",
        title: "Tratamento de Beleza",
        description: "Spa e tratamentos estéticos.",
        cost: 600
    },
    {
        id: "doodad_9",
        title: "Ingresso de Show",
        description: "Show da sua banda favorita.",
        cost: 350
    },
    {
        id: "doodad_10",
        title: "Móveis Novos",
        description: "Reforma da decoração de casa.",
        cost: 2500
    }
];

const dreams = [
    {
        id: "dream_1",
        title: "Comprar o Sonho dos Seus Sonhos",
        description: "Realizando seu maior sonho!",
        cost: 50000,
        passiveIncomeNeeded: 0
    },
    {
        id: "dream_2",
        title: "Ajudar Amigo Necessitado",
        description: "Emprestar R$ 10.000 a um amigo.",
        cost: 10000,
        passiveIncomeNeeded: 0
    },
    {
        id: "dream_3",
        title: "Pagar Todas as Dívidas",
        description: "Quitar todos os seus empréstimos!",
        cost: 0, // Variable based on player liabilities
        passiveIncomeNeeded: 0,
        payOffDebts: true
    }
];

// Rat Race Board - 24 spaces in typical Cashflow game
const ratRaceBoard = [
    "payday", // 0
    "opportunity_small", // 1
    "doodad", // 2
    "opportunity_large", // 3
    "market", // 4
    "payday", // 5
    "opportunity_small", // 6
    "doodad", // 7
    "child", // 8
    "opportunity_large", // 9
    "market", // 10
    "payday", // 11
    "opportunity_small", // 12
    "doodad", // 13
    "charity", // 14
    "opportunity_large", // 15
    "market", // 16
    "payday", // 17
    "opportunity_small", // 18
    "doodad", // 19
    "child", // 20
    "opportunity_large", // 21
    "market", // 22
    "opportunity_small" // 23
];

// Fast Track Board - simplified version
const fastTrackBoard = [
    "cashflow_day", // 0
    "business_deal", // 1
    "cashflow_day", // 2
    "business_deal", // 3
    "cashflow_day", // 4
    "business_deal", // 5
    "cashflow_day", // 6
    "business_deal" // 7
];

const BANK_LOAN_RATE = 0.1; // 10% interest rate for bank loans
