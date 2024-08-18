import CardCollection from "../CardCollection";
import Simulation from "../Simulation";

export default function UltraBall(simulation: Simulation, deck: CardCollection, hand: CardCollection, passPercentage: number): number {
    if (hand.length() < 3) return passPercentage;
    const discardedCardCombinations = simulation.generateCombinations(hand.length(), 2);
    discardedCardCombinations.forEach((discardedCardCombination) => {
        let discardedCards = hand.chooseMany(discardedCardCombination);
        deck.pokemonIndex().forEach((j) => {
            const pokemon = deck.removeCardAtIndex(j);
            hand.push(pokemon);
            passPercentage = Math.max(simulation.recurse(), passPercentage);
            hand.pop(1);
            deck.addCardAtIndex(pokemon, j);
        })
        hand.revertChooseMany(discardedCards, discardedCardCombination);
    })

    return passPercentage;
}