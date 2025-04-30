import { initUI, bindElements } from './dom';
import { totalTime } from '../constants/constants';
import { createCards, flipCard, unflipCard, gameState } from './game';

let intervalId: number;
let grid: HTMLElement;
let timerEl: HTMLElement;
let score1El: HTMLElement;
let score2El: HTMLElement;
let winnerEl: HTMLElement;
let playAgainBtn: HTMLElement;
let restartBtn: HTMLElement;
let pauseBtn: HTMLElement;
let resumeBtn: HTMLElement;
let toggleEl: HTMLElement;

let turnTimeoutId: number | null = null;

function handleCardClick(index: number): void {
    if (!gameState.isGameActive || gameState.flippedCards.length >= 2) return;

    const card = gameState.cards[index];
    if (card.matched || gameState.flippedCards.includes(card)) return;

    flipCard(card);
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 1) {
        if (turnTimeoutId) clearTimeout(turnTimeoutId);
        turnTimeoutId = window.setTimeout(() => {
            const [firstCard] = gameState.flippedCards;
            if (firstCard && !firstCard.matched) {
                unflipCard(firstCard);
                gameState.flippedCards = [];
                togglePlayer();
                updateCurrentPlayer();
            }
        }, 30000);
    }

    if (gameState.flippedCards.length === 2) {
        if (turnTimeoutId) clearTimeout(turnTimeoutId);
        setTimeout(checkMatch, 900);
    }
}

function checkMatch(): void {
    const [card1, card2] = gameState.flippedCards;

    if (card1.symbol === card2.symbol) {
        card1.matched = card2.matched = true;
        gameState.players[gameState.currentPlayerIndex].score++;
        updateScores();
        checkWin();
    } else {
        unflipCard(card1);
        unflipCard(card2);
        togglePlayer();
        updateCurrentPlayer();
    }

    gameState.flippedCards = [];
}

function updateScores(): void {
    score1El.textContent = gameState.players[0].score.toString();
    score2El.textContent = gameState.players[1].score.toString();
}

function startTimer(): void {
    intervalId = setInterval(() => {
        if (!gameState.isGameActive) return;

        gameState.timer--;
        timerEl.textContent = gameState.timer.toString();

        if (gameState.timer <= 0) {
            endGame();
        }
    }, 1000);
}

function pauseGame(): void {
    gameState.isGameActive = false;
}

function resumeGame(): void {
    gameState.isGameActive = true;
}

function resetGame(): void {
    clearInterval(intervalId);
    gameState.players.forEach((p) => (p.score = 0));
    gameState.cards = createCards(handleCardClick);
    gameState.flippedCards = [];
    gameState.currentPlayerIndex = 0;
    gameState.isGameActive = true;
    updateScores();
    renderCards();
    console.log('hello')
    playAgainBtn.style.display = 'none';
    timerEl.textContent = totalTime.toString();
    winnerEl.style.display = 'none';
    startTimer();
    updateCurrentPlayer();
}

function togglePlayer(): void {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % 2;
    console.log('timer');
    resetTimer();
    updateCurrentPlayer();
}

function renderCards(): void {
    grid.innerHTML = '';
    gameState.cards.forEach((card) => grid.appendChild(card.element));
}

function checkWin(): void {
    if (gameState.cards.every((card) => card.matched)) {
        endGame();
    }
}

function endGame(): void {
    gameState.isGameActive = false;
    clearInterval(intervalId);

    const [p1, p2] = gameState.players;
    let winner = "It's a tie!";
    if (p1.score > p2.score) winner = `${p1.name} Wins!`;
    else if (p2.score > p1.score) winner = `${p2.name} Wins!`;

    localStorage.setItem(
        'lastGameResult',
        JSON.stringify({
            winner,
            Player1: p1.score,
            Player2: p2.score,
        })
    );

    winnerEl.textContent = `${winner}`;
    winnerEl.style.display = 'block';
    playAgainBtn.style.display = 'block';
}

function resetTimer(): void {
    clearInterval(intervalId);
    gameState.timer = totalTime;
    timerEl.textContent = totalTime.toString();
    startTimer();
}

function updateCurrentPlayer(): void {
    const player = gameState.players[gameState.currentPlayerIndex];
    toggleEl.style.backgroundColor =
        gameState.currentPlayerIndex === 0 ? '#f5e476' : '#cff576';
    toggleEl.textContent = `${player.name} Turn`;
}

function startApp(): void {
    initUI(totalTime);
    const elements = bindElements();
    grid = elements.grid;
    timerEl = elements.timerEl;
    score1El = elements.score1El;
    score2El = elements.score2El;
    winnerEl = elements.winnerEl;
    playAgainBtn = elements.playAgainBtn;
    restartBtn = elements.restartBtn;
    pauseBtn = elements.pauseBtn;
    resumeBtn = elements.resumeBtn;
    toggleEl = elements.toggleEl;

    restartBtn.addEventListener('click', resetGame);
    pauseBtn.addEventListener('click', pauseGame);
    resumeBtn.addEventListener('click', resumeGame);
    playAgainBtn.addEventListener('click', resetGame);
    const lastGame = localStorage.getItem('lastGameResult');
    if (lastGame) {
        const result = JSON.parse(lastGame);
        console.log('Last Game Result:', result);
        winnerEl.textContent = `Last Winner: ${result.winner} (Scores - ${result.score1}:${result.score2})`;
        winnerEl.style.display = 'block';
    }

    resetGame();
}

startApp();
