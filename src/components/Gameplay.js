import { waitForElementToBeRemoved } from '@testing-library/dom';
import { useState, useEffect } from 'react';
import { deck } from './Deck';

// idk why I exclusively use arrow syntax, ig bc it's so widespread in react? gotta do some research later, hope I'm not doing anything heinous lol

export const Gameboard = ({score, incrementCount}) => {

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

    // hmmm I'm not sure why does score is incremented before I click the first card. Isn't useEffect only supposed react to change in cardsPicked? Well I can bypass this for now if I start counting score from -1 instead of 0 but I have to do something about that
    // oh waaaait if there is a dependency array then a hook called 1) when the component is mounted, and 2) when the dependency is changed. hmmmmm okay okay
    useEffect(() => {
        // I added an extra condition to skip the initial render. Now useEffect works only when cardsPicked has more than one element - i. e. when at least one card was clicked
        if (cardsPicked.length > 0 && checkForSameCard()) {
            incrementCount();
            console.log(score);
        } else if (!checkForSameCard()) {
            alert('test');
        }
    }, [cardsPicked]);

    const pickCard = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);

        // deck.filter returns an array consisting of a single object ofc, so I add this object to the cardsPicked array and not the filtered deck
        const cardsToAdd = deck.filter(elem => elem.key === gifKey)[0];

        setCardsPicked([...cardsPicked, cardsToAdd]);

    }

    const alertWinOrLose = () => {
        if (cardsPicked.length === 20) {
            alert('win');
        }
    }

    const startNewGame = () => {}

    const checkForSameCard = () => {
        const copy = [... new Set (cardsPicked)];

        const compareArrays = (a, b) => 
        a.length === b.length;

        return compareArrays(cardsPicked, copy);
    }

    useEffect(() => {
        alertWinOrLose();
    })

    // some minor changes: first, it seems fucking ludicrous to write a separate function to set state to unplayed cards. Isn't the updateDisplayedCards is like a container function to smaller functions? Besides, setUnplayedCards IS a function so it's not like I'm violating the single responsibility principle here. 
    const updateDisplayedCards = (e) => {

        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);
        const cardsToAdd = unplayedCards.filter(elem => elem.key !== gifKey);
        setUnplayedCards(cardsToAdd);

        if (cardsPicked.length < 2) {
            setDisplayedCards(deck.slice(0,3));
        } else if (unplayedCards.length > 1){

            let mixedCards = [...unplayedCards.slice(0,2), ...(cardsPicked.slice(0,1))];
            setDisplayedCards(mixedCards);
        } 
    }


    return (
        <div onClick={(e) => {pickCard(e.target); checkForSameCard(); updateDisplayedCards(e.target)}}>
            {displayedCards}
        </div>
    )
}

