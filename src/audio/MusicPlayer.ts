import { AudioManager } from './AudioManager';
import { overworldMelody, overworldBass, BPM, type Note } from './MusicData';

export class MusicPlayer {
  private audio: AudioManager;
  private playing = false;
  private melodyIndex = 0;
  private bassIndex = 0;
  private melodyTimer = 0;
  private bassTimer = 0;
  private melodyOsc: OscillatorNode | null = null;
  private bassOsc: OscillatorNode | null = null;
  private melodyGain: GainNode | null = null;
  private bassGain: GainNode | null = null;
  private sixteenthDuration: number;
  private paused = false;

  constructor(audio: AudioManager) {
    this.audio = audio;
    this.sixteenthDuration = (60 / BPM) * 1000 / 4; // ms per 16th note
  }

  start(): void {
    if (this.playing) return;
    this.playing = true;
    this.paused = false;
    this.melodyIndex = 0;
    this.bassIndex = 0;
    this.melodyTimer = 0;
    this.bassTimer = 0;
    this.setupOscillators();
  }

  stop(): void {
    this.playing = false;
    this.paused = false;
    this.cleanupOscillators();
  }

  pause(): void {
    this.paused = true;
    this.cleanupOscillators();
  }

  resume(): void {
    if (!this.playing) return;
    this.paused = false;
    this.setupOscillators();
  }

  private setupOscillators(): void {
    const ctx = this.audio.getContext();

    this.melodyGain = ctx.createGain();
    this.melodyGain.gain.value = 0;
    this.melodyGain.connect(this.audio.output);

    this.melodyOsc = ctx.createOscillator();
    this.melodyOsc.type = 'square';
    this.melodyOsc.connect(this.melodyGain);
    this.melodyOsc.start();

    this.bassGain = ctx.createGain();
    this.bassGain.gain.value = 0;
    this.bassGain.connect(this.audio.output);

    this.bassOsc = ctx.createOscillator();
    this.bassOsc.type = 'triangle';
    this.bassOsc.connect(this.bassGain);
    this.bassOsc.start();
  }

  private cleanupOscillators(): void {
    try {
      this.melodyOsc?.stop();
      this.bassOsc?.stop();
    } catch {}
    this.melodyOsc?.disconnect();
    this.bassOsc?.disconnect();
    this.melodyGain?.disconnect();
    this.bassGain?.disconnect();
    this.melodyOsc = null;
    this.bassOsc = null;
    this.melodyGain = null;
    this.bassGain = null;
  }

  update(dt: number): void {
    if (!this.playing || this.paused || !this.melodyOsc) return;

    // Update melody
    this.melodyTimer -= dt;
    if (this.melodyTimer <= 0) {
      const note = overworldMelody[this.melodyIndex];
      if (note) {
        const [freq, dur] = note;
        if (freq > 0) {
          this.melodyOsc.frequency.value = freq;
          this.melodyGain!.gain.value = 0.07;
        } else {
          this.melodyGain!.gain.value = 0;
        }
        this.melodyTimer = dur * this.sixteenthDuration;
        this.melodyIndex++;
        if (this.melodyIndex >= overworldMelody.length) {
          this.melodyIndex = 0;
        }
      }
    }

    // Update bass
    this.bassTimer -= dt;
    if (this.bassTimer <= 0) {
      const note = overworldBass[this.bassIndex];
      if (note) {
        const [freq, dur] = note;
        if (freq > 0) {
          this.bassOsc!.frequency.value = freq;
          this.bassGain!.gain.value = 0.05;
        } else {
          this.bassGain!.gain.value = 0;
        }
        this.bassTimer = dur * this.sixteenthDuration;
        this.bassIndex++;
        if (this.bassIndex >= overworldBass.length) {
          this.bassIndex = 0;
        }
      }
    }
  }
}
