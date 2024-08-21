interface Card {
    name: CardName
    type: CardType
}

type CardPokemon = 'Brute Bonnet' | 'Iron Valiant'
type CardTool = 'Ancient Booster Energy Capsule'
type CardItem = 'Nest Ball' | 'Ultra Ball' | 'Trekking Shoes'

type CardType = 'pokemon' | 'tool' | 'item'
export type CardName = CardPokemon | CardTool | CardItem

export default Card;