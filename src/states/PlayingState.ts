import type { GameState } from './GameState';
import type { Game } from '../core/Game';
import { Camera } from '../core/Camera';
import { Renderer } from '../rendering/Renderer';
import { HUD } from '../rendering/HUD';
import { Player } from '../entities/Player';
import { PhysicsSystem } from '../physics/PhysicsSystem';
import { TileCollider } from '../physics/TileCollider';
import { LevelLoader } from '../level/LevelLoader';
import { Goomba } from '../entities/enemies/Goomba';
import { KoopaTroopa } from '../entities/enemies/KoopaTroopa';
import { Enemy } from '../entities/enemies/Enemy';
import { QuestionBlock } from '../entities/blocks/QuestionBlock';
import { BrickBlock } from '../entities/blocks/BrickBlock';
import { Coin } from '../entities/items/Coin';
import { Mushroom } from '../entities/items/Mushroom';
import { FireFlower } from '../entities/items/FireFlower';
import { Starman } from '../entities/items/Starman';
import { Fireball } from '../entities/items/Fireball';
import { FlagPole } from '../entities/FlagPole';
import { Entity } from '../entities/Entity';
import {
  TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT, LEVEL_TIME,
  TileType, Direction, PowerState, Events, Scores,
  TIMESTEP, MAX_FALL_SPEED,
} from '../constants';
import { SoundEffects } from '../audio/SoundEffects';
import { MusicPlayer } from '../audio/MusicPlayer';
import { AudioManager } from '../audio/AudioManager';
import { createPlumberLikeSprites } from '../rendering/sprites/MarioSprites';
import { createEnemySprites } from '../rendering/sprites/EnemySprites';
import { createItemSprites } from '../rendering/sprites/ItemSprites';
import { createTileSprites } from '../rendering/sprites/TileSprites';
import { LEVEL_WIDTH } from '../level/data/world1_1';

export class PlayingState implements GameState {
  private player!: Player;
  private renderer!: Renderer;
  private hud!: HUD;
  private physics!: PhysicsSystem;
  private tileCollider!: TileCollider;
  private sfx!: SoundEffects;
  private music!: MusicPlayer;
  private audioManager!: AudioManager;
  private audioStarted = false;

  private tileSprites!: Map<string, HTMLCanvasElement>;
  private enemySprites!: Map<string, HTMLCanvasElement>;
  private itemSprites!: Map<string, HTMLCanvasElement>;
  private marioSprites!: Map<string, HTMLCanvasElement>;

  private fireballs: Fireball[] = [];
  private maxFireballs = 2;
  private scorePopups: { x: number; y: number; text: string; timer: number }[] = [];

  enter(game: Game): void {
    // Create sprites
    this.tileSprites = createTileSprites();
    this.enemySprites = createEnemySprites();
    this.itemSprites = createItemSprites();
    this.marioSprites = createPlumberLikeSprites();

    // Setup audio
    this.audioManager = new AudioManager();
    this.sfx = new SoundEffects(this.audioManager);
    this.music = new MusicPlayer(this.audioManager);

    // Create systems
    this.renderer = new Renderer(this.tileSprites);
    this.hud = new HUD();
    this.physics = new PhysicsSystem();

    // Load level
    const loader = new LevelLoader(this.tileSprites, this.enemySprites, this.itemSprites);
    game.level = loader.load();
    game.camera = new Camera(LEVEL_WIDTH);

    this.tileCollider = new TileCollider(game.level.tileMap);

    // Create player
    this.player = new Player();
    this.player.x = 3 * TILE_SIZE;
    this.player.y = 13 * TILE_SIZE - this.player.height; // Stand on ground
    this.player.setSprites(this.marioSprites);

    game.time = LEVEL_TIME;
    game.score = 0;
    game.coins = 0;
  }

  exit(_game: Game): void {
    this.music.stop();
  }

