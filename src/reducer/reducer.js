import actions from './actions'

const { SET_URLS } = actions

export const initState = {
  urlsInit: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_URLS: {
      return {
        ...state,
        urlsInit: action.payload,
      }
    }
    default:
      console.log('oops, something went wrong')
  }
}

export default reducer
