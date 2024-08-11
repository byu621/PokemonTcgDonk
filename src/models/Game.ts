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
        let pass = 0;
        let fail = 0;

        for (let i = 0; i < 1000; i++) {
            const simulation = new Simulation();
            simulation.recurse() ? pass++ : fail++;
        }

        return pass / (pass + fail)
    }
}

export default Game;