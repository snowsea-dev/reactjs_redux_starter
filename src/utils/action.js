// utils for redux actions and creators

export const request = (type) => `${type}/request`
export const success = (type) => `${type}/success`
export const failure = (type) => `${type}/failure`

export const requestCreator = (type, payload) => ({
  type: request(type),
  payload,
})

export const successCreator = (type, payload) => ({
  type: success(type),
  payload,
})

export const failureCreator = (type, payload) => ({
  type: failure(type),
  payload,
})

export const originalType = (type) => (type.substr(0, type.length - 8)) // 8 is length of '/request', '/success', '/failure'
