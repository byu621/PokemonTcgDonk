import CardCollection from "./CardCollection";
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
        this.deck.addCard({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.addCard({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.addCard({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.addCard({ name: 'Brute Bonnet', type: 'pokemon' });
        this.deck.addCard({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.addCard({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.addCard({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
        this.deck.addCard({ name: 'Ancient Booster Energy Capsule', type: 'tool' });
    }

    simulate() {
        return this.start(4);
    }

    recurse(): number {
        if (this.field.isInvalid()) return 0;
        if (this.field.isWin()) return 1;

        let passPercentage = 0;

        for (let card of this.hand.iterateCards()) {
            this.hand.removeCard(card);

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

            this.hand.addCard(card);
        }

        return passPercentage;
    }

    drawN(n: number) {
        let total = 0;
        let count = 0;

        const startingHandCombinations = this.deck.getCombinations(n);
        for (let drawnCards of startingHandCombinations) {
            this.deck.removeCards(drawnCards);
            this.hand.addCards(drawnCards);

            total += this.recurse();
            count++;

            this.deck.addCards(drawnCards);
            this.hand.removeCards(drawnCards);
        }

        return total / count;
    }

    start(n: number) {
        let total = 0;
        let count = 0;

        const startingHandCombinations = this.deck.getCombinations(n);
        for (let drawnCards of startingHandCombinations) {
            if (drawnCards.every(e => e.type !== 'pokemon')) {
                continue;
            }

            this.deck.removeCards(drawnCards);
            this.hand.addCards(drawnCards);
            for (let pokemon of this.hand.iteratePokemon()) {
                this.hand.removeCard(pokemon);
                this.field.setActive(pokemon);

                total += this.recurse();
                count++;

                this.field.clear();
                this.hand.addCard(pokemon);
            }

            this.deck.addCards(drawnCards);
            this.hand.removeCards(drawnCards);
        }

        return total / count;
    }
}

export default Simulation;