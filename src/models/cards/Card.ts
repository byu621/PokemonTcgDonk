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
    ];
export const CardImages: string[] =
    [
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV04/SV04_EN_123.png',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV04/SV04_EN_89.png',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV02/SV02_EN_169.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzstAOvBfLbzDH5yzx5gnreGpFTyXa0HQSg&s',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SM1/SM1_EN_123.png',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SV01/SV01_EN_196.png',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SWSH10/SWSH10_EN_156.png',
        'https://www.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SWSH1/SWSH1_EN_183.png'
    ]
export type CardPokemon = 'Brute Bonnet' | 'Iron Valiant' | 'Squawkabilly ex'
type CardTool = 'Ancient Booster Energy Capsule'
type CardItem = 'Nest Ball' | 'Ultra Ball' | 'Trekking Shoes' | 'Switch'

type CardType = 'pokemon' | 'tool' | 'item'
export type CardName = CardPokemon | CardTool | CardItem

export default Card;