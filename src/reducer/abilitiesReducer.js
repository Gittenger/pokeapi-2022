import actions from './actions'

const { SET_ABILITIES_DATA } = actions

export const abilitiesReducerInit = []

export const abilitiesReducer = (state, action) => {
  switch (action.type) {
    case SET_ABILITIES_DATA:
      return action.payload
    default:
      console.log('oops, something went wrong')
  }
}

export default abilitiesReducer
