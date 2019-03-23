import React from 'react'

const BlockContext = React.createContext(
  {
    hash: '',
    updateHash: () => {}
  }
)
export default BlockContext
