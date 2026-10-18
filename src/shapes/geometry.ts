import { GraphicsContext } from "pixi.js";

export interface Geometry {
  context: GraphicsContext;
  area: number;
  radius: number;
}

const WHITE = 0xffffff;
const cache = new Map<string, Geometry>();

function cached(key: string, build: () => Geometry): Geometry {
  let geometry = cache.get(key);
  if (geometry) return geometry;
  geometry = build();
  cache.set(key, geometry);
  return geometry;
}

export function regularPolygon(sides: number): Geometry {
  return cached(`poly${sides}`, () => {
    const points: number[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      points.push(Math.cos(angle), Math.sin(angle));
    }
    return {
      context: new GraphicsContext().poly(points).fill(WHITE),
      area: 0.5 * sides * Math.sin((Math.PI * 2) / sides),
      radius: 1,
    };
  });
}

export function unitCircle(): Geometry {
  return cached("circle", () => ({
    context: new GraphicsContext().circle(0, 0, 1).fill(WHITE),
    area: Math.PI,
    radius: 1,
  }));
}

export function unitStar(spikes = 5): Geometry {
  return cached(`star${spikes}`, () => {
    const inner = 0.45;
    const points: number[] = [];
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? 1 : inner;
      const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
      points.push(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    return {
      context: new GraphicsContext().poly(points).fill(WHITE),
      area: polygonAreaOf(points),
      radius: 1,
    };
  });
}

function polygonAreaOf(points: number[]): number {
  let sum = 0;
  const n = points.length / 2;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sum +=
      points[i * 2] * points[j * 2 + 1] - points[j * 2] * points[i * 2 + 1];
  }
  return Math.abs(sum) / 2;
}
