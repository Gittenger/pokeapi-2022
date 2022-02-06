import React, { useEffect, useContext } from 'react'
import PageContext from '../../contexts/PageContext.js'

import CIndex from '../components.index.js'

const Page = ({ title, Component, ...props }) => {
  const { Layout } = CIndex
  const { setPage } = useContext(PageContext)

  useEffect(() => {
    document.title = `${process.env.MAIN_TITLE} | ${title}`
    setPage(title)
  }, [title, setPage])

  return (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}

export default Page
