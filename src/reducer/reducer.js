import actions from './actions'

const { SET_URLS, SET_POKEMON_DATA } = actions

export const initState = {
  urlsInit: [],
  pokemonData: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_URLS: {
      return {
        ...state,
        urlsInit: action.payload,
      }
    }
    case SET_POKEMON_DATA:
      return {
        ...state,
        pokemonData: action.payload,
      }
    default:
      console.log('oops, something went wrong')
  }
}

export default reducer
