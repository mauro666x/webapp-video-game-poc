// Pre-renders pixel art sprites onto OffscreenCanvas for fast drawImage() at runtime

export type SpriteMap = Map<string, HTMLCanvasElement>;

export function createCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function drawPixels(ctx: CanvasRenderingContext2D, pixels: string[], colorMap: Record<string, string>, offsetX = 0, offsetY = 0): void {
  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[y].length; x++) {
      const char = pixels[y][x];
      if (char === '.' || char === ' ') continue;
      const color = colorMap[char];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(offsetX + x, offsetY + y, 1, 1);
      }
    }
  }
}

export function createSprite(w: number, h: number, pixels: string[], colorMap: Record<string, string>): HTMLCanvasElement {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d')!;
  drawPixels(ctx, pixels, colorMap);
  return canvas;
}

export function flipHorizontal(sprite: HTMLCanvasElement): HTMLCanvasElement {
  const canvas = createCanvas(sprite.width, sprite.height);
  const ctx = canvas.getContext('2d')!;
  ctx.scale(-1, 1);
  ctx.drawImage(sprite, -sprite.width, 0);
  return canvas;
}
