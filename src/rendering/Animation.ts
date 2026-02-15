export class Animation {
  private frames: HTMLCanvasElement[];
  private frameDuration: number;
  private elapsed = 0;
  private currentFrame = 0;
  loop: boolean;

  constructor(frames: HTMLCanvasElement[], frameDuration: number, loop = true) {
    this.frames = frames;
    this.frameDuration = frameDuration;
    this.loop = loop;
  }

  update(dt: number): void {
    this.elapsed += dt;
    if (this.elapsed >= this.frameDuration) {
      this.elapsed -= this.frameDuration;
      if (this.loop) {
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
      } else {
        if (this.currentFrame < this.frames.length - 1) {
          this.currentFrame++;
        }
      }
    }
  }

  reset(): void {
    this.currentFrame = 0;
    this.elapsed = 0;
  }

  get frame(): HTMLCanvasElement {
    return this.frames[this.currentFrame];
  }

  get done(): boolean {
    return !this.loop && this.currentFrame === this.frames.length - 1;
  }
}
