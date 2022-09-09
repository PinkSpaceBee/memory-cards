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

// idk why I exclusively use arrow syntax, ig bc it's so widespread in react? gotta do some research later, hope I'm not doing anything heinous lol

export const Deck = (props) => {

    // display only 3 cards
    const [displayedCards, setDisplayedCards] = useState(deck.slice(0,3));
    const [cardsPicked, setCardsPicked] = useState([]);
    // i mean the cards that wasn't picked by player idk NAMING IS HARD OK
    const [unplayedCards, setUnplayedCards] = useState(deck);


    const shuffle = (array) => {return array.sort(() => Math.random() - 0.5)};

    const pickCard = (e) => {
        setCardsPicked(cardsPicked => [...cardsPicked, e]);
    }

    const updateDisplayedCards = () => {
        if (cardsPicked.length < 2) {
            setDisplayedCards(shuffle(deck).slice(0,3));
        } else {
            console.log('sup bitches');
        }
    }

    // okay the question is should I mutate the deck or is it better to create a subarray of unplayed (unpicked) cards and use it to display cards? I meeeeean mutating the deck is probably not a good idea?? hmmmm
    const test = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);
        setUnplayedCards(unplayedCards.filter(elem => elem.key !== gifKey));
        console.log(unplayedCards);
    }


    return (
        <div onClick={(e) => {pickCard(e.target); test(e.target); updateDisplayedCards()}}>
            {displayedCards}
        </div>
    )
}

