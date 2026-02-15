import { Entity } from '../Entity';
import { TileType, TILE_SIZE } from '../../constants';
import { Camera } from '../../core/Camera';

export class QuestionBlock extends Entity {
  col: number;
  row: number;
  used = false;
  bumpOffset = 0;
  bumping = false;
  private bumpTimer = 0;
  contentType: 'coin' | 'mushroom' | 'star';
  sprites!: Map<string, HTMLCanvasElement>;
  private animFrame = 0;
  private animTimer = 0;

  constructor(col: number, row: number, contentType: 'coin' | 'mushroom' | 'star' = 'coin') {
    super();
    this.col = col;
    this.row = row;
    this.x = col * TILE_SIZE;
    this.y = row * TILE_SIZE;
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.active = true;
    this.contentType = contentType;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  bump(): string {
    if (this.used) return 'none';
    this.used = true;
    this.bumping = true;
    this.bumpTimer = 0;
    return this.contentType;
  }

  update(dt: number): void {
    // Question mark animation
    if (!this.used) {
      this.animTimer += dt;
      if (this.animTimer > 400) {
        this.animTimer = 0;
        this.animFrame = (this.animFrame + 1) % 3;
      }
    }

    // Bump animation
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
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    if (!this.sprites) return;

    let sprite: HTMLCanvasElement | undefined;
    if (this.used) {
      sprite = this.sprites.get('used_block');
    } else {
      const frames = ['question1', 'question2', 'question1', 'question3'];
      sprite = this.sprites.get(frames[this.animFrame]);
    }

    if (sprite) {
      const screenX = Math.floor(this.x - camera.x);
      const screenY = Math.floor(this.y - camera.y) + this.bumpOffset;
      ctx.drawImage(sprite, screenX, screenY);
    }
  }
}
