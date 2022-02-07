import React, { useEffect } from 'react'
import Button from '@material-tailwind/react/Button'

import CIndex from '../components/components.index.js'

const HomePageContent = ({ id }) => {
  const { Display } = CIndex
  useEffect(() => {
    // window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex flex-col items-center justify-start pb-10">
      <div className="flex flex-col justify-center items-center space-x-4">
        <Button color="cyan" ripple="dark">
          Button
        </Button>

        <Display id={id} />
      </div>
    </main>
  )
}

export default HomePageContent
