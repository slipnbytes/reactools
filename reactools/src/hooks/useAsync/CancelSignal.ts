import { isFunction } from '@/utilities/internal/isFunction';

import type { Listener } from '@/shared/types';

export class CancelSignal {
  readonly #listeners: Listener[] = [];

  get listeners(): Listener[] {
    return [...this.#listeners];
  }

  public on(listener: Listener): void {
    if (!isFunction(listener)) {
      throw new TypeError('The provided listener is not a function.');
    }

    this.#listeners.push(listener);
  }

  public off(listener: Listener): void {
    const filteredListeners = this.#listeners.filter(
      currentListener => currentListener !== listener,
    );

    this.#listeners.splice(0, this.#listeners.length, ...filteredListeners);
  }
}
