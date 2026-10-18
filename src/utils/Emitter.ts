export type Listener<T> = (payload: T) => void;

export class Emitter<T> {
  private readonly listeners = new Set<Listener<T>>();

  public subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public emit(payload: T): void {
    for (const listener of this.listeners) listener(payload);
  }
}
