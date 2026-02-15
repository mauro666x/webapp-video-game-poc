import type { Camera } from '../core/Camera';

export class Entity {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  width = 16;
  height = 16;
  alive = true;
  active = false; // Activated when scrolled into view
  removeFlag = false; // Mark for removal from entity list

  // AABB bounds
  get left(): number { return this.x; }
  get right(): number { return this.x + this.width; }
  get top(): number { return this.y; }
  get bottom(): number { return this.y + this.height; }
  get centerX(): number { return this.x + this.width / 2; }
  get centerY(): number { return this.y + this.height / 2; }

  update(_dt: number): void {}

  render(_ctx: CanvasRenderingContext2D, _camera: Camera): void {}

  // AABB overlap test
  overlaps(other: Entity): boolean {
    return (
      this.left < other.right &&
      this.right > other.left &&
      this.top < other.bottom &&
      this.bottom > other.top
    );
  }

  // Check if this entity is on screen
  isOnScreen(camera: Camera): boolean {
    return camera.isVisible(this.x, this.y, this.width, this.height);
  }
}