  update(game: Game, dt: number): void {
    // Start audio on first input
    if (!this.audioStarted && (game.input.isDown('ArrowLeft') || game.input.isDown('ArrowRight') ||
      game.input.isDown('Space') || game.input.isDown('KeyA') || game.input.isDown('KeyD'))) {
      this.audioStarted = true;
      this.music.start();
    }

    if (this.player.dead) {
      this.updateDeath(game, dt);
      return;
    }

    if (this.player.flagSliding) {
      this.updateFlagSlide(game, dt);
      return;
    }

    if (this.player.walkingToCastle) {
      this.updateWalkToCastle(game, dt);
      return;
    }

    // Timer
    game.time -= dt / 1000;
    if (game.time <= 0) {
      game.time = 0;
      this.killPlayer(game);
      return;
    }
    if (game.time <= 100 && game.time + dt / 1000 > 100) {
      this.sfx.timeWarning();
    }

    // Detect jump for SFX (before input changes state)
    const wasOnGround = this.player.onGround;

    // Player input and physics
    this.player.handleInput(game.input);
    const gravMult = this.player.getGravityMultiplier(game.input);
    this.physics.applyGravity(this.player, gravMult);
    this.physics.applyVelocity(this.player);

    // Prevent moving left past camera
    if (this.player.x < game.camera.x) {
      this.player.x = game.camera.x;
      this.player.vx = 0;
    }

    // Tile collision for player
    const collision = this.tileCollider.resolve(this.player);
    // Use isOnGround check as fallback when vy is 0 (resolveY skips)
    if (this.player.vy >= 0) {
      this.player.onGround = collision.bottom || this.tileCollider.isOnGround(this.player);
    } else {
      this.player.onGround = false;
    }

    if (collision.bottom) {
      this.player.jumping = false;
    }

    // Handle jump SFX
    if (wasOnGround && !this.player.onGround && this.player.vy < 0) {
      if (this.player.isBig) {
        this.sfx.bigJump();
      } else {
        this.sfx.jump();
      }
    }

    // Head bonk on block
    if (collision.top && collision.hitTileCol !== undefined && collision.hitTileRow !== undefined) {
      this.handleBlockHit(game, collision.hitTileCol, collision.hitTileRow);
    }

    // Fire button
    if (game.input.firePressed && this.player.isFire && this.fireballs.length < this.maxFireballs) {
      this.throwFireball(game);
    }

    // Update player timers and animation
    this.player.updateTimers(dt);
    this.player.updateAnimation(dt);

    // Update camera
    game.camera.follow(this.player.x);

    // Fall death
    if (this.player.y > SCREEN_HEIGHT + TILE_SIZE) {
      this.killPlayer(game);
      return;
    }

    // Flagpole check
    if (this.player.x + this.player.width >= game.level.flagX + 6 &&
      this.player.x <= game.level.flagX + 10 &&
      game.level.flagX > 0 &&
      !this.player.flagSliding) {
      this.startFlagSlide(game);
    }

    // Update entities
    this.updateEntities(game, dt);

    // Update fireballs
    this.updateFireballs(game, dt);

    // Score popups
    this.scorePopups = this.scorePopups.filter(p => {
      p.y -= 0.5;
      p.timer -= dt;
      return p.timer > 0;
    });

    // Music
    this.music.update(dt);

    // Level cleanup
    game.level.cleanup();
  }

