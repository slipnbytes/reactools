export function isURL(value: any): boolean {
  try {
    const url = new URL(value);
    return Boolean(url);
  } catch {
    return false;
  }
}
