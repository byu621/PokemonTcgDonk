import _ from 'lodash'
import Card from './cards/Card';

class CardCollection {
    private cards: Card[] = [];

    length(): number {
        return this.cards.length;
    }

    push(cards: Card | Card[]) {
        Array.isArray(cards) ?
            this.cards.push(...cards) :
            this.cards.push(cards);
    }

    pop(n: number): Card[] {
        return this.cards.splice(-n, n);
    }

    addCardAtIndex(card: Card, i: number) {
        this.cards.splice(i, 0, card);
    }

    removeCardAtIndex(i: number): Card {
        return this.cards.splice(i, 1)[0];
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

    pokemonIndex(): number[] {
        const indices = this.cards
            .map((card, index) => (card.type === 'pokemon' ? index : -1)) // Map to index or -1
            .filter(index => index !== -1); // Filter out -1 values
        return indices;
    }
}

export default CardCollection;