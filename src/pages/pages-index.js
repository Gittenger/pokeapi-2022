import HomePageContent from './HomePageContent.component.jsx'
import PokemonDetailContent from './PokemonDetailContent.component.jsx'

import getPage from '../utils/getPage.js'

const pages = {
  HomePage: getPage('Home', HomePageContent),
  PokemonDetail: getPage('Pokemon', PokemonDetailContent, {
    name: 'bulbasaur',
    id: '1',
  }),
}

export const { HomePage, PokemonDetail } = pages
