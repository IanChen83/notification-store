import createSubscriberStore, { createSubPaths } from '../subscriber'

describe.each([
  [['*'], ['*']],
  [['a'], ['a']],
  [['a', 'b'], ['a', 'b']],
  [['a.b', 'b'], ['a', 'b', 'a.b']],
  [['a.b.c', 'b'], ['a', 'b', 'a.b', 'a.b.c']],
])('createSubPaths %p', (paths, results) => {
  test(`should have ${results}`, () => {
    expect(createSubPaths(paths)).toEqual(new Set(results))
  })
})

describe.each([
  [[], ['*']],
  [['*'], ['*']],
  [['a'], ['a']],
  [['a', 'b'], ['a', 'b']],
  [['a.b'], ['a', 'a.b']],
  [['b', 'a.b'], ['a', 'b', 'a.b']],
])('subscribe %p', (paths, keys) => {
  const func = jest.fn()

  test(`subscribers with keys ${keys} should contains func`, () => {
    const { subscribe, subscribers } = createSubscriberStore()
    subscribe(func, ...paths)

    expect(
      Array.from(subscribers.entries())
        .filter(pair => pair[1].has(func))
        .map(pair => pair[0])
        .sort(),
    ).toEqual(keys.sort())
  })

  keys.forEach(key => {
    test(`subscribers store is empty after calling cancelFunc`, () => {
      const { subscribe, subscribers } = createSubscriberStore()
      const cancelFunc = subscribe(func, ...paths)
      cancelFunc()

      expect(subscribers.get(key)).toEqual(new Set())
    })
  })

  keys.forEach(key => {
    test(`subscribers store is empty after unsubscribing func`, () => {
      const { subscribe, unsubscribe, subscribers } = createSubscriberStore()
      subscribe(func, ...paths)
      unsubscribe(func)

      expect(subscribers.get(key)).toEqual(new Set())
    })
  })
})