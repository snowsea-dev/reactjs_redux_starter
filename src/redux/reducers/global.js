import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'
import { Types } from 'redux/actions/global'

export const initialState = Immutable({
  status: {},
})

const updateStates = (state, action) => ({
  ...state,
  ...action.payload,
})

const handlers = {
  [Types.UPDATE_STATES]: updateStates,
}

export default createReducer(initialState, handlers)
