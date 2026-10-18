import type { Shape, ShapeKind } from "../shapes/Shape";

export class ShapePool {
  private readonly free = new Map<ShapeKind, Shape[]>();
  private readonly create: (kind: ShapeKind) => Shape;
  private readonly maxPerKind: number;

  constructor(create: (kind: ShapeKind) => Shape, maxPerKind = 40) {
    this.create = create;
    this.maxPerKind = maxPerKind;
  }

  public acquire(kind: ShapeKind): Shape {
    return this.free.get(kind)?.pop() ?? this.create(kind);
  }

  public release(shape: Shape): void {
    shape.removeFromParent();

    const kind = shape.kind;
    if (kind === null) {
      shape.destroy({ context: true });
      return;
    }

    let list = this.free.get(kind);
    if (!list) {
      list = [];
      this.free.set(kind, list);
    }

    if (list.length >= this.maxPerKind) {
      shape.destroy(); // pool is full
      return;
    }
    list.push(shape);
  }
}
