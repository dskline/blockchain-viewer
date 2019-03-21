// @flow
import React from 'react'

type Props = {
  children: Node
}
export default class DefaultTemplate extends React.Component<Props> {
  render () {
    return (
      <>
        {/* TODO: Add Navigation Bar */}
        { this.props.children }
      </>
    )
  }
}