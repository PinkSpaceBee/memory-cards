import { useState, useEffect } from 'react';

// import all gifs
function importAll(r) {
    return r.keys().map(r);
  }
  
const gifs = importAll(require.context('../gifs/', false, /\.(gif)$/));

export const Deck = () => {

    //const shuffleDeck

    const deck = gifs.map(elem => 
        <img key={elem.toString()} src={elem} />
    );
    const doSth = () => {console.log('sup')};

    let pickedCards = [];

    const displayedCards = pickedCards.length < 2 ? deck.filter(elem => deck.indexOf(elem) < 3) : doSth();
    console.log(displayedCards);

    return (
        <div>
            {displayedCards}
        </div>
    )
}

