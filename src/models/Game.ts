// game
// hand
// deck
// card

// dfs add left, add right, traverse

// check
// play 1
// unplay 1
// play 2
// play 3

import _ from "lodash";
import Simulation from "./Simulation";

class Game {
    simulate1000() {
        const simulation = new Simulation();
        const passPercentage = simulation.simulate();
        console.log(simulation.count)
        return passPercentage;
    }
}

export default Game;