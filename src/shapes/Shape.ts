import { Graphics } from "pixi.js";

export abstract class Shape extends Graphics {
  public velocityY = 0;

  /** Surface area in px². */
  public abstract get surfaceArea(): number;
  /** Bounding radius, used for off-screen checks. */
  public abstract get radius(): number;

  public update(dtSeconds: number, gravity: number): void {
    this.velocityY += gravity * dtSeconds;
    this.y += this.velocityY * dtSeconds;
  }

  /** True once the shape is completely below the play area. */
  public isBelow(areaHeight: number): boolean {
    return this.y - this.radius > areaHeight;
  }
}
