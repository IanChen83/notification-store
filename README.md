# notification-store

A topic-based pub-sub notification system with timer support. This library can
be used as a global notification store for your app.

![Travis (.com)](https://img.shields.io/travis/com/IanChen83/notification-store.svg?style=flat-square)![Coveralls github](https://img.shields.io/coveralls/github/IanChen83/notification-store.svg?style=flat-square)![npm](https://img.shields.io/npm/v/notification-store.svg?style=flat-square)![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/notification-store.svg?style=flat-square)

## Installation

This package is available on npm:

```shell
$ npm install --save notification-store
```

Then, we recommend use it with a module bundler like Webpack

```javascript
import NotificationStore from 'notification-store'

// If you want to roll your own store
import createSubscriberStore from 'notification-store/subscriber'
import createStore from 'notification-store/store'
import connect from 'notification-store/core'
```

Alternatively, this package is available on unpkg:

```html
<script src="https://unpkg.com/notification-store@latest/umd/index.min.js"></script>

<!-- again, these are optional components -->
<script src="https://unpkg.com/notification-store@latest/umd/subscriber.min.js"></script>
<script src="https://unpkg.com/notification-store@latest/umd/store.min.js"></script>
<script src="https://unpkg.com/notification-store@latest/umd/core.min.js"></script>
```

and can be used as

```javascript
new NotificationStore()

// and
NotificationStore.createSubscriberStore()
NotificationStore.createStore()
NotificationStore.connect()
```

## Quick Start

The main script expose a single class with member functions manipulating the store. A minimal example looks like this:

```javascript
const { notify, subscribe } = new NotificationStore()

const button = document.querySelector('#button')

button.addEventListener('click', () => {
  notify('count', {}, 3000)
})

subscribe(arr => (button.innerText = arr.length), 'count')
```

See this [CodePen](https://codepen.io/ianchen83/pen/qMpREa) for live demo.

## APIs

- `subscribe(func, [...paths])`:
  when notified on any of the `paths` (and their subdomains), `func` will
  be called.

  - `func(arr)`:
    `arr` is a list of data (in insertion order) under a path being notified.
  - `paths`: if omitted, the function will subscribe to all paths (so it will
    be notified for all paths.)

- `unsubscribe(func)`:
  unsubscribe the function.

- `unsubscribeByPath(path)`:
  remove all subscribers under `path`.

- `notify(path, payload, callback = null, duration = -1)`:
  notify on `path` with `payload`. Return a key so you can acknowledge it (see
  below). The content/pattern of the key is an implementation detail.

  - `path`: a string indicating what will be notified.
  - `payload`: an object. Notice that this parameter is required.
  - `callback(path, payload)`: optional. If provided, it will be called when
    the payload is removed from the store.
  - `duration`: optional. If it is bigger than zero, it will be automatically
    removed in `duration` (ms).

- `acknowledge(key)`:
  Remove the payload from the store.

## Internal APIs

#### `createSubscriberStore()` from 'notification-store/subscriber'

This function will return an object

```javascript
{
  getClients,
  subscribe,
  unsubscribe,
  unsubscribeByPath,
}
```

and expose one more function `getClients`

- `getClients(path = '*')`:
  return a set of functions subscribing to this `path`.
  - `path`: if omitted, all functions will be returned.

#### `createStore()` from 'notification-store/store'

This function will return an object

```javascript
{
  publish,
  cancel,
}
```

- `publish(data, funcs)`:
  this function adds data to the store and calls all funcs with a list of
  payload.

  - data: an object with shape `{ key, callback, duration, payload }`
  - funcs: a iterable containing all functions that will be notified.

- `cancel(data, funcs)`:
  this function removes data from the store and calls all funcs with a list of
  payload.
  - data: an object with shape `{ key, callback, duration, payload }`
  - funcs: a iterable containing all functions that will be notified.

#### `connect` from 'notification-store/core'

- `connect({ getClients, publish, cancel })`:
  This function connects subscribers and store together and returns
  `{ notify, acknowledge }`.

## Integration with Redux

Redux manages a global state and can only be updated by dispatching an action.
Therefore, to integrate this library with Redux, you should:

1. Write your own `publish` and `cancel` functions. They act as reducers to
   add/remove data from the store of Redux.
2. Subscribe to '\*' with a function that dispatch update action each time
   notified.
3. Similar to `lib/index.js`, connect `getClients` (from
   `notification-store/subscribers`), `publish`, and `cancel`, get the
   `notify` and `cancel` function.

**TODO** an example
