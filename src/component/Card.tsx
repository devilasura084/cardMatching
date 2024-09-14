

import styled, { css, keyframes } from "styled-components";
import { Cardtype } from "../hooks/useMemoryGame";
interface CardProps extends Cardtype {
  isMatched: boolean;
  onClick: () => void;
  size: number;
}
const Card: React.FC<CardProps> = ({ flipped, value, permaFlip, matched, isMatched,onClick ,size}) => {
  return (
    <CardContainer onClick={onClick} size={size}>
        <CardInner flipped={flipped}>
            <CardFront />
            <CardBack>
                <Value size={size}>
                    {matched ? (
                        <MatchedValue isMatched={isMatched || false}>{permaFlip ? 'X' : value}</MatchedValue>
                    ) : (
                        value
                    )}
                </Value>
            </CardBack>
        </CardInner>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div<{ size: number }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    perspective: 1000px;
    cursor: pointer;
`;

const CardInner = styled.div<{ flipped: boolean }>`
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const CardFront = styled(CardFace)`
    background-color: #2ecc71;
`;

const CardBack = styled(CardFace)`
    background-color: #e74c3c;
    transform: rotateY(180deg);
`;

const Value = styled.div<{ size: number }>`
    font-size: ${props => Math.max(props.size / 3, 16)}px;
    color: white;
    font-weight: bold;
`;

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
`;

const MatchedValue = styled.div<{ isMatched: boolean }>`
    animation: ${({ isMatched }) => isMatched ? css`${pulse} 0.5s ease-in-out 3` : 'none'};
`;