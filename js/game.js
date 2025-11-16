// Game State Manager
export class GameState {
    constructor() {
        this.currentPlayer = null;
        this.gameStarted = false;
        this.currentSpace = 0;
        this.inFastTrack = false;
    }

    startGame(player) {
        this.currentPlayer = player;
        this.gameStarted = true;
        this.currentSpace = 0;
        this.inFastTrack = false;
    }

    movePlayer(spaces) {
        this.currentSpace = (this.currentSpace + spaces) % 24;
        return this.currentSpace;
    }

    checkWinCondition() {
        if (this.inFastTrack) {
            // Win by achieving dream or cashflow goal
            return this.currentPlayer.cash >= this.currentPlayer.dream;
        } else {
            // Can escape rat race if passive income > total expenses
            const passiveIncome = this.currentPlayer.calculatePassiveIncome();
            return passiveIncome > this.currentPlayer.totalExpenses;
        }
    }

    escapeTorFastTrack() {
        if (this.checkWinCondition() && !this.inFastTrack) {
            this.inFastTrack = true;
            return true;
        }
        return false;
    }
}

// Player Class
export class Player {
    constructor(name, profession) {
        this.name = name;
        this.profession = profession;
        this.position = 0;
        
        // Set initial values based on profession
        this.setInitialValues(profession);
        
        // Assets
        this.stocks = [];
        this.realEstate = [];
        this.businesses = [];
        
        // Dreams
        this.dream = 100000; // Default dream amount
    }

    setInitialValues(profession) {
        const professions = {
            engineer: {
                salary: 4900,
                expenses: {
                    taxes: 1050,
                    mortgage: 650,
                    schoolLoan: 60,
                    carLoan: 140,
                    creditCard: 90,
                    retail: 50,
                    other: 760
                },
                liabilities: {
                    mortgage: 65000,
                    schoolLoan: 12000,
                    carLoan: 7000,
                    creditCard: 3000
                },
                cash: 3500
            },
            teacher: {
                salary: 3300,
                expenses: {
                    taxes: 630,
                    mortgage: 500,
                    schoolLoan: 60,
                    carLoan: 100,
                    creditCard: 60,
                    retail: 40,
                    other: 580
                },
                liabilities: {
                    mortgage: 50000,
                    schoolLoan: 12000,
                    carLoan: 5000,
                    creditCard: 2000
                },
                cash: 3000
            },
            mechanic: {
                salary: 2000,
                expenses: {
                    taxes: 360,
                    mortgage: 300,
                    schoolLoan: 0,
                    carLoan: 60,
                    creditCard: 60,
                    retail: 50,
                    other: 450
                },
                liabilities: {
                    mortgage: 31000,
                    schoolLoan: 0,
                    carLoan: 3000,
                    creditCard: 2000
                },
                cash: 2000
            },
            nurse: {
                salary: 3100,
                expenses: {
                    taxes: 600,
                    mortgage: 400,
                    schoolLoan: 30,
                    carLoan: 100,
                    creditCard: 90,
                    retail: 30,
                    other: 570
                },
                liabilities: {
                    mortgage: 47000,
                    schoolLoan: 6000,
                    carLoan: 5000,
                    creditCard: 3000
                },
                cash: 2800
            },
            secretary: {
                salary: 2500,
                expenses: {
                    taxes: 460,
                    mortgage: 400,
                    schoolLoan: 0,
                    carLoan: 80,
                    creditCard: 60,
                    retail: 50,
                    other: 540
                },
                liabilities: {
                    mortgage: 38000,
                    schoolLoan: 0,
                    carLoan: 4000,
                    creditCard: 2000
                },
                cash: 2300
            },
            manager: {
                salary: 4600,
                expenses: {
                    taxes: 910,
                    mortgage: 700,
                    schoolLoan: 60,
                    carLoan: 120,
                    creditCard: 120,
                    retail: 50,
                    other: 1000
                },
                liabilities: {
                    mortgage: 75000,
                    schoolLoan: 12000,
                    carLoan: 6000,
                    creditCard: 4000
                },
                cash: 3200
            }
        };

        const profData = professions[profession];
        this.salary = profData.salary;
        this.expenses = { ...profData.expenses };
        this.liabilities = { ...profData.liabilities };
        this.cash = profData.cash;
        
        this.calculateTotals();
    }

    calculateTotals() {
        this.totalExpenses = Object.values(this.expenses).reduce((sum, val) => sum + val, 0);
        this.totalLiabilities = Object.values(this.liabilities).reduce((sum, val) => sum + val, 0);
        this.cashflow = this.salary - this.totalExpenses;
    }

    calculatePassiveIncome() {
        let passive = 0;
        
        // Calculate income from real estate
        this.realEstate.forEach(property => {
            passive += property.cashflow;
        });
        
        // Calculate income from businesses
        this.businesses.forEach(business => {
            passive += business.cashflow;
        });
        
        // Calculate income from stocks (dividends)
        this.stocks.forEach(stock => {
            if (stock.dividend) {
                passive += stock.dividend;
            }
        });
        
        return passive;
    }

    addIncome(amount) {
        this.cash += amount;
    }

    subtractExpense(amount) {
        this.cash -= amount;
    }

    buyAsset(asset) {
        if (this.cash >= asset.downPayment) {
            this.cash -= asset.downPayment;
            
            if (asset.type === 'stock') {
                this.stocks.push(asset);
            } else if (asset.type === 'realEstate') {
                this.realEstate.push(asset);
                if (asset.mortgage) {
                    this.liabilities.realEstate = (this.liabilities.realEstate || 0) + asset.mortgage;
                    this.expenses.mortgagePayment = (this.expenses.mortgagePayment || 0) + asset.mortgagePayment;
                }
            } else if (asset.type === 'business') {
                this.businesses.push(asset);
            }
            
            this.calculateTotals();
            return true;
        }
        return false;
    }

    sellAsset(asset) {
        let index = -1;
        if (asset.type === 'stock') {
            index = this.stocks.indexOf(asset);
            if (index > -1) {
                this.stocks.splice(index, 1);
                this.cash += asset.sellPrice;
            }
        } else if (asset.type === 'realEstate') {
            index = this.realEstate.indexOf(asset);
            if (index > -1) {
                this.realEstate.splice(index, 1);
                this.cash += asset.sellPrice;
                // Pay off mortgage
                if (asset.mortgage) {
                    this.liabilities.realEstate -= asset.mortgage;
                    this.expenses.mortgagePayment -= asset.mortgagePayment;
                }
            }
        } else if (asset.type === 'business') {
            index = this.businesses.indexOf(asset);
            if (index > -1) {
                this.businesses.splice(index, 1);
                this.cash += asset.sellPrice;
            }
        }
        
        this.calculateTotals();
    }

    payday() {
        // Add salary
        this.cash += this.salary;
        
        // Add passive income
        this.cash += this.calculatePassiveIncome();
        
        // Subtract expenses
        this.cash -= this.totalExpenses;
    }

    addChild() {
        this.expenses.child = (this.expenses.child || 0) + 300;
        this.calculateTotals();
    }

    downsized() {
        // Lose salary for this turn and pay expenses
        this.cash -= this.totalExpenses;
    }
}
