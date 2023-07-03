// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,

    mockOne: () => 'mock one',
    mockTwo: () => 'mock two',
    mockThree: () => 'mock three',
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Write your test here
    const consoleMock = jest.spyOn(global.console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(consoleMock).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const consoleMock = jest.spyOn(global.console, 'log');
    unmockedFunction();
    expect(consoleMock).toHaveBeenCalled();
  });
});
