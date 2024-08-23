interface Card {
    name: CardName
    type: CardType
}

export const Cards: CardName[] = ['Brute Bonnet', 'Iron Valiant', 'Squawkabilly ex', 'Ancient Booster Energy Capsule', 'Nest Ball', 'Ultra Ball', 'Trekking Shoes', 'Switch']
export type CardPokemon = 'Brute Bonnet' | 'Iron Valiant' | 'Squawkabilly ex'
type CardTool = 'Ancient Booster Energy Capsule'
type CardItem = 'Nest Ball' | 'Ultra Ball' | 'Trekking Shoes' | 'Switch'

type CardType = 'pokemon' | 'tool' | 'item'
export type CardName = CardPokemon | CardTool | CardItem

export default Card;