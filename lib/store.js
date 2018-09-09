function broadcast(store, clients) {
  const arr = Array.from(store.values()).map(obj => obj.payload)
  for (const func of clients) func(arr)
}

export default () => {
  const store = new Map()

  function publish(data, clients) {
    const { key } = data
    store.set(key, data)
    broadcast(store, clients)
  }

  function cancel({ key }, clients) {
    store.delete(key)
    broadcast(store, clients)
  }

  return {
    store,
    publish,
    cancel,
  }
}
