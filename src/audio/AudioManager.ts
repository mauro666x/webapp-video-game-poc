export class AudioManager {
  private ctx: AudioContext | null = null;
  private initialized = false;
  masterGain: GainNode | null = null;

  getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.initialized = true;
    return this.ctx;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  get output(): GainNode {
    this.getContext();
    return this.masterGain!;
  }
}
