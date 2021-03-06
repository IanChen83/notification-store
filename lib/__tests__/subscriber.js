import createSubscriberStore from '../subscriber'

describe.each([
  [[], ['']],
  [['*'], ['']],
  [['a'], ['a']],
  [['a', 'b'], ['a', 'b']],
  [['a.b'], ['a', 'a.b']],
  [['b', 'a.b'], ['a', 'b', 'a.b']],
])('subscribe %p', (paths, keys) => {
  const func = jest.fn()

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

  keys.concat([undefined]).forEach(key => {
    test(`subscribers remove func after calling unsubscribeByPath(${key})`, () => {
      const { subscribe, unsubscribeByPath, subscribers } = createSubscriberStore()
      const func2 = jest.fn()
      subscribe(func, ...paths)
      subscribe(func2, 'a', 'c')
      unsubscribeByPath(key)

      expect(
        Array.from(subscribers.entries())
          .filter(pair => pair[1].size === 0)
          .map(pair => pair[0]),
      ).toEqual([])
    })
  })
})

// a, a.b, b, c, *
describe.each([
  [undefined, ['a', 'a.b', 'b', 'c']],
  ['*', ['a', 'a.b', 'b', 'c']],
  ['a', ['a', 'a.b']],
  ['a.b', ['a.b']],
  ['a.b.c', []],
  ['b', ['b']],
  ['c', ['c']],
])('getClients(%p)', (path, keys) => {
  const funcs = {}
  for (const k of ['a', 'a.b', 'b', 'c', '*']) {
    funcs[k] = jest.fn()
  }

  const { subscribe, getClients } = createSubscriberStore()
  for (const [k, v] of Object.entries(funcs)) {
    subscribe(v, k)
  }

  test(`should return functions subscribing on ${keys}`, () => {
    const results = getClients(path)
    expect(
      Object.entries(funcs)
        .filter(pair => results.has(pair[1]))
        .map(pair => pair[0])
        .sort(),
    ).toEqual(keys.sort())
  })
})
