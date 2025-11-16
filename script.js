// script.js - CASHFLOW 101 Game Logic

// Global Variables
let players = [];
let currentPlayerIndex = 0;
let gameState = "setup"; // setup, ratRace, fastTrack, gameOver
let turnInProgress = false;
let currentCard = null;

// Initialize the game
function initGame() {
    setupEventListeners();
    updatePlayerCountSelection();
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('player-count').addEventListener('change', updatePlayerCountSelection);
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('roll-dice-btn').addEventListener('click', rollDice);
    document.getElementById('next-turn-btn').addEventListener('click', nextTurn);
}

// Update profession selection based on player count
function updatePlayerCountSelection() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    const professionSelection = document.getElementById('profession-selection');
    professionSelection.innerHTML = '';

    for (let i = 1; i <= playerCount; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-profession';
        
        const playerLabel = document.createElement('h4');
        playerLabel.textContent = `Jogador ${i}`;
        
        const select = document.createElement('select');
        select.id = `player-${i}-profession`;
        
        professions.forEach((prof, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = prof.name;
            select.appendChild(option);
        });
        
        playerDiv.appendChild(playerLabel);
        playerDiv.appendChild(select);
        professionSelection.appendChild(playerDiv);
    }
}

// Start the game
function startGame() {
    const playerCount = parseInt(document.getElementById('player-count').value);
    players = [];

    // Create players based on selections
    for (let i = 1; i <= playerCount; i++) {
        const professionIndex = parseInt(document.getElementById(`player-${i}-profession`).value);
        const profession = professions[professionIndex];
        
        const player = createPlayer(i, profession);
        players.push(player);
    }

    // Hide setup, show game
    document.getElementById('setup-section').classList.add('hidden');
    document.getElementById('game-section').classList.remove('hidden');

    // Initialize board
    initializeBoard();

    // Show first player's info
    currentPlayerIndex = 0;
    gameState = "ratRace";
    updateUI();
    
    logMessage(`Jogo iniciado! ${players.length} jogador(es) na Corrida dos Ratos.`, 'important');
    logMessage(`Jogador 1 (${players[0].professionName}) começa!`, 'important');
}

// Create a player object
function createPlayer(id, profession) {
    const totalExpenses = calculateTotalExpenses(profession.monthlyExpenses, 0, 0);
    
    return {
        id: id,
        professionName: profession.name,
        salary: profession.salary,
        cash: profession.savings,
        passiveIncome: 0,
        monthlyExpenses: { ...profession.monthlyExpenses },
        totalExpenses: totalExpenses,
        cashFlow: profession.salary - totalExpenses,
        assets: [],
        liabilities: [...profession.liabilities],
        children: 0,
        charityTurnsLeft: 0,
        currentPosition: 0,
        track: "ratRace", // ratRace or fastTrack
        bankLoan: 0
    };
}

// Calculate total expenses
function calculateTotalExpenses(monthlyExpenses, children, bankLoan) {
    let total = 0;
    for (let key in monthlyExpenses) {
        if (key === 'children') {
            total += monthlyExpenses[key] * children;
        } else {
            total += monthlyExpenses[key];
        }
    }
    // Add bank loan interest (10% of loan amount per month)
    if (bankLoan > 0) {
        total += bankLoan * BANK_LOAN_RATE;
    }
    return total;
}

// Initialize the game board
function initializeBoard() {
    // Initialize Rat Race board
    const ratRaceSpaces = document.getElementById('rat-race-spaces');
    ratRaceSpaces.innerHTML = '';
    
    ratRaceBoard.forEach((spaceType, index) => {
        const space = createBoardSpace(spaceType, index, 'ratRace');
        ratRaceSpaces.appendChild(space);
    });

    // Initialize Fast Track board
    const fastTrackSpaces = document.getElementById('fast-track-spaces');
    fastTrackSpaces.innerHTML = '';
    
    fastTrackBoard.forEach((spaceType, index) => {
        const space = createBoardSpace(spaceType, index, 'fastTrack');
        fastTrackSpaces.appendChild(space);
    });

    // Place all players on starting position
    updateAllPlayerTokens();
}

