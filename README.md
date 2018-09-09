# notification-store

A topic-based pub-sub notification system with timer support.

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

This package is also available on unpkg:

```html
<script src="https://unpkg.com/notification-store@latest/umd/index.min.js"></script>

<!-- again, these are optional components -->
<script src="https://unpkg.com/notification-store@latest/umd/subscriber.min.js"></script>
<script src="https://unpkg.com/notification-store@latest/umd/store.min.js"></script>
<script src="https://unpkg.com/notification-store@latest/umd/core.min.js"></script>
```

Then you can use it as

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

## APIs

## Internal APIs

## Integrate with Redux
