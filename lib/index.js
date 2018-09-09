import connect from './core'
import createStore from './store'
import createSubscriberStore from './subscriber'

export default class {
  constructor() {
    const { getClients, subscribe, unsubscribe, unsubscribeByPath } = createSubscriberStore()

    const { publish, cancel } = createStore()

    const { notify, acknowledge } = connect({ getClients, publish, cancel })

    // Public APIs
    this.notify = notify
    this.acknowledge = acknowledge
    this.subscribe = subscribe
    this.unsubscribe = unsubscribe
    this.unsubscribeByPath = unsubscribeByPath
  }
}
