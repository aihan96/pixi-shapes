import { Shape } from "./Shape";
import { unitStar } from "./geometry";

export class Star extends Shape {
  constructor() {
    super("star", unitStar());
  }
}
