import { Entity } from '../Entity';
import { Direction, TILE_SIZE } from '../../constants';
import { Camera } from '../../core/Camera';

export class Enemy extends Entity {
  direction: Direction = Direction.LEFT;
  activated = false;
  stomped = false;
  stompTimer = 0;

  constructor() {
    super();
    this.active = false;
  }

  // Check if enemy should activate based on camera position
  checkActivation(camera: Camera): void {
    if (!this.activated && camera.isInActivationZone(this.x)) {
      this.activated = true;
      this.active = true;
    }
  }

  onStomp(): void {
    this.stomped = true;
  }
}