  private updateEntities(game: Game, dt: number): void {
    const enemies: Enemy[] = [];
    const items: Entity[] = [];

    for (const entity of game.level.entities) {
      // Activate enemies near camera
      if (entity instanceof Enemy) {
        entity.checkActivation(game.camera);
        if (!entity.active || !entity.alive) continue;

        entity.update(dt);

        if (!entity.stomped) {
          // Apply physics to enemies
          this.physics.applyGravity(entity);
          this.physics.applyVelocity(entity);

          const col = this.tileCollider.resolve(entity);
          if (col.left || col.right) {
            if (entity instanceof Goomba) entity.reverseDirection();
            if (entity instanceof KoopaTroopa) entity.reverseDirection();
          }

          // Remove if fallen off screen
          if (entity.y > SCREEN_HEIGHT + TILE_SIZE * 2) {
            entity.removeFlag = true;
            continue;
          }
        }

        enemies.push(entity);
        continue;
      }

      // Update items (Mushroom, FireFlower, Starman, Coin)
      if (entity instanceof Mushroom || entity instanceof Starman) {
        entity.update(dt);
        if (!entity.emerging) {
          this.physics.applyGravity(entity);
          this.physics.applyVelocity(entity);
          const col = this.tileCollider.resolve(entity);
          if (col.left || col.right) entity.reverseDirection();
          if (entity instanceof Starman && col.bottom) entity.onBounce();
        }
        if (entity.y > SCREEN_HEIGHT + TILE_SIZE * 2) entity.removeFlag = true;
        items.push(entity);
        continue;
      }

      if (entity instanceof FireFlower) {
        entity.update(dt);
        items.push(entity);
        continue;
      }

      if (entity instanceof Coin) {
        entity.update(dt);
        continue;
      }

      // Update blocks
      if (entity instanceof QuestionBlock || entity instanceof BrickBlock) {
        entity.update(dt);
        continue;
      }

      if (entity instanceof FlagPole) {
        entity.update(dt);
        continue;
      }
    }

    // Player-enemy collisions
    for (const enemy of enemies) {
      if (!this.player.alive || this.player.dead || !enemy.alive) continue;
      if (!this.player.overlaps(enemy)) continue;

      if (enemy instanceof KoopaTroopa && enemy.inShell && !enemy.shellMoving) {
        // Kick the shell
        const dir = this.player.centerX < enemy.centerX ? Direction.RIGHT : Direction.LEFT;
        enemy.kick(dir);
        this.sfx.kick();
        this.addScore(game, Scores.KOOPA_STOMP, enemy.x, enemy.y);
        continue;
      }

      // Check if stomping (player falling and feet above enemy's midpoint)
      if (this.player.vy > 0 && this.player.bottom - this.player.vy <= enemy.top + enemy.height / 2) {
        // Stomp!
        this.player.vy = -6; // Bounce
        if (enemy instanceof Goomba) {
          enemy.onStomp();
          enemy.alive = true; // Keep alive for flat animation
          this.sfx.stomp();
          this.addScore(game, Scores.GOOMBA_STOMP, enemy.x, enemy.y);
        } else if (enemy instanceof KoopaTroopa) {
          if (!enemy.inShell) {
            enemy.onStomp();
            this.sfx.stomp();
            this.addScore(game, Scores.KOOPA_STOMP, enemy.x, enemy.y);
          } else if (enemy.shellMoving) {
            enemy.shellMoving = false;
            enemy.vx = 0;
            this.sfx.stomp();
          }
        }
      } else if (this.player.starPower) {
        // Star power kills enemies
        enemy.alive = false;
        enemy.removeFlag = true;
        this.sfx.kick();
        this.addScore(game, Scores.SHELL_KILL, enemy.x, enemy.y);
      } else if (enemy instanceof KoopaTroopa && enemy.shellMoving) {
        // Hit by moving shell
        if (!this.player.invulnerable) {
          const died = this.player.damage();
          if (died) {
            this.killPlayer(game);
          } else {
            this.sfx.powerDown();
          }
        }
      } else if (!(enemy instanceof KoopaTroopa && enemy.inShell && !enemy.shellMoving)) {
        // Damage from enemy
        if (!this.player.invulnerable) {
          const died = this.player.damage();
          if (died) {
            this.killPlayer(game);
          } else {
            this.sfx.powerDown();
          }
        }
      }
    }

    // Shell-enemy collisions
    for (const enemy of enemies) {
      if (!(enemy instanceof KoopaTroopa) || !enemy.shellMoving) continue;
      for (const other of enemies) {
        if (other === enemy || !other.alive || other.stomped) continue;
        if (enemy.overlaps(other)) {
          other.alive = false;
          other.removeFlag = true;
          this.sfx.kick();
          this.addScore(game, Scores.SHELL_KILL, other.x, other.y);
        }
      }
    }

    // Player-item collisions
    for (const item of items) {
      if (!this.player.overlaps(item) || !item.alive) continue;

      if (item instanceof Mushroom) {
        if (item.emerging) continue;
        if (item.isOneUp) {
          game.lives++;
          this.sfx.oneUp();
          this.addScore(game, 0, item.x, item.y, '1UP');
        } else {
          this.player.powerUp(PowerState.BIG);
          this.sfx.powerUp();
          this.addScore(game, Scores.MUSHROOM, item.x, item.y);
        }
        item.removeFlag = true;
      } else if (item instanceof FireFlower) {
        if (item.emerging) continue;
        if (this.player.isBig) {
          this.player.powerUp(PowerState.FIRE);
        } else {
          this.player.powerUp(PowerState.BIG);
        }
        this.sfx.powerUp();
        this.addScore(game, Scores.FIRE_FLOWER, item.x, item.y);
        item.removeFlag = true;
      } else if (item instanceof Starman) {
        if (item.emerging) continue;
        this.player.activateStar();
        this.sfx.powerUp();
        this.addScore(game, Scores.STARMAN, item.x, item.y);
        item.removeFlag = true;
      }
    }
  }

