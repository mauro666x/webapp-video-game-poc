import { Entity } from '../Entity';
import { FIREBALL_SPEED, FIREBALL_BOUNCE_VY, Direction } from '../../constants';
import { Camera } from '../../core/Camera';

export class Fireball extends Entity {
  sprites!: Map<string, HTMLCanvasElement>;
  private animFrame = 0;
  private animTimer = 0;
  private bounceCount = 0;

  constructor(x: number, y: number, direction: Direction) {
    super();
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.active = true;
    this.vx = direction === Direction.RIGHT ? FIREBALL_SPEED : -FIREBALL_SPEED;
    this.vy = 2;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  update(dt: number): void {
    this.animTimer += dt;
    if (this.animTimer > 50) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 2;
    }
  }

  onBounce(): void {
    this.vy = FIREBALL_BOUNCE_VY;
    this.bounceCount++;
    if (this.bounceCount > 5) {
      this.removeFlag = true;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;
    const sprite = this.sprites.get(`fireball${this.animFrame + 1}`);
    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y);
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
