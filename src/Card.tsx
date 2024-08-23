import './Card.css'
import { CardName } from './models/cards/Card';

interface Props {
    name: CardName;
    onPoolCardClick: (name: CardName) => void;
}

export default function Card({name, onPoolCardClick}: Props)
{
    return <button className='card' onClick={() => onPoolCardClick(name)}>{name}</button>
}