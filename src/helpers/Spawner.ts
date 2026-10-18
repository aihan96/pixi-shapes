import type { Settings } from '../config/Settings';

export class Spawner {
  private accumulator = 0;
  private readonly settings: Settings;
  private readonly onSpawn: () => void;

  constructor(settings: Settings, onSpawn: () => void) {
    this.settings = settings;
    this.onSpawn = onSpawn;
  }

  public update(dtSeconds: number): void {
    this.accumulator += dtSeconds * this.settings.spawnRate;
    while (this.accumulator >= 1) {
      this.accumulator -= 1;
      this.onSpawn();
    }
  }
}