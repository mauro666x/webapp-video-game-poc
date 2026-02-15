import { Entity } from '../Entity';
import { MUSHROOM_SPEED, TILE_SIZE } from '../../constants';
import { Camera } from '../../core/Camera';

export class Mushroom extends Entity {
  sprites!: Map<string, HTMLCanvasElement>;
  emerging = true;
  emergeY: number;
  isOneUp: boolean;

  constructor(x: number, y: number, isOneUp = false) {
    super();
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.active = true;
    this.emergeY = y - TILE_SIZE;
    this.isOneUp = isOneUp;
    this.vx = MUSHROOM_SPEED;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  update(dt: number): void {
    if (this.emerging) {
      this.y -= 1;
      if (this.y <= this.emergeY) {
        this.y = this.emergeY;
        this.emerging = false;
      }
      return;
    }
  }

  reverseDirection(): void {
    this.vx = -this.vx;
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;
    const spriteName = this.isOneUp ? '1up_mushroom' : 'mushroom';
    const sprite = this.sprites.get(spriteName);
    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y);
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
