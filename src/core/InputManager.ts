export class InputManager {
  private keys = new Map<string, boolean>();
  private justPressed = new Map<string, boolean>();

  constructor() {
    window.addEventListener('keydown', (e) => {
      if (!this.keys.get(e.code)) {
        this.justPressed.set(e.code, true);
      }
      this.keys.set(e.code, true);
      // Prevent default for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'ShiftLeft', 'ShiftRight', 'KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(e.code)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.set(e.code, false);
    });
  }

  isDown(code: string): boolean {
    return this.keys.get(code) === true;
  }

  wasPressed(code: string): boolean {
    return this.justPressed.get(code) === true;
  }

  clearFrameState(): void {
    this.justPressed.clear();
  }

  // Convenience methods for game actions
  get left(): boolean {
    return this.isDown('ArrowLeft') || this.isDown('KeyA');
  }

  get right(): boolean {
    return this.isDown('ArrowRight') || this.isDown('KeyD');
  }

  get up(): boolean {
    return this.isDown('ArrowUp') || this.isDown('KeyW');
  }

  get down(): boolean {
    return this.isDown('ArrowDown') || this.isDown('KeyS');
  }

  get jump(): boolean {
    return this.isDown('Space') || this.isDown('ArrowUp') || this.isDown('KeyW');
  }

  get jumpPressed(): boolean {
    return this.wasPressed('Space') || this.wasPressed('ArrowUp') || this.wasPressed('KeyW');
  }

  get run(): boolean {
    return this.isDown('ShiftLeft') || this.isDown('ShiftRight') || this.isDown('KeyZ');
  }

  get firePressed(): boolean {
    return this.wasPressed('ShiftLeft') || this.wasPressed('ShiftRight') || this.wasPressed('KeyZ');
  }

  get enterPressed(): boolean {
    return this.wasPressed('Enter');
  }
}
