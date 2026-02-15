import { TILE_SIZE, TileType } from '../constants';
import { TileMap } from '../level/TileMap';
import { Entity } from '../entities/Entity';

export interface TileCollision {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  // Tile that was hit from below (for ? blocks, bricks)
  hitTileCol?: number;
  hitTileRow?: number;
}

export class TileCollider {
  private tileMap: TileMap;

  constructor(tileMap: TileMap) {
    this.tileMap = tileMap;
  }

  setTileMap(tileMap: TileMap): void {
    this.tileMap = tileMap;
  }

  // Resolve entity against tilemap using separate-axis resolution
  resolve(entity: Entity): TileCollision {
    const result: TileCollision = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };

    // Resolve X axis first
    this.resolveX(entity, result);
    // Then resolve Y axis
    this.resolveY(entity, result);

    return result;
  }

  private resolveX(entity: Entity, result: TileCollision): void {
    if (entity.vx === 0) return;

    const top = Math.floor(entity.top / TILE_SIZE);
    const bottom = Math.floor((entity.bottom - 1) / TILE_SIZE);

    if (entity.vx > 0) {
      // Moving right
      const col = Math.floor(entity.right / TILE_SIZE);
      for (let row = top; row <= bottom; row++) {
        if (this.tileMap.isSolid(col, row)) {
          entity.x = col * TILE_SIZE - entity.width;
          entity.vx = 0;
          result.right = true;
          break;
        }
      }
    } else {
      // Moving left
      const col = Math.floor(entity.left / TILE_SIZE);
      for (let row = top; row <= bottom; row++) {
        if (this.tileMap.isSolid(col, row)) {
          entity.x = (col + 1) * TILE_SIZE;
          entity.vx = 0;
          result.left = true;
          break;
        }
      }
    }
  }

  private resolveY(entity: Entity, result: TileCollision): void {
    if (entity.vy === 0) return;

    const left = Math.floor(entity.left / TILE_SIZE);
    const right = Math.floor((entity.right - 1) / TILE_SIZE);

    if (entity.vy > 0) {
      // Falling down
      const row = Math.floor(entity.bottom / TILE_SIZE);
      for (let col = left; col <= right; col++) {
        if (this.tileMap.isSolid(col, row)) {
          entity.y = row * TILE_SIZE - entity.height;
          entity.vy = 0;
          result.bottom = true;
          break;
        }
      }
    } else {
      // Moving up - head bonk
      const row = Math.floor(entity.top / TILE_SIZE);
      for (let col = left; col <= right; col++) {
        if (this.tileMap.isSolid(col, row)) {
          entity.y = (row + 1) * TILE_SIZE;
          entity.vy = 0;
          result.top = true;
          result.hitTileCol = col;
          result.hitTileRow = row;
          break;
        }
      }
    }
  }

  // Check if entity is standing on ground
  isOnGround(entity: Entity): boolean {
    const row = Math.floor((entity.bottom + 1) / TILE_SIZE);
    const left = Math.floor(entity.left / TILE_SIZE);
    const right = Math.floor((entity.right - 1) / TILE_SIZE);

    for (let col = left; col <= right; col++) {
      if (this.tileMap.isSolid(col, row)) {
        return true;
      }
    }
    return false;
  }
}
