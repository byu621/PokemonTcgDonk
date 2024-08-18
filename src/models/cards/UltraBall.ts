import { CardType } from "./Card";

class UltraBall {
    name = "Ultra Ball";
    id: number;
    type: CardType = 'item'

    constructor(id: number) {
        this.id = id;
    }
}

export default UltraBall;