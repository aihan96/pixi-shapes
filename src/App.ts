import { Application, Container, Graphics } from 'pixi.js';
import { Settings } from './config/Settings';
import { Polygon } from './shapes/Polygon';
import type { Shape } from './shapes/Shape';

export class App {
  private readonly pixi = new Application();
  private readonly world = new Container();
  private readonly mask = new Graphics();
  private readonly settings = new Settings();
  private testShape!: Shape; // temporary, replaced by the Spawner later

  public async init(host: HTMLElement): Promise<void> {
    await this.pixi.init({
      resizeTo: host,
      background: '#1e1e2e',
      antialias: true,
      autoDensity: true,
      resolution: Math.min(window.devicePixelRatio, 2),
    });
    host.appendChild(this.pixi.canvas);

    this.pixi.stage.addChild(this.world, this.mask);
    this.world.mask = this.mask;
    this.drawMask();
    this.pixi.renderer.on('resize', () => this.drawMask());

    this.testShape = new Polygon(5, 40, 0xa6e3a1);
    this.resetTestShape();
    this.world.addChild(this.testShape);

    this.pixi.ticker.add((ticker) => {
      // Clamp so a background tab doesn't cause a huge jump.
      const dt = Math.min(ticker.deltaMS / 1000, 0.05);
      this.testShape.update(dt, this.settings.gravity);
      if (this.testShape.isBelow(this.pixi.screen.height)) {
        this.resetTestShape();
      }
    });
  }

  private drawMask(): void {
    const { width, height } = this.pixi.screen;
    this.mask.clear().rect(0, 0, width, height).fill(0xffffff);
  }

  private resetTestShape(): void {
    this.testShape.velocityY = 0;
    this.testShape.x = Math.random() * this.pixi.screen.width;
    this.testShape.y = -this.testShape.radius; // fully above the top edge
  }
}