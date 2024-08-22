import CardCollection from "../CardCollection";
import Simulation from "../Simulation";

export default function SquawkabillyEx(simulation: Simulation, deck: CardCollection, hand: CardCollection) {
    simulation.usedSquawkAndSeize = true;
    const oldHand = hand.iterateCards();
    hand.clear();

    let total = 0;
    let count = 0;

    const drawnCardCombinationsWithFrequencies = deck.getCombinationsWithFrequencies(6);
    for (let [drawnCards, frequency] of drawnCardCombinationsWithFrequencies) {
        deck.removeCards(drawnCards);
        hand.addCards(drawnCards);

        total += simulation.recurse() * frequency;
        count += frequency;

        deck.addCards(drawnCards);
        hand.removeCards(drawnCards);
    }

    simulation.usedSquawkAndSeize = false;
    hand.addCards(oldHand);
    return total / count;
}