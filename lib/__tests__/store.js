import createStore from '../store'

const data = {
  key: 'key',
  data: 'data',
}

test('publish will add key -> data to store and call each client once', () => {
  const { store, publish } = createStore()
  const func = jest.fn()
  publish(data, [func, func])

  expect(store).toEqual(new Map([['key', data]]))
  expect(func).toHaveBeenCalledTimes(2)
})

test('cancel will remove key from store and call each client once', () => {
  const { store, cancel } = createStore()
  const func = jest.fn()
  store.set('key', data)
  cancel(data, [func, func])

  expect(store).toEqual(new Map())
  expect(func).toHaveBeenCalledTimes(2)
})
