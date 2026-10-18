export function randomRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randomColor(): number {
  const h = Math.random() * 360;
  const s = 0.7;
  const l = 0.6;
  const a = s * Math.min(l, 1 - l);
  const k = (n: number) => (n + h / 30) % 12;
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  const to = (x: number) => Math.round(x * 255);
  return (to(f(0)) << 16) | (to(f(8)) << 8) | to(f(4));
}

// Shoelace formula. points = [x0, y0, x1, y1, ...]
export function polygonArea(points: number[]): number {
  let sum = 0;
  const n = points.length / 2;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sum +=
      points[i * 2] * points[j * 2 + 1] - points[j * 2] * points[i * 2 + 1];
  }
  return Math.abs(sum) / 2;
}
