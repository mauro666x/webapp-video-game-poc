import { TileType as T } from '../../constants';

// World 1-1 level data
// 212 columns x 15 rows (row 0 is top, row 14 is bottom)
// NES screen is 16 tiles wide x 15 tiles tall (240/16 = 15)

const _ = T.EMPTY;
const G = T.GROUND;
const B = T.BRICK;
const Q = T.QUESTION;
const U = T.USED_BLOCK; // used block (won't appear in initial data)
const H = T.HARD_BLOCK;
const PL = T.PIPE_TOP_LEFT;
const PR = T.PIPE_TOP_RIGHT;
const BL = T.PIPE_BODY_LEFT;
const BR = T.PIPE_BODY_RIGHT;
const F = T.FLAGPOLE;
const FT = T.FLAGPOLE_TOP;
const C = T.CASTLE_BLOCK;
const QM = T.QUESTION_MUSHROOM; // ? block with power-up
const CB = T.COIN_BRICK; // brick with coins
const QS = T.QUESTION_STAR; // ? block with star

// Level width: 212 tiles
export const LEVEL_WIDTH = 212;
export const LEVEL_HEIGHT = 15;

// Build level row by row (15 rows, 212 columns each)
// Row 0 = sky (top), Row 13 = ground surface, Row 14 = underground
export const levelData: T[] = (() => {
  // Initialize with empty
  const data = new Array<T>(LEVEL_WIDTH * LEVEL_HEIGHT).fill(_);

  function set(row: number, col: number, tile: T) {
    if (row >= 0 && row < LEVEL_HEIGHT && col >= 0 && col < LEVEL_WIDTH) {
      data[row * LEVEL_WIDTH + col] = tile;
    }
  }

  function fillRow(row: number, colStart: number, colEnd: number, tile: T) {
    for (let c = colStart; c <= colEnd; c++) set(row, c, tile);
  }

  function fillRect(rowStart: number, colStart: number, rowEnd: number, colEnd: number, tile: T) {
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = colStart; c <= colEnd; c++) {
        set(r, c, tile);
      }
    }
  }

  // Ground (rows 13-14) - with gaps
  // Ground sections (columns where ground exists)
  const groundSections: [number, number][] = [
    [0, 68],    // Start to first pit
    [71, 85],   // After first pit
    [89, 152],  // After second pit
    [155, 211], // After third pit to end
  ];

  for (const [start, end] of groundSections) {
    fillRow(13, start, end, G);
    fillRow(14, start, end, G);
  }

  // === Blocks and structures ===

  // ? block with coin at col 16, row 9
  set(9, 16, Q);

  // Row of blocks at col 20-23, row 9: B, QM, B, Q, B
  set(9, 20, B);
  set(9, 21, QM); // Power-up ? block
  set(9, 22, B);
  set(9, 23, Q);  // Coin ? block
  set(9, 24, B);

  // ? block above at col 22, row 5
  set(5, 22, Q);

  // Pipe at col 28, height 2 (rows 11-12)
  set(11, 28, PL);
  set(11, 29, PR);
  set(12, 28, BL);
  set(12, 29, BR);

  // Pipe at col 38, height 3 (rows 10-12)
  set(10, 38, PL);
  set(10, 39, PR);
  set(11, 38, BL);
  set(11, 39, BR);
  set(12, 38, BL);
  set(12, 39, BR);

  // Pipe at col 46, height 4 (rows 9-12)
  set(9, 46, PL);
  set(9, 47, PR);
  set(10, 46, BL);
  set(10, 47, BR);
  set(11, 46, BL);
  set(11, 47, BR);
  set(12, 46, BL);
  set(12, 47, BR);

  // Pipe at col 57, height 4 (rows 9-12)
  set(9, 57, PL);
  set(9, 58, PR);
  set(10, 57, BL);
  set(10, 58, BR);
  set(11, 57, BL);
  set(11, 58, BR);
  set(12, 57, BL);
  set(12, 58, BR);

  // Blocks at col 77-79, row 9 (after first pit)
  set(9, 77, Q);
  // ? block with power-up
  set(9, 78, QM);

  // Blocks at col 80, row 5
  set(5, 80, B);
  // Brick row at col 80-87, row 5
  set(5, 80, B);
  set(5, 81, B);
  set(5, 82, B);
  set(5, 83, B);
  set(5, 84, B);
  set(5, 85, B);
  set(5, 86, B);
  set(5, 87, B);

  // Blocks at row 9 near col 91-93
  set(9, 91, B);
  set(9, 92, B);
  set(9, 93, Q); // Coin
  set(9, 94, B);

  // ? blocks at col 94, row 5
  set(5, 94, QM); // Power-up

  // Bricks at row 9, col 100
  set(9, 100, B);
  set(9, 101, QM); // power-up ?

  // Bricks above at row 5, col 100-101
  set(5, 100, B);
  set(5, 101, B);

  // Brick row at col 106-109, row 9
  // and row 5 bricks
  set(9, 106, B);
  set(9, 107, B);
  set(9, 108, B);
  set(9, 109, B);

  // Brick at col 118-119, row 9
  set(9, 118, B);
  set(9, 119, B);
  set(9, 120, B);

  // ? blocks at col 109, 112 row 9
  set(9, 112, Q);
  set(9, 115, Q);

  // Bricks at col 128-131 row 5
  set(5, 128, B);
  set(5, 129, CB); // coin brick
  set(5, 130, CB);
  set(5, 131, B);

  // Bricks at col 128-131 row 9
  set(9, 129, B);
  set(9, 130, B);

  // QS - star ? block at col 109
  set(5, 109, QS);

  // Staircase before first pit (col 134-136)
  // Step 1: col 134, rows 12
  set(12, 134, H);
  // Step 2: col 135, rows 11-12
  set(11, 135, H);
  set(12, 135, H);
  // Step 3: col 136, rows 10-12
  set(10, 136, H);
  set(11, 136, H);
  set(12, 136, H);
  // Step 4: col 137, rows 9-12
  set(9, 137, H);
  set(10, 137, H);
  set(11, 137, H);
  set(12, 137, H);

  // Staircase down after gap (col 140-143)
  set(9, 140, H);
  set(10, 140, H);
  set(11, 140, H);
  set(12, 140, H);
  //
  set(10, 141, H);
  set(11, 141, H);
  set(12, 141, H);
  //
  set(11, 142, H);
  set(12, 142, H);
  //
  set(12, 143, H);

  // Second staircase (col 148-151)
  set(12, 148, H);
  set(11, 149, H);
  set(12, 149, H);
  set(10, 150, H);
  set(11, 150, H);
  set(12, 150, H);
  set(9, 151, H);
  set(10, 151, H);
  set(11, 151, H);
  set(12, 151, H);
  // And a copy at 152
  set(9, 152, H);
  set(10, 152, H);
  set(11, 152, H);
  set(12, 152, H);

  // Staircase down (col 155-158)
  set(9, 155, H);
  set(10, 155, H);
  set(11, 155, H);
  set(12, 155, H);

  set(10, 156, H);
  set(11, 156, H);
  set(12, 156, H);

  set(11, 157, H);
  set(12, 157, H);

  set(12, 158, H);

  // Pipe at col 163, height 2
  set(11, 163, PL);
  set(11, 164, PR);
  set(12, 163, BL);
  set(12, 164, BR);

  // Blocks at col 168-170, row 9
  set(9, 168, B);
  set(9, 169, B);
  set(9, 170, Q); // coin
  set(9, 171, B);

  // Pipe at col 179, height 2
  set(11, 179, PL);
  set(11, 180, PR);
  set(12, 179, BL);
  set(12, 180, BR);

  // Final staircase to flagpole (col 181-189)
  // Ascending staircase
  set(12, 181, H);

  set(11, 182, H);
  set(12, 182, H);

  set(10, 183, H);
  set(11, 183, H);
  set(12, 183, H);

  set(9, 184, H);
  set(10, 184, H);
  set(11, 184, H);
  set(12, 184, H);

  set(8, 185, H);
  set(9, 185, H);
  set(10, 185, H);
  set(11, 185, H);
  set(12, 185, H);

  set(7, 186, H);
  set(8, 186, H);
  set(9, 186, H);
  set(10, 186, H);
  set(11, 186, H);
  set(12, 186, H);

  set(6, 187, H);
  set(7, 187, H);
  set(8, 187, H);
  set(9, 187, H);
  set(10, 187, H);
  set(11, 187, H);
  set(12, 187, H);

  set(5, 188, H);
  set(6, 188, H);
  set(7, 188, H);
  set(8, 188, H);
  set(9, 188, H);
  set(10, 188, H);
  set(11, 188, H);
  set(12, 188, H);

  // Flagpole at col 190
  set(4, 190, FT);
  for (let r = 5; r <= 12; r++) {
    set(r, 190, F);
  }

  // Castle (col 196-202, rows 7-12)
  // Castle base
  fillRect(9, 196, 12, 202, C);
  // Castle top
  fillRect(7, 198, 8, 200, C);
  // Castle door
  set(11, 199, _);
  set(12, 199, _);

  // Turret tops
  set(6, 199, C);
  set(5, 197, C);
  set(5, 201, C);

  return data;
})();

