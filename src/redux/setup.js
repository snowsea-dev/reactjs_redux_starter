import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createBrowserHistory from 'history/createBrowserHistory'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import Immutable from 'seamless-immutable'
import rootReducer from './reducers'

function setupStore(initialState = Immutable({})) {
  const sagaMiddleware = createSagaMiddleware()
  const history = createBrowserHistory()

  // middlewares and store enhancers
  const middlewares = [
    sagaMiddleware, // for running saga
    routerMiddleware(history), // for dispatching history actions
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  // add redux dev tool extension
  if (process.env.NODE_ENV === 'development') {
    // enable DevTools only when rendering during development.
    if (window.devToolsExtension) {
      enhancers.push(window.devToolsExtension())
    }
  }

  const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with rotuer state
    initialState,
    compose(...enhancers)
  )

  // Extensions
  store.runSaga = sagaMiddleware.run
  store.history = history

  return store
}

export default setupStore
