import actions from './actions'

const { SET_POKEMON_DATA } = actions

export const pokemonReducerInit = []

export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case SET_POKEMON_DATA:
      return action.payload
    default:
      console.log('oops, something went wrong')
  }
}

export default pokemonReducer
