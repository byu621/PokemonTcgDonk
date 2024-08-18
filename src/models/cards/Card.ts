interface Card {
    name: string
    type: CardType
}

export type CardType = 'pokemon' | 'tool' | 'item'

export default Card;