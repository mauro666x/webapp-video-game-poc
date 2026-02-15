import { createSprite, flipHorizontal } from '../SpriteSheet';

// Small Mario color map
const smColors: Record<string, string> = {
  'R': '#B81010', // red
  'S': '#E44000', // skin/brown
  'B': '#AC7C00', // brown/hair
  'K': '#000000', // black outline
  'W': '#FCB8B8', // skin light
  'G': '#00A800', // green (overalls in original, but use for variety)
};

// Big Mario color map
const bmColors: Record<string, string> = {
  'R': '#B81010',
  'S': '#E44000',
  'B': '#AC7C00',
  'K': '#000000',
  'W': '#FCB8B8',
};

// Fire Mario color map
const fmColors: Record<string, string> = {
  'R': '#FFFFFF', // white hat
  'S': '#E44000', // skin
  'B': '#AC7C00', // brown
  'K': '#000000',
  'W': '#FCB8B8',
  'F': '#B81010', // fire red overalls
};

export function createMarioSprites(): Map<string, HTMLCanvasElement> {
  const sprites = new Map<string, HTMLCanvasElement>();

  // ====== SMALL MARIO (16x16, sprite occupies bottom 16x16) ======

  // Small Mario standing right
  const smallStand = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBSSBS......',
    '..BSBSSSBS S....',
    '..BSBBSSSBSSS...',
    '..BBSSSSBBBB....',
    '....SSSSSSSS....',
    '...RRSRRRS......',
    '..RRRRSRRRRR....',
    '..RRRRSRRRRR....',
    '..RR....RR......',
    '...BBB..BBB.....',
  ], smColors);
  sprites.set('small_stand_right', smallStand);
  sprites.set('small_stand_left', flipHorizontal(smallStand));

  // Small Mario walk frame 1
  const smallWalk1 = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBSSBS......',
    '..BSBSSSBS S....',
    '..BSBBSSSBSSS...',
    '..BBSSSSBBBB....',
    '....SSSSSSSS....',
    '....RRRRBR......',
    '...RRRRBBBR.....',
    '..RR.RBBBBR.....',
    '.......RRBB.....',
    '......BBB.......',
  ], smColors);
  sprites.set('small_walk1_right', smallWalk1);
  sprites.set('small_walk1_left', flipHorizontal(smallWalk1));

  // Small Mario walk frame 2
  const smallWalk2 = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBSSBS......',
    '..BSBSSSBS S....',
    '..BSBBSSSBSSS...',
    '..BBSSSSBBBB....',
    '....RRSRRRS.....',
    '..BRRRRRRRRB....',
    '..BBRRRRRRRBB...',
    '..BB.RRR.RRBB...',
    '......BB.BB.....',
    '......BB.BB.....',
  ], smColors);
  sprites.set('small_walk2_right', smallWalk2);
  sprites.set('small_walk2_left', flipHorizontal(smallWalk2));

  // Small Mario walk frame 3
  const smallWalk3 = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBSSBS......',
    '..BSBSSSBS S....',
    '..BSBBSSSBSSS...',
    '..BBSSSSBBBB....',
    '....SSSSSSSS....',
    '...RRRRSRRR.....',
    '..RRRRRSRRR.....',
    '..RRR..SS.......',
    '........BBB.....',
    '......BBB.......',
  ], smColors);
  sprites.set('small_walk3_right', smallWalk3);
  sprites.set('small_walk3_left', flipHorizontal(smallWalk3));

  // Small Mario jump
  const smallJump = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '......RRRR......',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBSSBS......',
    '..BSBSSSBS S....',
    '..BSBBSSSBSSS...',
    '..BBSSSSBBBB....',
    '...RSSRRSS......',
    '..RRRSRRRRRB....',
    '..RRRSSRRRRBB...',
    '..RRSSSSS.BB....',
    '......BBRR......',
    '....BBB.BBB.....',
  ], smColors);
  sprites.set('small_jump_right', smallJump);
  sprites.set('small_jump_left', flipHorizontal(smallJump));

  // Small Mario skid
  const smallSkid = createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBSSBS......',
    '..BSBSSSBS S....',
    '..BSBBSSSBSSS...',
    '..BBSSSSBBBB....',
    '....RSSRRRS.....',
    '..RRRRSBBRRR....',
    '..RRRBBBBRRR....',
    '.....BBBB.RR....',
    '....BBB.........',
    '.......BBB......',
  ], smColors);
  sprites.set('small_skid_right', smallSkid);
  sprites.set('small_skid_left', flipHorizontal(smallSkid));

  // Small Mario death
  sprites.set('small_death', createSprite(16, 16, [
    '................',
    '................',
    '................',
    '................',
    '....RRRRR.......',
    '...RRRRRRRRR....',
    '...BBBWWBW......',
    '..BWBWWWBWSW....',
    '..BWBBWWWBWWW...',
    '..BBWWWWBBBB....',
    '....WWWWWWWW....',
    '...RRSRRRS......',
    '..RRRRSRRRRR....',
    '..RR..SS..RR....',
    '.BB..RRRR..BB...',
    '.BBB.RRRR.BBB...',
  ], smColors));

  // ====== BIG MARIO (16x32) - properly proportioned with feet at canvas bottom ======

  // Common upper body for standing/walking poses (rows 0-17)
  const bigUpperBody = [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '......RRRRR.....', // 4 hat
    '.....RRRRRRRRR..', // 5 hat
    '.....BBBSSBS....', // 6 face
    '....BSBSSSBS.S..', // 7
    '....BSBBSSSBSSS.', // 8
    '....BBSSSSBBBB..', // 9
    '......SSSSSSSS..', // 10 chin
    '....RRRRSRRR....', // 11 shirt
    '...RRRRRRSRRRRR.', // 12 shirt+arms
    '..SSRRRRSRRRSSS.', // 13
    '..SSSRRRRRRRSSS.', // 14
    '..SS.RRRRRR.SS..', // 15 belt
    '.....RRRRRR.....', // 16 overalls
    '....RRRRRRRR....', // 17 overalls
  ];

  const bigStand = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRRRRRRRR...', // 18 thighs
    '...RRRR..RRRR...', // 19 leg split
    '...RRR....RRR...', // 20
    '...RRR....RRR...', // 21
    '...RRR....RRR...', // 22
    '....RR....RR....', // 23
    '....RR....RR....', // 24
    '....RR....RR....', // 25
    '....RR....RR....', // 26
    '....RR....RR....', // 27
    '....RR....RR....', // 28
    '...BBB...BBB....', // 29 shoes
    '..BBBB...BBBB...', // 30
    '..BBB.....BBB...', // 31
  ], bmColors);
  sprites.set('big_stand_right', bigStand);
  sprites.set('big_stand_left', flipHorizontal(bigStand));

  const bigWalk1 = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRRRRRRRR...', // 18
    '...RRRR..RRRR...', // 19
    '..RRRR....RRRR..', // 20 wide stride
    '..RRR......RRR..', // 21
    '..RRR......RRR..', // 22
    '..RRR......RRR..', // 23
    '...RR......RR...', // 24
    '...RR......RR...', // 25
    '...RR......RR...', // 26
    '...RR......RR...', // 27
    '...RR......RR...', // 28
    '..BBB.....BBB...', // 29
    '.BBBB.....BBBB..', // 30
    '.BBB.......BBB..', // 31
  ], bmColors);
  sprites.set('big_walk1_right', bigWalk1);
  sprites.set('big_walk1_left', flipHorizontal(bigWalk1));

  const bigWalk2 = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRRRRRRRR...', // 18
    '....RRRRRRRR....', // 19 narrowing
    '.....RRRRRR.....', // 20
    '.....RRRRRR.....', // 21
    '.....RR..RR.....', // 22 legs together
    '.....RR..RR.....', // 23
    '.....RR..RR.....', // 24
    '.....RR..RR.....', // 25
    '.....RR..RR.....', // 26
    '.....RR..RR.....', // 27
    '.....RR..RR.....', // 28
    '....BBB..BBB....', // 29
    '...BBBB..BBBB...', // 30
    '...BBB....BBB...', // 31
  ], bmColors);
  sprites.set('big_walk2_right', bigWalk2);
  sprites.set('big_walk2_left', flipHorizontal(bigWalk2));

  const bigWalk3 = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRRRRRRRR...', // 18
    '...RRRR..RRRR...', // 19
    '..RRRR...RRRR...', // 20 offset stride
    '..RRR.....RRR...', // 21
    '..RRR.....RRR...', // 22
    '..RRR.....RRR...', // 23
    '..RR.......RR...', // 24
    '..RR.......RR...', // 25
    '..RR......RR....', // 26
    '..RR......RR....', // 27
    '..RR......RR....', // 28
    '.BBB.....BBB....', // 29
    'BBBB....BBBB....', // 30
    'BBB......BBB....', // 31
  ], bmColors);
  sprites.set('big_walk3_right', bigWalk3);
  sprites.set('big_walk3_left', flipHorizontal(bigWalk3));

  const bigJump = createSprite(16, 32, [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '......RRRRR.....', // 4 hat
    '.....RRRRRRRRR..', // 5 hat
    '.....BBBSSBS....', // 6 face
    '....BSBSSSBS.S..', // 7
    '....BSBBSSSBSSS.', // 8
    '....BBSSSSBBBB..', // 9
    '....SSRRSSSRRR..', // 10 arm up
    '...RRRSRRRRRRBB.', // 11
    '..RRRRSSSRRRRSB.', // 12
    '..RRRSSSSSSRRBB.', // 13
    '..RR.SSSSS..B...', // 14
    '.......RRRR.....', // 15
    '....RRRRRRRR....', // 16
    '...RRRRRRRRRR...', // 17
    '...RRRR..RRRR...', // 18
    '..RRRR....RRRR..', // 19
    '..RRR......RRR..', // 20
    '..RRR......RRR..', // 21
    '..RRR......RRR..', // 22
    '...RR......RR...', // 23
    '...RR......RR...', // 24
    '...RR......RR...', // 25
    '...RR......RR...', // 26
    '...RR......RR...', // 27
    '...RR......RR...', // 28
    '..BBB.....BBB...', // 29
    '.BBBB.....BBBB..', // 30
    '.BBB.......BBB..', // 31
  ], bmColors);
  sprites.set('big_jump_right', bigJump);
  sprites.set('big_jump_left', flipHorizontal(bigJump));

  const bigSkid = createSprite(16, 32, [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '......RRRRR.....', // 4 hat
    '.....RRRRRRRRR..', // 5 hat
    '.....BBBSSBS....', // 6 face
    '....BSBSSSBS.S..', // 7
    '....BSBBSSSBSSS.', // 8
    '....BBSSSSBBBB..', // 9
    '......SSSSSSSS..', // 10 chin
    '....RRSRRRRR....', // 11 leaning
    '..RRRRSBBRRRRR..', // 12
    '..RRRBBBBRRRSSS.', // 13
    '..SS.BBBB.RRSSS.', // 14
    '.....RRRRRR.SS..', // 15
    '.....RRRRRR.....', // 16
    '....RRRRRRRR....', // 17
    '...RRRRRRRRRR...', // 18
    '...RRRR..RRRR...', // 19
    '..RRRR....RRRR..', // 20
    '..RRR......RRR..', // 21
    '..RRR......RRR..', // 22
    '..RRR......RRR..', // 23
    '...RR......RR...', // 24
    '...RR......RR...', // 25
    '...RR......RR...', // 26
    '...RR......RR...', // 27
    '...RR......RR...', // 28
    '..BBB.....BBB...', // 29
    '.BBBB.....BBBB..', // 30
    '.BBB.......BBB..', // 31
  ], bmColors);
  sprites.set('big_skid_right', bigSkid);
  sprites.set('big_skid_left', flipHorizontal(bigSkid));

  // Big Mario crouch
  const bigCrouch = createSprite(16, 32, [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '................', // 4
    '................', // 5
    '................', // 6
    '................', // 7
    '................', // 8
    '................', // 9
    '................', // 10
    '................', // 11
    '................', // 12
    '................', // 13
    '......RRRRR.....', // 14 hat
    '.....RRRRRRRRR..', // 15 hat
    '.....BBBSSBS....', // 16 face
    '....BSBSSSBS.S..', // 17
    '....BSBBSSSBSSS.', // 18
    '....BBSSSSBBBB..', // 19
    '......SSSSSSSS..', // 20 chin
    '....RRRRSRRRRR..', // 21 compressed body
    '..RRRRRRSRRRRRR.', // 22
    '..SSRRRRSRRRSSS.', // 23
    '..SSSRRRRRRRSSS.', // 24
    '..SS.RRRRRR.SS..', // 25
    '.....RRRRRR.....', // 26
    '...RRRRRRRRRR...', // 27
    '...RRRRRRRRRR...', // 28
    '..BBBBB..BBBBB..', // 29 shoes
    '..BBBB....BBBB..', // 30
    '..BBB......BBB..', // 31
  ], bmColors);
  sprites.set('big_crouch_right', bigCrouch);
  sprites.set('big_crouch_left', flipHorizontal(bigCrouch));

  // ====== FIRE MARIO (same poses as big, R->F in body/legs for fire colors) ======
  // Helper: convert big Mario pixel art to fire Mario by swapping R->F below hat rows
  function toFire(pixels: string[], firstBodyRow = 6): string[] {
    return pixels.map((row, i) => i < firstBodyRow ? row : row.replace(/R/g, 'F'));
  }

  // Common fire upper body (converted from bigUpperBody)
  const fireUpperBody = toFire(bigUpperBody);

  const fireStand = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFFFFFFFF...', // 18
    '...FFFF..FFFF...', // 19
    '...FFF....FFF...', // 20
    '...FFF....FFF...', // 21
    '...FFF....FFF...', // 22
    '....FF....FF....', // 23
    '....FF....FF....', // 24
    '....FF....FF....', // 25
    '....FF....FF....', // 26
    '....FF....FF....', // 27
    '....FF....FF....', // 28
    '...BBB...BBB....', // 29
    '..BBBB...BBBB...', // 30
    '..BBB.....BBB...', // 31
  ], fmColors);
  sprites.set('fire_stand_right', fireStand);
  sprites.set('fire_stand_left', flipHorizontal(fireStand));

  const fireWalk1 = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFFFFFFFF...', // 18
    '...FFFF..FFFF...', // 19
    '..FFFF....FFFF..', // 20
    '..FFF......FFF..', // 21
    '..FFF......FFF..', // 22
    '..FFF......FFF..', // 23
    '...FF......FF...', // 24
    '...FF......FF...', // 25
    '...FF......FF...', // 26
    '...FF......FF...', // 27
    '...FF......FF...', // 28
    '..BBB.....BBB...', // 29
    '.BBBB.....BBBB..', // 30
    '.BBB.......BBB..', // 31
  ], fmColors);
  sprites.set('fire_walk1_right', fireWalk1);
  sprites.set('fire_walk1_left', flipHorizontal(fireWalk1));

  const fireWalk2 = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFFFFFFFF...', // 18
    '....FFFFFFFF....', // 19
    '.....FFFFFF.....', // 20
    '.....FFFFFF.....', // 21
    '.....FF..FF.....', // 22
    '.....FF..FF.....', // 23
    '.....FF..FF.....', // 24
    '.....FF..FF.....', // 25
    '.....FF..FF.....', // 26
    '.....FF..FF.....', // 27
    '.....FF..FF.....', // 28
    '....BBB..BBB....', // 29
    '...BBBB..BBBB...', // 30
    '...BBB....BBB...', // 31
  ], fmColors);
  sprites.set('fire_walk2_right', fireWalk2);
  sprites.set('fire_walk2_left', flipHorizontal(fireWalk2));

  const fireWalk3 = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFFFFFFFF...', // 18
    '...FFFF..FFFF...', // 19
    '..FFFF...FFFF...', // 20
    '..FFF.....FFF...', // 21
    '..FFF.....FFF...', // 22
    '..FFF.....FFF...', // 23
    '..FF.......FF...', // 24
    '..FF.......FF...', // 25
    '..FF......FF....', // 26
    '..FF......FF....', // 27
    '..FF......FF....', // 28
    '.BBB.....BBB....', // 29
    'BBBB....BBBB....', // 30
    'BBB......BBB....', // 31
  ], fmColors);
  sprites.set('fire_walk3_right', fireWalk3);
  sprites.set('fire_walk3_left', flipHorizontal(fireWalk3));

  const fireJump = createSprite(16, 32, [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '......RRRRR.....', // 4 hat (R = white)
    '.....RRRRRRRRR..', // 5 hat
    '.....BBBSSBS....', // 6 face
    '....BSBSSSBS.S..', // 7
    '....BSBBSSSBSSS.', // 8
    '....BBSSSSBBBB..', // 9
    '....SSFFSSSFFR..', // 10 arm up (F = fire red)
    '...FFFSFFFFFFBB.', // 11
    '..FFFFSSSFFFFSB.', // 12
    '..FFFSSSSSSFFBB.', // 13
    '..FF.SSSSS..B...', // 14
    '.......FFFF.....', // 15
    '....FFFFFFFF....', // 16
    '...FFFFFFFFFF...', // 17
    '...FFFF..FFFF...', // 18
    '..FFFF....FFFF..', // 19
    '..FFF......FFF..', // 20
    '..FFF......FFF..', // 21
    '..FFF......FFF..', // 22
    '...FF......FF...', // 23
    '...FF......FF...', // 24
    '...FF......FF...', // 25
    '...FF......FF...', // 26
    '...FF......FF...', // 27
    '...FF......FF...', // 28
    '..BBB.....BBB...', // 29
    '.BBBB.....BBBB..', // 30
    '.BBB.......BBB..', // 31
  ], fmColors);
  sprites.set('fire_jump_right', fireJump);
  sprites.set('fire_jump_left', flipHorizontal(fireJump));

  const fireSkid = createSprite(16, 32, [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '......RRRRR.....', // 4 hat
    '.....RRRRRRRRR..', // 5 hat
    '.....BBBSSBS....', // 6
    '....BSBSSSBS.S..', // 7
    '....BSBBSSSBSSS.', // 8
    '....BBSSSSBBBB..', // 9
    '......SSSSSSSS..', // 10
    '....FFSFFFFF....', // 11 leaning
    '..FFFFSBBFFFFF..', // 12
    '..FFFBBBBFFFSSS.', // 13
    '..SS.BBBB.FFSSS.', // 14
    '.....FFFFFF.SS..', // 15
    '.....FFFFFF.....', // 16
    '....FFFFFFFF....', // 17
    '...FFFFFFFFFF...', // 18
    '...FFFF..FFFF...', // 19
    '..FFFF....FFFF..', // 20
    '..FFF......FFF..', // 21
    '..FFF......FFF..', // 22
    '..FFF......FFF..', // 23
    '...FF......FF...', // 24
    '...FF......FF...', // 25
    '...FF......FF...', // 26
    '...FF......FF...', // 27
    '...FF......FF...', // 28
    '..BBB.....BBB...', // 29
    '.BBBB.....BBBB..', // 30
    '.BBB.......BBB..', // 31
  ], fmColors);
  sprites.set('fire_skid_right', fireSkid);
  sprites.set('fire_skid_left', flipHorizontal(fireSkid));

  const fireCrouch = createSprite(16, 32, [
    '................', // 0
    '................', // 1
    '................', // 2
    '................', // 3
    '................', // 4
    '................', // 5
    '................', // 6
    '................', // 7
    '................', // 8
    '................', // 9
    '................', // 10
    '................', // 11
    '................', // 12
    '................', // 13
    '......RRRRR.....', // 14 hat
    '.....RRRRRRRRR..', // 15 hat
    '.....BBBSSBS....', // 16
    '....BSBSSSBS.S..', // 17
    '....BSBBSSSBSSS.', // 18
    '....BBSSSSBBBB..', // 19
    '......SSSSSSSS..', // 20
    '....FFFFSFFFFF..', // 21 compressed body
    '..FFFFFFFSFFFFFF', // 22
    '..SSFFFFSFFFSSS.', // 23
    '..SSSFFFFFFFSSS.', // 24
    '..SS.FFFFFF.SS..', // 25
    '.....FFFFFF.....', // 26
    '...FFFFFFFFFF...', // 27
    '...FFFFFFFFFF...', // 28
    '..BBBBB..BBBBB..', // 29
    '..BBBB....BBBB..', // 30
    '..BBB......BBB..', // 31
  ], fmColors);
  sprites.set('fire_crouch_right', fireCrouch);
  sprites.set('fire_crouch_left', flipHorizontal(fireCrouch));

  return sprites;
}
