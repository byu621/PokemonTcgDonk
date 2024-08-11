interface Card {
    id: number
    name: string
    type: CardType
}

export type CardType = 'pokemon' | 'tool'

export default Card;