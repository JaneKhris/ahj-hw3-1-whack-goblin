export default class GamePlay {
  constructor(gameState) {
    this.container = null;
    this.gameState = gameState;
    this.btnStart = null;
    this.btnStop = null;
    this.holes = null;
    this.score = 0;
    this.bestScore = 0;
    this.missedGoblin = 0;
    this.intervalId = 0;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  drawUI() {
    this.container.innerHTML = `
            <div class="buttons">
            <button class="button_start">Начать игру</button>
            <button class="button_stop">Остановить игру</button>
            </div>

            <div> Текущий счет: <span class="score">0</span></div>
            <div> Пропущено гоблинов: <span class="missed">0</span></div>
            <div> Лучший результат: <span class="best">0</span></div>
            
            <div class="card">
                <div class="hole-game">
                    <div class="hole" data-id="hole1"></div>
                    <div class="hole" data-id="hole2"></div>
                    <div class="hole" data-id="hole3"></div>
                    <div class="hole" data-id="hole4"></div>
                    <div class="hole" data-id="hole5"></div>
                    <div class="hole" data-id="hole6"></div>
                    <div class="hole" data-id="hole7"></div>
                    <div class="hole" data-id="hole8"></div>
                    <div class="hole" data-id="hole9"></div>
                    <div class="hole" data-id="hole10"></div>
                    <div class="hole" data-id="hole11"></div>
                    <div class="hole" data-id="hole12"></div>
                    <div class="hole" data-id="hole13"></div>
                    <div class="hole" data-id="hole14"></div>
                    <div class="hole" data-id="hole15"></div>
                    <div class="hole" data-id="hole16"></div>
                </div>
            </div>
        `;
    this.btnStart = this.container.querySelector('.button_start');
    this.btnStop = this.container.querySelector('.button_stop');
    this.holes = Array.from(this.container.querySelectorAll('.hole'));
    this.score = this.container.querySelector('.score');
    this.bestScore = this.container.querySelector('.best');
    this.missedGoblin = this.container.querySelector('.missed');
  }

  start() {
    this.gameState.playing = true;
    this.gameState.missedGoblin = 0;
    this.missedGoblin.textContent = this.gameState.missedGoblin;
    this.gameState.score = 0;
    this.score.textContent = this.gameState.score;
    if (this.gameState.activeHole) {
      this.deactivateHole(this.gameState.activeHole);
    }

    this.intervalId = setInterval(() => {
      if (this.container.querySelector('.hole_has-mole')) {
        this.gameState.missedGoblin += 1;
        this.missedGoblin.textContent = this.gameState.missedGoblin;
      }
      if (this.gameState.missedGoblin >= 5) {
        this.gameOver();
      }
      if (this.gameState.activeHole) {
        this.deactivateHole(this.gameState.activeHole);
      }
      if (this.gameState.playing) {
        let r = true;
        while (r) {
          const newActiveHole = Math.floor(1 + Math.random() * 16);
          if (newActiveHole !== this.gameState.activeHole) {
            r = false;
            this.gameState.activeHole = newActiveHole;
          }
        }
        this.activateHole(this.gameState.activeHole);
      }
    }, 2000);
  }

  getHole(index) {
    return this.container.querySelector(`[data-id="hole${index}"]`);
  }

  deactivateHole(index) {
    this.getHole(index).className = 'hole';
  }

  activateHole(index) {
    this.getHole(index).className = 'hole hole_has-mole';
  }

  gameOver() {
    this.gameState.playing = false;
    alert(`
            Игра окончена
            Вы набрали ${this.gameState.score} очков
        `);
    if (this.gameState.score > this.gameState.bestScore) {
      this.gameState.bestScore = this.gameState.score;
      this.bestScore.textContent = this.gameState.bestScore;
    }
    clearInterval(this.intervalId);
    this.intervalId = 0;
  }
}
