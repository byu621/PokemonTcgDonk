import './Card.css'
import { CardImages, CardName, CardNames } from './models/cards/Card';

interface Props {
    name: CardName;
    onClick: (name: CardName) => void;
}

export default function Card({name, onClick}: Props)
{
    const index = CardNames.indexOf(name);
    const cardImageUrl = CardImages[index];
    return <div className="card">
        <button onClick={() => onClick(name)}>{name}</button>
        <span><img src={cardImageUrl} alt="image"/>      </span>
    </div>
}