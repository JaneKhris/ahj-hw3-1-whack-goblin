import GameController from './GameController';
import GamePlay from './GamePlay';
import GameState from './GameState';

const gameState = new GameState();
const gamePlay = new GamePlay(gameState);
gamePlay.bindToDOM(document.querySelector('.game_container'));

const gameController = new GameController(gamePlay);
gameController.init();
