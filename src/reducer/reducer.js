import actions from './actions'

export const { SET_ARRAY, SET_OBJECT } = actions

export const reducerInit = {
  object: {},
  array: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_ARRAY:
      return action.payload
    case SET_OBJECT:
      return action.payload
    default:
      console.log('oops, something went wrong')
  }
}

export default { reducer, reducerInit, SET_ARRAY, SET_OBJECT }
