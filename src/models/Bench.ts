import Card from "./cards/Card";

interface BenchedPokemon {
    id: number;
    name: string;
    tool: number;
}

class Bench {
    private bench: BenchedPokemon[] = [];

    length() {
        return this.bench.length;
    }

    benchPokemon(card: Card) {
        this.bench.push({ id: card.id, name: card.name, tool: 0 });
    }

    revertBenchPokemon() {
        this.bench.pop();
    }

    attachTool(i: number) {
        this.bench[i].tool++;
    }

    revertAttachTool(i: number) {
        this.bench[i].tool--;
    }
}

export default Bench;