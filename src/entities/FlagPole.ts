import { Entity } from './Entity';
import { TILE_SIZE } from '../constants';
import { Camera } from '../core/Camera';

export class FlagPole extends Entity {
  col: number;
  flagY: number;
  flagDescending = false;
  sprites!: Map<string, HTMLCanvasElement>;

  constructor(col: number) {
    super();
    this.col = col;
    this.x = col * TILE_SIZE;
    this.y = 4 * TILE_SIZE;
    this.width = TILE_SIZE;
    this.height = 9 * TILE_SIZE; // From row 4 to row 12
    this.active = true;
    this.flagY = 5 * TILE_SIZE; // Flag starts near top
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  startFlagDescent(): void {
    this.flagDescending = true;
  }

  update(dt: number): void {
    if (this.flagDescending) {
      this.flagY += 2;
      const bottomY = 12 * TILE_SIZE;
      if (this.flagY >= bottomY) {
        this.flagY = bottomY;
        this.flagDescending = false;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;

    const screenX = Math.floor(this.x - camera.x);

    // Draw flag
    const flagSprite = this.sprites.get('flag');
    if (flagSprite) {
      ctx.drawImage(flagSprite, screenX, Math.floor(this.flagY - camera.y));
    }
  }
}
