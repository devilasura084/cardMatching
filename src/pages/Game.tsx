
import styled from "styled-components";
import Card from "../component/Card";
import { useMemoryGame } from "../hooks/useMemoryGame";
import { useMemo } from "react";

const Game = () => {
    const { cards, numberOfCards, handleClick, resetGame, setNumberOfCards, matchedPair } = useMemoryGame(6);

    const { cardSize, gridTemplateColumns,gridTemplateRows} = useMemo(() => {
        const totalCards = cards.length;
        const baseSize = Math.min(window.innerWidth, window.innerHeight) * 0.7; // 80% of the smaller dimension
        const columns = Math.ceil(Math.sqrt(totalCards));
        const rows = Math.ceil(totalCards / columns);
        const size = Math.floor(baseSize / columns);
        const gridTemplateColumns = `repeat(${columns}, auto)`;
        const gridTemplateRows = `repeat(${rows}, ${size}px)`;
        return {
            cardSize: size,
            gridTemplateColumns,
            gridTemplateRows
        };
    }, [cards]);
    return (
        <GameContainer>
            <ControlPanel>
                <InfoText>Number of Cards: {numberOfCards}</InfoText>
                <ButtonGroup>
                    <StyledButton onClick={() => setNumberOfCards(numberOfCards + 1)}>Increase Cards</StyledButton>
                    <StyledButton onClick={() => setNumberOfCards(numberOfCards - 1)}>Decrease Cards</StyledButton>
                    <StyledButton onClick={() => resetGame()}>Reset Game</StyledButton>
                </ButtonGroup>
            </ControlPanel>
            <CardsContainer gridTemplateColumns={gridTemplateColumns} gridTemplateRows={gridTemplateRows}>
                {cards.map((card, idx) => (
                        <CardWrapper key={idx} size={cardSize}>
                        <Card
                            {...card}
                            size={cardSize}
                            isMatched={matchedPair !== null &&
                                ((idx === matchedPair.i1) ||
                                (idx === matchedPair.i2 ))}
                            onClick={() => handleClick(idx)}
                        />
                    </CardWrapper>
                ))}
            </CardsContainer>
        </GameContainer>
    );
};

export default Game;
const GameContainer = styled.div`
    max-width: 100vw;
    max-height: 100vh;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ControlPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
`;

const InfoText = styled.div`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledButton = styled.button`
    padding: 10px 15px;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const CardsContainer = styled.div<{ gridTemplateColumns: string; gridTemplateRows: string }>`
    display: grid;
    grid-template-columns: ${props => props.gridTemplateColumns};
    grid-template-rows: ${props => props.gridTemplateRows};
    gap: 10px;
    max-width: 100%;
    max-height: calc(100vh - 150px);
    overflow: hidden;
`;

const CardWrapper = styled.div<{ size: number }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    
`;