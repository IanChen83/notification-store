import connect from './core'
import createStore from './store'
import createSubscriberStore from './subscriber'

export default () => {
  const {
    subscribers,
    getClients,
    subscribe,
    unsubscribe,
    unsubscribeAllByPath,
  } = createSubscriberStore()

  const { store, publish, cancel } = createStore()

  const { notify, acknowledge } = connect({ getClients, publish, cancel })

  return {
    subscribers,
    store,
    notify,
    acknowledge,
    subscribe,
    unsubscribe,
    unsubscribeAllByPath,
  }
}
