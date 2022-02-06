import React from 'react'

import Page from '../components/General/Page.Component'

export const getPage = (title, component) => () =>
  <Page title={title} Component={component} />

export default getPage
