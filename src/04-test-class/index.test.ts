// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  let account: BankAccount;
  beforeEach(() => {
    account = getBankAccount(1000);
  });
  test('should create account with initial balance', () => {
    // Write your test here
    expect(account.getBalance()).toBe(1000);
    expect(account).toBeInstanceOf(BankAccount);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    expect(() => account.withdraw(10000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const testAccount: BankAccount = getBankAccount(50);
    expect(() => {
      return account.transfer(10000, testAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    expect(() => account.transfer(500, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    account.deposit(500);
    expect(account.getBalance()).toEqual(1500);
  });

  test('should withdraw money', () => {
    // Write your test here
    account.withdraw(500);
    expect(account.getBalance()).toEqual(500);
  });

  test('should transfer money', () => {
    // Write your test here
    const testAccount: BankAccount = getBankAccount(500);
    expect(() => account.transfer(500, testAccount)).not.toThrow();
    expect(account.getBalance()).toEqual(500);
    expect(testAccount.getBalance()).toEqual(1000);
  });

  test.only('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
    jest.spyOn(lodash, 'random').mockReturnValueOnce(100).mockReturnValue(1);
    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(100);
    jest.spyOn(lodash, 'random').mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(1500);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(1500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
