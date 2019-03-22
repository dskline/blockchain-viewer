// @flow
import React from 'react'
import NavigationBar from 'src/components/NavigationBar'

type Props = {
  children: Node
}
export default class DefaultTemplate extends React.Component<Props> {
  render () {
    return (
      <>
        <NavigationBar />
        <div style={{ padding: '2rem' }}>
          { this.props.children }
        </div>
      </>
    )
  }
}
