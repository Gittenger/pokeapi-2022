import React from 'react'

import CIndex from '../components.index'

const RenderFromType = ({ render, ...props }) => {
  const { Card, Icons } = CIndex
  return render === 'card' ? (
    <Card {...props} />
  ) : render === 'icons' ? (
    <Icons {...props} />
  ) : (
    ''
  )
}

export default RenderFromType
