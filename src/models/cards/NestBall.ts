import CardCollection from "../CardCollection";
import Field from "../Field";
import Simulation from "../Simulation";

export default function NestBall(simulation: Simulation, deck: CardCollection, field: Field, passPercentage: number): number {
    passPercentage = Math.max(simulation.recurse(), passPercentage);

    deck.pokemonIndex().forEach((j) => {
        const pokemon = deck.removeCardAtIndex(j);
        field.benchPokemon(pokemon);
        passPercentage = Math.max(simulation.recurse(), passPercentage);
        field.revertBenchPokemon();
        deck.addCardAtIndex(pokemon, j);
    })

    return passPercentage;
}