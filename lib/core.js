export const ADD_ACTION = 'ADD_ACTION'
export const DEL_ACTION = 'DEL_ACTION'

const SUBSCRIBERS = new Map()
SUBSCRIBERS.set('*', new Set())

function createSubPaths(paths) {
  if ('*' in paths) return new Set('*')

  const subPaths = new Set()
  for (const p of paths) {
    let i = p.indexOf('.')
    while (i !== -1) {
      subPaths.add(p.substr(0, i))
      i = p.indexOf('.', i + 1)
    }

    if (p) subPaths.add(p)
  }

  return subPaths
}

function getClients(path) {
  const clients = new Set(SUBSCRIBERS.get('*'))
  if (SUBSCRIBERS.has(path)) {
    for (const func of SUBSCRIBERS.get(path)) {
      clients.add(func)
    }
  }
  return clients
}

export function subscribe(func, ...paths) {
  if (paths.length === 0) paths.push('*')

  const subPaths = createSubPaths(paths)

  for (const p of subPaths) {
    if (!SUBSCRIBERS.has(p)) {
      SUBSCRIBERS.set(p, new Set())
    }

    SUBSCRIBERS.get(p).add(func)
  }

  // Return unsubscribe function
  return () => {
    for (const p of subPaths) {
      if (SUBSCRIBERS.has(p)) {
        SUBSCRIBERS.get(p).delete(func)
      }
    }
  }
}

export function unsubscribe(func) {
  for (const p of SUBSCRIBERS.keys()) {
    SUBSCRIBERS.get(p).delete(func)
  }
}

export function unsubscribeAllByPath(path = '') {
  for (const p of SUBSCRIBERS.keys()) {
    if (p.startsWith(path)) {
      SUBSCRIBERS.delete(p)
    }
  }
}

export function connect({ publish, cancel }) {
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
