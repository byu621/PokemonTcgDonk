import './DeckCard.css'
import { CardName } from './models/cards/Card';

interface Props {
    name: CardName;
    count: number;
}

export default function DeckCard({name, count}: Props)
{
    return <button className='deckcard'>{name} x{count}</button>
}