import _ from 'lodash'
import Card from './cards/Card';
import BruteBonnet from './cards/BruteBonnet';
import ABEC from './cards/ABEC';
import NestBall from './cards/NestBall';
import TrekkingShoes from './cards/TrekkingShoes';

class Deck {
    private deck: Card[] = [];
    private cardId = 0;

    constructor() {
        this.deck.push(new BruteBonnet(this.cardId++));
        this.deck.push(new BruteBonnet(this.cardId++));
        this.deck.push(new ABEC(this.cardId++));
        this.deck.push(new ABEC(this.cardId++));
        this.deck.push(new ABEC(this.cardId++));
        this.deck.push(new ABEC(this.cardId++));
        this.deck.push(new NestBall(this.cardId++));
        this.deck.push(new TrekkingShoes(this.cardId++));
    }

    length() {
        return this.deck.length;
    }

    pop() {
        return this.deck.pop();
    }

    chooseMany(indices: number[]): Card[] {
        const cards: Card[] = [];
        for (let i = indices.length - 1; i >= 0; i--) {
            cards.push(...this.deck.splice(indices[i], 1));
        }

        _.reverse(cards);
        return cards;
    }

    revertChooseMany(cards: Card[], indices: number[]) {
        cards.forEach((c, i) => {
            this.deck.splice(indices[i], 0, c);
        })
    }

    pokemonIndex(): number[] {
        const indices = this.deck
            .map((card, index) => (card.type === 'pokemon' ? index : -1)) // Map to index or -1
            .filter(index => index !== -1); // Filter out -1 values
        return indices;
    }

    removeCard(i: number): Card {
        return this.deck.splice(i, 1)[0];
    }

    addCard(card: Card, i: number) {
        this.deck.splice(i, 0, card);
    }
}

export default Deck;