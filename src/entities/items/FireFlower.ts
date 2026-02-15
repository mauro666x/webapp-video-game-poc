import { Entity } from '../Entity';
import { TILE_SIZE } from '../../constants';
import { Camera } from '../../core/Camera';

export class FireFlower extends Entity {
  sprites!: Map<string, HTMLCanvasElement>;
  emerging = true;
  emergeY: number;
  private animFrame = 0;
  private animTimer = 0;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.active = true;
    this.emergeY = y - TILE_SIZE;
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

    // Color animation
    this.animTimer += dt;
    if (this.animTimer > 150) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 2;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;
    const sprite = this.sprites.get(`flower${this.animFrame + 1}`);
    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y);
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
