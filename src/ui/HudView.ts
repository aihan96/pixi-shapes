export class HudView {
  private readonly countEl: HTMLElement;
  private readonly areaEl: HTMLElement;
  private lastCount = -1;
  private lastArea = -1;

  constructor(host: HTMLElement) {
    const fragment = document.createDocumentFragment();

    const root = document.createElement("div");
    root.className = "hud";

    this.countEl = document.createElement("span");
    this.countEl.textContent = "0";
    root.appendChild(this.createItem("Shapes: ", this.countEl));

    this.areaEl = document.createElement("span");
    this.areaEl.textContent = "0";
    root.appendChild(this.createItem("Area: ", this.areaEl, " px²"));

    fragment.appendChild(root);
    host.appendChild(fragment);
  }

  private createItem(
    label: string,
    valueEl: HTMLSpanElement,
    suffix = "",
  ): HTMLDivElement {
    const item = document.createElement("div");
    item.className = "hud-item";
    item.append(label, valueEl, suffix);
    return item;
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
