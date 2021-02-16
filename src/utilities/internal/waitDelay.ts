export async function waitDelay(delay: number): Promise<void> {
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
