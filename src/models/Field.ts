import Card from "./cards/Card";

interface ActivePokemon {
    name: string;
    tool: number;
}

interface BenchedPokemon {
    name: string;
    tool: number;
}

class Field {
    private active?: ActivePokemon;
    private bench: BenchedPokemon[] = [];

    setActive(card: Card) {
        this.active = { name: card.name, tool: 0 }
    }

    numberOfPokemon() {
        return this.bench.length + 1;
    }

    numberOfBenchedPokemon() {
        return this.bench.length;
    }

    benchPokemon(card: Card) {
        this.bench.push({ name: card.name, tool: 0 });
    }

    revertBenchPokemon() {
        this.bench.pop();
    }

    attachTool(i: number) {
        i === 0 ? this.active!.tool++ : this.bench[i - 1].tool++;
    }

    revertAttachTool(i: number) {
        i === 0 ? this.active!.tool-- : this.bench[i - 1].tool--;
    }

    clear() {
        this.active = undefined;
        this.bench.length = 0;
    }

    isInvalid() {
        if (this.bench.length > 5) return true;
        if (this.active!.tool !== 0 && this.active!.tool !== 1) return true;
        if (this.bench.some(e => e.tool !== 0 && e.tool !== 1)) return true;
        return false;
    }

    isWin() {
        if (this.active!.tool === 1) return true;
        if (this.bench.some(e => e.tool === 1)) return true;
        return false;
    }
}

export default Field;