import HomePageContent from './HomePageContent.component.jsx'

import getPage from '../utils/getPage.js'

const pages = {
  HomePage: getPage('Home', HomePageContent),
}

export const { HomePage } = pages
