import { AudioManager } from './AudioManager';

export class SoundEffects {
  private audio: AudioManager;

  constructor(audio: AudioManager) {
    this.audio = audio;
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'square', volume = 0.15): void {
    const ctx = this.audio.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.audio.output);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  private playTones(notes: [number, number, number][], type: OscillatorType = 'square', volume = 0.12): void {
    const ctx = this.audio.getContext();
    let time = ctx.currentTime;
    for (const [freq, dur, gap] of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = volume;
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
      osc.connect(gain);
      gain.connect(this.audio.output);
      osc.start(time);
      osc.stop(time + dur);
      time += dur + gap;
    }
  }

  jump(): void {
    const ctx = this.audio.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.audio.output);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  bigJump(): void {
    const ctx = this.audio.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.2);
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.audio.output);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }

  coin(): void {
    this.playTones([
      [988, 0.05, 0.01],  // B5
      [1319, 0.15, 0],    // E6
    ], 'square', 0.1);
  }

  stomp(): void {
    this.playTone(400, 0.08, 'square', 0.12);
  }

  bump(): void {
    this.playTone(150, 0.1, 'square', 0.1);
  }

  breakBlock(): void {
    const ctx = this.audio.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
    gain.gain.value = 0.12;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.audio.output);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  powerUp(): void {
    this.playTones([
      [523, 0.08, 0.02],  // C5
      [659, 0.08, 0.02],  // E5
      [784, 0.08, 0.02],  // G5
      [1047, 0.12, 0],    // C6
    ], 'square', 0.1);
  }

  powerDown(): void {
    const ctx = this.audio.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.audio.output);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  }

  oneUp(): void {
    this.playTones([
      [262, 0.06, 0.02],  // C4
      [330, 0.06, 0.02],  // E4
      [392, 0.06, 0.02],  // G4
      [523, 0.06, 0.02],  // C5
      [659, 0.06, 0.02],  // E5
      [784, 0.15, 0],     // G5
    ], 'square', 0.1);
  }

  die(): void {
    this.playTones([
      [494, 0.15, 0.05],  // B4
      [440, 0.15, 0.05],  // A4
      [370, 0.15, 0.05],  // F#4
      [330, 0.15, 0.05],  // E4
      [262, 0.3, 0],      // C4
    ], 'square', 0.12);
  }

  gameOver(): void {
    this.playTones([
      [262, 0.2, 0.05],   // C4
      [196, 0.2, 0.05],   // G3
      [165, 0.3, 0.1],    // E3
      [220, 0.15, 0.05],  // A3
      [247, 0.15, 0.05],  // B3
      [220, 0.15, 0.05],  // A3
      [208, 0.15, 0.05],  // Ab3
      [175, 0.15, 0.05],  // F3
      [196, 0.4, 0],      // G3
    ], 'square', 0.12);
  }

  flagpole(): void {
    this.playTones([
      [330, 0.06, 0.01],  // E4
      [392, 0.06, 0.01],  // G4
      [523, 0.06, 0.01],  // C5
      [659, 0.06, 0.01],  // E5
      [784, 0.06, 0.01],  // G5
      [1047, 0.15, 0],    // C6
    ], 'square', 0.1);
  }

  fireball(): void {
    const ctx = this.audio.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
    gain.gain.value = 0.06;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.audio.output);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }

  kick(): void {
    this.playTone(300, 0.06, 'square', 0.1);
  }

  itemAppear(): void {
    this.playTones([
      [400, 0.06, 0.01],
      [500, 0.06, 0.01],
      [600, 0.06, 0.01],
      [800, 0.1, 0],
    ], 'square', 0.08);
  }

  timeWarning(): void {
    this.playTones([
      [660, 0.08, 0.04],
      [660, 0.08, 0.04],
      [660, 0.15, 0],
    ], 'square', 0.1);
  }

  levelComplete(): void {
    this.playTones([
      [262, 0.1, 0.02],   // C
      [330, 0.1, 0.02],   // E
      [392, 0.1, 0.02],   // G
      [523, 0.15, 0.05],  // C5
      [392, 0.1, 0.02],   // G
      [523, 0.3, 0],      // C5
    ], 'square', 0.12);
  }
}
