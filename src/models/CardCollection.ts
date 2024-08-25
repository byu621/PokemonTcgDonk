import _ from 'lodash'
import Card, { Cards } from './cards/Card';
import { combination } from './Math';

class CardCollection {
    private cards: Map<Card, number> = new Map();

    length() {
        let sum = 0;
        for (const [_, count] of this.cards) {
            sum += count;
        }

        return sum;
    }

    clear() {
        this.cards.clear();
    }

    addCards(cards: Card[]) {
        for (let card of cards) this.addCard(card);
    }

    addCard(card: Card, n = 1) {
        if (n === 0) return;
        const currentCount = this.cards.get(card) || 0;
        this.cards.set(card, currentCount + n);
    }

    removeCards(cards: Card[]) {
        for (let card of cards) this.removeCard(card);
    }

    removeCard(card: Card) {
        const currentCount = this.cards.get(card)!;
        currentCount === 1 ?
            this.cards.delete(card) :
            this.cards.set(card, currentCount - 1);
    }

    iterateCards(): Card[] {
        return Array.from(this.cards.keys());
    }

    iteratePokemon(): Card[] {
        return Array.from(this.cards.keys()).filter(card =>
            card.type === 'pokemon'
        );
    }

    addCounts(counts: number[]) {
        counts.forEach((count, i) => {
            const card = Cards[i];
            this.addCard(card, count);
        })
    }

    getCombinationsWithFrequencies(n: number): Map<Card[], number> {
        const cards = Array.from(this.cards.keys());
        const counts = Array.from(this.cards.values());

        const result: Map<Card[], number> = new Map();

        function recurse(i: number, currentCombination: Card[], frequency: number) {
            if (currentCombination.length === n) {
                result.set([...currentCombination], frequency);
                return;
            }

            const card = cards[i];
            const count = counts[i];

            for (let j = 0; j <= count && j + currentCombination.length <= n; j++) {
                for (let k = 0; k < j; k++) currentCombination.push(card);
                recurse(i + 1, currentCombination, frequency * combination(count, j));
                currentCombination.splice(-j, j);
            }
        }

        recurse(0, [], 1);
        return result;
    }
}

export default CardCollection;