// Create a board space element
function createBoardSpace(spaceType, index, track) {
    const space = document.createElement('div');
    space.className = `space ${spaceType}`;
    space.dataset.position = index;
    space.dataset.track = track;
    
    // Add space label
    const label = getSpaceLabel(spaceType);
    const labelEl = document.createElement('span');
    labelEl.textContent = label;
    space.appendChild(labelEl);
    
    // Add container for player tokens
    const tokensContainer = document.createElement('div');
    tokensContainer.className = 'player-tokens';
    tokensContainer.dataset.position = index;
    tokensContainer.dataset.track = track;
    space.appendChild(tokensContainer);
    
    return space;
}

// Get space label in Portuguese
function getSpaceLabel(spaceType) {
    const labels = {
        'payday': 'Dia de Pagamento',
        'opportunity_small': 'Pequeno Negócio',
        'opportunity_large': 'Grande Negócio',
        'market': 'Mercado',
        'doodad': 'Doodad',
        'child': 'Filho',
        'charity': 'Caridade',
        'cashflow_day': 'Fluxo de Caixa',
        'business_deal': 'Negócio'
    };
    return labels[spaceType] || spaceType;
}

// Update all player tokens on the board
function updateAllPlayerTokens() {
    // Clear all existing tokens
    document.querySelectorAll('.player-tokens').forEach(container => {
        container.innerHTML = '';
    });

    // Place each player's token
    players.forEach(player => {
        const container = document.querySelector(
            `.player-tokens[data-position="${player.currentPosition}"][data-track="${player.track}"]`
        );
        if (container) {
            const token = document.createElement('div');
            token.className = `player-token player-${player.id}`;
            token.title = `Jogador ${player.id} - ${player.professionName}`;
            container.appendChild(token);
        }
    });
}

// Roll dice
function rollDice() {
    if (turnInProgress) return;
    
    turnInProgress = true;
    const currentPlayer = players[currentPlayerIndex];
    
    // Determine number of dice (2 if charity active, 1 otherwise)
    const numDice = currentPlayer.charityTurnsLeft > 0 ? 2 : 1;
    const diceRoll = numDice === 2 ? 
        (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1) :
        Math.floor(Math.random() * 6) + 1;
    
    // Show dice result
    document.getElementById('dice-value').textContent = diceRoll;
    document.getElementById('dice-result').classList.remove('hidden');
    document.getElementById('roll-dice-btn').disabled = true;
    
    logMessage(`Jogador ${currentPlayer.id} lançou ${diceRoll} (${numDice} dado${numDice > 1 ? 's' : ''})`, 'important');
    
    // Move player
    setTimeout(() => {
        movePlayer(currentPlayer, diceRoll);
    }, 1000);
}

// Move player on the board
function movePlayer(player, spaces) {
    const boardSize = player.track === 'ratRace' ? ratRaceBoard.length : fastTrackBoard.length;
    const oldPosition = player.currentPosition;
    player.currentPosition = (player.currentPosition + spaces) % boardSize;
    
    // Update tokens visually
    updateAllPlayerTokens();
    
    // Get space type
    const board = player.track === 'ratRace' ? ratRaceBoard : fastTrackBoard;
    const spaceType = board[player.currentPosition];
    
    logMessage(`Jogador ${player.id} moveu de posição ${oldPosition} para ${player.currentPosition} (${getSpaceLabel(spaceType)})`);
    
    // Handle landing on the space
    setTimeout(() => {
        handleBoardSpace(player, spaceType);
    }, 500);
}

