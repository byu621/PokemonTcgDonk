import CardCollection from "./CardCollection";
import Card from "./cards/Card";
import NestBall from "./cards/NestBall";
import UltraBall from "./cards/UltraBall";
import Field from "./Field";

// achieve optimal play
// what is optimal play
// given a state, 
// prefer smalles number of actions

// given a state what is the probability of victory

class Simulation {
    private deck = new CardCollection();
    private hand = new CardCollection();
    private field = new Field();

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
        this.deck.push({ name: 'Trekking Shoes', type: 'item' });
        this.deck.push({ name: 'Ultra Ball', type: 'item' });
    }

    simulate() {
        return this.start(4);
    }

    recurse(): number {
        if (this.field.isInvalid()) return 0;
        if (this.field.isWin()) return 1;

        let passPercentage = 0;

        for (let i = 0; i < this.hand.length(); i++) {
            const card = this.hand.removeCardAtIndex(i);
            if (card.type === 'pokemon') {
                this.field.benchPokemon(card);
                passPercentage = Math.max(this.recurse(), passPercentage);
                this.field.revertBenchPokemon();
            }

            if (card.type === 'tool') {
                for (let j = 0; j < this.field.numberOfPokemon(); j++) {
                    this.field.attachTool(j);
                    passPercentage = Math.max(this.recurse(), passPercentage);
                    this.field.revertAttachTool(j);
                }
            }

            if (card.name === 'Nest Ball') {
                passPercentage = NestBall(this, this.deck, this.field, passPercentage);
            }

            if (card.name === 'Ultra Ball') {
                passPercentage = UltraBall(this, this.deck, this.hand, passPercentage);
            }

            if (card.name === 'Trekking Shoes') {
                passPercentage = Math.max(this.drawN(1), passPercentage);
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

    start(n: number) {
        let total = 0;
        let count = 0;

        const startingHandCombinations = this.generateCombinations(this.deck.length(), n);
        startingHandCombinations.forEach((startingHandCombination) => {
            let drawnCards: Card[] = this.deck.chooseMany(startingHandCombination);

            if (drawnCards.every(e => e.type !== 'pokemon')) {
                return;
            }

            this.hand.push(drawnCards);
            this.hand.pokemonIndex().forEach(i => {
                const pokemon = this.hand.removeCardAtIndex(i);
                this.field.setActive(pokemon);

                total += this.recurse();
                count++;

                this.field.clear();
                this.hand.addCardAtIndex(pokemon, i);
            })

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