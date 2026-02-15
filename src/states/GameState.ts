import type { Game } from '../core/Game';

export interface GameState {
  enter(game: Game): void;
  exit(game: Game): void;
  update(game: Game, dt: number): void;
  render(game: Game, ctx: CanvasRenderingContext2D): void;
}
