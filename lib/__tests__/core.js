jest.useFakeTimers()

import createNotifier from '../'

describe.each([
  ['*', false, undefined],
  ['*', true, undefined],
  ['*', false, 0],
  ['*', true, 0],
  ['a', false, undefined],
  ['a', true, undefined],
  ['a', false, 10],
  ['a', true, 10],
])('notify(%p) with callback %p and persistSeconds %p', (path, hasCallback, persistSeconds) => {
  const { notify, store } = createNotifier()
  const fn = jest.fn()

  if (hasCallback) {
    if (persistSeconds === undefined) {
      notify(path, {}, fn)
    } else {
      notify(path, {}, fn, persistSeconds)
    }
  } else {
    if (persistSeconds === undefined) {
      notify(path, {})
    } else {
      notify(path, {}, persistSeconds)
    }
  }

  jest.runAllTimers()

  if (hasCallback && persistSeconds) {
    test('should call callback', () => {
      expect(fn).toHaveBeenCalledTimes(1)
    })
  }

  if (!persistSeconds) {
    test(`should have data to store`, () => {
      expect(store.size).toBe(1)
    })
  } else {
    test(`should remove data from the store`, () => {
      expect(store.size).toBe(0)
    })
  }
})
