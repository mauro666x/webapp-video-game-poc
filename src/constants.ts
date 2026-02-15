// NES resolution and scaling
export const SCREEN_WIDTH = 256;
export const SCREEN_HEIGHT = 240;
export const SCALE = 3;
export const TILE_SIZE = 16;
export const FPS = 60;
export const TIMESTEP = 1000 / FPS;

// Physics (pixels per frame at 60fps)
export const GRAVITY = 0.7;
export const MAX_FALL_SPEED = 8;
export const PLAYER_WALK_ACCEL = 0.15;
export const PLAYER_RUN_ACCEL = 0.2;
export const PLAYER_WALK_MAX = 1.9;
export const PLAYER_RUN_MAX = 3.5;
export const PLAYER_FRICTION = 0.15;
export const PLAYER_SKID_FRICTION = 0.3;
export const PLAYER_JUMP_VELOCITY = -8.0;
export const PLAYER_JUMP_GRAVITY_MULT = 0.5; // While holding jump
export const PLAYER_BIG_JUMP_VELOCITY = -8.5;

// Enemy speeds
export const GOOMBA_SPEED = 0.5;
export const KOOPA_SPEED = 0.5;
export const SHELL_SPEED = 5;

// Item speeds
export const MUSHROOM_SPEED = 1.5;
export const FIREBALL_SPEED = 4;
export const FIREBALL_BOUNCE_VY = -5;
export const STARMAN_SPEED = 2;
export const STARMAN_BOUNCE_VY = -6;

// Timing
export const LEVEL_TIME = 400;
export const DEATH_ANIM_DURATION = 3000; // ms
export const STAR_DURATION = 10000; // ms
export const INVULN_DURATION = 2000; // ms
export const GROW_ANIM_DURATION = 1000; // ms

// Camera
export const CAMERA_OFFSET_X = 80; // Mario's horizontal position on screen

// Colors
export const SKY_COLOR = '#6B8CFF';
export const GROUND_COLOR = '#C84C0C';
export const BRICK_COLOR = '#C84C0C';
export const QUESTION_BLOCK_COLOR = '#E7A210';
export const PIPE_GREEN = '#00A800';
export const PIPE_GREEN_DARK = '#005800';

// Tile types
export enum TileType {
  EMPTY = 0,
  GROUND = 1,
  BRICK = 2,
  QUESTION = 3,
  USED_BLOCK = 4,
  HARD_BLOCK = 5,
  PIPE_TOP_LEFT = 6,
  PIPE_TOP_RIGHT = 7,
  PIPE_BODY_LEFT = 8,
  PIPE_BODY_RIGHT = 9,
  FLAGPOLE = 10,
  FLAGPOLE_TOP = 11,
  CASTLE_BLOCK = 12,
  INVISIBLE_BARRIER = 13,
  COIN_BRICK = 14, // Brick that contains coins
  QUESTION_MUSHROOM = 15, // ? block with mushroom/fire flower
  QUESTION_STAR = 16, // ? block with star
  QUESTION_1UP = 17, // Hidden 1-UP
}

// Entity direction
export enum Direction {
  LEFT = -1,
  RIGHT = 1,
}

// Mario power states
export enum PowerState {
  SMALL = 0,
  BIG = 1,
  FIRE = 2,
}

// Game events
export const Events = {
  COIN_COLLECTED: 'coin_collected',
  BLOCK_HIT: 'block_hit',
  ENEMY_STOMPED: 'enemy_stomped',
  ENEMY_KILLED: 'enemy_killed',
  POWER_UP: 'power_up',
  PLAYER_DAMAGE: 'player_damage',
  PLAYER_DEATH: 'player_death',
  FIREBALL_THROWN: 'fireball_thrown',
  JUMP: 'jump',
  STOMP: 'stomp',
  BUMP: 'bump',
  BREAK_BLOCK: 'break_block',
  ITEM_APPEAR: 'item_appear',
  ONE_UP: '1up',
  FLAG_REACHED: 'flag_reached',
  PIPE_ENTER: 'pipe_enter',
  GAME_OVER: 'game_over',
  TIME_WARNING: 'time_warning',
  KICK: 'kick',
  SCORE_ADDED: 'score_added',
} as const;

// Score values
export const Scores = {
  COIN: 200,
  GOOMBA_STOMP: 100,
  KOOPA_STOMP: 100,
  SHELL_KILL: 200,
  MUSHROOM: 1000,
  FIRE_FLOWER: 1000,
  STARMAN: 1000,
  ONE_UP: 0,
  BRICK_COIN: 200,
  FLAG_BASE: 100,
  FLAG_TOP: 5000,
} as const;
