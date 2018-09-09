import createStore from '../store'

const data = {
  key: 'key',
  data: 'data',
}

const data2 = {
  key: 'key',
  data: 'data',
}

test('publish will call each client once', () => {
  const { publish } = createStore()
  const func1 = jest.fn()
  const func2 = jest.fn()
  publish(data, [func1, func2])
  publish(data2, [func1])

  expect(func1).toHaveBeenCalledTimes(2)
  expect(func2).toHaveBeenCalledTimes(1)
})

test('cancel will call each client once', () => {
  const { publish, cancel } = createStore()
  const func1 = jest.fn()
  const func2 = jest.fn()
  publish(data, [func1])
  cancel(data, [func1, func2])

  expect(func1).toHaveBeenCalledTimes(2)
  expect(func2).toHaveBeenCalledTimes(0)
})
