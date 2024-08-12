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

        for (let i = 0; i < this.deck.length(); i++) {
            let card: Card = this.deck.choose(i);
            this.hand.addCard(card);

            total += this.recurse();
            count++;

            this.deck.revertChoose(card, i);
            this.hand.removeCard(card.id);
        }

        return total / count;
    }

    recurse(): number {
        if (this.bench.isInvalid()) return 0;

        // win condition
        if (this.bench.length() > 0) return 1;

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
                    this.hand.addCard(card, j);
                }
            }
        }

        return passPercentage;
    }


}

export default Simulation;