import CardCollection from "../CardCollection";
import Field from "../Field";
import Simulation from "../Simulation";

export default function NestBall(simulation: Simulation, deck: CardCollection, field: Field, passPercentage: number): number {
    passPercentage = Math.max(simulation.recurse(), passPercentage);

    for (let pokemon of deck.iteratePokemon()) {
        deck.removeCard(pokemon);
        field.benchPokemon(pokemon);

        passPercentage = Math.max(simulation.recurse(), passPercentage);

        field.revertBenchPokemon();
        deck.addCard(pokemon);
    }

    return passPercentage;
}