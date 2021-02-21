// By -> https://github.com/testing-library/react-testing-library/issues/459#issuecomment-522689191

const originalError = console.error; // eslint-disable-line no-console

export function disableACTErrors(): void {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      const firstArg = args[0];

      if (
        typeof firstArg === 'string' &&
        DISABLED_MESSAGES.some(disabledMessage =>
          firstArg.includes(disabledMessage),
        )
      ) {
        return;
      }

      originalError.call(console, args);
    });
  });
}

const DISABLED_MESSAGES = [
  "Warning: It looks like you're using the wrong act() around your test interactions.",
];
