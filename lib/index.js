import connect from './core'
import createStore from './store'
import createSubscriberStore from './subscriber'

export default class {
  constructor() {
    const {
      subscribers,
      getClients,
      subscribe,
      unsubscribe,
      unsubscribeByPath,
    } = createSubscriberStore()

    const { store, publish, cancel } = createStore()

    const { notify, acknowledge } = connect({ getClients, publish, cancel })

    // Internal APIs
    this._store = store
    this._subscribers = subscribers

    // Public APIs
    this.notify = notify
    this.acknowledge = acknowledge
    this.subscribe = subscribe
    this.unsubscribe = unsubscribe
    this.unsubscribeByPath = unsubscribeByPath
  }
}
