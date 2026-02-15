import { createSprite, flipHorizontal } from '../SpriteSheet';

const goombaColors: Record<string, string> = {
  'B': '#C84C0C', // brown body
  'D': '#A03800', // dark brown
  'K': '#000000', // black
  'W': '#FFFFFF', // white eyes
  'T': '#E8A060', // tan/feet
};

const koopaColors: Record<string, string> = {
  'G': '#00A800', // green shell
  'D': '#005800', // dark green
  'K': '#000000', // black
  'W': '#FFFFFF', // white
  'Y': '#E8A060', // yellow/skin
  'T': '#E8A060', // tan
};

export function createEnemySprites(): Map<string, HTMLCanvasElement> {
  const sprites = new Map<string, HTMLCanvasElement>();

  // Goomba walk frame 1
  const goombaWalk1 = createSprite(16, 16, [
    '......KKKK......',
    '.....KBBBBK.....',
    '....KBBBBBBK....',
    '...KBBBBBBBBK...',
    '..KKBWKBBKWBKK..',
    '..KBBWKBBKWBBK..',
    '..KBBKKBBKKBBK..',
    '..KBBBBBBBBBK...',
    '...KKKBBBBKKK...',
    '.....KBBBBK.....',
    '....KKBBBBKK....',
    '...KTTKKKKTTK...',
    '..KTTTK..KTTTK..',
    '..KTTK....KTTK..',
    '..KKK......KKK..',
    '................',
  ], goombaColors);
  sprites.set('goomba_walk1', goombaWalk1);

  // Goomba walk frame 2
  const goombaWalk2 = createSprite(16, 16, [
    '......KKKK......',
    '.....KBBBBK.....',
    '....KBBBBBBK....',
    '...KBBBBBBBBK...',
    '..KKBWKBBKWBKK..',
    '..KBBWKBBKWBBK..',
    '..KBBKKBBKKBBK..',
    '..KBBBBBBBBBK...',
    '...KKKBBBBKKK...',
    '.....KBBBBK.....',
    '....KKBBBBKK....',
    '...KTTKKKKTTK...',
    '..KTTTK..KTTTK..',
    '...KTTK..KTTK...',
    '...KKK....KKK...',
    '................',
  ], goombaColors);
  sprites.set('goomba_walk2', goombaWalk2);

  // Goomba flat (stomped)
  sprites.set('goomba_flat', createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.KKKKKKKKKKKKKK.',
    '.KBWKBBBBBBKWBK.',
    '.KKKKKKKKKKKKKKK',
    '................',
  ], goombaColors));

  // Koopa walk frame 1 (right-facing)
  const koopaWalk1 = createSprite(16, 24, [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '......KKK.......',
    '.....KGGGK......',
    '....KGGGGGK.....',
    '..KKKYYGGGK.....',
    '.KWWKYYKKGK.....',
    '.KWWKYY.KKK.....',
    '.KKKKYYY.KGK....',
    '...KYYYYY.KGK...',
    '...KYYYKKKKGK...',
    '....KKKGGGGK....',
    '....KGGGGGK.....',
    '...KGGGGGK......',
    '...KGGKKKK......',
    '...KKKTTTK......',
    '....KTTTTK......',
    '....KTTTTK......',
    '.....KKKK.......',
    '................',
  ], koopaColors);
  sprites.set('koopa_walk1_right', koopaWalk1);
  sprites.set('koopa_walk1_left', flipHorizontal(koopaWalk1));

  // Koopa walk frame 2
  const koopaWalk2 = createSprite(16, 24, [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '......KKK.......',
    '.....KGGGK......',
    '....KGGGGGK.....',
    '..KKKYYGGGK.....',
    '.KWWKYYKKGK.....',
    '.KWWKYY.KKK.....',
    '.KKKKYYY.KGK....',
    '...KYYYYY.KGK...',
    '...KYYYKKKKGK...',
    '....KKKGGGGK....',
    '....KGGGGGK.....',
    '....KGGGGGK.....',
    '.....KKKKGK.....',
    '.....KTTKK......',
    '....KTTTTK......',
    '...KTTTK........',
    '...KKKK.........',
    '................',
  ], koopaColors);
  sprites.set('koopa_walk2_right', koopaWalk2);
  sprites.set('koopa_walk2_left', flipHorizontal(koopaWalk2));

  // Koopa shell
  const shell = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '......KKKK......',
    '....KKGGGGKK....',
    '...KGGGGGGGGK...',
    '..KGDGGDDGGDGK..',
    '..KGDGGDDGGDGK..',
    '..KGGGGGGGGGGK..',
    '..KKGGGGGGGGKK..',
    '...KKKKKKKKKK...',
    '................',
    '................',
    '................',
    '................',
  ], koopaColors);
  sprites.set('koopa_shell', shell);

  return sprites;
}
