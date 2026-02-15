import { SCREEN_WIDTH } from '../constants';

export class HUD {
  render(ctx: CanvasRenderingContext2D, score: number, coins: number, world: string, time: number, lives: number): void {
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px monospace';
    ctx.textBaseline = 'top';

    // Top row labels
    const y1 = 8;
    const y2 = 18;

    // MARIO
    ctx.fillText('MARIO', 16, y1);
    ctx.fillText(String(score).padStart(6, '0'), 16, y2);

    // Coins
    const coinStr = `x${String(coins).padStart(2, '0')}`;
    ctx.fillText(coinStr, 96, y2);

    // World
    ctx.fillText('WORLD', 144, y1);
    ctx.fillText(` ${world}`, 148, y2);

    // Time
    ctx.fillText('TIME', 200, y1);
    ctx.fillText(` ${String(Math.ceil(time)).padStart(3, '0')}`, 204, y2);

    ctx.restore();
  }

  renderLives(ctx: CanvasRenderingContext2D, lives: number, world: string): void {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, SCREEN_WIDTH, 240);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    ctx.fillText(`WORLD ${world}`, SCREEN_WIDTH / 2, 100);
    ctx.fillText(`x  ${lives}`, SCREEN_WIDTH / 2 + 8, 120);

    ctx.textAlign = 'left';
  }
}
