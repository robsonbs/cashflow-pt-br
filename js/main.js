// Main Game Controller
import { GameState, Player } from './game.js';
import { CardDeck, BoardSpaces, rollDice, formatCurrency } from './cards.js';

class GameController {
    constructor() {
        this.gameState = new GameState();
        this.cardDeck = new CardDeck();
        this.currentCard = null;
        
        this.initializeUI();
        this.attachEventListeners();
    }

    initializeUI() {
        // Cache DOM elements
        this.elements = {
            // Buttons
            startGameBtn: document.getElementById('startGame'),
            rollDiceBtn: document.getElementById('rollDice'),
            endTurnBtn: document.getElementById('endTurn'),
            
            // Displays
            diceValue: document.getElementById('diceValue'),
            currentPlayer: document.getElementById('currentPlayer'),
            
            // Financial statement
            income: document.getElementById('income'),
            expenses: document.getElementById('expenses'),
            cashflow: document.getElementById('cashflow'),
            cash: document.getElementById('cash'),
            assets: document.getElementById('assets'),
            liabilities: document.getElementById('liabilities'),
            
            // Log
            logContent: document.getElementById('logContent'),
            
            // Modals
            professionModal: document.getElementById('professionModal'),
            cardModal: document.getElementById('cardModal'),
            cardTitle: document.getElementById('cardTitle'),
            cardContent: document.getElementById('cardContent'),
            acceptCardBtn: document.getElementById('acceptCard'),
            rejectCardBtn: document.getElementById('rejectCard'),
            
            // Board spaces
            boardSpaces: document.querySelectorAll('.board-space')
        };
    }

