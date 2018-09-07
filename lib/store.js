export default () => {
  const store = new Map()

  function publish(data, clients) {
    const { key } = data
    store.set(key, data)
    for (const client of clients) client(store)
  }

  function cancel({ key }, clients) {
    store.delete(key)
    for (const client of clients) client(store)
  }

  return {
    store,
    publish,
    cancel,
  }
}
