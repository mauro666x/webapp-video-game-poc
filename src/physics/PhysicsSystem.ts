import { GRAVITY, MAX_FALL_SPEED } from '../constants';
import { Entity } from '../entities/Entity';

export class PhysicsSystem {
  applyGravity(entity: Entity, gravityMult = 1): void {
    entity.vy += GRAVITY * gravityMult;
    if (entity.vy > MAX_FALL_SPEED) {
      entity.vy = MAX_FALL_SPEED;
    }
  }

  applyVelocity(entity: Entity): void {
    entity.x += entity.vx;
    entity.y += entity.vy;
  }
}
