import { Enemy } from './Enemy';
import { KOOPA_SPEED, SHELL_SPEED, Direction } from '../../constants';
import { Camera } from '../../core/Camera';

export class KoopaTroopa extends Enemy {
  private walkFrame = 0;
  private walkTimer = 0;
  inShell = false;
  shellMoving = false;
  sprites!: Map<string, HTMLCanvasElement>;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = 16;
    this.height = 24;
    this.direction = Direction.LEFT;
    this.vx = -KOOPA_SPEED;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  update(dt: number): void {
    if (!this.active || !this.alive) return;

    if (this.inShell && !this.shellMoving) {
      // Sitting in shell, no movement
      return;
    }

    if (!this.inShell) {
      // Walk animation
      this.walkTimer += dt;
      if (this.walkTimer > 200) {
        this.walkTimer = 0;
        this.walkFrame = (this.walkFrame + 1) % 2;
      }
      this.vx = this.direction === Direction.LEFT ? -KOOPA_SPEED : KOOPA_SPEED;
    }
  }

  onStomp(): void {
    if (!this.inShell) {
      // Enter shell
      this.inShell = true;
      this.shellMoving = false;
      this.vx = 0;
      this.height = 16;
      this.y += 8; // Adjust position for shorter height
    } else if (!this.shellMoving) {
      // Kick the shell - direction based on which side Mario hit from
      this.shellMoving = true;
    }
  }

  kick(direction: Direction): void {
    this.shellMoving = true;
    this.direction = direction;
    this.vx = direction === Direction.RIGHT ? SHELL_SPEED : -SHELL_SPEED;
  }

  reverseDirection(): void {
    if (this.shellMoving) {
      this.vx = -this.vx;
      this.direction = this.vx > 0 ? Direction.RIGHT : Direction.LEFT;
    } else if (!this.inShell) {
      this.direction = this.direction === Direction.LEFT ? Direction.RIGHT : Direction.LEFT;
      this.vx = -this.vx;
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites || !this.alive) return;

    let sprite: HTMLCanvasElement | undefined;

    if (this.inShell) {
      sprite = this.sprites.get('koopa_shell');
    } else {
      const dir = this.direction === Direction.LEFT ? 'left' : 'right';
      sprite = this.sprites.get(`koopa_walk${this.walkFrame + 1}_${dir}`);
    }

    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y);
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
