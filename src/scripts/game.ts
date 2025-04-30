import { CardData, GameState } from '../type/type';
import { symbols, totalTime } from '../constants/constants';

export const gameState: GameState = {
    players: [
        { id: 1, name: 'Player 1', score: 0 },
        { id: 2, name: 'Player 2', score: 0 },
    ],
    currentPlayerIndex: 0,
    cards: [], 
    flippedCards: [],
    timer: totalTime, 
    isGameActive: false,
};

export function createCards(onClick: (index: number) => void): CardData[] {
    const cardSymbols = shuffle([...symbols, ...symbols]); 
    return cardSymbols.map((symbol, index) => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.setAttribute('data-id', index.toString());
        div.innerHTML = '<span></span>'; 
        div.addEventListener('click', () => onClick(index));

  
        return {
            id: index,
            symbol,
            matched: false,
            element: div,
        };
    });
}

export function shuffle<T>(array: T[]): T[] {
    return array.sort(() => Math.random() - 0.5);
}

export function flipCard(card: CardData): void {
    card.element.innerHTML = `<span>${card.symbol}</span>`; 
}

export function unflipCard(card: CardData): void {
    card.element.innerHTML = '<span></span>'; 
}
