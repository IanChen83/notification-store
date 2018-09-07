export default ({ getClients, publish, cancel }) => {
  const cancelStore = new Map()

  function acknowledge(key) {
    return cancelStore.has(key) && cancelStore.get(key)()
  }

  function notify(path, payload, callback = null, persistSeconds = 0) {
    // callback and persistSeconds are optional
    if (typeof callback === 'number') {
      return notify(path, payload, null, callback)
    }

    const key = new Date().getTime()
    const data = {
      key,
      path,
      payload,
      callback,
    }

    publish(data, getClients(path))

    cancelStore.set(key, () => {
      cancel(data, getClients(path))
      if (callback) callback(path, payload)
      return cancelStore.delete(key)
    })

    if (persistSeconds !== 0) {
      setTimeout(acknowledge.bind(null, key), persistSeconds * 1000)
    }

    return key
  }

  return { notify, acknowledge }
}
