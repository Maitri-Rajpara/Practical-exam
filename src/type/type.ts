export interface Player {
    id: number;
    name: string;
    score: number;
}

export interface CardData {
    id: number;
    symbol: string;
    matched: boolean;
    element: HTMLElement;
}

export interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    cards: CardData[];
    flippedCards: CardData[];
    timer: number;
    isGameActive: boolean;
}
