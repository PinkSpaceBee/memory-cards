import { useState, useEffect } from 'react';

// import all gifs
function importAll(r) {
    return r.keys().map(r);
  }
  
const gifs = importAll(require.context('../gifs/', false, /\.(gif)$/));

export const Deck = () => {

    const shuffle = (array) => {return array.sort(() => Math.random() - 0.5)};
    

    // array of 20 gifs
    const deck = gifs.map(elem => 
        <img key={elem.toString()} src={elem} />
    );

    const doSth = () => console.log('sup');

    let pickedCards = [];

    // display 3 cards to pick from
    // and shuffle the deck
    // display unique cards the first two rounds, then display a mix of already picked and not picked yet cards
    const displayedCards = pickedCards.length < 2 ? shuffle(deck).filter(elem => deck.indexOf(elem) < 3) : doSth();

    return (
        <div>
            {displayedCards}
        </div>
    )
}

