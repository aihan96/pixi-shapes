import { Emitter } from "../utils/Emitter";

export interface SettingsSnapshot {
  gravity: number;
  spawnRate: number;
}

const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v));

export class Settings {
  public static readonly GRAVITY_STEP = 50;
  public static readonly RATE_STEP = 1;

  public readonly changed = new Emitter<SettingsSnapshot>();

  private _gravity = 300;
  private _spawnRate = 1;

  public get gravity(): number {
    return this._gravity;
  }
  public set gravity(value: number) {
    const next = clamp(value, 0, 1000);
    if (next === this._gravity) return;
    this._gravity = next;
    this.notify();
  }

  public get spawnRate(): number {
    return this._spawnRate;
  }
  public set spawnRate(value: number) {
    const next = clamp(value, 0, 20);
    if (next === this._spawnRate) return;
    this._spawnRate = next;
    this.notify();
  }

  private notify(): void {
    this.changed.emit({ gravity: this._gravity, spawnRate: this._spawnRate });
  }
}
