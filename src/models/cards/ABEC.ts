import { CardType } from "./Card";

class ABEC {
    id: number;
    type: CardType = 'tool'
    name = "Ancient Booster Energy Capsule";

    constructor(id: number) {
        this.id = id;
    }
}

export default ABEC;