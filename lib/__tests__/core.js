jest.useFakeTimers()

import NotificationStore from '../'

describe.each([
  ['*', false, undefined],
  ['*', true, undefined],
  ['*', false, -1],
  ['*', true, -1],
  ['a', false, undefined],
  ['a', true, undefined],
  ['a', false, 0],
  ['a', true, 0],
])('notify(%p) with callback %p and duration %p', (path, hasCallback, duration) => {
  const { notify } = new NotificationStore()
  const fn = jest.fn()

  if (hasCallback) {
    if (duration === undefined) {
      notify(path, {}, fn)
    } else {
      notify(path, {}, fn, duration)
    }
  } else {
    if (duration === undefined) {
      notify(path, {})
    } else {
      notify(path, {}, duration)
    }
  }

  jest.runAllTimers()

  if (hasCallback && duration >= 0) {
    test('should call callback', () => {
      expect(fn).toHaveBeenCalledTimes(1)
    })
  } else {
    test("shouldn't call callback", () => {
      expect(fn).toHaveBeenCalledTimes(0)
    })
  }
})
