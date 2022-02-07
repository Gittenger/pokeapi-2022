import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

import CIndex from '../components.index.js'

const Page = ({ Component, props }) => {
  const { Layout } = CIndex
  const { ...params } = useParams()

  return (
    <Layout>
      <Component {...props} {...params} />
    </Layout>
  )
}

export default Page
