import Bench from "./Bench";
import CardCollection from "./CardCollection";
import Card from "./cards/Card";

// achieve optimal play
// what is optimal play
// given a state, 
// prefer smalles number of actions

// given a state what is the probability of victory

class Simulation {
    private deck = new CardCollection();
    private hand = new CardCollection();
    private bench = new Bench();

    constructor() {
        this.deck.push({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.push({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.push({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.push({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.push({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.push({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.push({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.push({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.push({ name: 'Iron Valiant', type: 'pokemon' });
        this.deck.push({ name: 'Iron Valiant', type: 'pokemon' });
        this.deck.push({ name: 'Iron Valiant', type: 'pokemon' });
        this.deck.push({ name: 'Iron Valiant', type: 'pokemon' });
        this.deck.push({ name: 'Nest Ball', type: 'item' });
        // this.deck.push({ name: 'Trekking Shoes', type: 'item' });
        // this.deck.push({ name: 'Ultra Ball', type: 'item' });
    }

    simulate() {
        return this.drawN(4);
    }

    recurse(): number {
        if (this.bench.isInvalid()) return 0;

        // win condition
        if (this.bench.isWin()) return 1;

        let passPercentage = 0;

        for (let i = 0; i < this.hand.length(); i++) {
            const card = this.hand.removeCardAtIndex(i);
            if (card.type === 'pokemon') {
                this.bench.benchPokemon(card);
                passPercentage = Math.max(this.recurse(), passPercentage);
                this.bench.revertBenchPokemon();
            } else if (card.type === 'tool') {
                for (let j = 0; j < this.bench.length(); j++) {
                    this.bench.attachTool(j);
                    passPercentage = Math.max(this.recurse(), passPercentage);
                    this.bench.revertAttachTool(j);
                }
            } else if (card.type === 'item') {
                if (card.name === 'Nest Ball') {
                    passPercentage = Math.max(this.recurse(), passPercentage);

                    this.deck.pokemonIndex().forEach((j) => {
                        const pokemon = this.deck.removeCardAtIndex(j);
                        this.bench.benchPokemon(pokemon);
                        passPercentage = Math.max(this.recurse(), passPercentage);
                        this.bench.revertBenchPokemon();
                        this.deck.addCardAtIndex(pokemon, j);
                    })
                } else if (card.name === 'Ultra Ball') {
                    if (this.hand.length() < 3) continue;
                    const discardedCardCombinations = this.generateCombinations(this.hand.length(), 2);
                    discardedCardCombinations.forEach((discardedCardCombination) => {
                        let discardedCards = this.hand.chooseMany(discardedCardCombination);
                        this.deck.pokemonIndex().forEach((j) => {
                            const pokemon = this.deck.removeCardAtIndex(j);
                            this.hand.push(pokemon);
                            passPercentage = Math.max(this.recurse(), passPercentage);
                            this.hand.pop(1);
                            this.deck.addCardAtIndex(pokemon, j);
                        })
                        this.hand.revertChooseMany(discardedCards, discardedCardCombination);
                    })
                } else if (card.name === 'Trekking Shoes') {
                    passPercentage = Math.max(this.drawN(1), passPercentage);
                }
            }

            this.hand.addCardAtIndex(card, i);
        }

        return passPercentage;
    }

    drawN(n: number) {
        let total = 0;
        let count = 0;

        const startingHandCombinations = this.generateCombinations(this.deck.length(), n);
        startingHandCombinations.forEach((startingHandCombination) => {
            let drawnCards: Card[] = this.deck.chooseMany(startingHandCombination);
            this.hand.push(drawnCards);

            total += this.recurse();
            count++;

            this.deck.revertChooseMany(drawnCards, startingHandCombination);
            this.hand.pop(n);
        });

        return total / count;
    }

    generateCombinations(n: number, k: number): number[][] {
        // Helper function to recursively build the combinations
        function combine(start: number, combo: number[]): void {
            // If the combination is of length k, push it to the results and return
            if (combo.length === k) {
                results.push(combo.slice()); // Make a copy of combo
                return;
            }
            for (let i = start; i < n; i++) {
                combo.push(i);
                combine(i + 1, combo);
                combo.pop(); // Backtrack
            }
        }

        const results: number[][] = [];
        combine(0, []);
        return results;
    }
}

export default Simulation;