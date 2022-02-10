import actions from './actions'

const { SET_OBJECT } = actions

export const objectReducerInit = {}

export const objectReducer = (state, action) => {
  switch (action.type) {
    case SET_OBJECT:
      return action.payload
    default:
      console.log('oops, something went wrong')
  }
}

export default objectReducer
