import type { Shape, ShapeKind } from "../shapes/Shape";
import { Polygon } from "../shapes/Polygon";
import { Circle } from "../shapes/Circle";
import { Ellipse } from "../shapes/Ellipse";
import { Star } from "../shapes/Star";
import { IrregularShape } from "../shapes/IrregularShape";
import type { ShapePool } from "../pools/ShapePool";
import { randomColor, randomRange } from "../utils/random";

const KINDS: readonly ShapeKind[] = [
  "triangle",
  "square",
  "pentagon",
  "hexagon",
  "circle",
  "ellipse",
  "star",
];

export class ShapeFactory {
  public static build(kind: ShapeKind): Shape {
    switch (kind) {
      case "triangle":
      case "square":
      case "pentagon":
      case "hexagon":
        return new Polygon(kind);
      case "circle":
        return new Circle();
      case "ellipse":
        return new Ellipse();
      case "star":
        return new Star();
    }
  }

  public static createRandom(pool: ShapePool): Shape {
    const kind = KINDS[Math.floor(Math.random() * KINDS.length)];
    const shape = pool.acquire(kind);

    const size = randomRange(20, 50);
    const squash = kind === "ellipse" ? randomRange(0.4, 0.7) : 1;
    shape.configure(size, size * squash, randomColor());
    return shape;
  }

  public static createIrregular(): Shape {
    return new IrregularShape(randomRange(25, 55), randomColor());
  }
}