  private updateFireballs(game: Game, dt: number): void {
    for (const fb of this.fireballs) {
      fb.update(dt);
      this.physics.applyGravity(fb);
      this.physics.applyVelocity(fb);

      const col = this.tileCollider.resolve(fb);
      if (col.bottom) fb.onBounce();
      if (col.left || col.right) fb.removeFlag = true;

      // Check enemy collisions
      for (const entity of game.level.entities) {
        if (entity instanceof Enemy && entity.active && entity.alive && !entity.stomped) {
          if (fb.overlaps(entity)) {
            entity.alive = false;
            entity.removeFlag = true;
            fb.removeFlag = true;
            this.sfx.kick();
            this.addScore(game, Scores.SHELL_KILL, entity.x, entity.y);
          }
        }
      }

      // Remove if off screen
      if (!fb.isOnScreen(game.camera)) fb.removeFlag = true;
    }

    this.fireballs = this.fireballs.filter(fb => !fb.removeFlag);
  }

  private handleBlockHit(game: Game, col: number, row: number): void {
    const tile = game.level.tileMap.getTile(col, row);

    // Find the block entity
    for (const entity of game.level.entities) {
      if (entity instanceof QuestionBlock && entity.col === col && entity.row === row && !entity.used) {
        const result = entity.bump();
        game.level.tileMap.setTile(col, row, TileType.USED_BLOCK);

        if (result === 'coin') {
          game.addCoin();
          game.addScore(Scores.COIN);
          this.sfx.coin();
          // Spawn pop-up coin
          const coinEntity = new Coin(col * TILE_SIZE, row * TILE_SIZE);
          coinEntity.setSprites(this.itemSprites);
          game.level.addEntity(coinEntity);
          this.addScore(game, Scores.COIN, col * TILE_SIZE, row * TILE_SIZE);
        } else if (result === 'mushroom') {
          this.sfx.itemAppear();
          this.spawnPowerUp(game, col, row);
        } else if (result === 'star') {
          this.sfx.itemAppear();
          const star = new Starman(col * TILE_SIZE, row * TILE_SIZE);
          star.setSprites(this.itemSprites);
          game.level.addEntity(star);
        }
        return;
      }

      if (entity instanceof BrickBlock && entity.col === col && entity.row === row && !entity.broken) {
        const result = entity.bump(this.player.isBig);

        if (result === 'break') {
          game.level.tileMap.setTile(col, row, TileType.EMPTY);
          this.sfx.breakBlock();
        } else if (result === 'coin') {
          game.addCoin();
          game.addScore(Scores.BRICK_COIN);
          this.sfx.coin();
          const coinEntity = new Coin(col * TILE_SIZE, row * TILE_SIZE);
          coinEntity.setSprites(this.itemSprites);
          game.level.addEntity(coinEntity);
          if (entity.coinCount <= 0) {
            game.level.tileMap.setTile(col, row, TileType.USED_BLOCK);
          }
        } else {
          this.sfx.bump();
        }

        // Bump enemies on top of the block
        this.bumpEnemiesAbove(game, col, row);
        return;
      }
    }

    // Generic bump for unregistered solid tiles
    if (tile === TileType.BRICK || tile === TileType.COIN_BRICK) {
      this.sfx.bump();
    }
  }

  private bumpEnemiesAbove(game: Game, col: number, row: number): void {
    const blockTop = row * TILE_SIZE;
    const blockLeft = col * TILE_SIZE;

    for (const entity of game.level.entities) {
      if (entity instanceof Enemy && entity.active && entity.alive && !entity.stomped) {
        if (entity.bottom >= blockTop - 2 && entity.bottom <= blockTop + 2 &&
          entity.right > blockLeft && entity.left < blockLeft + TILE_SIZE) {
          entity.alive = false;
          entity.removeFlag = true;
          this.sfx.kick();
          this.addScore(game, Scores.SHELL_KILL, entity.x, entity.y);
        }
      }
    }
  }

