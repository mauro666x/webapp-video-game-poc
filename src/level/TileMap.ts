import { TileType, TILE_SIZE } from '../constants';

export class TileMap {
  readonly width: number;
  readonly height: number;
  private tiles: TileType[];

  constructor(width: number, height: number, tiles: TileType[]) {
    this.width = width;
    this.height = height;
    this.tiles = tiles;
  }

  getTile(col: number, row: number): TileType {
    if (col < 0 || col >= this.width || row < 0 || row >= this.height) {
      return TileType.EMPTY;
    }
    return this.tiles[row * this.width + col];
  }

  setTile(col: number, row: number, type: TileType): void {
    if (col >= 0 && col < this.width && row >= 0 && row < this.height) {
      this.tiles[row * this.width + col] = type;
    }
  }

  isSolid(col: number, row: number): boolean {
    const tile = this.getTile(col, row);
    switch (tile) {
      case TileType.GROUND:
      case TileType.BRICK:
      case TileType.QUESTION:
      case TileType.USED_BLOCK:
      case TileType.HARD_BLOCK:
      case TileType.PIPE_TOP_LEFT:
      case TileType.PIPE_TOP_RIGHT:
      case TileType.PIPE_BODY_LEFT:
      case TileType.PIPE_BODY_RIGHT:
      case TileType.INVISIBLE_BARRIER:
      case TileType.COIN_BRICK:
      case TileType.QUESTION_MUSHROOM:
      case TileType.QUESTION_STAR:
      case TileType.CASTLE_BLOCK:
        return true;
      default:
        return false;
    }
  }

  // Convert world pixel coords to tile coords
  pixelToTile(px: number, py: number): { col: number; row: number } {
    return {
      col: Math.floor(px / TILE_SIZE),
      row: Math.floor(py / TILE_SIZE),
    };
  }
}
