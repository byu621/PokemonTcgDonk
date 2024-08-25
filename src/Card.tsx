import './Card.css'
import { CardName } from './models/cards/Card';

interface Props {
    name: CardName;
    onClick: (name: CardName) => void;
}

export default function Card({name, onClick}: Props)
{
    return <button className='card' onClick={() => onClick(name)}>{name}</button>
}