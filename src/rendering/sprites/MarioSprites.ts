import { createSprite, flipHorizontal } from '../SpriteSheet';

type ColorMap = Record<string, string>;

/**
 * Original "plumber-hero" sprites inspired by classic platformers.
 * Not Mario sprites (custom palette + custom pixel shapes).
 *
 * Keys match existing expectations:
 * small_*, big_*, fire_* with _right/_left variants.
 */

// Small (16x16)
const smallColors: ColorMap = {
  H: '#2AA9E0', // hat (teal)
  T: '#E06020', // shirt (orange)
  O: '#2430A8', // overalls (navy)
  S: '#F2B48A', // skin
  D: '#5A3A20', // hair / boots (dark brown)
};

// Big (16x32)
const bigColors: ColorMap = {
  H: '#2AA9E0',
  T: '#E06020',
  O: '#2430A8',
  S: '#F2B48A',
  D: '#5A3A20',
};

// Fire variant (same shapes as big; palette swap)
const fireColors: ColorMap = {
  H: '#FFFFFF', // hat
  T: '#FFFFFF', // shirt
  O: '#E02020', // overalls
  S: '#F2B48A',
  D: '#5A3A20',
};

export function createPlumberLikeSprites(): Map<string, HTMLCanvasElement> {
  const sprites = new Map<string, HTMLCanvasElement>();

  // ====== SMALL (16x16) ======
  const smallStandPixels = [
    "................",
    "................",
    "................",
    ".....HHHHH......",
    "....HHHHHHH.....",
    "...DDSSSD.......",
    "..DSDSSSSS......",
    "..DSDDSSSSS.....",
    "..DDSSSSDDDD....",
    "....SSSSSSSS....",
    "...TTTSTTT......",
    "..TTTTTTTTT.....",
    "..OOOTTOOOO.....",
    "..OO..OO..O.....",
    "...DD....DD.....",
    "................",
  ];
  const smallWalk1Pixels = [
    "................",
    "................",
    "................",
    ".....HHHHH......",
    "....HHHHHHH.....",
    "...DDSSSD.......",
    "..DSDSSSSS......",
    "..DSDDSSSSS.....",
    "..DDSSSSDDDD....",
    "....SSSSSSSS....",
    "...TTTTTTT......",
    "..TTTTTDDTT.....",
    "..OOOTDDOOO.....",
    ".OOO..OO........",
    "..DD..OO........",
    "......DD........",
  ];
  const smallWalk2Pixels = [
    "................",
    "................",
    "................",
    ".....HHHHH......",
    "....HHHHHHH.....",
    "...DDSSSD.......",
    "..DSDSSSSS......",
    "..DSDDSSSSS.....",
    "..DDSSSSDDDD....",
    "...TTTSTTTT.....",
    "..TTTTTTTTTT....",
    "..OOOTTTTOOO....",
    "..OOOTTTTOOO....",
    "...OO....OO.....",
    "...DD....DD.....",
    "................",
  ];
  const smallWalk3Pixels = [
    "................",
    "................",
    "................",
    ".....HHHHH......",
    "....HHHHHHH.....",
    "...DDSSSD.......",
    "..DSDSSSSS......",
    "..DSDDSSSSS.....",
    "..DDSSSSDDDD....",
    "....SSSSSSSS....",
    "...TTTTTTT......",
    "..TTDDTTTTT.....",
    "..OOODDTOOO.....",
    "........OOO.....",
    "........OO..DD..",
    "........DD......",
  ];
  const smallJumpPixels = [
    "................",
    "......HHHH......",
    ".....HHHHHH.....",
    "...DDSSSD.......",
    "..DSDSSSSS......",
    "..DSDDSSSSS.....",
    "..DDSSSSDDDD....",
    "...SSSSSSSS.....",
    "..TTTSTTTTT.....",
    ".TTTTTTTTTT.....",
    "..OOOTTTTOOO....",
    "..OOOTTTTOOO....",
    "...OO..OO.......",
    "..DD....DD......",
    "..DD....DD......",
    "................",
  ];

  const smallStand = createSprite(16, 16, smallStandPixels, smallColors);
  const smallWalk1 = createSprite(16, 16, smallWalk1Pixels, smallColors);
  const smallWalk2 = createSprite(16, 16, smallWalk2Pixels, smallColors);
  const smallWalk3 = createSprite(16, 16, smallWalk3Pixels, smallColors);
  const smallJump = createSprite(16, 16, smallJumpPixels, smallColors);

  sprites.set('small_stand_right', smallStand);
  sprites.set('small_stand_left', flipHorizontal(smallStand));

  sprites.set('small_walk1_right', smallWalk1);
  sprites.set('small_walk1_left', flipHorizontal(smallWalk1));

  sprites.set('small_walk2_right', smallWalk2);
  sprites.set('small_walk2_left', flipHorizontal(smallWalk2));

  sprites.set('small_walk3_right', smallWalk3);
  sprites.set('small_walk3_left', flipHorizontal(smallWalk3));

  sprites.set('small_jump_right', smallJump);
  sprites.set('small_jump_left', flipHorizontal(smallJump));

  // Optional placeholders (if your engine expects them)
  sprites.set('small_skid_right', smallWalk2);
  sprites.set('small_skid_left', flipHorizontal(smallWalk2));

  // ====== BIG (16x32) ======
  const bigStandPixels = [
    "......HHHHH.....",
    "....HHHHHHHS....",
    "...HHHHHHSSS....",
    "...HHHHHHHHHHH..",
    "...DDDSSSDSS....",
    "..DSSDS.SDDSSSS.",
    "..DSSDDSSSSSSSS.",
    ".DDSSDDSSSDSSSS.",
    ".DDSSSSSDDDDDD..",
    ".DDDSSSSSDDDDD..",
    "...DDSSSSSSSS...",
    "....TSSSSSD.....",
    "....DTTTTTTD....",
    "...DDTTTTTDD....",
    "..DDDTTTTTDDD...",
    ".DDDDTTTTTDDDD..",
    ".DDDTTOOTTODDD..",
    "DDDDTTOOTTO.DDDD",
    "DDDDOOOTOOOTDDDD",
    "DDDDOOOOOOOO.DDD",
    "SSSSOOOOOOOO.SSS",
    "SSSSOOOOOOOO.SSS",
    ".SSSOOOOOOOOSSS.",
    ".SSOOOOOOOOOOSS.",
    "..OOOOOOOOOOOO..",
    ".OOOOOO..OOOOOO.",
    ".OOOOO....OOOOO.",
    ".OOOOO....OOOOO.",
    "..DDDD....DDDD..",
    "..DDDD....DDDD..",
    "DDDDDD....DDDDDD",
    "DDDDDD....DDDDDD",
  ];
  const bigWalk1Pixels = [
    "......HHHHH.....",
    "....HHHHHHHS....",
    "...HHHHHHSSS....",
    "...HHHHHHHHHHH..",
    "...DDDSSSDSS....",
    "..DSSDS.SDDSSSS.",
    "..DSSDDSSSSSSSS.",
    ".DDSSDDSSSDSSSS.",
    ".DDSSSSSDDDDDD..",
    ".DDDSSSSSDDDDD..",
    "...DDSSSSSSSS...",
    "....TSSSSSD.....",
    "....DTTTTTTDD...",
    "...DDTTTTTDD....",
    "..DDDTTTTTDDD...",
    ".DDDDTTTTTDDDD..",
    ".DDDTTOOTTODDD..",
    "DDDDTTOOTTO.DDDD",
    "DDDDOOOTOOOTDDDD",
    "DDDDOOOOOOOO.DDD",
    "SSSSOOOOOOOO.SSS",
    "SSSSOOOOOOOO.SSS",
    ".SSSOOOOOOOOSSS.",
    ".SSOOOOOOOOOOSS.",
    "..OOOOOOOOOOOO..",
    ".OOOOO..OOOOOO..",
    ".OOOO....OOOOO..",
    ".OOOOO....OOOO..",
    "..DDDD...DDDD...",
    "..DDDD..DDDD....",
    "DDDDDD..DDDDDD..",
    "DDDDDD....DDDDDD",
  ];
  const bigWalk2Pixels = [
    "......HHHHH.....",
    "....HHHHHHHS....",
    "...HHHHHHSSS....",
    "...HHHHHHHHHHH..",
    "...DDDSSSDSS....",
    "..DSSDS.SDDSSSS.",
    "..DSSDDSSSSSSSS.",
    ".DDSSDDSSSDSSSS.",
    ".DDSSSSSDDDDDD..",
    ".DDDSSSSSDDDDD..",
    "...DDSSSSSSSS...",
    "....TSSSSSD.....",
    "....DTTTTTTD....",
    "...DDTTTTTDD....",
    "..DDDTTTTTDDD...",
    ".DDDDTTTTTDDDD..",
    ".DDDTTOOTTODDD..",
    "DDDDTTOOTTO.DDDD",
    "DDDDOOOTOOOTDDDD",
    "DDDDOOOOOOOO.DDD",
    "SSSSOOOOOOOO.SSS",
    "SSSSOOOOOOOO.SSS",
    ".SSSOOOOOOOOSSS.",
    ".SSOOOOOOOOOOSS.",
    "..OOOOOOOOOOOO..",
    ".OOOOOO..OOOOOO.",
    ".OOOOO....OOOOO.",
    ".OOOOO....OOOOO.",
    "..DDDD....DDDD..",
    "..DDDD....DDDD..",
    "DDDDDD....DDDDDD",
    "DDDDDD....DDDDDD",
  ];
  const bigWalk3Pixels = [
    "......HHHHH.....",
    "....HHHHHHHS....",
    "...HHHHHHSSS....",
    "...HHHHHHHHHHH..",
    "...DDDSSSDSS....",
    "..DSSDS.SDDSSSS.",
    "..DSSDDSSSSSSSS.",
    ".DDSSDDSSSDSSSS.",
    ".DDSSSSSDDDDDD..",
    ".DDDSSSSSDDDDD..",
    "...DDSSSSSSSS...",
    "....TSSSSSD.....",
    "...DDTTTTTTD....",
    "....DDTTTTTDD...",
    "..DDDTTTTTDDD...",
    ".DDDDTTTTTDDDD..",
    ".DDDTTOOTTODDD..",
    "DDDD.TTOOTTO.DDD",
    "DDDDOOOTOOOTDDDD",
    "DDDDOOOOOOOO.DDD",
    "SSSSOOOOOOOO.SSS",
    "SSSSOOOOOOOO.SSS",
    ".SSSOOOOOOOOSSS.",
    ".SSOOOOOOOOOOSS.",
    "..OOOOOOOOOOOO..",
    ".OOOOOO..OOOOOO.",
    ".OOOOO....OOOO..",
    "..OOOO....OOOOO.",
    "...DDDD...DDDD..",
    "....DDDD..DDDD..",
    "..DDDDDD..DDDDDD",
    "DDDDDD....DDDDDD",
  ];
  const bigJumpPixels = [
    "......HHHHH.....",
    "....HHHHHHHS....",
    "...HHHHHHSSS....",
    "...HHHHHHHHHHH..",
    "...DDDSSSDSS....",
    "..DSSDS.SDDSSSS.",
    "..DSSDDSSSSSSSS.",
    ".DDSSDDSSSDSSSS.",
    ".DDSSSSSDDDDDD..",
    ".DDDSSSSSDDDDD..",
    "...DDSSSSSSSS...",
    "...TTSSSSSD.....",
    "..DTTTTTTTTD....",
    ".DDTTTTTTTTDD...",
    "..DDDTTTTTDDD...",
    ".DDDDTTTTTDDDD..",
    ".DDDTTOOTTODDD..",
    "DDDDTTOOTTO.DDDD",
    "DDDDOOOTOOOTDDDD",
    "DDDDOOOOOOOO.DDD",
    "SSSSOOOOOOOO.SSS",
    "SSSSOOOOOOOO.SSS",
    ".SSSOOOOOOOOSSS.",
    ".SSOOOOOOOOOOSS.",
    "..OOOOOOOOOOOO..",
    ".OOOOOO..OOOOOO.",
    "..OOOO....OOOO..",
    "...OOOO..OOOO...",
    "....DDDDDDDD....",
    "....DDDDDDDD....",
    "................",
    "................",
  ];

  const bigStand = createSprite(16, 32, bigStandPixels, bigColors);
  const bigWalk1 = createSprite(16, 32, bigWalk1Pixels, bigColors);
  const bigWalk2 = createSprite(16, 32, bigWalk2Pixels, bigColors);
  const bigWalk3 = createSprite(16, 32, bigWalk3Pixels, bigColors);
  const bigJump = createSprite(16, 32, bigJumpPixels, bigColors);

  sprites.set('big_stand_right', bigStand);
  sprites.set('big_stand_left', flipHorizontal(bigStand));

  sprites.set('big_walk1_right', bigWalk1);
  sprites.set('big_walk1_left', flipHorizontal(bigWalk1));

  sprites.set('big_walk2_right', bigWalk2);
  sprites.set('big_walk2_left', flipHorizontal(bigWalk2));

  sprites.set('big_walk3_right', bigWalk3);
  sprites.set('big_walk3_left', flipHorizontal(bigWalk3));

  sprites.set('big_jump_right', bigJump);
  sprites.set('big_jump_left', flipHorizontal(bigJump));

  // Placeholders
  sprites.set('big_skid_right', bigWalk2);
  sprites.set('big_skid_left', flipHorizontal(bigWalk2));
  sprites.set('big_crouch_right', bigWalk2);
  sprites.set('big_crouch_left', flipHorizontal(bigWalk2));

  // ====== FIRE (same shapes as BIG) ======
  const fireStand = createSprite(16, 32, bigStandPixels, fireColors);
  const fireWalk1 = createSprite(16, 32, bigWalk1Pixels, fireColors);
  const fireWalk2 = createSprite(16, 32, bigWalk2Pixels, fireColors);
  const fireWalk3 = createSprite(16, 32, bigWalk3Pixels, fireColors);
  const fireJump = createSprite(16, 32, bigJumpPixels, fireColors);

  sprites.set('fire_stand_right', fireStand);
  sprites.set('fire_stand_left', flipHorizontal(fireStand));

  sprites.set('fire_walk1_right', fireWalk1);
  sprites.set('fire_walk1_left', flipHorizontal(fireWalk1));

  sprites.set('fire_walk2_right', fireWalk2);
  sprites.set('fire_walk2_left', flipHorizontal(fireWalk2));

  sprites.set('fire_walk3_right', fireWalk3);
  sprites.set('fire_walk3_left', flipHorizontal(fireWalk3));

  sprites.set('fire_jump_right', fireJump);
  sprites.set('fire_jump_left', flipHorizontal(fireJump));

  sprites.set('fire_skid_right', fireWalk2);
  sprites.set('fire_skid_left', flipHorizontal(fireWalk2));
  sprites.set('fire_crouch_right', fireWalk2);
  sprites.set('fire_crouch_left', flipHorizontal(fireWalk2));

  return sprites;
}
