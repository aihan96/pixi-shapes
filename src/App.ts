import { Application, Container, Graphics } from "pixi.js";
import type { FederatedPointerEvent } from "pixi.js";
import { Settings } from "./config/Settings";
import { ShapeFactory } from "./factories/ShapeFactory";
import { Spawner } from "./helpers/Spawner";
import { HudView } from "./ui/HudView";
import { Controls } from "./ui/Controls";
import { Shape } from "./shapes/Shape";
import { ShapePool } from "./pools/ShapePool";
// import { initDevtools } from "@pixi/devtools";

export class App {
  private readonly pixi = new Application();
  private readonly world = new Container();
  private readonly mask = new Graphics();
  private readonly settings = new Settings();
  private readonly shapes: Shape[] = [];
  private readonly pool = new ShapePool((kind) => ShapeFactory.build(kind));
  private readonly spawner = new Spawner(this.settings, () =>
    this.spawnAtTop(),
  );
  private hud!: HudView;

  public async init(host: HTMLElement): Promise<void> {
    await this.pixi.init({
      resizeTo: host,
      background: "#1e1e2e",
      antialias: true,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio, 2),
    });
    host.appendChild(this.pixi.canvas);
    // initDevtools({
    //   app: this.pixi,
    // });
    this.hud = new HudView(host);
    new Controls(host, this.settings);

    this.pixi.stage.addChild(this.world, this.mask);
    this.world.mask = this.mask;
    this.drawMask();
    this.pixi.renderer.on("resize", () => this.drawMask());

    this.pixi.stage.eventMode = "static";
    this.pixi.stage.hitArea = this.pixi.screen;
    this.pixi.stage.on("pointerdown", (e: FederatedPointerEvent) => {
      // console.log("🚀 ~ App ~ init ~ e.target:", e.target);
      if (e.target instanceof Shape) {
        this.removeShape(e.target);
        return;
      }
      this.addShape(ShapeFactory.createIrregular(), e.global.x, e.global.y);
    });

    this.pixi.ticker.add((ticker) => {
      const dt = Math.min(ticker.deltaMS / 1000, 0.05);
      this.spawner.update(dt);
      this.updateShapes(dt);
    });
  }

  private spawnAtTop(): void {
    const shape = ShapeFactory.createRandom(this.pool);
    this.addShape(shape, Math.random() * this.pixi.screen.width, -shape.radius);
  }

  private addShape(shape: Shape, x: number, y: number): void {
    shape.position.set(x, y);
    this.world.addChild(shape);
    this.shapes.push(shape);
    this.refreshHud();
  }

  private removeShape(shape: Shape): void {
    const index = this.shapes.indexOf(shape);
    if (index === -1) return;
    this.shapes.splice(index, 1);
    this.pool.release(shape);
    this.refreshHud();
  }

  private updateShapes(dt: number): void {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      const shape = this.shapes[i];
      shape.update(dt, this.settings.gravity);
      if (shape.isBelow(this.pixi.screen.height)) {
        this.removeShape(shape);
      }
    }
  }

  private drawMask(): void {
    const { width, height } = this.pixi.screen;
    this.mask.clear().rect(0, 0, width, height).fill(0xffffff);
  }

  private refreshHud(): void {
    let area = 0;
    for (const shape of this.shapes) area += shape.surfaceArea;
    this.hud.update(this.shapes.length, area);
  }
}
