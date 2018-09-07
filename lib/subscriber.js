export default () => {
  const subscribers = new Map()
  subscribers.set('*', new Set())

  function getClients(path) {
    const clients = new Set(subscribers.get('*'))
    if (subscribers.has(path)) {
      for (const func of subscribers.get(path)) {
        clients.add(func)
      }
    }
    return clients
  }

  function subscribe(func, ...paths) {
    if (paths.length === 0) paths.push('*')

    const subPaths = createSubPaths(paths)

    for (const p of subPaths) {
      if (!subscribers.has(p)) {
        subscribers.set(p, new Set())
      }

      subscribers.get(p).add(func)
    }

    // Return unsubscribe function
    return () => {
      for (const p of subPaths) {
        if (subscribers.has(p)) {
          subscribers.get(p).delete(func)
        }
      }
    }
  }

  function unsubscribe(func) {
    for (const p of subscribers.keys()) {
      subscribers.get(p).delete(func)
    }
  }

  function unsubscribeAllByPath(path = '') {
    for (const p of subscribers.keys()) {
      if (p.startsWith(path)) {
        subscribers.delete(p)
      }
    }
  }

  return {
    subscribers,
    subscribe,
    unsubscribe,
    unsubscribeAllByPath,
  }
}