import React, { useState } from 'react';
import { Score } from './components/Score';
import { Deck } from './components/Deck';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Score />
      <Deck />
    </div>
  );
}

export default App;
