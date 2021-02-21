import { isUndefinedOrNull } from '@/utilities/internal/isUndefinedOrNull';

type LogMethod = (message: string) => void;

type LogCallback = (message: string, stackTrace: string) => void;

let LOGGER_DISABLED = false;

export const logger = {
  /* eslint-disable no-console */

  info: middleware(message => {
    console.log(message);
  }),
  warn: middleware(message => {
    console.warn(message);
  }),
  error: middleware((message, stackTrace) => {
    console.error(`Error: ${message}\n${stackTrace}`);
  }),

  /* eslint-enable no-console */

  disable(): void {
    LOGGER_DISABLED = true;
  },
};

/**
 * Methods that have been taken to capture the stack.
 */
const TRACES_TRAVELED = 3;
const DEFAULT_MESSAGE = 'Message not defined.';

function middleware(callback: LogCallback): LogMethod {
  return (message: string): void => {
    if (LOGGER_DISABLED) {
      return;
    }

    const stackTrace = getStackTrace();
    const parsedMessage = parseMessage(message);

    callback(parsedMessage, stackTrace);
  };
}

function getStackTrace(): string {
  const stackTraceObject = { stack: '' };

  Error.captureStackTrace(stackTraceObject);
  return stackTraceObject.stack.split(/\n/g).slice(TRACES_TRAVELED).join('\n');
}

function parseMessage(message: any): string {
  if (isUndefinedOrNull(message)) {
    return DEFAULT_MESSAGE;
  }

  if (typeof message === 'string' || message.toString === 'function') {
    return message.toString();
  }

  return DEFAULT_MESSAGE;
}
