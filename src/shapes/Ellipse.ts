import { Shape } from "./Shape";
import { unitCircle } from "./geometry";

export class Ellipse extends Shape {
  constructor() {
    super("ellipse", unitCircle());
  }
}
