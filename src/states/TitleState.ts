import type { GameState } from './GameState';
import type { Game } from '../core/Game';
import { SCREEN_WIDTH, SCREEN_HEIGHT, SKY_COLOR } from '../constants';

export class TitleState implements GameState {
  private blinkTimer = 0;
  private showText = true;

  enter(game: Game): void {
    game.lives = 3;
    game.score = 0;
    game.coins = 0;
    this.blinkTimer = 0;
  }

  exit(_game: Game): void { }

  update(game: Game, dt: number): void {
    this.blinkTimer += dt;
    if (this.blinkTimer > 500) {
      this.blinkTimer = 0;
      this.showText = !this.showText;
    }

    if (game.input.enterPressed || game.input.jumpPressed) {
      game.switchState('playing');
    }
  }

  render(_game: Game, ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Title
    ctx.fillStyle = '#E44000';
    ctx.fillText('SUPER', SCREEN_WIDTH / 2, 60);
    ctx.fillText('PLUMBER BROS.', SCREEN_WIDTH / 2, 80);

    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('2026 CLAUDE', SCREEN_WIDTH / 2, 110);

    // Game options
    ctx.fillText('1 PLAYER GAME', SCREEN_WIDTH / 2, 150);

    // Blinking prompt
    if (this.showText) {
      ctx.fillText('PRESS ENTER OR SPACE', SCREEN_WIDTH / 2, 190);
    }

    ctx.textAlign = 'left';
  }
}
