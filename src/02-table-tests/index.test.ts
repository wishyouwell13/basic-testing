// // Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 5, action: Action.Add, expected: 15 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 10, b: 5, action: Action.Multiply, expected: 50 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 10, b: 5, action: 'test', expected: null },
  { a: 'asd', b: '5', action: Action.Subtract, expected: null },
];

describe.each(testCases)(
  'calculate: $a $action $b',
  ({ a, b, action, expected }) => {
    test(`return ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    });
  },
);
