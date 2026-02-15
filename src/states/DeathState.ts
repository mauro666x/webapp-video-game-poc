import type { GameState } from './GameState';
import type { Game } from '../core/Game';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export class DeathState implements GameState {
  private timer = 0;

  enter(_game: Game): void {
    this.timer = 0;
  }

  exit(_game: Game): void {}

  update(game: Game, dt: number): void {
    this.timer += dt;
    // Show lives screen for 2 seconds, then restart
    if (this.timer > 2000) {
      game.switchState('playing');
    }
  }

  render(game: Game, ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(`WORLD ${game.world}`, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 16);
    ctx.fillText(`x  ${game.lives}`, SCREEN_WIDTH / 2 + 8, SCREEN_HEIGHT / 2 + 8);

    ctx.textAlign = 'left';
  }
}
