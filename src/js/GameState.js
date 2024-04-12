export default class GameState {
  constructor() {
    this.activeHole = null;
    this.score = 0;
    this.bestScore = 0;
    this.missedGoblin = 0;
    this.playing = false;
  }
}
