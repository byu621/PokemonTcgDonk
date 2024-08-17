import { CardType } from "./Card";

class NestBall {
    name = "Nest Ball";
    id: number;
    type: CardType = 'item'

    constructor(id: number) {
        this.id = id;
    }
}

export default NestBall;