    attachEventListeners() {
        // Game control buttons
        this.elements.startGameBtn.addEventListener('click', () => this.startGame());
        this.elements.rollDiceBtn.addEventListener('click', () => this.handleRollDice());
        this.elements.endTurnBtn.addEventListener('click', () => this.endTurn());
        
        // Profession selection
        const professionBtns = document.querySelectorAll('.profession-btn');
        professionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const profession = e.currentTarget.dataset.profession;
                this.selectProfession(profession);
            });
        });
        
        // Card actions
        this.elements.acceptCardBtn.addEventListener('click', () => this.acceptCard());
        this.elements.rejectCardBtn.addEventListener('click', () => this.rejectCard());
    }

    startGame() {
        this.log('Iniciando novo jogo...');
        this.showModal('professionModal');
    }

    selectProfession(profession) {
        const professionNames = {
            engineer: 'Engenheiro',
            teacher: 'Professor',
            mechanic: 'Mecânico',
            nurse: 'Enfermeira',
            secretary: 'Secretária',
            manager: 'Gerente'
        };

        const player = new Player('Jogador 1', profession);
        this.gameState.startGame(player);
        
        this.log(`Você escolheu a profissão: ${professionNames[profession]}`);
        this.log(`Salário inicial: ${formatCurrency(player.salary)}`);
        this.log(`Dinheiro inicial: ${formatCurrency(player.cash)}`);
        
        this.hideModal('professionModal');
        this.updateUI();
        this.enableGameControls();
    }

    enableGameControls() {
        this.elements.startGameBtn.disabled = true;
        this.elements.rollDiceBtn.disabled = false;
    }

    handleRollDice() {
        const dice = rollDice();
        this.elements.diceValue.textContent = dice;
        
        this.log(`Você tirou ${dice} no dado!`);
        
        // Move player
        const newPosition = this.gameState.movePlayer(dice);
        this.updatePlayerPosition(newPosition);
        
        // Handle space action
        const space = BoardSpaces.getSpaceAction(newPosition);
        this.log(`Você caiu em: ${space.name}`);
        
        const result = BoardSpaces.handleSpace(
            space.type,
            this.gameState.currentPlayer,
            this.cardDeck
        );
        
        this.handleSpaceResult(result);
        
        // Disable roll, enable end turn
        this.elements.rollDiceBtn.disabled = true;
        this.elements.endTurnBtn.disabled = false;
        
        this.updateUI();
    }

    handleSpaceResult(result) {
        switch (result.action) {
            case 'drawCard':
                this.currentCard = result.card;
                this.showCardModal(result.cardType, result.card);
                break;
            case 'payday':
            case 'charity':
            case 'child':
            case 'downsized':
                this.log(result.message);
                break;
            default:
                break;
        }
    }

    showCardModal(cardType, card) {
        const titles = {
            opportunity: 'Oportunidade de Investimento',
            doodad: 'Despesa Extra',
            market: 'Mercado'
        };
        
        this.elements.cardTitle.textContent = titles[cardType];
        
        let content = '';
        if (cardType === 'opportunity') {
            content = this.formatOpportunityCard(card);
        } else if (cardType === 'doodad') {
            content = this.formatDoodadCard(card);
        } else if (cardType === 'market') {
            content = this.formatMarketCard(card);
        }
        
        this.elements.cardContent.innerHTML = content;
        this.showModal('cardModal');
    }

    formatOpportunityCard(card) {
        let html = `<h3>${card.name}</h3>`;
        html += `<p>${card.description}</p>`;
        html += `<div class="card-details">`;
        html += `<p><strong>Tipo:</strong> ${this.translateType(card.type)}</p>`;
        html += `<p><strong>Custo:</strong> ${formatCurrency(card.downPayment)}</p>`;
        
        if (card.cashflow) {
            html += `<p><strong>Fluxo de Caixa:</strong> ${formatCurrency(card.cashflow)}/mês</p>`;
        }
        if (card.dividend) {
            html += `<p><strong>Dividendo:</strong> ${formatCurrency(card.dividend)}/mês</p>`;
        }
        if (card.mortgage) {
            html += `<p><strong>Hipoteca:</strong> ${formatCurrency(card.mortgage)}</p>`;
            html += `<p><strong>Pagamento da Hipoteca:</strong> ${formatCurrency(card.mortgagePayment)}/mês</p>`;
        }
        
        html += `</div>`;
        return html;
    }

    formatDoodadCard(card) {
        let html = `<h3>${card.name}</h3>`;
        html += `<p>${card.description}</p>`;
        html += `<div class="card-details">`;
        html += `<p><strong>Custo:</strong> ${formatCurrency(card.cost)}</p>`;
        
        if (card.monthlyCost > 0) {
            html += `<p><strong>Custo Mensal:</strong> ${formatCurrency(card.monthlyCost)}/mês</p>`;
        }
        
        html += `</div>`;
        html += `<p class="warning">Você deve pagar por esta despesa.</p>`;
        return html;
    }

    formatMarketCard(card) {
        let html = `<h3>Oportunidade de Mercado</h3>`;
        html += `<p>${card.description}</p>`;
        html += `<div class="card-details">`;
        
        if (card.type === 'stockSale') {
            html += `<p>Alguém quer comprar suas ações ${card.stock} por ${card.priceMultiplier}x o preço de compra!</p>`;
        } else if (card.type === 'realEstateSale') {
            html += `<p>Alguém quer comprar sua propriedade por ${formatCurrency(card.price)}!</p>`;
        } else if (card.type === 'damage') {
            html += `<p>Custo de reparo: ${formatCurrency(card.costPerProperty)} por propriedade</p>`;
        }
        
        html += `</div>`;
        return html;
    }

    translateType(type) {
        const types = {
            stock: 'Ação',
            realEstate: 'Imóvel',
            business: 'Negócio'
        };
        return types[type] || type;
    }

    acceptCard() {
        if (!this.currentCard) return;
        
        const player = this.gameState.currentPlayer;
        
        // Handle different card types
        if (this.currentCard.type === 'stock' || 
            this.currentCard.type === 'realEstate' || 
            this.currentCard.type === 'business') {
            
            if (player.buyAsset(this.currentCard)) {
                this.log(`Você comprou: ${this.currentCard.name}`);
                this.log(`Pagamento: ${formatCurrency(this.currentCard.downPayment)}`);
            } else {
                this.log(`Você não tem dinheiro suficiente para comprar ${this.currentCard.name}`);
            }
        } else if (this.currentCard.cost !== undefined) {
            // Doodad card
            player.subtractExpense(this.currentCard.cost);
            if (this.currentCard.monthlyCost > 0) {
                player.expenses.doodad = (player.expenses.doodad || 0) + this.currentCard.monthlyCost;
                player.calculateTotals();
            }
            this.log(`Você comprou: ${this.currentCard.name}`);
            this.log(`Custo: ${formatCurrency(this.currentCard.cost)}`);
        }
        
        this.currentCard = null;
        this.hideModal('cardModal');
        this.updateUI();
    }

    rejectCard() {
        if (this.currentCard) {
            // For doodad cards, you must accept them
            if (this.currentCard.cost !== undefined && !this.currentCard.type) {
                this.log('Você não pode recusar uma despesa extra!');
                this.acceptCard();
                return;
            }
            
            this.log(`Você recusou: ${this.currentCard.name || 'a oportunidade'}`);
        }
        
        this.currentCard = null;
        this.hideModal('cardModal');
    }

    endTurn() {
        this.log('Turno finalizado.');
        
        // Check win condition
        if (this.gameState.escapeTorFastTrack()) {
            this.log('🎉 Parabéns! Você escapou da Corrida dos Ratos!');
            this.log('Bem-vindo à Pista Rápida!');
        }
        
        // Reset for next turn
        this.elements.rollDiceBtn.disabled = false;
        this.elements.endTurnBtn.disabled = true;
        this.elements.diceValue.textContent = '-';
        
        this.updateUI();
    }

    updateUI() {
        if (!this.gameState.currentPlayer) return;
        
        const player = this.gameState.currentPlayer;
        
        // Update player info
        const playerDisplay = this.elements.currentPlayer;
        const professionNames = {
            engineer: 'Engenheiro',
            teacher: 'Professor',
            mechanic: 'Mecânico',
            nurse: 'Enfermeira',
            secretary: 'Secretária',
            manager: 'Gerente'
        };
        
        playerDisplay.innerHTML = `
            <p class="player-name">${player.name}</p>
            <p class="player-profession">${professionNames[player.profession]}</p>
            <p class="player-position">Posição: ${this.gameState.currentSpace}</p>
        `;
        
        // Update financial statement
        this.elements.income.textContent = formatCurrency(player.salary);
        this.elements.expenses.textContent = formatCurrency(player.totalExpenses);
        this.elements.cashflow.textContent = formatCurrency(player.cashflow);
        this.elements.cash.textContent = formatCurrency(player.cash);
        
        const totalAssets = player.stocks.length + player.realEstate.length + player.businesses.length;
        this.elements.assets.textContent = `${totalAssets} itens`;
        this.elements.liabilities.textContent = formatCurrency(player.totalLiabilities);
    }

    updatePlayerPosition(position) {
        // Remove all player markers
        this.elements.boardSpaces.forEach(space => {
            space.classList.remove('has-player');
        });
        
        // Add player marker to current space
        const currentSpace = document.querySelector(`[data-space="${position}"]`);
        if (currentSpace) {
            currentSpace.classList.add('has-player');
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    log(message) {
        const logContent = this.elements.logContent;
        const p = document.createElement('p');
        p.textContent = message;
        logContent.appendChild(p);
        
        // Auto-scroll to bottom
        logContent.scrollTop = logContent.scrollHeight;
        
        // Keep only last 20 messages
        while (logContent.children.length > 20) {
            logContent.removeChild(logContent.firstChild);
        }
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new GameController();
});
