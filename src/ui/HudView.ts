export class HudView {
  private readonly countEl: HTMLElement;
  private readonly areaEl: HTMLElement;
  private lastCount = -1;
  private lastArea = -1;

  constructor(host: HTMLElement) {
    const root = document.createElement("div");
    root.className = "hud";
    root.innerHTML = `
      <div class="hud__item">Shapes: <span data-count>0</span></div>
      <div class="hud__item">Area: <span data-area>0</span> px²</div>
    `;
    host.appendChild(root);

    this.countEl = root.querySelector("[data-count]")!;
    this.areaEl = root.querySelector("[data-area]")!;
  }

  public update(count: number, area: number): void {
    const roundedArea = Math.round(area);

    if (count !== this.lastCount) {
      this.countEl.textContent = String(count);
      this.lastCount = count;
    }
    if (roundedArea !== this.lastArea) {
      this.areaEl.textContent = roundedArea.toLocaleString();
      this.lastArea = roundedArea;
    }
  }
}
