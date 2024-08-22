import CardCollection from "./CardCollection";
import NestBall from "./cards/NestBall";
import SquawkabillyEx from "./cards/SquawkabillyEx";
import Switch from "./cards/Switch";
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
    damage = 0;
    usedSquawkAndSeize = false;
    usedSupporter = false;

    constructor() {
        this.deck.addCard({ name: 'Squawkabilly ex', type: 'pokemon' }, 2)
        this.deck.addCard({ name: 'Iron Valiant', type: 'pokemon' }, 4);
        this.deck.addCard({ name: 'Switch', type: 'item' }, 4);
        this.deck.addCard({ name: 'Brute Bonnet', type: 'pokemon' }, 4);
        this.deck.addCard({ name: 'Ancient Booster Energy Capsule', type: 'tool' }, 4);
        // this.deck.addCard({ name: 'Ultra Ball', type: 'item' }, 4);
        // this.deck.addCard({ name: 'Nest Ball', type: 'item' }, 4);
        // this.deck.addCard({ name: 'Trekking Shoes', type: 'item' }, 4);
    }

    simulate() {
        return this.start(2);
    }

    recurse(): number {
        if (this.field.isInvalid()) return 0;
        if (this.isWin()) return 1;

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

            if (card.name === 'Switch') {
                passPercentage = Switch(this, this.field, passPercentage);
            }

            this.hand.addCard(card);
        }

        if (!this.usedSquawkAndSeize && this.field.includesPokemon('Squawkabilly ex')) {
            passPercentage = Math.max(SquawkabillyEx(this, this.deck, this.hand), passPercentage);
        }

        return passPercentage;
    }

    drawN(n: number) {
        let total = 0;
        let count = 0;

        const startingHandCombinationsWithFrequencies = this.deck.getCombinationsWithFrequencies(n);
        for (let [drawnCards, frequency] of startingHandCombinationsWithFrequencies.entries()) {
            this.deck.removeCards(drawnCards);
            this.hand.addCards(drawnCards);

            total += this.recurse() * frequency;
            count += frequency;

            this.deck.addCards(drawnCards);
            this.hand.removeCards(drawnCards);
        }

        return total / count;
    }

    start(n: number) {
        let total = 0;
        let count = 0;

        const startingHandCombinationsWithFrequencies = this.deck.getCombinationsWithFrequencies(n);
        for (let [drawnCards, frequency] of startingHandCombinationsWithFrequencies.entries()) {
            if (drawnCards.every(e => e.type !== 'pokemon')) {
                continue;
            }

            this.deck.removeCards(drawnCards);
            this.hand.addCards(drawnCards);
            for (let pokemon of this.hand.iteratePokemon()) {
                this.hand.removeCard(pokemon);
                this.field.setActive(pokemon);

                total += this.recurse() * frequency;
                count += frequency;

                this.field.clear();
                this.hand.addCard(pokemon);
            }

            this.deck.addCards(drawnCards);
            this.hand.removeCards(drawnCards);
        }

        return total / count;
    }

    isWin() {
        return (this.damage + this.field.damage() >= 10)
    }
}

export default Simulation;