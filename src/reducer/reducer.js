import actions from './actions'

const { SET_DATA } = actions

export const reducerInit = {
  object: {},
  array: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA:
      return action.payload
    default:
      console.log('oops, something went wrong')
  }
}

export default reducer
