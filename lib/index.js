import { subscribe, unsubscribe, unsubscribeAllByPath, connect } from './core'

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

const { notify, acknowledge } = connect({ publish, cancel })

export default {
  subscribe,
  unsubscribe,
  unsubscribeAllByPath,
  notify,
  acknowledge,
}
