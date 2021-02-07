export let LOGGER_DISABLED = false; // eslint-disable-line import/no-mutable-exports

export function disableLogger(): void {
  LOGGER_DISABLED = true;
}
