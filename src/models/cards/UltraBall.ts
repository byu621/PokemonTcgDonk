import CardCollection from "../CardCollection";
import Simulation from "../Simulation";

export default function UltraBall(simulation: Simulation, deck: CardCollection, hand: CardCollection, passPercentage: number): number {
    if (hand.length() < 3) return passPercentage;
    const discardedCardCombinations = hand.getCombinations(2);
    for (let discardedCardCombination of discardedCardCombinations) {
        hand.removeCards(discardedCardCombination);

        for (let pokemon of deck.iteratePokemon()) {
            deck.removeCard(pokemon);
            hand.addCard(pokemon);
            passPercentage = Math.max(simulation.recurse(), passPercentage);
            hand.removeCard(pokemon);
            deck.addCard(pokemon);
        }

        hand.addCards(discardedCardCombination);
    }

    return passPercentage;
}