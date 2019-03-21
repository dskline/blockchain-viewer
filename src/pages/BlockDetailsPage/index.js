import React from 'react'
import DefaultTemplate from 'src/templates/DefaultTemplate'

type Props = {
  match: {
    params: {
      id: string
    }
  }
}
export default class BlockDetailsPage extends React.Component<Props> {
  render () {
    return (
      <DefaultTemplate>
        TODO: Show details of block with hash { this.props.match.params.id }
      </DefaultTemplate>
    )
  }
}
