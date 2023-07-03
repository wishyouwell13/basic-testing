// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  expect.assertions(1);
  test('should resolve provided value', async () => {
    const value = 'test value';
    await expect(resolveValue(value)).resolves.toBe(value);
  });
});

describe('throwError', () => {
  const msg = 'test error';
  expect.assertions(2);

  test('should throw error with provided message', () => {
    expect(() => throwError(msg)).toThrow(msg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  expect.assertions(1);
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  expect.assertions(1);
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
