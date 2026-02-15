# Super Mario Bros World 1-1

Recreation of Super Mario Bros World 1-1 using TypeScript + HTML5 Canvas + Vite.

## Quick Start
```bash
npm install
npm run dev
```

## Controls
- Arrow keys / WASD: Move
- Space / Up: Jump
- Shift / Z: Run / Fire (when Fire Mario)
- Enter: Start game

## Tech Stack
- TypeScript + HTML5 Canvas (no game frameworks)
- Vite dev server
- Web Audio API for procedural SFX + music
- NES resolution: 256x240, CSS-scaled 3x

## Architecture
- State pattern for game flow (Title, Playing, Death, GameOver, LevelComplete)
- EventBus for decoupled game events
- Separate-axis tile collision (resolve X then Y)
- Pre-rendered pixel art sprites on OffscreenCanvas
- Fixed timestep game loop at 60fps
