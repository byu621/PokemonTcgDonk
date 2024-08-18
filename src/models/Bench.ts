import Card from "./cards/Card";

interface BenchedPokemon {
    name: string;
    tool: number;
}

class Bench {
    private bench: BenchedPokemon[] = [];

    length() {
        return this.bench.length;
    }

    benchPokemon(card: Card) {
        this.bench.push({ name: card.name, tool: 0 });
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

    isInvalid() {
        if (this.bench.length > 5) return true;
        if (this.bench.some(e => e.tool !== 0 && e.tool !== 1)) return true;
        return false;
    }

    isWin() {
        return this.bench.some(e => e.tool === 1);
    }
}

export default Bench;