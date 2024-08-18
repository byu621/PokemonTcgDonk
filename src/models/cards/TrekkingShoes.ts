import { CardType } from "./Card";

class TrekkingShoes {
    name = "Trekking Shoes";
    id: number;
    type: CardType = 'item'

    constructor(id: number) {
        this.id = id;
    }
}

export default TrekkingShoes;