import { createSprite, createCanvas, drawPixels } from '../SpriteSheet';

const TILE = 16;

// Color palettes
const groundColors: Record<string, string> = {
  'B': '#C84C0C', // brown
  'D': '#A03800', // dark brown
  'L': '#E8A060', // light tan
};

const brickColors: Record<string, string> = {
  'B': '#C84C0C',
  'D': '#A03800',
  'L': '#E8A060',
  'K': '#000000',
};

const questionColors: Record<string, string> = {
  'Y': '#E7A210',
  'D': '#C86800',
  'L': '#FFD898',
  'K': '#000000',
  'W': '#FFFFFF',
};

const usedBlockColors: Record<string, string> = {
  'B': '#C84C0C',
  'D': '#A03800',
  'K': '#000000',
};

const pipeColors: Record<string, string> = {
  'G': '#00A800',
  'D': '#005800',
  'L': '#60D860',
  'K': '#000000',
};

const hardBlockColors: Record<string, string> = {
  'S': '#A8A8A8',
  'D': '#787878',
  'L': '#D8D8D8',
  'K': '#000000',
};

const castleColors: Record<string, string> = {
  'S': '#A8A8A8',
  'D': '#787878',
  'L': '#D8D8D8',
  'K': '#585858',
};

const flagColors: Record<string, string> = {
  'G': '#00A800',
  'D': '#005800',
  'K': '#000000',
  'W': '#FFFFFF',
};