  private spawnPowerUp(game: Game, col: number, row: number): void {
    if (this.player.powerState === PowerState.SMALL) {
      const mushroom = new Mushroom(col * TILE_SIZE, row * TILE_SIZE);
      mushroom.setSprites(this.itemSprites);
      game.level.addEntity(mushroom);
    } else {
      const flower = new FireFlower(col * TILE_SIZE, row * TILE_SIZE);
      flower.setSprites(this.itemSprites);
      game.level.addEntity(flower);
    }
  }

  private throwFireball(game: Game): void {
    const x = this.player.direction === Direction.RIGHT ?
      this.player.right : this.player.left - 8;
    const y = this.player.y + 8;
    const fb = new Fireball(x, y, this.player.direction);
    fb.setSprites(this.itemSprites);
    this.fireballs.push(fb);
    game.level.addEntity(fb);
    this.sfx.fireball();
  }

  private startFlagSlide(game: Game): void {
    this.player.flagSliding = true;
    this.player.vx = 0;
    this.player.vy = 0;
    this.player.x = game.level.flagX - this.player.width + 8;
    this.music.stop();
    this.sfx.flagpole();

    // Calculate score based on height
    const flagRow = Math.floor(this.player.y / TILE_SIZE);
    if (flagRow <= 5) {
      game.addScore(Scores.FLAG_TOP);
    } else {
      game.addScore(Scores.FLAG_BASE * (12 - flagRow));
    }

    // Start flag descent
    for (const entity of game.level.entities) {
      if (entity instanceof FlagPole) {
        entity.startFlagDescent();
      }
    }
  }

  private updateFlagSlide(game: Game, dt: number): void {
    // Slide down the pole
    this.player.vy = 2;
    this.player.y += this.player.vy;

    const groundY = 12 * TILE_SIZE - this.player.height;
    if (this.player.y >= groundY) {
      this.player.y = groundY;
      this.player.flagSliding = false;
      this.player.walkingToCastle = true;
      this.player.direction = Direction.RIGHT;
      this.player.vx = 1.5;

      this.sfx.levelComplete();
    }
  }

  private updateWalkToCastle(game: Game, dt: number): void {
    this.player.x += this.player.vx;
    this.player.updateAnimation(dt);

    // Reached the castle door area
    const castleDoor = 199 * TILE_SIZE;
    if (this.player.x >= castleDoor) {
      this.player.alive = false;
      game.switchState('levelComplete');
    }
  }

  private killPlayer(game: Game): void {
    this.player.dead = true;
    this.player.vy = -8;
    this.player.vx = 0;
    this.music.stop();
    this.sfx.die();
  }

  private updateDeath(game: Game, dt: number): void {
    // Death bounce animation
    this.player.vy += 0.3;
    this.player.y += this.player.vy;

    if (this.player.y > SCREEN_HEIGHT + 32) {
      game.lives--;
      if (game.lives <= 0) {
        game.switchState('gameOver');
      } else {
        game.switchState('death');
      }
    }
  }

  private addScore(game: Game, points: number, x: number, y: number, text?: string): void {
    game.addScore(points);
    this.scorePopups.push({
      x, y,
      text: text || String(points),
      timer: 800,
    });
  }

  render(game: Game, ctx: CanvasRenderingContext2D): void {
    this.renderer.clear(ctx);

    // Background decorations
    this.renderer.renderBackground(ctx, game.camera);

    // Tilemap
    this.renderer.renderTilemap(ctx, game.level.tileMap, game.camera, TIMESTEP);

    // Entities (blocks, enemies, items)
    for (const entity of game.level.entities) {
      if (entity instanceof Fireball) continue; // Render fireballs separately
      if (entity.isOnScreen(game.camera) || entity instanceof Coin) {
        entity.render(ctx, game.camera);
      }
    }

    // Fireballs
    for (const fb of this.fireballs) {
      fb.render(ctx, game.camera);
    }

    // Player
    this.player.render(ctx, game.camera);

    // Score popups
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '8px monospace';
    for (const popup of this.scorePopups) {
      const sx = Math.floor(popup.x - game.camera.x);
      const sy = Math.floor(popup.y - game.camera.y);
      ctx.fillText(popup.text, sx, sy);
    }

    // HUD
    this.hud.render(ctx, game.score, game.coins, game.world, game.time, game.lives);
  }
}
