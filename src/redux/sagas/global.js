import { put, select, takeEvery, all } from 'redux-saga/effects'
import { Creators } from 'redux/actions/global'
import { originalType } from 'utils/action'
import { app } from 'configs'

function* listenAction(action) {
  try {
    const { status } = yield select(state => state.get('global'))
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
        const { err, skipAlert, duration } = action.payload
        if (err && skipAlert !== true) { // unless action.payload.skipAlert is true
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
