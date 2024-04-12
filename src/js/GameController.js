export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
  }

  init() {
    this.gamePlay.drawUI();

    this.gamePlay.btnStart.addEventListener('click', () => {
      if (this.gamePlay.gameState.playing) {
        alert('Игра уже запущена');
      } else {
        this.gamePlay.start();
      }
    });

    this.gamePlay.btnStop.addEventListener('click', () => {
      if (this.gamePlay.gameState.playing) {
        this.gamePlay.gameOver();
      }
    });

    this.gamePlay.holes.forEach((hole) => {
      hole.addEventListener('click', () => {
        if (hole === this.gamePlay.getHole(this.gamePlay.gameState.activeHole)) {
          this.gamePlay.gameState.score += 1;
          this.gamePlay.score.textContent = this.gamePlay.gameState.score;
          this.gamePlay.deactivateHole(this.gamePlay.gameState.activeHole);
        }
      });
    });
  }
}
