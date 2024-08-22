import _ from 'lodash'
import Card from './cards/Card';

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

    // Ultra Ball
    getCombinations(n: number): Card[][] {
        const cards = Array.from(this.cards.keys());
        const counts = Array.from(this.cards.values());

        const result: Card[][] = [];

        function recurse(i: number, currentCombination: Card[]) {
            if (currentCombination.length === n) {
                result.push([...currentCombination]);
                return;
            }

            const card = cards[i];
            const count = counts[i];

            for (let j = 0; j <= count && j + currentCombination.length <= n; j++) {
                for (let k = 0; k < j; k++) currentCombination.push(card);
                recurse(i + 1, currentCombination);
                currentCombination.splice(-j, j);
            }
        }

        recurse(0, []);
        return result;
    }

    // Drawing Cards
    getUniqueCombinations(n: number): Card[][] {
        const cards = Array.from(this.cards.keys());
        const counts = Array.from(this.cards.values());

        const result: Card[][] = [];

        function recurse(i: number, j: number, currentCombination: Card[]) {
            if (currentCombination.length === n) {
                result.push([...currentCombination]);
                return;
            }

            if (j >= counts[i]) {
                recurse(i + 1, 0, currentCombination);
                return;
            }

            if (i >= cards.length) return;
            recurse(i, j + 1, currentCombination);
            currentCombination.push(cards[i]);
            recurse(i, j + 1, currentCombination);
            currentCombination.pop();
        }

        recurse(0, 0, []);
        return result;
    }
}

export default CardCollection;