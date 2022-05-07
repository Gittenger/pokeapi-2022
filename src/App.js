import React, { useEffect } from 'react'
import Routes from './Routes'

function App() {
  useEffect(() => {
    console.log(process.env.PUBLIC_URL)
  }, [])
  return (
    <>
      <Routes />
    </>
  )
}

export default App
