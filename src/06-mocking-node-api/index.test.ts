// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    // Write your test here
    const cb = jest.fn();
    const spy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, 500);
    expect(spy).toHaveBeenCalledWith(cb, 500);
  });

  test('should call callback only after timeout', () => {
    // Write your test here
    const cb = jest.fn();
    doStuffByTimeout(cb, 500);
    // At this point in time, the callback should not have been called yet
    expect(cb).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our cb should have been called!
    expect(cb).toBeCalled();
    // expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    // Write your test here
    const cb = jest.fn();
    const spy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, 500);
    expect(spy).toHaveBeenCalledWith(cb, 500);
  });

  test.only('should call callback multiple times after multiple intervals', () => {
    // Write your test here
    const cb = jest.fn();

    doStuffByInterval(cb, 100);
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
    const spy = jest.spyOn(path, 'join');
    const pathToFile = './index.ts';
    await readFileAsynchronously(pathToFile);
    expect(spy).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const pathToFile = './void.ts';
    const data = await readFileAsynchronously(pathToFile);
    expect(data).toBeNull();
  });

  test.only('should return file content if file exists', async () => {
    // Write your test here
    const data = 'some data';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    // jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(data);

    const result = await readFileAsynchronously('./void.ts');
    expect(result).toBe(data);
  });
});
