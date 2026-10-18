import { Shape } from "./Shape";
import { unitCircle } from "./geometry";

export class Circle extends Shape {
  constructor() {
    super("circle", unitCircle());
  }
}
