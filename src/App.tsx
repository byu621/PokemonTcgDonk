import { useState } from 'react';
import './App.css'
import Card from './Card';
import DeckCard from './DeckCard';
import { CardName, Cards } from './models/cards/Card';
import Game from './models/Game'

function App() {
  const [deckCounts, setDeckCounts] = useState<number[]>(Array(Cards.length).fill(0));
  const game = new Game();

  const onPoolCardClick = (name: CardName) => {
    const index = Cards.indexOf(name);
    setDeckCounts(prevDeckCounts => {
      const newDeckCounts = [...prevDeckCounts];
      newDeckCounts[index]++;
      return newDeckCounts; // Return the new state
    });
  }

  return (
    <>
      <div className='introduction'>
        Build your deck
      </div>
      <div className='center'>
        <div className='pool'>
          {Cards.map((e)=> (
            <Card name={e} onPoolCardClick={onPoolCardClick}/>
          ))}
        </div>
        <div className='deck'>
          {deckCounts.map((count, i) => {
            if (count === 0) return;
            return <DeckCard name={Cards[i]} count={count}/>
          })}
        </div>
        <div className='settings'>
          settings
        </div>
        <div className='results'>
          results
        </div>
      </div>
      {/* <p>{game.simulate1000()}</p> */}
    </>
  )
}

export default App
