import React from 'react'

import Page from '../components/General/Page.Component'

export const getPage = (title, component, props) => () =>
  <Page title={title} Component={component} props={props} />

export default getPage
