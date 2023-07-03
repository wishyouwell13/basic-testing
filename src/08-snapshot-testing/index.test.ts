// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    // Write your test here
    const linkedList = generateLinkedList([1, 1]);
    const example = {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 1,
      },
      value: 1,
    };
    expect(linkedList).toStrictEqual(example);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    // Write your test here
    const linkedList = generateLinkedList([2, 2]);
    expect(linkedList).toMatchSnapshot();
  });
});
