export function initUI(totalTime: number): void {
    document.body.innerHTML = `
        <header>
            <h3>Memory Game</h3>
            <div class="players">
                <div id="player1">Player 1: <span id="score1">0</span></div>
                <div id="player2">Player 2: <span id="score2">0</span></div>
            </div>
        </header>
        <main id="grid" class="grid-4x4"></main>
        <div>
            <div id="timer">Time Left: <span id="time">${totalTime}</span>s</div>
        </div>
        <div id="toggle"><button></button></div>
        <footer id="footer">
            <div class="controls">
                <button id="restart-btn" title="Restart">
                    <i class="fa-solid fa-reply-all"></i>
                </button>
                <button id="resume-btn" title="Resume">
                    <i class="fa-solid fa-play"></i>
                </button>
                <button id="pause-btn" title="Pause">
                    <i class="fa-solid fa-pause"></i>
                </button>
            </div>
            <h2 id="winner">Winner:</h2>
            <button id="playAgain-btn">Play Again</button>
        </footer>
    `;
}

export function bindElements() {
    return {
        grid: document.getElementById('grid')!,
        timerEl: document.getElementById('time')!,
        score1El: document.getElementById('score1')!,
        score2El: document.getElementById('score2')!,
        winnerEl: document.getElementById('winner')!,
        playAgainBtn: document.getElementById('playAgain-btn')!,
        restartBtn: document.getElementById('restart-btn')!,
        pauseBtn: document.getElementById('pause-btn')!,
        resumeBtn: document.getElementById('resume-btn')!,
        toggleEl: document.querySelector('#toggle button') as HTMLElement,
    };
}
