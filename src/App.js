import React, { useState } from 'react';
import { Score } from './components/Score';
import { Gameboard } from './components/Gameplay';

const App = () => {
  const [score, setScore] = useState(-1);

  const incrementCount = () => {
      setScore(score + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Score score={score} />
      <Gameboard score = {score} incrementCount={incrementCount}/>
    </div>
  );
}

export default App;
