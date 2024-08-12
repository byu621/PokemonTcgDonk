import Card from "./cards/Card";

class Hand {
    private cards: Card[]
    constructor(...cards: Card[]) {
        this.cards = cards;
    }

    length() {
        return this.cards.length;
    }

    getCard(i: number) {
        return this.cards[i];
    }

    removeCard(id: number) {
        this.cards = this.cards.filter(c => c.id !== id);
    }

    addCard(card: Card, i?: number) {
        i === undefined ?
            this.cards.push(card) :
            this.cards = this.cards.splice(i, 0, card);
    }
}

export default Hand;