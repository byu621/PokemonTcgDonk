import Card, { CardPokemon } from "./cards/Card";

interface Pokemon {
    name: CardPokemon;
    tool: number;
}

class Field {
    private active?: Pokemon;
    private bench: Pokemon[] = [];

    setActive(card: Card) {
        this.active = { name: card.name as CardPokemon, tool: 0 }
    }

    numberOfPokemon() {
        return this.bench.length + 1;
    }

    numberOfBenchedPokemon() {
        return this.bench.length;
    }

    benchPokemon(card: Card) {
        this.bench.push({ name: card.name as CardPokemon, tool: 0 });
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

    damage() {
        const poison = this.active!.tool === 1 || this.bench.some(e => e.tool === 1);
        if (poison) return 10;
        return 0;
    }

    switchPokemon(i: number) {
        const newActivePokemon = this.bench.splice(i, 1, this.active!)[0];
        this.active = newActivePokemon;
    }

    isActiveIronValiant() {
        return this.active?.name === 'Iron Valiant'
    }

    includesPokemon(name: CardPokemon) {
        if (this.active!.name === name) return true;
        return this.bench.some(e => e.name === name);
    }
}

export default Field;