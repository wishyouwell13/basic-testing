// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  test('should create instance with provided base url', async () => {
    // Write your test here
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/posts');
    expect(spy).toBeCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    const spy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: null });

    await throttledGetDataFromApi('/posts');
    await jest.runOnlyPendingTimersAsync();
    expect(spy).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    // Write your test here
    const testData = { data: 'test' };
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue(testData);
    const result = await throttledGetDataFromApi('/test');
    expect(result).toBe('test');
  });
});
