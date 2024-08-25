import './Settings.css'

interface Props {
    healthPoints: number;
    setHealthPoints: (value: number) => void;
    startingHandSize: number;
    setStartingHandSize: (value: number) => void;
    onCalculate: () => void;
}

export default function Settings({healthPoints, setHealthPoints, startingHandSize, setStartingHandSize, onCalculate}: Props) {
    return (
        <div className='settings'>
            Settings
            <div className='number-input'>
                <label>Health: </label>
                <input type='number' max={70} min={10} step={10} value={healthPoints} onChange={(e) => setHealthPoints(Number(e.target.value))}/>
            </div>
            <div className='number-input'>
                <label>Starting Hand Size: </label>
                <input type='number' max={7} min={1} step={1} value={startingHandSize} onChange={(e) => setStartingHandSize(Number(e.target.value))}/>
            </div>
            <button onClick={() => onCalculate()}>Calculate</button>
        </div>
    );
}