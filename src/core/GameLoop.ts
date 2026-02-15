import { TIMESTEP } from '../constants';

export class GameLoop {
  private lastTime = 0;
  private accumulator = 0;
  private running = false;
  private rafId = 0;
  private updateFn: (dt: number) => void;
  private renderFn: () => void;

  constructor(update: (dt: number) => void, render: () => void) {
    this.updateFn = update;
    this.renderFn = render;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.accumulator = 0;
    this.rafId = requestAnimationFrame((t) => this.tick(t));
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }

  private tick(time: number): void {
    if (!this.running) return;

    let delta = time - this.lastTime;
    this.lastTime = time;

    // Spiral of death cap: don't accumulate more than 5 frames
    if (delta > TIMESTEP * 5) {
      delta = TIMESTEP * 5;
    }

    this.accumulator += delta;

    while (this.accumulator >= TIMESTEP) {
      this.updateFn(TIMESTEP);
      this.accumulator -= TIMESTEP;
    }

    this.renderFn();
    this.rafId = requestAnimationFrame((t) => this.tick(t));
  }
}
