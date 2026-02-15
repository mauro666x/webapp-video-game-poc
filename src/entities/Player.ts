import { Entity } from './Entity';
import {
  TILE_SIZE,
  PLAYER_WALK_ACCEL,
  PLAYER_RUN_ACCEL,
  PLAYER_WALK_MAX,
  PLAYER_RUN_MAX,
  PLAYER_FRICTION,
  PLAYER_SKID_FRICTION,
  PLAYER_JUMP_VELOCITY,
  PLAYER_JUMP_GRAVITY_MULT,
  PLAYER_BIG_JUMP_VELOCITY,
  PowerState,
  Direction,
  SCREEN_WIDTH,
  INVULN_DURATION,
  GROW_ANIM_DURATION,
  STAR_DURATION,
  FIREBALL_SPEED,
  FIREBALL_BOUNCE_VY,
} from '../constants';
import { InputManager } from '../core/InputManager';
import { Camera } from '../core/Camera';
import { Animation } from '../rendering/Animation';

export class Player extends Entity {
  direction: Direction = Direction.RIGHT;
  powerState: PowerState = PowerState.SMALL;
  onGround = false;
  jumping = false;
  running = false;
  crouching = false;
  skidding = false;
  dead = false;
  invulnerable = false;
  invulnTimer = 0;
  starPower = false;
  starTimer = 0;
  growAnimating = false;
  growTimer = 0;
  deathBounceVy = 0;
  pipeEntering = false;
  flagSliding = false;
  flagSlideComplete = false;
  walkingToCastle = false;

  // Jump precision helpers
  private coyoteTimer = 0;
  private jumpBufferTimer = 0;
  private readonly COYOTE_FRAMES = 6;
  private readonly JUMP_BUFFER_FRAMES = 6;
  private readonly JUMP_CUT_VELOCITY = -2;

  // Sprites
  sprites!: Map<string, HTMLCanvasElement>;
  walkFrameIndex = 0;
  private walkAnimTimer = 0;

  constructor() {
    super();
    this.width = 14;  // Slightly smaller than tile for better feel
    this.height = 16; // Small Mario
    this.active = true;
  }

  setSprites(sprites: Map<string, HTMLCanvasElement>): void {
    this.sprites = sprites;
  }

  get isBig(): boolean {
    return this.powerState >= PowerState.BIG;
  }

  get isFire(): boolean {
    return this.powerState === PowerState.FIRE;
  }

  powerUp(newState: PowerState): void {
    if (newState > this.powerState) {
      this.powerState = newState;
      this.updateHitbox();
      this.growAnimating = true;
      this.growTimer = GROW_ANIM_DURATION;
    }
  }

  damage(): boolean {
    if (this.invulnerable || this.starPower) return false;
    if (this.powerState === PowerState.SMALL) {
      return true; // Will die
    }
    // Power down
    this.powerState = PowerState.SMALL;
    this.updateHitbox();
    this.invulnerable = true;
    this.invulnTimer = INVULN_DURATION;
    return false;
  }

  activateStar(): void {
    this.starPower = true;
    this.starTimer = STAR_DURATION;
  }

  private updateHitbox(): void {
    if (this.isBig) {
      const wasSmall = this.height === 16;
      this.height = 32;
      if (wasSmall) {
        this.y -= 16; // Grow upward
      }
    } else {
      const wasBig = this.height === 32;
      this.height = 16;
      if (wasBig) {
        this.y += 16; // Shrink downward
      }
    }
  }

  handleInput(input: InputManager): void {
    if (this.dead || this.growAnimating || this.pipeEntering || this.flagSliding || this.walkingToCastle) return;

    this.running = input.run;
    this.crouching = input.down && this.isBig && this.onGround;

    if (this.crouching) return; // Can't move while crouching

    const accel = this.running ? PLAYER_RUN_ACCEL : PLAYER_WALK_ACCEL;
    const maxSpeed = this.running ? PLAYER_RUN_MAX : PLAYER_WALK_MAX;

    // Horizontal movement
    if (input.left) {
      if (this.vx > 0 && this.onGround) {
        this.skidding = true;
        this.vx -= PLAYER_SKID_FRICTION;
      } else {
        this.skidding = false;
        this.vx -= accel;
      }
      if (this.vx < -maxSpeed) this.vx = -maxSpeed;
      if (!this.skidding) this.direction = Direction.LEFT;
    } else if (input.right) {
      if (this.vx < 0 && this.onGround) {
        this.skidding = true;
        this.vx += PLAYER_SKID_FRICTION;
      } else {
        this.skidding = false;
        this.vx += accel;
      }
      if (this.vx > maxSpeed) this.vx = maxSpeed;
      if (!this.skidding) this.direction = Direction.RIGHT;
    } else {
      this.skidding = false;
      // Friction
      if (this.onGround) {
        if (Math.abs(this.vx) < PLAYER_FRICTION) {
          this.vx = 0;
        } else {
          this.vx -= Math.sign(this.vx) * PLAYER_FRICTION;
        }
      }
    }

    // Coyote time: allow jumping briefly after leaving ground
    if (this.onGround) {
      this.coyoteTimer = this.COYOTE_FRAMES;
    } else {
      this.coyoteTimer--;
    }

    // Jump buffer: remember jump press for a few frames
    if (input.jumpPressed) {
      this.jumpBufferTimer = this.JUMP_BUFFER_FRAMES;
    } else {
      this.jumpBufferTimer--;
    }

    // Jump with coyote time and jump buffer
    const canJump = this.onGround || this.coyoteTimer > 0;
    const wantsJump = input.jumpPressed || this.jumpBufferTimer > 0;
    if (wantsJump && canJump && !this.jumping) {
      const jumpV = this.isBig ? PLAYER_BIG_JUMP_VELOCITY : PLAYER_JUMP_VELOCITY;
      // Higher jump when running faster
      const speedBonus = Math.abs(this.vx) > 2.5 ? -1.0 : 0;
      this.vy = jumpV + speedBonus;
      this.jumping = true;
      this.onGround = false;
      this.coyoteTimer = 0;
      this.jumpBufferTimer = 0;
    }
  }

