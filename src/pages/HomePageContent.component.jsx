import React from 'react'

import CIndex from '../components/components.index.js'
import { useTitle } from '../utils/hooks.js'

const HomePageContent = ({ id }) => {
  const { Display } = CIndex
  useTitle('Home')

  return (
    <main className="flex flex-col items-center justify-start pb-10">
      <Display id={id} />
    </main>
  )
}

export default HomePageContent
