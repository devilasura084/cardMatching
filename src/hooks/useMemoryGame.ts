import { useState, useEffect, useCallback } from 'react';

export interface Cardtype {
    flipped: boolean;
    value: number;
    permaFlip: boolean;
    matched: boolean;  
}

function shuffleArray(array: Cardtype[]): Cardtype[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function useMemoryGame(initialNumberOfCards: number = 4) {
    const [numberOfCards, setNumberOfCards] = useState(initialNumberOfCards);
    const [cards, setCards] = useState<Cardtype[]>(() => createCards(numberOfCards));
    const [matchedPair, setMatchedPair] = useState<null | { i1: number, i2: number }>(null);
    function createCards(num: number): Cardtype[] {
        const cardOne: Cardtype[] = [];
        for (let i = 1; i <= num; i++) {
            cardOne.push({ flipped: false, value: i, permaFlip: false, matched: false });
        }
        let combinedCards: Cardtype[] = shuffleArray([...cardOne, ...cardOne]);
        return combinedCards;
    }

    const hasFlippedCard = useCallback((cards: Cardtype[]): false | number => {
        for (let i = 0; i < cards.length; i++) {
                if (cards[i].flipped && !cards[i].permaFlip) {
                    return i;
                }
        }
        return false;
    }, []);

    const unflipAllCards = useCallback((cards: Cardtype[]): Cardtype[] => {
        return cards.map(card =>
        (
            ({
                ...card,
                flipped: card.permaFlip ? card.flipped : false
            })
        )
        );
    }, []);

    const flipCard = useCallback((i: number) => {
        setCards((prev): Cardtype[] => {
            const newCards = [...prev];
            newCards[i] = { ...newCards[i], flipped: !newCards[i].flipped };
            return newCards;
        });
    }, []);

    const hasPlayerWon = useCallback((cards: Cardtype[]): boolean => {
        return cards.every(card=>card.permaFlip);
    }, []);

    const handleClick = useCallback((i: number) => {
        if (cards[i].permaFlip || cards[i].flipped) return;
        const flippedCards = cards.filter(card => card.flipped && !card.permaFlip).length;
        if (flippedCards >= 2) return;

        const result = hasFlippedCard(cards);
        flipCard(i);

        if (result !== false) {
            if (cards[result].value === cards[i].value) {
                setMatchedPair({ i1: result, i2: i});
                setTimeout(() => {
                    setCards(prevCards => {
                        const newCards = [...prevCards];
                        newCards[result].matched = true;
                        newCards[i].matched = true;
                        return newCards;
                    });
                }, 1000);  // Wait for 1 second before setting matched state
                setTimeout(() => {
                    setCards(prevCards => {
                        const newCards = [...prevCards];
                        newCards[result].permaFlip = true;
                        newCards[i].permaFlip = true;
                        return newCards;
                    });
                    setMatchedPair(null);
                }, 2000);  // Wait for 2 seconds before setting permaFlip state
            } else {
                setTimeout(() => {
                    setCards(prevCards => unflipAllCards(prevCards));
                }, 1000);
            }
        }
    }, [cards, flipCard, hasFlippedCard, unflipAllCards,matchedPair]);

    useEffect(() => {
        if (hasPlayerWon(cards)) {
            alert('You won!');
        }
    }, [cards, hasPlayerWon]);

    const resetGame = useCallback((newNumberOfCards?: number) => {
        const numCards = newNumberOfCards !== undefined ? newNumberOfCards : numberOfCards;
        setNumberOfCards(numCards);
        setCards(createCards(numCards));
    }, [numberOfCards]);

    return {
        cards,
        numberOfCards,
        handleClick,
        resetGame,
        setNumberOfCards: (num: number) => {
            setNumberOfCards(num);
            resetGame(num);
        },
        matchedPair
    };
}