// Handle landing on a board space
function handleBoardSpace(player, spaceType) {
    switch (spaceType) {
        case 'payday':
        case 'cashflow_day':
            handlePayday(player);
            break;
        case 'opportunity_small':
            handleOpportunity(player, 'small');
            break;
        case 'opportunity_large':
        case 'business_deal':
            handleOpportunity(player, 'large');
            break;
        case 'market':
            handleMarket(player);
            break;
        case 'doodad':
            handleDoodad(player);
            break;
        case 'child':
            handleChild(player);
            break;
        case 'charity':
            handleCharity(player);
            break;
        default:
            endTurn();
    }
}

// Handle Payday space
function handlePayday(player) {
    const payment = player.cashFlow;
    player.cash += payment;
    
    // Decrease charity turns
    if (player.charityTurnsLeft > 0) {
        player.charityTurnsLeft--;
        logMessage(`Caridade ativa: ${player.charityTurnsLeft} turno(s) restante(s) com 2 dados`);
    }
    
    logMessage(`Dia de Pagamento! Jogador ${player.id} recebeu R$ ${formatCurrency(payment)}`, 'success');
    updateUI();
    endTurn();
}

// Handle Opportunity space
function handleOpportunity(player, size) {
    // Filter opportunity cards by size
    const availableCards = opportunityCards.filter(card => card.size === size);
    if (availableCards.length === 0) {
        endTurn();
        return;
    }
    
    // Draw a random card
    const card = availableCards[Math.floor(Math.random() * availableCards.length)];
    currentCard = { ...card, playerIndex: currentPlayerIndex };
    
    logMessage(`Jogador ${player.id} pegou uma carta de ${size === 'small' ? 'Pequeno' : 'Grande'} Negócio`);
    
    // Display card
    displayOpportunityCard(card);
}