export function createTileSprites(): Map<string, HTMLCanvasElement> {
  const sprites = new Map<string, HTMLCanvasElement>();

  // Ground tile
  sprites.set('ground', createSprite(TILE, TILE, [
    'BBBBBBBBBBBBBBBB',
    'BLLLLLLLLLLLLLLB',
    'BLBBBBBBBBBBBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLBBDDBBBBBBBBDB',
    'BLBBDDBBBBBBBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLBBBBBBBBDDBBDB',
    'BLBBBBBBBBDDBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLBBBBBBBBBBBBDB',
    'BLDDDDDDDDDDDDDB',
    'BBBBBBBBBBBBBBBB',
  ], groundColors));

  // Brick tile
  sprites.set('brick', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KBBLBBBLBBBLBBBL',
    'KBBLBBBLBBBLBBBL',
    'KLLLLLLLLLLLLLLL',
    'KBBLBBBLBBBLBBBL',
    'KBBLBBBLBBBLBBBL',
    'KBBLBBBLBBBLBBBL',
    'KLLLLLLLLLLLLLLL',
    'KBBLBBBLBBBLBBBL',
    'KBBLBBBLBBBLBBBL',
    'KLLLLLLLLLLLLLLL',
    'KBBLBBBLBBBLBBBL',
    'KBBLBBBLBBBLBBBL',
    'KBBLBBBLBBBLBBBL',
    'KLLLLLLLLLLLLLLL',
    'KKKKKKKKKKKKKKKK',
  ], brickColors));

  // Question block (frame 1 - bright)
  sprites.set('question1', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KYYYYYYYYYYYYYYY',
    'KYLLLLLLLLLLLLLY',
    'KYLYYYYYDDDYYYYD',
    'KYLYYYYDDDDDYYYD',
    'KYLYYYDDDYYDDDYD',
    'KYLYYYYYYYYDDDYD',
    'KYLYYYYYYYDDDYYD',
    'KYLYYYYYDDDYYYYD',
    'KYLYYYYYDDDYYYYD',
    'KYLYYYYYYYYYYYYD',
    'KYLYYYYYDDDYYYYD',
    'KYLYYYYYDDDYYYYD',
    'KYLDDDDDDDDDDDD',
    'KYDDDDDDDDDDDDD',
    'KKKKKKKKKKKKKKKK',
  ], questionColors));

  // Question block (frame 2 - medium)
  sprites.set('question2', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KDDDDDDDDDDDDDD',
    'KDYYYYYYYYYYYYYD',
    'KDYYYYYDDDYYYYYD',
    'KDYYYYDDDDDYYYYD',
    'KDYYYDDDYYDDDYYD',
    'KDYYYYYYYYDDDYYD',
    'KDYYYYYYYDDDDYYD',
    'KDYYYYYDDDYYYYYD',
    'KDYYYYYDDDYYYYYD',
    'KDYYYYYYYYYYYYYYD',
    'KDYYYYYDDDYYYYYD',
    'KDYYYYYDDDYYYYYD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KKKKKKKKKKKKKKKK',
  ], questionColors));

  // Question block (frame 3 - dark)
  sprites.set('question3', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KDDDDDDDDDDDDDD',
    'KKKKKKKKKKKKKKKK',
  ], questionColors));

  // Used block (empty ? block)
  sprites.set('used_block', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KBBBBBBBBBBBBBBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBDDDDDDDDDDDBK',
    'KBBBBBBBBBBBBBBK',
    'KKKKKKKKKKKKKKKK',
  ], usedBlockColors));

  // Hard/stone block
  sprites.set('hard_block', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KLLLLLLLLLLLLLLK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLSSSSSSSSSSSSDK',
    'KLDDDDDDDDDDDDDK',
    'KKKKKKKKKKKKKKKK',
  ], hardBlockColors));

  // Pipe top-left
  sprites.set('pipe_top_left', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KLLLLLLLLLLLLLLG',
    'KLGGGGGGGGGGGGGG',
    'KLGGGGGGGGGGGGGG',
    'KKKKKKKKKKKKKKKK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
  ], pipeColors));

  // Pipe top-right
  sprites.set('pipe_top_right', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'GDDDDDDDDDDDDDK',
    'GGGGGGGGGGGGGDDK',
    'GGGGGGGGGGGGGDDK',
    'KKKKKKKKKKKKKKKK',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
  ], pipeColors));

  // Pipe body-left
  sprites.set('pipe_body_left', createSprite(TILE, TILE, [
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
    'DDKLGGGGGGGGGGGK',
  ], pipeColors));

  // Pipe body-right
  sprites.set('pipe_body_right', createSprite(TILE, TILE, [
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
    'KGGGGGGGGGGDDKDD',
  ], pipeColors));

  // Flagpole
  sprites.set('flagpole', createSprite(TILE, TILE, [
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
  ], { 'K': '#585858' }));

  // Flagpole top (ball)
  sprites.set('flagpole_top', createSprite(TILE, TILE, [
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
    '.......GGG......',
    '......GGGGG.....',
    '......GGGGG.....',
    '......GGGGG.....',
    '.......GGG......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
  ], { 'G': '#00A800', 'K': '#585858' }));

  // Flag
  sprites.set('flag', createSprite(TILE, TILE, [
    '........KK......',
    '...GGGGGKK......',
    '..GGGGGGKK......',
    '...GGGGGKK......',
    '....GGGGKK......',
    '.....GGGKK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
    '........KK......',
  ], { 'G': '#00A800', 'K': '#585858' }));

  // Castle block
  sprites.set('castle_block', createSprite(TILE, TILE, [
    'KKKKKKKKKKKKKKKK',
    'KSSSSSSSSSSSSSSK',
    'KSLLLLLLLLLLLLSK',
    'KSLLLLLLLLLLLLSK',
    'KSLLLLLLLLLLLLSK',
    'KSLLLLLLLLLLLLSK',
    'KSLLLLLLLLLLLLSK',
    'KKKKKKKKKKKKKKKK',
    'KSSSSSSSKSSSSSK.',
    'KSLLLLSSKSLLLSK.',
    'KSLLLLSSKSLLLSK.',
    'KSLLLLSSKSLLLSK.',
    'KSLLLLSSKSLLLSK.',
    'KSLLLLSSKSLLLSK.',
    'KSLLLLSSKSLLLSK.',
    'KKKKKKKKKKKKKKKK',
  ], castleColors));

  return sprites;
}
