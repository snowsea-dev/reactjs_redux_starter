import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

import setupStore from 'redux/setup'
import Root from 'containers/Root'

import 'styles/styles.css'

const store = setupStore()
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={store.history}>
          <Root />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
