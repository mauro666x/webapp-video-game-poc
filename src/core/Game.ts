import { SCREEN_WIDTH, SCREEN_HEIGHT, SCALE } from '../constants';
import { GameLoop } from './GameLoop';
import { InputManager } from './InputManager';
import { EventBus } from './EventBus';
import type { GameState } from '../states/GameState';
import type { Level } from '../level/Level';
import type { Camera } from './Camera';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  input: InputManager;
  events: EventBus;
  loop: GameLoop;

  level!: Level;
  camera!: Camera;

  // Game data
  score = 0;
  coins = 0;
  lives = 3;
  time = 0;
  world = '1-1';

  private currentState: GameState | null = null;
  private states = new Map<string, GameState>();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = SCREEN_WIDTH;
    this.canvas.height = SCREEN_HEIGHT;
    this.canvas.style.width = `${SCREEN_WIDTH * SCALE}px`;
    this.canvas.style.height = `${SCREEN_HEIGHT * SCALE}px`;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.imageSmoothingEnabled = false;

    this.input = new InputManager();
    this.events = new EventBus();
    this.loop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render()
    );
  }

  registerState(name: string, state: GameState): void {
    this.states.set(name, state);
  }

  switchState(name: string): void {
    if (this.currentState) {
      this.currentState.exit(this);
    }
    this.currentState = this.states.get(name) || null;
    if (this.currentState) {
      this.currentState.enter(this);
    }
  }

  start(): void {
    this.loop.start();
  }

  addScore(points: number): void {
    this.score += points;
  }

  addCoin(): void {
    this.coins++;
    if (this.coins >= 100) {
      this.coins -= 100;
      this.lives++;
      this.events.emit('1up');
    }
  }

  private update(dt: number): void {
    if (this.currentState) {
      this.currentState.update(this, dt);
    }
    this.input.clearFrameState();
  }

  private render(): void {
    if (this.currentState) {
      this.currentState.render(this, this.ctx);
    }
  }
}
