import { useState } from 'react';
import './App.css'
import Card from './Card';
import DeckCard from './DeckCard';
import { CardName, CardNames, Cards } from './models/cards/Card';
import Settings from './Components/Settings';
import Simulation from './models/Simulation';

function App() {
  const [deckCounts, setDeckCounts] = useState<number[]>(Array(Cards.length).fill(0));
  const [healthPoints, setHealthPoints] = useState(10);
  const [startingHandSize, setStartingHandSize] = useState(2);
  const [calculationResult, setCalculationResult] = useState(NaN);

  const onPoolCardClick = (name: CardName) => {
    const index = CardNames.indexOf(name);
    setDeckCounts(prevDeckCounts => {
      const newDeckCounts = [...prevDeckCounts];
      newDeckCounts[index]++;
      return newDeckCounts; // Return the new state
    });
  }

  const onDeckCardClick = (name: CardName) => {
    const index = CardNames.indexOf(name);
    setDeckCounts(prevDeckCounts => {
      const newDeckCounts = [...prevDeckCounts];
      newDeckCounts[index]--;
      return newDeckCounts; // Return the new state
    });
  }

  const onCalculate = () => {
    const simulation = new Simulation(deckCounts, healthPoints, startingHandSize);
    const passPercentage = simulation.simulate();
    setCalculationResult(passPercentage);
  }

  return (
    <>
      <div className='introduction'>
        Build your deck
      </div>
      <div className='center'>
        <div className='pool'>
          Pool
          {Cards.map((e)=> (
            <Card name={e.name} onClick={onPoolCardClick}/>
          ))}
        </div>
        <div className='deck'>
          Deck
          {deckCounts.map((count, i) => {
            if (count === 0) return;
            return <DeckCard name={Cards[i].name} count={count} onClick={onDeckCardClick}/>
          })}
        </div>
        <Settings healthPoints={healthPoints} setHealthPoints={setHealthPoints} startingHandSize={startingHandSize} setStartingHandSize={setStartingHandSize} onCalculate={onCalculate} />
        <div className='results'>
          Results
          <div>{calculationResult}</div>
        </div>
      </div>
      {/* <p>{game.simulate1000()}</p> */}
    </>
  )
}

export default App
