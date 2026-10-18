import { Graphics } from "pixi.js";
import type { Geometry } from "./geometry";

export type ShapeKind =
  | "triangle"
  | "square"
  | "pentagon"
  | "hexagon"
  | "circle"
  | "ellipse"
  | "star";

export abstract class Shape extends Graphics {
  public velocityY = 0;
  public readonly kind: ShapeKind | null;

  private readonly unitArea: number;
  private readonly unitRadius: number;

  protected constructor(kind: ShapeKind | null, geometry: Geometry) {
    super(geometry.context);
    this.kind = kind;
    this.unitArea = geometry.area;
    this.unitRadius = geometry.radius;
    this.eventMode = "static";
    this.cursor = "pointer";
  }

  public configure(scaleX: number, scaleY: number, color: number): void {
    this.scale.set(scaleX, scaleY);
    this.tint = color;
    this.velocityY = 0;
  }

  public get surfaceArea(): number {
    return this.unitArea * Math.abs(this.scale.x * this.scale.y);
  }

  public get radius(): number {
    return (
      this.unitRadius * Math.max(Math.abs(this.scale.x), Math.abs(this.scale.y))
    );
  }

  public update(dtSeconds: number, gravity: number): void {
    this.velocityY += gravity * dtSeconds;
    this.y += this.velocityY * dtSeconds;
  }

  public isBelow(areaHeight: number): boolean {
    return this.y - this.radius > areaHeight;
  }
}
