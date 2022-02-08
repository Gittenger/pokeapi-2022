import actions from './actions'

const { SET_URLS } = actions

export const urlsReducerInit = []

export const urlsReducer = (state, action) => {
  switch (action.type) {
    case SET_URLS:
      return action.payload

    default:
      console.log('oops, something went wrong')
  }
}

export default urlsReducer
