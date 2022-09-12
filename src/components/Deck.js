import { waitForElementToBeRemoved } from '@testing-library/dom';
import { useState, useEffect, useRef } from 'react';

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


    const shuffle = (array) => {array.sort(() => Math.random() - 0.5)};

    useEffect(() => {
        shuffle(deck);
    });

    const pickCard = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);

        setCardsPicked((cardsPicked) => ([...cardsPicked, deck.filter(elem => elem.key === gifKey)]));
    }

    // some minor changes: first, it seems fucking kudicrous to write a separate function to set state to unplayed cards. Isn't the updateDisplayedCards is like a container function to smaller functions? Besides, setUnplayedCards IS a function so it's not like I'm violating the single responsibility principle here. 
    const updateDisplayedCards = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);
        setUnplayedCards(unplayedCards.filter(elem => elem.key !== gifKey));

        if (cardsPicked.length < 2) {
            setDisplayedCards(deck.slice(0,3));
            console.log(unplayedCards);
        } else {
            shuffle(cardsPicked);
            shuffle(unplayedCards);
            console.log(cardsPicked);
            //let mixedCards = [];
            const oneOrTwo = () => Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1)) + 1);
            console.log({cardsPicked, unplayedCards})
            //let mixedCards = unplayedCards.slice(0,1);
            
            //console.log(mixedCards);
            //setDisplayedCards(cardsPicked);
            // if (oneOrTwo() == 1) {
            //     //mixedCards.concat(cardsPicked.slice(0,1)).concat(unplayedCards.slice(0,2));

            //     mixedCards = mixedCards.concat(cardsPicked.slice(0,1));
            //     console.log(mixedCards.concat(cardsPicked.slice(0,1)));

            //     setDisplayedCards(mixedCards);
            // } else {
            //     //mixedCards.concat(cardsPicked.slice(0,2)).concat(unplayedCards.slice(0,1));
            //     mixedCards = mixedCards.concat(cardsPicked.slice(0,1));
            //     console.log(mixedCards);
            //     setDisplayedCards(mixedCards);
            // }
            // console.log(oneOrTwo() == 1);
        }
    }


    // okay the question is should I mutate the deck or is it better to create a subarray of unplayed (unpicked) cards and use it to display cards? I meeeeean mutating the deck is probably not a good idea?? hmmmm

    return (
        <div onClick={(e) => {pickCard(e.target); updateDisplayedCards(e.target)}}>
            {displayedCards}
        </div>
    )
}

