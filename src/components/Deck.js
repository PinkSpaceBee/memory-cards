import { useState, useEffect } from 'react';

// import all gifs
function importAll(r) {
    return r.keys().map(r);
  }
  
const gifs = importAll(require.context('../gifs/', false, /\.(gif)$/));

// array of 20 gifs
const deck = gifs.map(elem => 
    <img key={elem.toString()} src={elem} />
);

export const Deck = (props) => {

    // display only 3 cards
    const [displayedCards, setDisplayedCards] = useState(deck.slice(0,3));
    const [cardsPicked, setCardsPicked] = useState([]);

    // shuffle the deck every time the page is refreshed
    // useEffect(() => {
    //     setDisplayedCards(shuffle(deck).slice(0,3));
    // }, []);

    const shuffle = (array) => {return array.sort(() => Math.random() - 0.5)};

    const pickCard = (e) => {
        setCardsPicked(cardsPicked => [...cardsPicked, e]);
        console.log(cardsPicked);
    }

    const updateDisplayedCards = () => {
        setDisplayedCards(shuffle(deck).slice(0,3));
    }

    return (
        <div onClick={(e) => {pickCard(e.target); updateDisplayedCards()}}>
            {displayedCards}
        </div>
    )
}

