/* eslint-disable no-console */

import { LOGGER_DISABLED } from '@/constants/logger';

import { isUndefinedOrNull } from './isUndefinedOrNull';

type LogMethod = (message: string) => void;

type LogCallback = (message: string, stackTrace: string) => void;

export const logger = {
  info: middleware(message => {
    console.log(message);
  }),
  error: middleware((message, stackTrace) => {
    console.log(`Error: ${message}\n${stackTrace}`);
  }),
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
