import { SCREEN_WIDTH, SCREEN_HEIGHT, TILE_SIZE, CAMERA_OFFSET_X } from '../constants';

export class Camera {
  x = 0;
  y = 0;
  private maxX: number;

  constructor(levelWidth: number) {
    this.maxX = levelWidth * TILE_SIZE - SCREEN_WIDTH;
  }

  follow(entityX: number): void {
    const target = entityX - CAMERA_OFFSET_X;
    // Camera only scrolls right
    if (target > this.x) {
      this.x = target;
    }
    // Clamp
    if (this.x < 0) this.x = 0;
    if (this.x > this.maxX) this.x = this.maxX;
  }

  get screenWidth(): number {
    return SCREEN_WIDTH;
  }

  get screenHeight(): number {
    return SCREEN_HEIGHT;
  }

  // Check if a world-space rectangle is visible
  isVisible(x: number, y: number, w: number, h: number): boolean {
    return (
      x + w > this.x &&
      x < this.x + SCREEN_WIDTH &&
      y + h > this.y &&
      y < this.y + SCREEN_HEIGHT
    );
  }

  // Get activation zone (slightly wider than viewport for enemy spawning)
  isInActivationZone(x: number): boolean {
    return x > this.x - TILE_SIZE && x < this.x + SCREEN_WIDTH + TILE_SIZE * 2;
  }
}
