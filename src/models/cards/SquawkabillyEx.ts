import CardCollection from "../CardCollection";
import Simulation from "../Simulation";

export default function SquawkabillyEx(simulation: Simulation, deck: CardCollection, hand: CardCollection) {
    simulation.usedSquawkAndSeize = true;
    const oldHand = hand.getUniqueCombinations(hand.length())[0];
    hand.clear();

    let total = 0;
    let count = 0;

    const drawnCardCombinations = deck.getUniqueCombinations(6);
    for (let drawnCards of drawnCardCombinations) {
        deck.removeCards(drawnCards);
        hand.addCards(drawnCards);

        total += simulation.recurse();
        count++;

        deck.addCards(drawnCards);
        hand.removeCards(drawnCards);
    }

    simulation.usedSquawkAndSeize = false;
    hand.addCards(oldHand);
    return total / count;
}