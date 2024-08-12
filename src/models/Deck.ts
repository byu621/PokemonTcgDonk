import _ from 'lodash'
import Card from './cards/Card';
import BruteBonnet from './cards/BruteBonnet';
import ABEC from './cards/ABEC';

class Deck {
    private cards: Card[] = [];
    private cardId = 0;

    constructor() {
        this.cards.push(new BruteBonnet(this.cardId++));
        this.cards.push(new ABEC(this.cardId++));
        this.cards = _.shuffle(this.cards);
    }

    length() {
        return this.cards.length;
    }

    pop() {
        return this.cards.pop();
    }

    choose(i: number) {
        return this.cards.splice(i, 1)[0];
    }

    revertChoose(card: Card, i: number) {
        this.cards.splice(i, 0, card);
    }
}

export default Deck;