// Display Opportunity Card
function displayOpportunityCard(card) {
    const player = players[currentPlayerIndex];
    document.getElementById('card-title').textContent = card.title;
    document.getElementById('card-description').textContent = card.description;
    
    const detailsDiv = document.getElementById('card-details');
    detailsDiv.innerHTML = '';
    
    if (card.type === 'stock') {
        detailsDiv.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Preço por Ação:</span>
                <span class="detail-value">R$ ${formatCurrency(card.cost)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Quantidade Máxima:</span>
                <span class="detail-value">${card.maxShares} ações</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Custo Total (máximo):</span>
                <span class="detail-value">R$ ${formatCurrency(card.cost * card.maxShares)}</span>
            </div>
        `;
        
        // Add input for number of shares
        const inputDiv = document.createElement('div');
        inputDiv.style.marginTop = '15px';
        inputDiv.innerHTML = `
            <label for="shares-input">Quantas ações comprar? (0-${card.maxShares})</label>
            <input type="number" id="shares-input" min="0" max="${card.maxShares}" value="0" 
                   style="width: 100%; padding: 10px; margin-top: 5px; border: 2px solid #ddd; border-radius: 5px;">
        `;
        detailsDiv.appendChild(inputDiv);
    } else {
        detailsDiv.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Custo Total:</span>
                <span class="detail-value">R$ ${formatCurrency(card.cost)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Entrada:</span>
                <span class="detail-value">R$ ${formatCurrency(card.downPayment)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Fluxo de Caixa Mensal:</span>
                <span class="detail-value">+R$ ${formatCurrency(card.cashFlow)}</span>
            </div>
        `;
    }
    
    const actionsDiv = document.getElementById('card-actions');
    actionsDiv.innerHTML = '';
    
    const buyBtn = document.createElement('button');
    buyBtn.className = 'btn btn-success';
    buyBtn.textContent = 'Comprar';
    buyBtn.onclick = () => buyOpportunity(card);
    
    const passBtn = document.createElement('button');
    passBtn.className = 'btn btn-secondary';
    passBtn.textContent = 'Não Fazer Nada';
    passBtn.onclick = () => {
        closeCard();
        endTurn();
    };
    
    actionsDiv.appendChild(buyBtn);
    actionsDiv.appendChild(passBtn);
    
    document.getElementById('card-display').classList.remove('hidden');
}

// Buy Opportunity
function buyOpportunity(card) {
    const player = players[currentPlayerIndex];
    
    if (card.type === 'stock') {
        const sharesInput = document.getElementById('shares-input');
        const shares = parseInt(sharesInput.value) || 0;
        
        if (shares <= 0) {
            alert('Você precisa comprar pelo menos 1 ação!');
            return;
        }
        
        const cost = card.cost * shares;
        
        if (player.cash < cost) {
            const shortfall = cost - player.cash;
            if (!confirm(`Você não tem dinheiro suficiente. Faltam R$ ${formatCurrency(shortfall)}. Deseja pegar um empréstimo bancário?`)) {
                return;
            }
            takeBankLoan(player, shortfall);
        }
        
        player.cash -= cost;
        
        // Add stock to assets
        player.assets.push({
            id: `${card.id}_${Date.now()}`,
            type: 'stock',
            name: card.title,
            symbol: card.symbol,
            shares: shares,
            purchasePrice: card.cost,
            totalCost: cost
        });
        
        logMessage(`Jogador ${player.id} comprou ${shares} ações de ${card.symbol} por R$ ${formatCurrency(cost)}`, 'success');
    } else {
        // Real estate or business
        if (player.cash < card.downPayment) {
            const shortfall = card.downPayment - player.cash;
            if (!confirm(`Você não tem dinheiro suficiente. Faltam R$ ${formatCurrency(shortfall)}. Deseja pegar um empréstimo bancário?`)) {
                return;
            }
            takeBankLoan(player, shortfall);
        }
        
        player.cash -= card.downPayment;
        player.passiveIncome += card.cashFlow;
        
        // Add asset
        player.assets.push({
            id: `${card.id}_${Date.now()}`,
            type: card.type,
            name: card.title,
            cost: card.cost,
            downPayment: card.downPayment,
            cashFlow: card.cashFlow,
            mortgage: card.cost - card.downPayment
        });
        
        // Add liability for mortgage
        if (card.cost > card.downPayment) {
            const mortgagePayment = (card.cost - card.downPayment) * 0.1; // 10% of mortgage as monthly payment
            player.liabilities.push({
                type: 'assetMortgage',
                description: `Financiamento ${card.title}`,
                amount: card.cost - card.downPayment,
                monthlyPayment: mortgagePayment,
                assetId: player.assets[player.assets.length - 1].id
            });
            player.monthlyExpenses.otherExpenses += mortgagePayment;
        }
        
        logMessage(`Jogador ${player.id} comprou ${card.title} por R$ ${formatCurrency(card.downPayment)} de entrada`, 'success');
    }
    
    // Recalculate finances
    calculateFinancials(player);
    checkRatRaceExit(player);
    
    closeCard();
    updateUI();
    endTurn();
}

// Handle Market space
function handleMarket(player) {
    // Check if player has any assets that can be sold
    if (player.assets.length === 0) {
        logMessage(`Jogador ${player.id} não tem ativos para vender no Mercado`);
        endTurn();
        return;
    }
    
    // Draw a random market card
    const card = marketCards[Math.floor(Math.random() * marketCards.length)];
    currentCard = { ...card, playerIndex: currentPlayerIndex };
    
    // Check if player has the target asset
    let matchingAssets = [];
    
    if (card.type === 'stock') {
        matchingAssets = player.assets.filter(asset => 
            asset.type === 'stock' && asset.symbol === card.targetAsset
        );
    } else {
        matchingAssets = player.assets.filter(asset => 
            asset.name.includes(card.targetAsset) || card.targetAsset.includes(asset.name)
        );
    }
    
    if (matchingAssets.length === 0) {
        logMessage(`Jogador ${player.id} não tem ${card.targetAsset} para vender`);
        displayMarketCard(card, null);
    } else {
        logMessage(`Jogador ${player.id} tem ${card.targetAsset} disponível para venda!`);
        displayMarketCard(card, matchingAssets[0]);
    }
}

// Display Market Card
function displayMarketCard(card, asset) {
    document.getElementById('card-title').textContent = card.title;
    document.getElementById('card-description').textContent = card.description;
    
    const detailsDiv = document.getElementById('card-details');
    detailsDiv.innerHTML = '';
    
    if (asset) {
        let profit = 0;
        let salePrice = 0;
        
        if (card.type === 'stock') {
            salePrice = card.sellPrice * asset.shares;
            profit = salePrice - asset.totalCost;
        } else {
            salePrice = card.sellPrice;
            profit = salePrice - asset.cost;
        }
        
        detailsDiv.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Seu Ativo:</span>
                <span class="detail-value">${asset.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Preço de Venda:</span>
                <span class="detail-value">R$ ${formatCurrency(salePrice)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Lucro/Prejuízo:</span>
                <span class="detail-value" style="color: ${profit >= 0 ? '#27ae60' : '#e74c3c'}">
                    R$ ${formatCurrency(profit)}
                </span>
            </div>
        `;
    }
    
    const actionsDiv = document.getElementById('card-actions');
    actionsDiv.innerHTML = '';
    
    if (asset) {
        const sellBtn = document.createElement('button');
        sellBtn.className = 'btn btn-success';
        sellBtn.textContent = 'Vender';
        sellBtn.onclick = () => sellAsset(asset, card);
        actionsDiv.appendChild(sellBtn);
    }
    
    const passBtn = document.createElement('button');
    passBtn.className = 'btn btn-secondary';
    passBtn.textContent = 'Não Fazer Nada';
    passBtn.onclick = () => {
        closeCard();
        endTurn();
    };
    
    actionsDiv.appendChild(passBtn);
    
    document.getElementById('card-display').classList.remove('hidden');
}

// Sell Asset
function sellAsset(asset, card) {
    const player = players[currentPlayerIndex];
    
    let salePrice = 0;
    
    if (card.type === 'stock') {
        salePrice = card.sellPrice * asset.shares;
        logMessage(`Jogador ${player.id} vendeu ${asset.shares} ações de ${asset.symbol} por R$ ${formatCurrency(salePrice)}`, 'success');
    } else {
        salePrice = card.sellPrice;
        
        // Pay off mortgage if exists
        const mortgage = player.liabilities.find(l => l.assetId === asset.id);
        if (mortgage) {
            salePrice -= mortgage.amount;
            player.liabilities = player.liabilities.filter(l => l.assetId !== asset.id);
            player.monthlyExpenses.otherExpenses -= mortgage.monthlyPayment;
            logMessage(`Financiamento de R$ ${formatCurrency(mortgage.amount)} foi quitado`);
        }
        
        // Remove passive income
        if (asset.cashFlow) {
            player.passiveIncome -= asset.cashFlow;
        }
        
        logMessage(`Jogador ${player.id} vendeu ${asset.name} por R$ ${formatCurrency(card.sellPrice)} (líquido: R$ ${formatCurrency(salePrice)})`, 'success');
    }
    
    player.cash += salePrice;
    
    // Remove asset
    player.assets = player.assets.filter(a => a.id !== asset.id);
    
    calculateFinancials(player);
    
    closeCard();
    updateUI();
    endTurn();
}

// Handle Doodad space
function handleDoodad(player) {
    const card = doodadCards[Math.floor(Math.random() * doodadCards.length)];
    
    if (player.cash < card.cost) {
        const shortfall = card.cost - player.cash;
        logMessage(`Doodad! ${card.title} - Custo: R$ ${formatCurrency(card.cost)}. Faltam R$ ${formatCurrency(shortfall)}`, 'error');
        
        if (confirm(`Você não tem dinheiro suficiente para o Doodad. Deseja pegar um empréstimo bancário de R$ ${formatCurrency(shortfall)}?`)) {
            takeBankLoan(player, shortfall);
        } else {
            // Player must take the loan
            alert('Você é obrigado a pagar o Doodad! Pegando empréstimo bancário...');
            takeBankLoan(player, shortfall);
        }
    }
    
    player.cash -= card.cost;
    logMessage(`Doodad! ${card.title} - Jogador ${player.id} gastou R$ ${formatCurrency(card.cost)}`, 'error');
    
    updateUI();
    
    // Show doodad card briefly
    document.getElementById('card-title').textContent = card.title;
    document.getElementById('card-description').textContent = card.description;
    document.getElementById('card-details').innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Custo:</span>
            <span class="detail-value">R$ ${formatCurrency(card.cost)}</span>
        </div>
    `;
    
    const actionsDiv = document.getElementById('card-actions');
    actionsDiv.innerHTML = '';
    const okBtn = document.createElement('button');
    okBtn.className = 'btn btn-primary';
    okBtn.textContent = 'OK';
    okBtn.onclick = () => {
        closeCard();
        endTurn();
    };
    actionsDiv.appendChild(okBtn);
    
    document.getElementById('card-display').classList.remove('hidden');
}

// Handle Child space
function handleChild(player) {
    if (player.children >= 3) {
        logMessage(`Jogador ${player.id} já tem 3 filhos (máximo)!`);
        endTurn();
        return;
    }
    
    player.children++;
    
    logMessage(`Parabéns! Jogador ${player.id} teve um filho! Total: ${player.children}`, 'important');
    
    calculateFinancials(player);
    updateUI();
    endTurn();
}

// Handle Charity space
function handleCharity(player) {
    const donationAmount = Math.floor(player.cash * 0.1);
    
    if (donationAmount === 0) {
        logMessage(`Jogador ${player.id} não tem dinheiro para doar para Caridade`);
        endTurn();
        return;
    }
    
    document.getElementById('card-title').textContent = 'Caridade';
    document.getElementById('card-description').textContent = 
        `Você pode doar 10% do seu dinheiro (R$ ${formatCurrency(donationAmount)}) para a caridade e receber o benefício de jogar com 2 dados pelos próximos 3 turnos!`;
    
    document.getElementById('card-details').innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Doação:</span>
            <span class="detail-value">R$ ${formatCurrency(donationAmount)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Benefício:</span>
            <span class="detail-value">2 dados por 3 turnos</span>
        </div>
    `;
    
    const actionsDiv = document.getElementById('card-actions');
    actionsDiv.innerHTML = '';
    
    const donateBtn = document.createElement('button');
    donateBtn.className = 'btn btn-success';
    donateBtn.textContent = 'Doar';
    donateBtn.onclick = () => {
        player.cash -= donationAmount;
        player.charityTurnsLeft = 3;
        logMessage(`Jogador ${player.id} doou R$ ${formatCurrency(donationAmount)} para Caridade! Próximos 3 turnos com 2 dados.`, 'success');
        updateUI();
        closeCard();
        endTurn();
    };
    
    const passBtn = document.createElement('button');
    passBtn.className = 'btn btn-secondary';
    passBtn.textContent = 'Não Doar';
    passBtn.onclick = () => {
        logMessage(`Jogador ${player.id} decidiu não doar para Caridade`);
        closeCard();
        endTurn();
    };
    
    actionsDiv.appendChild(donateBtn);
    actionsDiv.appendChild(passBtn);
    
    document.getElementById('card-display').classList.remove('hidden');
}

// Take bank loan
function takeBankLoan(player, amount) {
    player.bankLoan += amount;
    player.cash += amount;
    
    logMessage(`Jogador ${player.id} pegou empréstimo bancário de R$ ${formatCurrency(amount)}. Total de empréstimos: R$ ${formatCurrency(player.bankLoan)}`, 'error');
    
    calculateFinancials(player);
}

// Calculate player's finances
function calculateFinancials(player) {
    // Calculate total expenses
    player.totalExpenses = calculateTotalExpenses(player.monthlyExpenses, player.children, player.bankLoan);
    
    // Calculate total income
    const totalIncome = player.salary + player.passiveIncome;
    
    // Calculate cash flow
    player.cashFlow = totalIncome - player.totalExpenses;
}

// Check if player can exit Rat Race
function checkRatRaceExit(player) {
    if (player.track === 'ratRace' && player.passiveIncome >= player.totalExpenses) {
        logMessage(`🎉 INCRÍVEL! Jogador ${player.id} saiu da Corrida dos Ratos para a Pista Rápida! Renda Passiva (R$ ${formatCurrency(player.passiveIncome)}) >= Despesas (R$ ${formatCurrency(player.totalExpenses)})`, 'success');
        
        player.track = 'fastTrack';
        player.currentPosition = 0;
        gameState = 'fastTrack';
        
        updateAllPlayerTokens();
        
        // Check if they won
        if (player.passiveIncome >= 50000) {
            endGame(player);
        }
    }
}

// End the game
function endGame(winner) {
    gameState = 'gameOver';
    alert(`🏆 PARABÉNS! Jogador ${winner.id} (${winner.professionName}) VENCEU o jogo com R$ ${formatCurrency(winner.passiveIncome)} de renda passiva!`);
    logMessage(`🏆 JOGO FINALIZADO! Jogador ${winner.id} é o vencedor!`, 'success');
}

// Close card display
function closeCard() {
    document.getElementById('card-display').classList.add('hidden');
    currentCard = null;
}

// End turn
function endTurn() {
    document.getElementById('next-turn-btn').classList.remove('hidden');
    document.getElementById('roll-dice-btn').disabled = true;
}

// Next turn
function nextTurn() {
    if (gameState === 'gameOver') return;
    
    turnInProgress = false;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    document.getElementById('dice-result').classList.add('hidden');
    document.getElementById('next-turn-btn').classList.add('hidden');
    document.getElementById('roll-dice-btn').disabled = false;
    
    updateUI();
    
    const currentPlayer = players[currentPlayerIndex];
    logMessage(`Turno do Jogador ${currentPlayer.id} (${currentPlayer.professionName})`, 'important');
}

// Update UI
function updateUI() {
    const player = players[currentPlayerIndex];
    
    // Update current player info
    document.getElementById('current-player-number').textContent = player.id;
    document.getElementById('current-player-name').textContent = player.professionName;
    document.getElementById('player-track-status').textContent = 
        player.track === 'ratRace' ? 'Corrida dos Ratos' : 'Pista Rápida';
    
    // Update financial statement
    document.getElementById('salary').textContent = `R$ ${formatCurrency(player.salary)}`;
    document.getElementById('passive-income').textContent = `R$ ${formatCurrency(player.passiveIncome)}`;
    document.getElementById('total-income').textContent = `R$ ${formatCurrency(player.salary + player.passiveIncome)}`;
    
    document.getElementById('taxes').textContent = `R$ ${formatCurrency(player.monthlyExpenses.tax)}`;
    document.getElementById('housing').textContent = `R$ ${formatCurrency(player.monthlyExpenses.housing)}`;
    document.getElementById('car-loan').textContent = `R$ ${formatCurrency(player.monthlyExpenses.car)}`;
    document.getElementById('student-loan').textContent = `R$ ${formatCurrency(player.monthlyExpenses.studentLoan)}`;
    document.getElementById('credit-card').textContent = `R$ ${formatCurrency(player.monthlyExpenses.creditCard)}`;
    document.getElementById('other-expenses').textContent = `R$ ${formatCurrency(player.monthlyExpenses.otherExpenses)}`;
    
    document.getElementById('children-count').textContent = player.children;
    document.getElementById('children-expenses').textContent = 
        `R$ ${formatCurrency(player.monthlyExpenses.children * player.children)}`;
    
    document.getElementById('bank-loan').textContent = `R$ ${formatCurrency(player.bankLoan * BANK_LOAN_RATE)}`;
    document.getElementById('total-expenses').textContent = `R$ ${formatCurrency(player.totalExpenses)}`;
    
    document.getElementById('monthly-cashflow').textContent = `R$ ${formatCurrency(player.cashFlow)}`;
    document.getElementById('cash').textContent = `R$ ${formatCurrency(player.cash)}`;
    
    // Update assets list
    updateAssetsList(player);
    
    // Update liabilities list
    updateLiabilitiesList(player);
}

// Update assets list
function updateAssetsList(player) {
    const assetsList = document.getElementById('assets-list');
    assetsList.innerHTML = '';
    
    if (player.assets.length === 0) {
        assetsList.innerHTML = '<p class="empty-message">Nenhum ativo ainda</p>';
        return;
    }
    
    player.assets.forEach(asset => {
        const assetDiv = document.createElement('div');
        assetDiv.className = 'asset-item';
        
        const assetName = document.createElement('span');
        assetName.className = 'asset-name';
        assetName.textContent = asset.name;
        
        const assetDetails = document.createElement('span');
        assetDetails.className = 'asset-details';
        
        if (asset.type === 'stock') {
            assetDetails.textContent = `${asset.shares} ações @ R$ ${formatCurrency(asset.purchasePrice)}`;
        } else {
            assetDetails.textContent = `Custo: R$ ${formatCurrency(asset.cost)}, Fluxo de Caixa: +R$ ${formatCurrency(asset.cashFlow)}/mês`;
        }
        
        assetDiv.appendChild(assetName);
        assetDiv.appendChild(document.createElement('br'));
        assetDiv.appendChild(assetDetails);
        
        assetsList.appendChild(assetDiv);
    });
}

// Update liabilities list
function updateLiabilitiesList(player) {
    const liabilitiesList = document.getElementById('liabilities-list');
    liabilitiesList.innerHTML = '';
    
    // Combine initial liabilities and bank loan
    const allLiabilities = [...player.liabilities];
    
    if (player.bankLoan > 0) {
        allLiabilities.push({
            type: 'bankLoan',
            description: 'Empréstimo Banco',
            amount: player.bankLoan,
            monthlyPayment: player.bankLoan * BANK_LOAN_RATE
        });
    }
    
    if (allLiabilities.length === 0) {
        liabilitiesList.innerHTML = '<p class="empty-message">Nenhum passivo ainda</p>';
        return;
    }
    
    allLiabilities.forEach(liability => {
        const liabilityDiv = document.createElement('div');
        liabilityDiv.className = 'liability-item';
        
        const liabilityName = document.createElement('span');
        liabilityName.className = 'liability-name';
        liabilityName.textContent = liability.description;
        
        const liabilityDetails = document.createElement('span');
        liabilityDetails.className = 'liability-details';
        liabilityDetails.textContent = `Valor: R$ ${formatCurrency(liability.amount)}, Pagamento: R$ ${formatCurrency(liability.monthlyPayment)}/mês`;
        
        liabilityDiv.appendChild(liabilityName);
        liabilityDiv.appendChild(document.createElement('br'));
        liabilityDiv.appendChild(liabilityDetails);
        
        liabilitiesList.appendChild(liabilityDiv);
    });
}

// Log message to game log
function logMessage(message, type = '') {
    const logMessages = document.getElementById('log-messages');
    const messageEl = document.createElement('p');
    messageEl.textContent = `[${new Date().toLocaleTimeString('pt-BR')}] ${message}`;
    
    if (type) {
        messageEl.className = type;
    }
    
    logMessages.appendChild(messageEl);
    logMessages.scrollTop = logMessages.scrollHeight;
}

// Format currency
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', initGame);
