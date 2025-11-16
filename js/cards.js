// Cards Module
export class CardDeck {
    constructor() {
        this.opportunityCards = this.createOpportunityCards();
        this.doodadCards = this.createDoodadCards();
        this.marketCards = this.createMarketCards();
    }

    createOpportunityCards() {
        return [
            {
                type: 'stock',
                name: 'MYT4GR',
                description: 'Ação de tecnologia com potencial de crescimento',
                cost: 5000,
                shares: 100,
                priceRange: [5, 40],
                dividend: 10,
                downPayment: 5000
            },
            {
                type: 'stock',
                name: 'OK4U',
                description: 'Ação de varejo com dividendos estáveis',
                cost: 10000,
                shares: 100,
                priceRange: [10, 40],
                dividend: 100,
                downPayment: 10000
            },
            {
                type: 'realEstate',
                name: 'Casa 2Q/1B',
                description: 'Casa pequena em bairro residencial',
                cost: 50000,
                downPayment: 5000,
                mortgage: 45000,
                mortgagePayment: 450,
                cashflow: 100,
                sellPriceRange: [55000, 75000]
            },
            {
                type: 'realEstate',
                name: 'Casa 3Q/2B',
                description: 'Casa média em localização boa',
                cost: 80000,
                downPayment: 8000,
                mortgage: 72000,
                mortgagePayment: 720,
                cashflow: 200,
                sellPriceRange: [85000, 110000]
            },
            {
                type: 'realEstate',
                name: 'Apartamento',
                description: 'Apartamento em prédio novo',
                cost: 60000,
                downPayment: 6000,
                mortgage: 54000,
                mortgagePayment: 540,
                cashflow: 150,
                sellPriceRange: [65000, 90000]
            },
            {
                type: 'business',
                name: 'Franquia de Café',
                description: 'Cafeteria franqueada em shopping',
                cost: 50000,
                downPayment: 50000,
                cashflow: 1000,
                sellPriceRange: [55000, 80000]
            },
            {
                type: 'business',
                name: 'Lavanderia',
                description: 'Lavanderia automática em bairro comercial',
                cost: 30000,
                downPayment: 30000,
                cashflow: 500,
                sellPriceRange: [35000, 50000]
            },
            {
                type: 'business',
                name: 'Restaurante',
                description: 'Restaurante de comida caseira',
                cost: 100000,
                downPayment: 100000,
                cashflow: 2500,
                sellPriceRange: [110000, 150000]
            }
        ];
    }

    createDoodadCards() {
        return [
            {
                name: 'TV Nova',
                description: 'Você comprou uma TV de última geração',
                cost: 2000,
                monthlyCost: 0
            },
            {
                name: 'Viagem de Férias',
                description: 'Você tirou férias caras com a família',
                cost: 3000,
                monthlyCost: 0
            },
            {
                name: 'Barco',
                description: 'Você comprou um barco recreativo',
                cost: 15000,
                monthlyCost: 150
            },
            {
                name: 'Jet Ski',
                description: 'Você comprou um jet ski para diversão',
                cost: 8000,
                monthlyCost: 50
            },
            {
                name: 'Festa de Aniversário',
                description: 'Você fez uma festa cara de aniversário',
                cost: 1500,
                monthlyCost: 0
            },
            {
                name: 'Roupas de Grife',
                description: 'Você comprou roupas de marca caras',
                cost: 1000,
                monthlyCost: 0
            },
            {
                name: 'Golfe',
                description: 'Você se tornou sócio de um clube de golfe',
                cost: 5000,
                monthlyCost: 100
            },
            {
                name: 'Carro Novo',
                description: 'Você comprou um carro novo e caro',
                cost: 10000,
                monthlyCost: 200
            }
        ];
    }

    createMarketCards() {
        return [
            {
                type: 'stockSale',
                stock: 'MYT4GR',
                description: 'Comprador interessado em ações MYT4GR',
                priceMultiplier: 2
            },
            {
                type: 'stockSale',
                stock: 'OK4U',
                description: 'Comprador interessado em ações OK4U',
                priceMultiplier: 1.5
            },
            {
                type: 'realEstateSale',
                property: 'Casa 2Q/1B',
                description: 'Comprador interessado em casa pequena',
                price: 65000
            },
            {
                type: 'realEstateSale',
                property: 'Casa 3Q/2B',
                description: 'Comprador interessado em casa média',
                price: 95000
            },
            {
                type: 'realEstateSale',
                property: 'Apartamento',
                description: 'Comprador interessado em apartamento',
                price: 75000
            },
            {
                type: 'damage',
                description: 'Suas propriedades precisam de reparos',
                costPerProperty: 500
            }
        ];
    }

    drawOpportunityCard() {
        const index = Math.floor(Math.random() * this.opportunityCards.length);
        return { ...this.opportunityCards[index] };
    }

    drawDoodadCard() {
        const index = Math.floor(Math.random() * this.doodadCards.length);
        return { ...this.doodadCards[index] };
    }

    drawMarketCard() {
        const index = Math.floor(Math.random() * this.marketCards.length);
        return { ...this.marketCards[index] };
    }
}

// Board Spaces Handler
export class BoardSpaces {
    static getSpaceAction(spaceNumber) {
        const spaces = [
            { type: 'start', name: 'INÍCIO' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'doodad', name: 'Despesa Extra' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'market', name: 'Mercado' },
            { type: 'doodad', name: 'Despesa Extra' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'charity', name: 'Caridade' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'doodad', name: 'Despesa Extra' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'payday', name: 'Dia de Pagamento' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'doodad', name: 'Despesa Extra' },
            { type: 'market', name: 'Mercado' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'doodad', name: 'Despesa Extra' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'child', name: 'Criança' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'doodad', name: 'Despesa Extra' },
            { type: 'opportunity', name: 'Oportunidade' },
            { type: 'downsized', name: 'Demitido' },
            { type: 'opportunity', name: 'Oportunidade' }
        ];

        return spaces[spaceNumber % 24];
    }

    static handleSpace(spaceType, player, cardDeck) {
        switch (spaceType) {
            case 'opportunity':
                return {
                    action: 'drawCard',
                    cardType: 'opportunity',
                    card: cardDeck.drawOpportunityCard()
                };
            case 'doodad':
                return {
                    action: 'drawCard',
                    cardType: 'doodad',
                    card: cardDeck.drawDoodadCard()
                };
            case 'market':
                return {
                    action: 'drawCard',
                    cardType: 'market',
                    card: cardDeck.drawMarketCard()
                };
            case 'payday':
                player.payday();
                return {
                    action: 'payday',
                    message: `Dia de Pagamento! Você recebeu R$ ${player.salary} + renda passiva.`
                };
            case 'charity':
                return {
                    action: 'charity',
                    message: 'Você pode doar 10% do seu salário para caridade e ganhar dados extras em 3 turnos.'
                };
            case 'child':
                player.addChild();
                return {
                    action: 'child',
                    message: 'Parabéns! Você teve um filho. Suas despesas aumentaram em R$ 300/mês.'
                };
            case 'downsized':
                player.downsized();
                return {
                    action: 'downsized',
                    message: 'Você foi demitido! Pule um turno e pague suas despesas.'
                };
            default:
                return {
                    action: 'none',
                    message: 'Continue jogando.'
                };
        }
    }
}

// Utility functions
export function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
