import { Shape } from "./Shape";
import { regularPolygon } from "./geometry";

const SIDES = { triangle: 3, square: 4, pentagon: 5, hexagon: 6 } as const;
export type PolygonKind = keyof typeof SIDES;

export class Polygon extends Shape {
  constructor(kind: PolygonKind) {
    super(kind, regularPolygon(SIDES[kind]));
  }
}
