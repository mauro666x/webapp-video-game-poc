import { Entity } from '../entities/Entity';

export type CollisionCallback = (a: Entity, b: Entity) => void;

export class CollisionSystem {
  // Check overlap between two entity lists
  checkOverlaps(listA: Entity[], listB: Entity[], callback: CollisionCallback): void {
    for (const a of listA) {
      if (!a.alive) continue;
      for (const b of listB) {
        if (!b.alive) continue;
        if (a.overlaps(b)) {
          callback(a, b);
        }
      }
    }
  }

  // Check one entity against a list
  checkEntityVsList(entity: Entity, list: Entity[], callback: (other: Entity) => void): void {
    if (!entity.alive) return;
    for (const other of list) {
      if (!other.alive) continue;
      if (entity.overlaps(other)) {
        callback(other);
      }
    }
  }
}