// Enemy spawn data: [type, col, row]
export type EnemySpawn = {
  type: 'goomba' | 'koopa';
  col: number;
  row: number;
};

export const enemySpawns: EnemySpawn[] = [
  // First Goomba
  { type: 'goomba', col: 22, row: 12 },
  // Goombas before first pipe
  { type: 'goomba', col: 40, row: 12 },
  // Goombas after pipe section
  { type: 'goomba', col: 51, row: 12 },
  { type: 'goomba', col: 53, row: 12 },
  // Koopa Troopa
  { type: 'koopa', col: 107, row: 12 },
  // Goomba pair
  { type: 'goomba', col: 80, row: 4 },
  { type: 'goomba', col: 82, row: 4 },
  // Goombas in middle section
  { type: 'goomba', col: 97, row: 12 },
  { type: 'goomba', col: 99, row: 12 },
  // Goombas near second staircase
  { type: 'goomba', col: 114, row: 12 },
  { type: 'goomba', col: 116, row: 12 },
  // Goombas near end
  { type: 'goomba', col: 124, row: 12 },
  { type: 'goomba', col: 126, row: 12 },
  // Goombas after blocks
  { type: 'goomba', col: 128, row: 12 },
  { type: 'goomba', col: 130, row: 12 },
  // Final goombas before flagpole
  { type: 'goomba', col: 174, row: 12 },
  { type: 'goomba', col: 176, row: 12 },
];
