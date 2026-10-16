import { Shape } from "./Shape";

export class Polygon extends Shape {
  private readonly sides: number;
  private readonly size: number;

  constructor(sides: number, size: number, color: number) {
    super();
    this.sides = sides;
    this.size = size;

    const points: number[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      points.push(Math.cos(angle) * size, Math.sin(angle) * size);
    }
    this.poly(points).fill(color);
  }

  public get radius(): number {
    return this.size;
  }

  public get surfaceArea(): number {
    return (
      0.5 * this.sides * this.size ** 2 * Math.sin((Math.PI * 2) / this.sides)
    );
  }
}
