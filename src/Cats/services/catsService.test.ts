import { Cat, getCats } from './catsService';
import fetchMock from 'jest-fetch-mock';
import { fold } from '@devexperts/remote-data-ts';

fetchMock.enableMocks();

describe('Cats Service', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('makes requests', async () => {
    fetchMock.mockResponseOnce('foo')
    const cats = await getCats();

    fold<Error, Cat[], void>(
      () => {},
      () => {},
      () => {},
      val => {
        expect(val).toBe('foo');
      }
    )(cats);
  });

  test('rejects with error', async () => {
    fetchMock.mockRejectOnce(new Error('Oops'))
    const cats = await getCats();

    fold<Error, Cat[], void>(
      () => {},
      () => {},
      (e) => {
        expect(e.message).toBe('Error: Oops')
      },
      () => {}
    )(cats);
  });
});
