import Bench from "./Bench";
import Card from "./cards/Card";
import Deck from "./Deck";
import Hand from "./Hand";

// achieve optimal play
// what is optimal play
// given a state, 
// prefer smalles number of actions

// given a state what is the probability of victory

class Simulation {
    private deck = new Deck();
    private hand = new Hand();
    private bench = new Bench();

    simulate() {
        let total = 0;
        let count = 0;

        const startingHandCombinations = this.generateCombinations(this.deck.length(), 2);
        startingHandCombinations.forEach((startingHandCombination) => {
            let startingHand: Card[] = this.deck.chooseMany(startingHandCombination);
            this.hand.addCards(startingHand);

            total += this.recurse();
            count++;

            this.deck.revertChooseMany(startingHand, startingHandCombination);
            this.hand.clear();
        });

        return total / count;
    }

    recurse(): number {
        if (this.bench.isInvalid()) return 0;

        // win condition
        if (this.bench.isWin()) return 1;

        let passPercentage = 0;

        for (let i = 0; i < this.hand.length(); i++) {
            let card = this.hand.getCard(i);
            if (card.type === 'pokemon') {
                this.bench.benchPokemon(card);
                this.hand.removeCard(card.id);
                passPercentage = Math.max(this.recurse(), passPercentage);
                this.bench.revertBenchPokemon();
                this.hand.addCard(card, i);
            } else if (card.type === 'tool') {
                for (let j = 0; j < this.bench.length(); j++) {
                    this.bench.attachTool(j);
                    this.hand.removeCard(card.id);
                    passPercentage = Math.max(this.recurse(), passPercentage);
                    this.bench.revertAttachTool(j);
                    this.hand.addCard(card, i);
                }
            } else if (card.type === 'item') {
                if (card.name === 'Nest Ball') {
                    this.hand.removeCard(card.id);
                    passPercentage = Math.max(this.recurse(), passPercentage);

                    this.deck.pokemonIndex().forEach((j) => {
                        const pokemon = this.deck.removeCard(j);
                        this.bench.benchPokemon(pokemon);
                        passPercentage = Math.max(this.recurse(), passPercentage);
                        this.bench.revertBenchPokemon();
                        this.deck.addCard(pokemon, j);
                    })

                    this.hand.addCard(card, i)
                }
            }
        }

        return passPercentage;
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