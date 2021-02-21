import { CancelSignal } from './CancelSignal';

export class CancelController {
  readonly #signal = new CancelSignal();

  get signal(): CancelSignal {
    return this.#signal;
  }

  public cancel(): void {
    const { listeners } = this.#signal;

    listeners.forEach(listener => {
      listener();
    });
  }
}
