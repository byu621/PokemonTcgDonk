interface Card {
    name: CardName
    type: CardType
}

export const Cards: Card[] =
    [{ name: 'Brute Bonnet', type: 'pokemon' },
    { name: 'Iron Valiant', type: 'pokemon' },
    { name: 'Squawkabilly ex', type: 'pokemon' },
    { name: 'Ancient Booster Energy Capsule', type: 'tool' },
    { name: 'Nest Ball', type: 'item' }, { name: 'Ultra Ball', type: 'item' },
    { name: 'Trekking Shoes', type: 'item' }, { name: 'Switch', type: 'item' }];
export const CardNames: CardName[] =
    [
        'Brute Bonnet', 'Iron Valiant', 'Squawkabilly ex', 'Ancient Booster Energy Capsule', 'Nest Ball', 'Ultra Ball', 'Trekking Shoes', 'Switch'
    ]
export type CardPokemon = 'Brute Bonnet' | 'Iron Valiant' | 'Squawkabilly ex'
type CardTool = 'Ancient Booster Energy Capsule'
type CardItem = 'Nest Ball' | 'Ultra Ball' | 'Trekking Shoes' | 'Switch'

type CardType = 'pokemon' | 'tool' | 'item'
export type CardName = CardPokemon | CardTool | CardItem

export default Card;