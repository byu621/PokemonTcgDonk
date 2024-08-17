import Card from "./cards/Card";

class Hand {
    private cards: Card[]
    constructor(...cards: Card[]) {
        this.cards = cards;
    }

    length() {
        return this.cards.length;
    }

    clear() {
        this.cards.length = 0;
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
            this.cards.splice(i, 0, card);
    }

    addCards(cards: Card[]) {
        this.cards.push(...cards);
    }
}

export default Hand;