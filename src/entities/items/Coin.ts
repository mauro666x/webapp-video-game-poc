import { Entity } from '../Entity';
import { Camera } from '../../core/Camera';

// Pop-up coin from ? blocks
export class Coin extends Entity {
  sprites!: Map<string, HTMLCanvasElement>;
  private timer = 0;
  private startY: number;
  private animFrame = 0;
  private animTimer = 0;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.startY = y;
    this.width = 16;
    this.height = 16;
    this.active = true;
    this.vy = -8;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  update(dt: number): void {
    this.timer += dt;
    this.vy += 0.4;
    this.y += this.vy;

    // Coin animation
    this.animTimer += dt;
    if (this.animTimer > 60) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    // Remove after falling back down
    if (this.vy > 0 && this.y >= this.startY - 8) {
      this.removeFlag = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;
    const frames = ['coin1', 'coin2', 'coin3', 'coin2'];
    const sprite = this.sprites.get(frames[this.animFrame]);
    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y);
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
