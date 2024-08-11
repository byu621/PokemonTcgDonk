import _ from 'lodash'
import Card from './cards/Card';
import BruteBonnet from './cards/BruteBonnet';

class Deck {
    private cards: Card[] = [];
    private cardId = 0;

    constructor() {
        this.cards.push(new BruteBonnet(this.cardId++));
    }

    pop() {
        return this.cards.pop();
    }
}

export default Deck;