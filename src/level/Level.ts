import { TileMap } from './TileMap';
import { Entity } from '../entities/Entity';

export class Level {
  tileMap: TileMap;
  entities: Entity[] = [];
  flagX = 0; // X position of flagpole

  constructor(tileMap: TileMap) {
    this.tileMap = tileMap;
  }

  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }

  removeEntity(entity: Entity): void {
    const idx = this.entities.indexOf(entity);
    if (idx !== -1) {
      this.entities.splice(idx, 1);
    }
  }

  // Clean up removed entities
  cleanup(): void {
    this.entities = this.entities.filter(e => !e.removeFlag);
  }
}
