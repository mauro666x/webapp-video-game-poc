import { createSprite } from '../SpriteSheet';

const mushroomColors: Record<string, string> = {
  'R': '#B81010', // red cap
  'W': '#FFFFFF', // white spots/stem
  'K': '#000000',
  'T': '#E8A060', // tan
};

const flowerColors: Record<string, string> = {
  'R': '#B81010',
  'Y': '#E7A210',
  'G': '#00A800',
  'W': '#FFFFFF',
  'K': '#000000',
  'O': '#E44000',
};

const starColors: Record<string, string> = {
  'Y': '#E7A210',
  'L': '#FFD898',
  'K': '#000000',
  'O': '#E44000',
};

const coinColors: Record<string, string> = {
  'Y': '#E7A210',
  'L': '#FFD898',
  'D': '#C86800',
  'K': '#000000',
};

const fireballColors: Record<string, string> = {
  'Y': '#E7A210',
  'O': '#E44000',
  'R': '#B81010',
};

const oneUpColors: Record<string, string> = {
  'G': '#00A800',
  'W': '#FFFFFF',
  'K': '#000000',
  'T': '#E8A060',
};

export function createItemSprites(): Map<string, HTMLCanvasElement> {
  const sprites = new Map<string, HTMLCanvasElement>();

  // Mushroom
  sprites.set('mushroom', createSprite(16, 16, [
    '......KKKK......',
    '....KKRRRRK.....',
    '...KRRWWRRRRK...',
    '..KRRWWWWRRRRK..',
    '..KRRWWRRRRWWK..',
    '.KRRRRRRRRWWWRK.',
    '.KRRRRRRRRRWWRK.',
    '.KRRRRRRRRRRRRK.',
    '..KKKKKKKKKKK...',
    '....KWWWWWWK....',
    '...KWWWKKWWWK...',
    '..KWWWKKKWWWWK..',
    '..KWWWKKKWWWWK..',
    '..KWWWWWWWWWWK..',
    '...KKKKKKKKK....',
    '................',
  ], mushroomColors));

  // 1-UP mushroom (green version)
  sprites.set('1up_mushroom', createSprite(16, 16, [
    '......KKKK......',
    '....KKGGGGK.....',
    '...KGGWWGGGGK...',
    '..KGGWWWWGGGGK..',
    '..KGGWWGGGGWWK..',
    '.KGGGGGGGGWWWGK.',
    '.KGGGGGGGGGWWGK.',
    '.KGGGGGGGGGGGGK.',
    '..KKKKKKKKKKK...',
    '....KWWWWWWK....',
    '...KWWWKKWWWK...',
    '..KWWWKKKWWWWK..',
    '..KWWWKKKWWWWK..',
    '..KWWWWWWWWWWK..',
    '...KKKKKKKKK....',
    '................',
  ], oneUpColors));

  // Fire Flower frame 1
  sprites.set('flower1', createSprite(16, 16, [
    '................',
    '.....KK.KK......',
    '....KOOKRRK.....',
    '....KOOOKRRK....',
    '...KYOOKRRRYK...',
    '...KYYKKRRRYK...',
    '....KYGGGYRK....',
    '.....KGGGK......',
    '.....KGGGK......',
    '......KGGK......',
    '....KKKGGKKK....',
    '...KGGGGGGGGK...',
    '..KGGGGGGGGGGK..',
    '..KGGGGGGGGGGK..',
    '...KKKKKKKKKK...',
    '................',
  ], flowerColors));

  // Fire Flower frame 2 (color-shifted)
  sprites.set('flower2', createSprite(16, 16, [
    '................',
    '.....KK.KK......',
    '....KYYKOEK.....',
    '....KYYYKOOK....',
    '...KRYYKOOEYK...',
    '...KRRKKOORYK...',
    '....KRGGGORK....',
    '.....KGGGK......',
    '.....KGGGK......',
    '......KGGK......',
    '....KKKGGKKK....',
    '...KGGGGGGGGK...',
    '..KGGGGGGGGGGK..',
    '..KGGGGGGGGGGK..',
    '...KKKKKKKKKK...',
    '................',
  ], flowerColors));

  // Star frame 1
  sprites.set('star1', createSprite(16, 16, [
    '................',
    '.......KK.......',
    '......KLLK......',
    '......KLLK......',
    '.....KLLLLK.....',
    '.KKKKKLLLLLKKKK.',
    '.KLLLLLLLLLLLLK.',
    '..KLLLLLLLLLLK..',
    '..KLLLLLLLLLLK..',
    '...KLLLLLLLLK...',
    '...KLLLLLLLK....',
    '....KLLLLLLK....',
    '...KLLLKKLLK....',
    '...KLLK..KLLK...',
    '..KKK....KKKK..',
    '................',
  ], starColors));

  // Star frame 2
  sprites.set('star2', createSprite(16, 16, [
    '................',
    '.......KK.......',
    '......KYYK......',
    '......KYYK......',
    '.....KYYYYK.....',
    '.KKKKKYYYYYKKKK.',
    '.KYYYYYYYYYYYYK.',
    '..KYYYYYYYYYK...',
    '..KYYYYYYYYYK...',
    '...KYYYYYYYK....',
    '...KYYYYYYY.....',
    '....KYYYYYYK....',
    '...KYYYKKYYK....',
    '...KYYK..KYYK...',
    '..KKK....KKKK..',
    '................',
  ], starColors));

  // Coin frame 1 (front)
  sprites.set('coin1', createSprite(16, 16, [
    '................',
    '......KKKK......',
    '.....KYYYYK.....',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '....KYYYLYYYK...',
    '....KYYYYLYYYK..',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '....KYYYLYYYK...',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '.....KYYYYK.....',
    '......KKKK......',
    '................',
  ], coinColors));

  // Coin frame 2 (slightly turned)
  sprites.set('coin2', createSprite(16, 16, [
    '................',
    '.......KK.......',
    '......KYYK......',
    '......KYYK......',
    '......KLYK......',
    '......KYYK......',
    '......KLYK......',
    '......KYYK......',
    '......KLYK......',
    '......KYYK......',
    '......KLYK......',
    '......KYYK......',
    '......KYYK......',
    '.......KK.......',
    '................',
    '................',
  ], coinColors));

  // Coin frame 3 (thin)
  sprites.set('coin3', createSprite(16, 16, [
    '................',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '.......KK.......',
    '................',
    '................',
  ], coinColors));

  // Pop-up coin (same as coin1)
  sprites.set('popup_coin', createSprite(16, 16, [
    '................',
    '......KKKK......',
    '.....KYYYYK.....',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '....KYYYLYYYK...',
    '....KYYYYLYYYK..',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '....KYYYLYYYK...',
    '....KYYLLYYK....',
    '....KYYLLYYK....',
    '.....KYYYYK.....',
    '......KKKK......',
    '................',
  ], coinColors));

  // Fireball
  sprites.set('fireball1', createSprite(8, 8, [
    '..YYYY..',
    '.YOOOY..',
    'YOORROO.',
    'YORRROY.',
    'YORRROY.',
    '.YORRRY.',
    '..YOOY..',
    '..YYYY..',
  ], fireballColors));

  sprites.set('fireball2', createSprite(8, 8, [
    '..YYYY..',
    '.YRROY..',
    'YRRRROY.',
    'YROOOOY.',
    'YROOOOY.',
    '.YRRRRY.',
    '..YRRY..',
    '..YYYY..',
  ], fireballColors));

  return sprites;
}