  getGravityMultiplier(input: InputManager): number {
    // Variable-height jump: reduced gravity while holding jump and ascending
    if (this.jumping && input.jump && this.vy < 0) {
      return PLAYER_JUMP_GRAVITY_MULT;
    }
    if (!input.jump && this.jumping) {
      this.jumping = false;
      // Jump cut: cap upward velocity when button released for precise control
      if (this.vy < this.JUMP_CUT_VELOCITY) {
        this.vy = this.JUMP_CUT_VELOCITY;
      }
    }
    return 1;
  }

  updateTimers(dt: number): void {
    if (this.invulnerable) {
      this.invulnTimer -= dt;
      if (this.invulnTimer <= 0) {
        this.invulnerable = false;
      }
    }
    if (this.starPower) {
      this.starTimer -= dt;
      if (this.starTimer <= 0) {
        this.starPower = false;
      }
    }
    if (this.growAnimating) {
      this.growTimer -= dt;
      if (this.growTimer <= 0) {
        this.growAnimating = false;
      }
    }
  }

  updateAnimation(dt: number): void {
    if (this.onGround && Math.abs(this.vx) > 0.1) {
      const speed = Math.abs(this.vx);
      const animSpeed = speed > 2 ? 50 : speed > 1 ? 80 : 120;
      this.walkAnimTimer += dt;
      if (this.walkAnimTimer >= animSpeed) {
        this.walkAnimTimer -= animSpeed;
        this.walkFrameIndex = (this.walkFrameIndex + 1) % 3;
      }
    } else {
      this.walkFrameIndex = 0;
      this.walkAnimTimer = 0;
    }
  }

  getCurrentSprite(): HTMLCanvasElement | null {
    if (!this.sprites) return null;

    let prefix: string;
    if (this.powerState === PowerState.FIRE) {
      prefix = 'fire';
    } else if (this.powerState === PowerState.BIG) {
      prefix = 'big';
    } else {
      prefix = 'small';
    }

    const dir = this.direction === Direction.RIGHT ? 'right' : 'left';

    if (this.dead) {
      return this.sprites.get('small_death') || null;
    }

    if (this.crouching && this.isBig) {
      return this.sprites.get(`${prefix}_crouch_${dir}`) || null;
    }

    if (!this.onGround) {
      return this.sprites.get(`${prefix}_jump_${dir}`) || null;
    }

    if (this.skidding) {
      return this.sprites.get(`${prefix}_skid_${dir}`) || null;
    }

    if (Math.abs(this.vx) > 0.1) {
      const frame = this.walkFrameIndex + 1;
      return this.sprites.get(`${prefix}_walk${frame}_${dir}`) || null;
    }

    return this.sprites.get(`${prefix}_stand_${dir}`) || null;
  }

  render(ctx: CanvasRenderingContext2D, camera: Camera): void {
    // Invulnerability blink
    if (this.invulnerable && Math.floor(this.invulnTimer / 50) % 2 === 0) {
      return;
    }

    const sprite = this.getCurrentSprite();
    if (!sprite) return;

    const screenX = Math.floor(this.x - camera.x);
    // Sprite is 16px wide but hitbox is 14px - center it
    const offsetX = (this.width - 16) / 2;
    let screenY: number;

    if (this.isBig) {
      screenY = Math.floor(this.y - camera.y);
    } else {
      // Small Mario sprite is 16x16, draw at entity position
      screenY = Math.floor(this.y - camera.y);
    }

    // Star power color cycling
    if (this.starPower) {
      const time = performance.now();
      const hue = (time / 10) % 360;
      ctx.filter = `hue-rotate(${hue}deg) saturate(2)`;
    }

    ctx.drawImage(sprite, screenX + offsetX, screenY);
    ctx.filter = 'none';
  }
}
