function broadcast(func, sink) {
  const arr = []
  for (const data of sink) {
    arr.push(data.payload)
  }

  func(arr)
}

export default () => {
  const store = new Map()

  function publish(data, funcs) {
    for (const func of funcs) {
      if (!store.has(func)) {
        store.set(func, new Set())
      }

      const sink = store.get(func)
      sink.add(data)

      broadcast(func, sink)
    }
  }

  function cancel(data, funcs) {
    for (const func of funcs) {
      if (!store.has(func)) continue

      const sink = store.get(func)
      sink.delete(data)

      broadcast(func, sink)
    }
  }

  return {
    store,
    publish,
    cancel,
  }
}
