import './DeckCard.css'
import { CardName } from './models/cards/Card';

interface Props {
    name: CardName;
    count: number;
    onClick: (name: CardName) => void;
}

export default function DeckCard({name, count, onClick}: Props)
{
    return <button className='deckcard' onClick={() => onClick(name)}>{name} x{count}</button>
}