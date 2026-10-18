import { GraphicsContext } from "pixi.js";
import { Shape } from "./Shape";
import type { Geometry } from "./geometry";
import { polygonArea, randomRange } from "../utils/random";

function buildGeometry(size: number): Geometry {
  const count = Math.floor(randomRange(6, 11));
  const angles = Array.from(
    { length: count },
    () => Math.random() * Math.PI * 2,
  ).sort(
    (a, b) => a - b, //keep the outline from crossing itself
  );

  const points: number[] = [];
  for (const angle of angles) {
    const r = randomRange(0.4, 1) * size;
    points.push(Math.cos(angle) * r, Math.sin(angle) * r);
  }

  return {
    context: new GraphicsContext().poly(points).fill(0xffffff),
    area: polygonArea(points),
    radius: size,
  };
}

export class IrregularShape extends Shape {
  constructor(size: number, color: number) {
    super(null, buildGeometry(size));
    this.configure(1, 1, color);
  }
}
