// Overworld theme note data
// Each note: [frequency in Hz, duration in beats]
// 0 frequency = rest

// Note frequencies
const C4 = 262, D4 = 294, E4 = 330, F4 = 349, G4 = 392, A4 = 440, B4 = 494;
const C5 = 523, D5 = 587, E5 = 659, F5 = 698, G5 = 784, A5 = 880;
const Ab4 = 415, Bb4 = 466, Eb5 = 622, Fs4 = 370;
const G3 = 196, A3 = 220, B3 = 247, C3 = 131, D3 = 147, E3 = 165, F3 = 175;
const R = 0; // rest

export type Note = [number, number]; // [frequency, duration in 16th notes]

// Simplified overworld theme melody (lead)
export const overworldMelody: Note[] = [
  // Intro phrase
  [E5, 2], [E5, 2], [R, 2], [E5, 2],
  [R, 2], [C5, 2], [E5, 2], [R, 2],
  [G5, 2], [R, 6], [G4, 2], [R, 6],

  // Main theme A
  [C5, 4], [R, 2], [G4, 4], [R, 2],
  [E4, 4], [R, 2], [A4, 2], [R, 2],
  [B4, 2], [R, 2], [Bb4, 2], [A4, 4],

  [G4, 3], [E5, 3], [G5, 2],
  [A5, 2], [R, 2], [F5, 2], [G5, 2],
  [R, 2], [E5, 2], [R, 2], [C5, 2],
  [D5, 2], [B4, 2], [R, 4],

  // Main theme B
  [C5, 4], [R, 2], [G4, 4], [R, 2],
  [E4, 4], [R, 2], [A4, 2], [R, 2],
  [B4, 2], [R, 2], [Bb4, 2], [A4, 4],

  [G4, 3], [E5, 3], [G5, 2],
  [A5, 2], [R, 2], [F5, 2], [G5, 2],
  [R, 2], [E5, 2], [R, 2], [C5, 2],
  [D5, 2], [B4, 2], [R, 4],

  // Bridge part 1
  [R, 2], [G5, 2], [Fs4, 2], [F4, 2],
  [D5, 4], [E5, 2], [R, 2],
  [G4, 2], [A4, 2], [C5, 2], [R, 2],
  [A4, 2], [C5, 2], [D5, 2], [R, 4],

  // Bridge part 2
  [R, 2], [G5, 2], [Fs4, 2], [F4, 2],
  [D5, 4], [E5, 2], [R, 2],
  [C5, 4], [R, 2], [C5, 2], [R, 2],
  [C5, 4], [R, 8],

  // Repeat bridge 1
  [R, 2], [G5, 2], [Fs4, 2], [F4, 2],
  [D5, 4], [E5, 2], [R, 2],
  [G4, 2], [A4, 2], [C5, 2], [R, 2],
  [A4, 2], [C5, 2], [D5, 2], [R, 4],

  // Ending
  [R, 2], [Eb5, 4], [R, 2],
  [D5, 4], [R, 2],
  [C5, 4], [R, 8],
];

// Simple bass line
export const overworldBass: Note[] = [
  // Intro
  [D3, 2], [D3, 2], [R, 2], [D3, 2],
  [R, 2], [D3, 2], [D3, 2], [R, 2],
  [G3, 2], [R, 6], [G3, 2], [R, 6],

  // A section bass
  [G3, 4], [R, 2], [E3, 4], [R, 2],
  [C3, 4], [R, 2], [F3, 2], [R, 2],
  [G3, 2], [R, 2], [G3, 2], [F3, 4],

  [E3, 3], [C3, 3], [E3, 2],
  [F3, 2], [R, 2], [D3, 2], [E3, 2],
  [R, 2], [C3, 2], [R, 2], [A3, 2],
  [B3, 2], [G3, 2], [R, 4],

  // B section bass (repeat of A)
  [G3, 4], [R, 2], [E3, 4], [R, 2],
  [C3, 4], [R, 2], [F3, 2], [R, 2],
  [G3, 2], [R, 2], [G3, 2], [F3, 4],

  [E3, 3], [C3, 3], [E3, 2],
  [F3, 2], [R, 2], [D3, 2], [E3, 2],
  [R, 2], [C3, 2], [R, 2], [A3, 2],
  [B3, 2], [G3, 2], [R, 4],

  // Bridge bass
  [C3, 2], [R, 2], [G3, 2], [R, 2],
  [C3, 4], [G3, 2], [R, 2],
  [C3, 2], [F3, 2], [E3, 2], [R, 2],
  [C3, 2], [E3, 2], [F3, 2], [R, 4],

  [C3, 2], [R, 2], [G3, 2], [R, 2],
  [C3, 4], [G3, 2], [R, 2],
  [G3, 4], [R, 2], [G3, 2], [R, 2],
  [C3, 4], [R, 8],

  // Bridge repeat
  [C3, 2], [R, 2], [G3, 2], [R, 2],
  [C3, 4], [G3, 2], [R, 2],
  [C3, 2], [F3, 2], [E3, 2], [R, 2],
  [C3, 2], [E3, 2], [F3, 2], [R, 4],

  // End
  [R, 2], [F3, 4], [R, 2],
  [F3, 4], [R, 2],
  [C3, 4], [R, 8],
];

export const BPM = 200;
