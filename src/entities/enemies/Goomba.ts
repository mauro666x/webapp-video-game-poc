import { Enemy } from './Enemy';
import { GOOMBA_SPEED, Direction, TILE_SIZE } from '../../constants';
import { Camera } from '../../core/Camera';

export class Goomba extends Enemy {
  private walkFrame = 0;
  private walkTimer = 0;
  private flatTimer = 0;
  sprites!: Map<string, HTMLCanvasElement>;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 16;
    this.direction = Direction.LEFT;
    this.vx = -GOOMBA_SPEED;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  update(dt: number): void {
    if (!this.active || !this.alive) return;

    if (this.stomped) {
      this.flatTimer += dt;
      if (this.flatTimer > 500) {
        this.removeFlag = true;
      }
      return;
    }

    // Walk animation
    this.walkTimer += dt;
    if (this.walkTimer > 200) {
      this.walkTimer = 0;
      this.walkFrame = (this.walkFrame + 1) % 2;
    }

    // Move
    this.vx = this.direction === Direction.LEFT ? -GOOMBA_SPEED : GOOMBA_SPEED;
  }

  onStomp(): void {
    super.onStomp();
    this.vx = 0;
    this.vy = 0;
  }

  reverseDirection(): void {
    this.direction = this.direction === Direction.LEFT ? Direction.RIGHT : Direction.LEFT;
    this.vx = -this.vx;
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites || !this.alive) return;

    let sprite: HTMLCanvasElement | undefined;
    if (this.stomped) {
      sprite = this.sprites.get('goomba_flat');
    } else {
      sprite = this.sprites.get(`goomba_walk${this.walkFrame + 1}`);
    }

    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y);
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
