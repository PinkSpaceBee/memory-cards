import React, { useState } from 'react';
import { Score } from './components/Score';
import { Deck } from './components/Deck';
import { Gameboard } from './components/Gameplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Score />
      <Gameboard />
    </div>
  );
}

export default App;
