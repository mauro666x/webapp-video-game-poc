import { Game } from './core/Game';
import { TitleState } from './states/TitleState';
import { PlayingState } from './states/PlayingState';
import { DeathState } from './states/DeathState';
import { GameOverState } from './states/GameOverState';
import { LevelCompleteState } from './states/LevelCompleteState';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const game = new Game(canvas);

// Register game states
game.registerState('title', new TitleState());
game.registerState('playing', new PlayingState());
game.registerState('death', new DeathState());
game.registerState('gameOver', new GameOverState());
game.registerState('levelComplete', new LevelCompleteState());

// Start with title screen
game.switchState('title');
game.start();
