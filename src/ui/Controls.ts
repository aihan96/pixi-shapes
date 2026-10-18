import { Settings } from "../config/Settings";

export class Controls {
  private readonly settings: Settings;
  private readonly rateValue: HTMLElement;
  private readonly gravityValue: HTMLElement;

  constructor(host: HTMLElement, settings: Settings) {
    this.settings = settings;

    const root = document.createElement("div");
    root.className = "controls";
    host.appendChild(root);

    this.rateValue = this.addGroup(
      root,
      "Shapes / sec",
      () => (settings.spawnRate -= Settings.RATE_STEP),
      () => (settings.spawnRate += Settings.RATE_STEP),
    );
    this.gravityValue = this.addGroup(
      root,
      "Gravity",
      () => (settings.gravity -= Settings.GRAVITY_STEP),
      () => (settings.gravity += Settings.GRAVITY_STEP),
    );

    settings.changed.subscribe(() => this.render());
    this.render();
  }

  private addGroup(
    root: HTMLElement,
    label: string,
    onMinus: () => void,
    onPlus: () => void,
  ): HTMLElement {
    const group = document.createElement("div");
    group.className = "controls-group";

    const title = document.createElement("span");
    title.className = "controls-label";
    title.textContent = label;

    const value = document.createElement("span");
    value.className = "controls-value";

    group.append(
      title,
      this.makeButton("−", `Decrease ${label}`, onMinus),
      value,
      this.makeButton("+", `Increase ${label}`, onPlus),
    );
    root.appendChild(group);
    return value;
  }

  private makeButton(
    text: string,
    ariaLabel: string,
    onClick: () => void,
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "controls-btn";
    button.textContent = text;
    button.setAttribute("aria-label", ariaLabel);
    button.addEventListener("click", onClick);
    return button;
  }

  private render(): void {
    this.rateValue.textContent = String(this.settings.spawnRate);
    this.gravityValue.textContent = String(this.settings.gravity);
  }
}
