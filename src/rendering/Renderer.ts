import { SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE, TileType, SKY_COLOR } from '../constants';
import { Camera } from '../core/Camera';
import { TileMap } from '../level/TileMap';

export class Renderer {
  private tileSprites: Map<string, HTMLCanvasElement>;
  private questionFrame = 0;
  private questionTimer = 0;

  constructor(tileSprites: Map<string, HTMLCanvasElement>) {
    this.tileSprites = tileSprites;
  }

  clear(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = SKY_COLOR;
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  renderTilemap(ctx: CanvasRenderingContext2D, tileMap: TileMap, camera: Camera, dt: number): void {
    // Question block animation
    this.questionTimer += dt;
    if (this.questionTimer > 400) {
      this.questionTimer = 0;
      this.questionFrame = (this.questionFrame + 1) % 3;
    }

    const startCol = Math.floor(camera.x / TILE_SIZE);
    const endCol = startCol + Math.ceil(SCREEN_WIDTH / TILE_SIZE) + 1;
    const startRow = 0;
    const endRow = tileMap.height;

    for (let row = startRow; row < endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const tile = tileMap.getTile(col, row);
        if (tile === TileType.EMPTY) continue;

        const screenX = Math.floor(col * TILE_SIZE - camera.x);
        const screenY = Math.floor(row * TILE_SIZE - camera.y);

        const sprite = this.getTileSprite(tile);
        if (sprite) {
          ctx.drawImage(sprite, screenX, screenY);
        }
      }
    }
  }

  private getTileSprite(tile: TileType): HTMLCanvasElement | undefined {
    switch (tile) {
      case TileType.GROUND:
        return this.tileSprites.get('ground');
      case TileType.BRICK:
      case TileType.COIN_BRICK:
        return this.tileSprites.get('brick');
      case TileType.QUESTION:
      case TileType.QUESTION_MUSHROOM:
      case TileType.QUESTION_STAR: {
        const frames = ['question1', 'question2', 'question1', 'question3'];
        return this.tileSprites.get(frames[this.questionFrame]);
      }
      case TileType.USED_BLOCK:
        return this.tileSprites.get('used_block');
      case TileType.HARD_BLOCK:
        return this.tileSprites.get('hard_block');
      case TileType.PIPE_TOP_LEFT:
        return this.tileSprites.get('pipe_top_left');
      case TileType.PIPE_TOP_RIGHT:
        return this.tileSprites.get('pipe_top_right');
      case TileType.PIPE_BODY_LEFT:
        return this.tileSprites.get('pipe_body_left');
      case TileType.PIPE_BODY_RIGHT:
        return this.tileSprites.get('pipe_body_right');
      case TileType.FLAGPOLE:
        return this.tileSprites.get('flagpole');
      case TileType.FLAGPOLE_TOP:
        return this.tileSprites.get('flagpole_top');
      case TileType.CASTLE_BLOCK:
        return this.tileSprites.get('castle_block');
      default:
        return undefined;
    }
  }

  // Draw decorative clouds and bushes
  renderBackground(ctx: CanvasRenderingContext2D, camera: Camera): void {
    // Simple clouds
    ctx.fillStyle = '#FFFFFF';
    const clouds = [
      { x: 68, y: 24, w: 32, h: 16 },
      { x: 280, y: 32, w: 24, h: 12 },
      { x: 440, y: 20, w: 40, h: 16 },
      { x: 680, y: 28, w: 32, h: 14 },
      { x: 900, y: 24, w: 36, h: 16 },
      { x: 1120, y: 32, w: 28, h: 12 },
      { x: 1400, y: 20, w: 40, h: 16 },
      { x: 1700, y: 28, w: 32, h: 14 },
      { x: 1980, y: 24, w: 36, h: 16 },
      { x: 2200, y: 32, w: 28, h: 12 },
      { x: 2500, y: 20, w: 40, h: 16 },
      { x: 2800, y: 28, w: 32, h: 14 },
    ];

    for (const cloud of clouds) {
      const sx = Math.floor(cloud.x - camera.x * 0.5); // Parallax
      if (sx + cloud.w < 0 || sx > SCREEN_WIDTH) continue;
      // Simple rounded cloud
      const cy = cloud.y;
      ctx.beginPath();
      ctx.ellipse(sx + cloud.w / 2, cy + cloud.h / 2, cloud.w / 2, cloud.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      if (cloud.w > 28) {
        ctx.beginPath();
        ctx.ellipse(sx + cloud.w / 3, cy + cloud.h / 2 + 2, cloud.w / 3, cloud.h / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(sx + cloud.w * 2 / 3, cy + cloud.h / 2 + 2, cloud.w / 3, cloud.h / 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Simple green bushes on ground
    ctx.fillStyle = '#00A800';
    const bushes = [
      { x: 184, w: 32, h: 16 },
      { x: 368, w: 48, h: 16 },
      { x: 600, w: 32, h: 16 },
      { x: 792, w: 48, h: 16 },
      { x: 1000, w: 32, h: 16 },
      { x: 1300, w: 48, h: 16 },
      { x: 1600, w: 32, h: 16 },
      { x: 1900, w: 48, h: 16 },
      { x: 2100, w: 32, h: 16 },
      { x: 2400, w: 48, h: 16 },
    ];

    for (const bush of bushes) {
      const sx = Math.floor(bush.x - camera.x);
      if (sx + bush.w < 0 || sx > SCREEN_WIDTH) continue;
      const by = 13 * TILE_SIZE - bush.h;
      ctx.beginPath();
      ctx.ellipse(sx + bush.w / 2, by + bush.h, bush.w / 2, bush.h, 0, Math.PI, 0);
      ctx.fill();
    }

    // Small hills
    ctx.fillStyle = '#00C800';
    const hills = [
      { x: 0, w: 80, h: 24 },
      { x: 240, w: 48, h: 16 },
      { x: 480, w: 80, h: 24 },
      { x: 720, w: 48, h: 16 },
      { x: 960, w: 80, h: 24 },
      { x: 1200, w: 48, h: 16 },
      { x: 1500, w: 80, h: 24 },
      { x: 1800, w: 48, h: 16 },
      { x: 2100, w: 80, h: 24 },
      { x: 2400, w: 48, h: 16 },
      { x: 2700, w: 80, h: 24 },
      { x: 3000, w: 48, h: 16 },
    ];

    for (const hill of hills) {
      const sx = Math.floor(hill.x - camera.x);
      if (sx + hill.w < -100 || sx > SCREEN_WIDTH + 100) continue;
      const hy = 13 * TILE_SIZE;
      ctx.beginPath();
      ctx.moveTo(sx, hy);
      ctx.quadraticCurveTo(sx + hill.w / 2, hy - hill.h, sx + hill.w, hy);
      ctx.fill();
    }
  }
}
