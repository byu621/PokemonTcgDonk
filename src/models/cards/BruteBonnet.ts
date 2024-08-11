import { CardType } from "./Card";

class BruteBonnet {
    name = "Brute Bonnet";
    id: number;
    type: CardType = 'pokemon'

    constructor(id: number) {
        this.id = id;
    }
}

export default BruteBonnet;