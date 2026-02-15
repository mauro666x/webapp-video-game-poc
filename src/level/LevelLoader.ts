import { TileMap } from './TileMap';
import { Level } from './Level';
import { TileType, TILE_SIZE } from '../constants';
import { levelData, LEVEL_WIDTH, LEVEL_HEIGHT, enemySpawns } from './data/world1_1';
import { QuestionBlock } from '../entities/blocks/QuestionBlock';
import { BrickBlock } from '../entities/blocks/BrickBlock';
import { Goomba } from '../entities/enemies/Goomba';
import { KoopaTroopa } from '../entities/enemies/KoopaTroopa';
import { FlagPole } from '../entities/FlagPole';

export class LevelLoader {
  private tileSprites: Map<string, HTMLCanvasElement>;
  private enemySprites: Map<string, HTMLCanvasElement>;
  private itemSprites: Map<string, HTMLCanvasElement>;

  constructor(
    tileSprites: Map<string, HTMLCanvasElement>,
    enemySprites: Map<string, HTMLCanvasElement>,
    itemSprites: Map<string, HTMLCanvasElement>
  ) {
    this.tileSprites = tileSprites;
    this.enemySprites = enemySprites;
    this.itemSprites = itemSprites;
  }

  load(): Level {
    const tileMap = new TileMap(LEVEL_WIDTH, LEVEL_HEIGHT, [...levelData]);
    const level = new Level(tileMap);

    // Scan tilemap for interactive blocks and create entities
    for (let row = 0; row < LEVEL_HEIGHT; row++) {
      for (let col = 0; col < LEVEL_WIDTH; col++) {
        const tile = tileMap.getTile(col, row);

        switch (tile) {
          case TileType.QUESTION: {
            const block = new QuestionBlock(col, row, 'coin');
            block.setSprites(this.tileSprites);
            level.addEntity(block);
            break;
          }
          case TileType.QUESTION_MUSHROOM: {
            const block = new QuestionBlock(col, row, 'mushroom');
            block.setSprites(this.tileSprites);
            level.addEntity(block);
            // Render as ? block in tilemap
            tileMap.setTile(col, row, TileType.QUESTION_MUSHROOM);
            break;
          }
          case TileType.QUESTION_STAR: {
            const block = new QuestionBlock(col, row, 'star');
            block.setSprites(this.tileSprites);
            level.addEntity(block);
            break;
          }
          case TileType.BRICK: {
            const block = new BrickBlock(col, row, 0);
            block.setSprites(this.tileSprites);
            level.addEntity(block);
            break;
          }
          case TileType.COIN_BRICK: {
            const block = new BrickBlock(col, row, 5); // 5 coins
            block.setSprites(this.tileSprites);
            level.addEntity(block);
            break;
          }
          case TileType.FLAGPOLE_TOP: {
            const flagPole = new FlagPole(col);
            flagPole.setSprites(this.tileSprites);
            level.addEntity(flagPole);
            level.flagX = col * TILE_SIZE;
            break;
          }
        }
      }
    }

    // Spawn enemies
    for (const spawn of enemySpawns) {
      const x = spawn.col * TILE_SIZE;
      const y = spawn.row * TILE_SIZE;

      if (spawn.type === 'goomba') {
        const goomba = new Goomba(x, y);
        goomba.setSprites(this.enemySprites);
        level.addEntity(goomba);
      } else if (spawn.type === 'koopa') {
        const koopa = new KoopaTroopa(x, y - 8); // Koopa is taller
        koopa.setSprites(this.enemySprites);
        level.addEntity(koopa);
      }
    }

    return level;
  }
}
