import { Entity } from '../Entity';
import { TILE_SIZE } from '../../constants';
import { Camera } from '../../core/Camera';

export class BrickBlock extends Entity {
  col: number;
  row: number;
  broken = false;
  bumpOffset = 0;
  bumping = false;
  private bumpTimer = 0;
  coinCount: number; // >0 means this is a coin brick
  sprites!: Map<string, HTMLCanvasElement>;

  // Debris particles
  debris: { x: number; y: number; vx: number; vy: number }[] = [];

  constructor(col: number, row: number, coinCount = 0) {
    super();
    this.col = col;
    this.row = row;
    this.x = col * TILE_SIZE;
    this.y = row * TILE_SIZE;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.active = true;
    this.coinCount = coinCount;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  // Returns 'break' if brick breaks, 'coin' if dispensing coin, 'bump' if just bumped
  bump(isBigMario: boolean): 'break' | 'coin' | 'bump' {
    if (this.coinCount > 0) {
      this.coinCount--;
      this.bumping = true;
      this.bumpTimer = 0;
      return 'coin';
    }

    if (isBigMario) {
      this.broken = true;
      this.spawnDebris();
      return 'break';
    }

    // Small Mario just bumps
    this.bumping = true;
    this.bumpTimer = 0;
    return 'bump';
  }

  private spawnDebris(): void {
    const cx = this.x + 8;
    const cy = this.y + 8;
    this.debris = [
      { x: cx - 4, y: cy - 4, vx: -2, vy: -6 },
      { x: cx + 4, y: cy - 4, vx: 2, vy: -6 },
      { x: cx - 4, y: cy + 4, vx: -1.5, vy: -4 },
      { x: cx + 4, y: cy + 4, vx: 1.5, vy: -4 },
    ];
  }

  update(dt: number): void {
    if (this.bumping) {
      this.bumpTimer += dt;
      if (this.bumpTimer < 80) {
        this.bumpOffset = -4;
      } else if (this.bumpTimer < 160) {
        this.bumpOffset = -2;
      } else {
        this.bumpOffset = 0;
        this.bumping = false;
      }
    }

    // Update debris
    for (const d of this.debris) {
      d.x += d.vx;
      d.y += d.vy;
      d.vy += 0.3;
    }
    // Remove debris that fell off screen
    this.debris = this.debris.filter(d => d.y < this.y + 200);
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;

    // Draw debris
    if (this.broken) {
      ctx.fillStyle = '#C84C0C';
      for (const d of this.debris) {
        const sx = Math.floor(d.x - camera.x);
        const sy = Math.floor(d.y - camera.y);
        ctx.fillRect(sx, sy, 4, 4);
      }
      if (this.debris.length === 0) {
        this.removeFlag = true;
      }
      return;
    }

    const sprite = this.sprites.get('brick');
    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y) + this.bumpOffset;
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
