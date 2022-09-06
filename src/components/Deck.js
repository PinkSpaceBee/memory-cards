import { useState, useEffect } from 'react';

// import all gifs
function importAll(r) {
    return r.keys().map(r);
  }
  
const gifs = importAll(require.context('../gifs/', false, /\.(gif)$/));

export const Deck = () => {

    //const shuffleDeck

    const deck = gifs.map((elem) => 
        <img key={elem.toString()} src={elem} />
    );

    return (
        <div>
            {deck}
        </div>
    )
}