import { waitForElementToBeRemoved } from '@testing-library/dom';
import { useState, useEffect } from 'react';
import { deck } from './Deck';

// idk why I exclusively use arrow syntax, ig bc it's so widespread in react? gotta do some research later, hope I'm not doing anything heinous lol

export const Gameboard = () => {

    // display only 3 cards to choose from
    const [displayedCards, setDisplayedCards] = useState(deck.slice(0,3));
    const [cardsPicked, setCardsPicked] = useState([]);
    // i mean the cards that wasn't picked by player idk NAMING IS HARD OK
    const [unplayedCards, setUnplayedCards] = useState(deck);

    const shuffle = (array) => {array.sort(() => Math.random() - 0.5)};

    useEffect(() => {
        shuffle(deck);
        shuffle(unplayedCards);
        shuffle(cardsPicked);
    });

    const pickCard = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);

        // deck.filter returns an array consisting of a single object ofc, so I add this object to the cardsPicked array and not the filtered deck
        const cardsToAdd = deck.filter(elem => elem.key === gifKey)[0];

        setCardsPicked([...cardsPicked, cardsToAdd]);
    }

    const checkForSameCard = () => {
        const test = [... new Set (cardsPicked)];

        const compareArrays = (a, b) => 
        a.length === b.length &&
        a.every((e, i) => e === b[i]);

        console.log(test);
        console.log(compareArrays(test, cardsPicked));
    }

    // some minor changes: first, it seems fucking ludicrous to write a separate function to set state to unplayed cards. Isn't the updateDisplayedCards is like a container function to smaller functions? Besides, setUnplayedCards IS a function so it's not like I'm violating the single responsibility principle here. 
    const updateDisplayedCards = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);
        const cardsToAdd = unplayedCards.filter(elem => elem.key !== gifKey);
        setUnplayedCards(cardsToAdd);

        if (cardsPicked.length < 2) {
            setDisplayedCards(deck.slice(0,3));
        } else if (cardsPicked.length < 21){

            let mixedCards = [];
            const oneOrTwo = () => Math.floor(Math.random() * (Math.floor(3) - Math.ceil(1)) + 1);

            if (oneOrTwo() == 1) {
                mixedCards = unplayedCards.slice(0,2).concat(cardsPicked.slice(0,1));
                setDisplayedCards(mixedCards);
            } else {
                mixedCards = unplayedCards.slice(0,1).concat(cardsPicked.slice(0,2));
                setDisplayedCards(mixedCards);
            }
        } else {
            console.log('win');
        }
    }

    console.log(cardsPicked);
    console.log(unplayedCards);
    // okay the question is should I mutate the deck or is it better to create a subarray of unplayed (unpicked) cards and use it to display cards? I meeeeean mutating the deck is probably not a good idea?? hmmmm

    return (
        <div onClick={(e) => {pickCard(e.target); checkForSameCard(); updateDisplayedCards(e.target)}}>
            {displayedCards}
        </div>
    )
}

