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

  // ====== BIG MARIO (16x32) - properly proportioned ======

  // Common upper body for standing/walking poses (rows 0-20)
  // Hat starts at row 3 (not 4) and body extends to row 20 for better proportions
  const bigUpperBody = [
    '................', // 0
    '................', // 1
    '................', // 2
    '......RRRRR.....', // 3  hat
    '.....RRRRRRRRR..', // 4  hat brim
    '.....BBBSSBS....', // 5  hair
    '....BSBSSSBS.S..', // 6  eyes
    '....BSBBSSSBSSS.', // 7  nose
    '....BBSSSSBBBB..', // 8  face
    '......SSSSSSSS..', // 9  chin
    '....RRRRSRRR....', // 10 shirt
    '...RRRRRRSRRRRR.', // 11 shirt+arms
    '..SSRRRRSRRRSSS.', // 12 hands
    '..SSSRRRRRRRSSS.', // 13 body
    '..SS.RRRRRR.SS..', // 14 belt
    '.....RRRRRR.....', // 15 overalls
    '....RRRRRRRR....', // 16 overalls
    '...RRRRRRRRRR...', // 17 overalls
    '...RRRRRRRRRR...', // 18 overalls
    '...RRRRRRRRRR...', // 19 overalls lower
    '...RRRRRRRRRR...', // 20 overalls bottom
  ];

  const bigStand = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRR..RRRR...', // 21 leg split
    '...RRR....RRR...', // 22 upper legs
    '...RRR....RRR...', // 23 legs
    '...RRR....RRR...', // 24 legs
    '....RR....RR....', // 25 shins
    '....RR....RR....', // 26 shins
    '....RR....RR....', // 27 shins
    '....RR....RR....', // 28 ankles
    '...BBB...BBB....', // 29 shoes
    '..BBBB...BBBB...', // 30 shoes
    '..BBB.....BBB...', // 31 shoes
  ], bmColors);
  sprites.set('big_stand_right', bigStand);
  sprites.set('big_stand_left', flipHorizontal(bigStand));

  const bigWalk1 = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRR..RRRR...', // 21 leg split
    '..RRRR....RRRR..', // 22 wide stride
    '..RRR......RRR..', // 23
    '..RRR......RRR..', // 24
    '..RRR......RRR..', // 25
    '...RR......RR...', // 26
    '...RR......RR...', // 27
    '...RR......RR...', // 28
    '..BBB.....BBB...', // 29 shoes
    '.BBBB.....BBBB..', // 30 shoes
    '.BBB.......BBB..', // 31 shoes
  ], bmColors);
  sprites.set('big_walk1_right', bigWalk1);
  sprites.set('big_walk1_left', flipHorizontal(bigWalk1));

  const bigWalk2 = createSprite(16, 32, [
    ...bigUpperBody,
    '...RRRRRRRRRR...', // 21
    '....RRRRRRRR....', // 22 narrowing
    '.....RRRRRR.....', // 23
    '.....RR..RR.....', // 24 legs together
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
    '...RRRR..RRRR...', // 21
    '..RRRR...RRRR...', // 22 offset stride
    '..RRR.....RRR...', // 23
    '..RRR.....RRR...', // 24
    '..RRR.....RRR...', // 25
    '..RR.......RR...', // 26
    '..RR.......RR...', // 27
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
    '......RRRRR.....', // 3  hat
    '.....RRRRRRRRR..', // 4  hat brim
    '.....BBBSSBS....', // 5  hair
    '....BSBSSSBS.S..', // 6  eyes
    '....BSBBSSSBSSS.', // 7  nose
    '....BBSSSSBBBB..', // 8  face
    '....SSRRSSSRRR..', // 9  arm up
    '...RRRSRRRRRRBB.', // 10
    '..RRRRSSSRRRRSB.', // 11
    '..RRRSSSSSSRRBB.', // 12
    '..RR.SSSSS..B...', // 13
    '.......RRRR.....', // 14
    '.....RRRRRR.....', // 15
    '....RRRRRRRR....', // 16
    '...RRRRRRRRRR...', // 17
    '...RRRRRRRRRR...', // 18
    '...RRRRRRRRRR...', // 19
    '...RRRRRRRRRR...', // 20
    '...RRRR..RRRR...', // 21 leg split
    '..RRRR....RRRR..', // 22
    '..RRR......RRR..', // 23
    '..RRR......RRR..', // 24
    '..RRR......RRR..', // 25
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
    '......RRRRR.....', // 3  hat
    '.....RRRRRRRRR..', // 4  hat brim
    '.....BBBSSBS....', // 5  hair
    '....BSBSSSBS.S..', // 6  eyes
    '....BSBBSSSBSSS.', // 7  nose
    '....BBSSSSBBBB..', // 8  face
    '......SSSSSSSS..', // 9  chin
    '....RRSRRRRR....', // 10 leaning
    '..RRRRSBBRRRRR..', // 11
    '..RRRBBBBRRRSSS.', // 12
    '..SS.BBBB.RRSSS.', // 13
    '.....RRRRRR.SS..', // 14
    '.....RRRRRR.....', // 15
    '....RRRRRRRR....', // 16
    '...RRRRRRRRRR...', // 17
    '...RRRRRRRRRR...', // 18
    '...RRRRRRRRRR...', // 19
    '...RRRRRRRRRR...', // 20
    '...RRRR..RRRR...', // 21 leg split
    '..RRRR....RRRR..', // 22
    '..RRR......RRR..', // 23
    '..RRR......RRR..', // 24
    '..RRR......RRR..', // 25
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
  function toFire(pixels: string[], firstBodyRow = 5): string[] {
    return pixels.map((row, i) => i < firstBodyRow ? row : row.replace(/R/g, 'F'));
  }

  // Common fire upper body (converted from bigUpperBody)
  const fireUpperBody = toFire(bigUpperBody);

  const fireStand = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFF..FFFF...', // 21 leg split
    '...FFF....FFF...', // 22 upper legs
    '...FFF....FFF...', // 23 legs
    '...FFF....FFF...', // 24 legs
    '....FF....FF....', // 25 shins
    '....FF....FF....', // 26 shins
    '....FF....FF....', // 27 shins
    '....FF....FF....', // 28 ankles
    '...BBB...BBB....', // 29 shoes
    '..BBBB...BBBB...', // 30 shoes
    '..BBB.....BBB...', // 31 shoes
  ], fmColors);
  sprites.set('fire_stand_right', fireStand);
  sprites.set('fire_stand_left', flipHorizontal(fireStand));

  const fireWalk1 = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFF..FFFF...', // 21 leg split
    '..FFFF....FFFF..', // 22 wide stride
    '..FFF......FFF..', // 23
    '..FFF......FFF..', // 24
    '..FFF......FFF..', // 25
    '...FF......FF...', // 26
    '...FF......FF...', // 27
    '...FF......FF...', // 28
    '..BBB.....BBB...', // 29 shoes
    '.BBBB.....BBBB..', // 30 shoes
    '.BBB.......BBB..', // 31 shoes
  ], fmColors);
  sprites.set('fire_walk1_right', fireWalk1);
  sprites.set('fire_walk1_left', flipHorizontal(fireWalk1));

  const fireWalk2 = createSprite(16, 32, [
    ...fireUpperBody,
    '...FFFFFFFFFF...', // 21
    '....FFFFFFFF....', // 22 narrowing
    '.....FFFFFF.....', // 23
    '.....FF..FF.....', // 24 legs together
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
    '...FFFF..FFFF...', // 21
    '..FFFF...FFFF...', // 22 offset stride
    '..FFF.....FFF...', // 23
    '..FFF.....FFF...', // 24
    '..FFF.....FFF...', // 25
    '..FF.......FF...', // 26
    '..FF.......FF...', // 27
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
    '......RRRRR.....', // 3  hat (R = white)
    '.....RRRRRRRRR..', // 4  hat brim
    '.....BBBSSBS....', // 5  hair
    '....BSBSSSBS.S..', // 6  eyes
    '....BSBBSSSBSSS.', // 7  nose
    '....BBSSSSBBBB..', // 8  face
    '....SSFFSSSFFR..', // 9  arm up (F = fire red)
    '...FFFSFFFFFFBB.', // 10
    '..FFFFSSSFFFFSB.', // 11
    '..FFFSSSSSSFFBB.', // 12
    '..FF.SSSSS..B...', // 13
    '.......FFFF.....', // 14
    '.....FFFFFF.....', // 15
    '....FFFFFFFF....', // 16
    '...FFFFFFFFFF...', // 17
    '...FFFFFFFFFF...', // 18
    '...FFFFFFFFFF...', // 19
    '...FFFFFFFFFF...', // 20
    '...FFFF..FFFF...', // 21 leg split
    '..FFFF....FFFF..', // 22
    '..FFF......FFF..', // 23
    '..FFF......FFF..', // 24
    '..FFF......FFF..', // 25
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
    '......RRRRR.....', // 3  hat (R = white)
    '.....RRRRRRRRR..', // 4  hat brim
    '.....BBBSSBS....', // 5
    '....BSBSSSBS.S..', // 6
    '....BSBBSSSBSSS.', // 7
    '....BBSSSSBBBB..', // 8
    '......SSSSSSSS..', // 9  chin
    '....FFSFFFFF....', // 10 leaning (F = fire red)
    '..FFFFSBBFFFFF..', // 11
    '..FFFBBBBFFFSSS.', // 12
    '..SS.BBBB.FFSSS.', // 13
    '.....FFFFFF.SS..', // 14
    '.....FFFFFF.....', // 15
    '....FFFFFFFF....', // 16
    '...FFFFFFFFFF...', // 17
    '...FFFFFFFFFF...', // 18
    '...FFFFFFFFFF...', // 19
    '...FFFFFFFFFF...', // 20
    '...FFFF..FFFF...', // 21
    '..FFFF....FFFF..', // 22
    '..FFF......FFF..', // 23
    '..FFF......FFF..', // 24
    '..FFF......FFF..', // 25
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
