import Field from "../Field";
import Simulation from "../Simulation";

export default function Switch(simulation: Simulation, field: Field, passPercentage: number) {
    for (let i = 0; i < field.numberOfBenchedPokemon(); i++) {
        field.switchPokemon(i);
        if (field.isActiveIronValiant()) simulation.damage += 20;
        passPercentage = Math.max(simulation.recurse(), passPercentage);
        if (field.isActiveIronValiant()) simulation.damage -= 20;
        field.switchPokemon(i);
    }

    return passPercentage;
}