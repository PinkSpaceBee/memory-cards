import { waitForElementToBeRemoved } from '@testing-library/dom';
import { useState, useEffect } from 'react';
import { deck } from './Deck';

// idk why I exclusively use arrow syntax, ig bc it's so widespread in react? gotta do some research later, hope I'm not doing anything heinous lol

export const Gameboard = ({incrementCount}) => {

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
    // ok gotta go finish later basically check if player picked a unique card when a card is selected
    useEffect(() => {
        checkForSameCard();
        console.log(checkForSameCard());
    }, [cardsPicked]);

    const pickCard = (e) => {
        const gifKey = e.outerHTML.substring(10, e.outerHTML.length - 2);

        // deck.filter returns an array consisting of a single object ofc, so I add this object to the cardsPicked array and not the filtered deck
        const cardsToAdd = deck.filter(elem => elem.key === gifKey)[0];

        setCardsPicked([...cardsPicked, cardsToAdd]);

    }
    const alertWinOrLose = () => {
        //console.log(cardsPicked.length);
        if (cardsPicked.length === 20) {
            alert('win');
        }
    }

    const startNewGame = () => {}

    const checkForSameCard = () => {
        const copy = [... new Set (cardsPicked)];

        // ig it's redundant to compare elements sinse I really just compare arr length? 
        const compareArrays = (a, b) => 
        a.length === b.length;

        return compareArrays(cardsPicked, copy);
        // if (compareArrays(cardsPicked, copy)) {
        //     console.log(cardsPicked);
        //     console.log(copy);
        //     incrementCount();
        // } else {
        //     alert('brrrr wrong card you lose meatbag');
        // }
    }

    useEffect(() => {
        alertWinOrLose();
    })

    // some minor changes: first, it seems fucking ludicrous to write a separate function to set state to unplayed cards. Isn't the updateDisplayedCards is like a container function to smaller functions? Besides, setUnplayedCards IS a function so it's not like I'm violating the single responsibility principle here. 
    const updateDisplayedCards = (e) => {
        // okay it's a fucking mess I'm not sure what I'm doing wrong
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

