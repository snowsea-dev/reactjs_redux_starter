import { combineReducers } from 'redux-seamless-immutable'
import global from './global'

// Combine all reducers into one root reducer
export default combineReducers({
  global,
})
