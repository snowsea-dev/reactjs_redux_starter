import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  updateStates: ['payload'],
}, {})

export { Types, Creators }
