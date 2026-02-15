import type { GameState } from './GameState';
import type { Game } from '../core/Game';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export class LevelCompleteState implements GameState {
  private timer = 0;
  private timeBonus = 0;
  private countingDown = false;

  enter(game: Game): void {
    this.timer = 0;
    this.timeBonus = Math.ceil(game.time);
    this.countingDown = true;
  }

  exit(_game: Game): void {}

  update(game: Game, dt: number): void {
    this.timer += dt;

    // Count down remaining time as points
    if (this.countingDown && this.timer > 1000) {
      if (this.timeBonus > 0) {
        const decrement = Math.min(this.timeBonus, 3);
        this.timeBonus -= decrement;
        game.time -= decrement;
        game.addScore(50 * decrement);
      } else {
        this.countingDown = false;
      }
    }

    if (!this.countingDown && this.timer > 2000) {
      // Reset to title (in a full game, would go to next level)
      game.switchState('title');
    }
  }

  render(game: Game, ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('COURSE CLEAR!', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 24);
    ctx.fillText(`SCORE: ${String(game.score).padStart(6, '0')}`, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    if (this.countingDown) {
      ctx.fillText(`TIME BONUS: ${this.timeBonus * 50}`, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 20);
    }

    ctx.textAlign = 'left';
  }
}
