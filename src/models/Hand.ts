import _ from "lodash";
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

    popCards(n: number) {
        this.cards.splice(-n, n);
    }

    chooseMany(indices: number[]): Card[] {
        const cards: Card[] = [];
        for (let i = indices.length - 1; i >= 0; i--) {
            cards.push(...this.cards.splice(indices[i], 1));
        }

        _.reverse(cards);
        return cards;
    }

    revertChooseMany(cards: Card[], indices: number[]) {
        cards.forEach((c, i) => {
            this.cards.splice(indices[i], 0, c);
        })
    }
}

export default Hand;