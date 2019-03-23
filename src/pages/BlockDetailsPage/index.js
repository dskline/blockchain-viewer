import React from 'react'

import DefaultTemplate from 'src/templates/DefaultTemplate'
import BlockDashboard from 'src/features/blocks/BlockDashboard'
import BlockContext from 'src/features/blocks/context'

type Props = {
  classes: Object,
  match: {
    params: {
      id: string
    }
  }
}
type State = {
  hash: string,
  updateHash: () => void
}
export default class BlockDetailsPage extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)
    this.state = {
      hash: props.match.params.id,
      updateHash: this.updateHash
    }
  }

  updateHash = (newHash) => {
    this.setState({ hash: newHash })
  }

  render () {
    return (
      <DefaultTemplate>
        <BlockContext.Provider value={this.state}>
          <BlockDashboard hash={this.state.hash} />
        </BlockContext.Provider>
      </DefaultTemplate>
    )
  }
}
