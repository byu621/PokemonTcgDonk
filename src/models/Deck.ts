import _ from 'lodash'
import Card from './cards/Card';
import BruteBonnet from './cards/BruteBonnet';
import ABEC from './cards/ABEC';

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
}

export default Deck;