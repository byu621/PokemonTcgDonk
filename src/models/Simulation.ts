import Bench from "./Bench";
import Deck from "./Deck";
import Hand from "./Hand";

class Simulation {
    private deck = new Deck();
    private hand = new Hand(this.deck.pop()!);
    private bench = new Bench();

    recurse(): boolean {
        // check valid game state

        // check win


        for (let i = 0; i < this.hand.length(); i++) {
            let card = this.hand.getCard(i);
            if (card.type === 'pokemon') {
                this.bench.benchPokemon(card);
                this.hand.removeCard(card.id);
                this.recurse();
                this.bench.revertBenchPokemon();
                this.hand.addCard(card, i);
            } else if (card.type === 'tool') {
                for (let j = 0; j <= this.bench.length(); j++) {
                    this.bench.attachTool(j);
                    this.hand.removeCard(card.id);
                    this.recurse();
                    this.bench.revertAttachTool(j);
                    this.hand.addCard(card, j);
                }
            }
        }

        return false;
    }
}

export default Simulation;