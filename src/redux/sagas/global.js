import { put, select, takeEvery, all } from 'redux-saga/effects'
import { Creators } from '../actions/global'
import { originalType } from 'utils/action'
import { app } from 'configs'

/**
 * @description Listen all actions and save its status ('request', 'success', or 'failure')
 * 
 * @param {Object} action 
 */
function* listenAction(action) {
  try {
    const { status } = yield select(_ => _.global)
    let newStatus
    
    if (action.type.endsWith('/request')) { // request action
      newStatus = {
        ...status,
        [originalType(action.type)]: 'request',
      }
      yield put(Creators.updateStates({ status: newStatus }))

    } else if (action.type.endsWith('/success')) { // success action
      newStatus = {
        ...status,
        [originalType(action.type)]: 'success',
      }
      yield put(Creators.updateStates({ status: newStatus }))

    } else if (action.type.endsWith('/failure')) { // failure action
      newStatus = {
        ...status,
        [originalType(action.type)]: 'failure',
      }
      yield put(Creators.updateStates({ status: newStatus }))
      
      if (app.alertFailure) { // show failure action message here
        const { err, showAlert } = action.payload
        if (err && showAlert !== false) { // unless action.payload.showAlert is false
          // TODO: show message here
        }
      }
    }
  } catch (err) {
    if (app.alertUncaughted) { // show uncaughted error message here
      // TODO: show message here
    }
  }
}

export function* globalSaga() {
  yield all([
    takeEvery('*', listenAction),
  ])
}
