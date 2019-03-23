import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import DefaultTemplate from 'src/templates/DefaultTemplate'
import BlockDashboard from 'src/features/blocks/BlockDashboard'
import BlockContext from 'src/features/blocks/context'
import type { LatestBlockType } from 'src/features/blocks/types'
import BlockchainApi from 'src/api/BlockchainApi'

import styles from './styles'

type Props = {
  classes: Object
}
type State = {
  isWebSocketEnabled: boolean,
  latestBlockHash: string
}
class NewBlocksPage extends React.Component<Props, State> {

  state = {
    isWebSocketEnabled: true
  }

  componentDidMount (): void {
    new BlockchainApi().getLatestBlock()
      .then((result: LatestBlockType) => {
        this.setState({ latestBlockHash: result.hash })
      })

    this.socket = new WebSocket('wss://ws.blockchain.info/inv')
    this.socket.onopen = () => {
      this.startWebSocket()
    }
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.x) {
        this.updateHash(data.x.hash)
      }
    }
  }

  componentWillUnmount (): void {
    this.socket.close()
  }

  updateHash = (newHash) => {
    this.setState({ latestBlockHash: newHash })
  }

  toggleAutoUpdate = () => {
    const isWebSocketEnabled = !this.state.isWebSocketEnabled
    isWebSocketEnabled ? this.startWebSocket() : this.stopWebSocket()
    this.setState({ isWebSocketEnabled })
  }

  startWebSocket = () => {
    this.socket.send(JSON.stringify({
      op: 'blocks_sub'
    }))
  }

  stopWebSocket = () => {
    this.socket.send(JSON.stringify({
      op: 'blocks_unsub'
    }))
  }

  render () {
    const { classes } = this.props

    return (
      <DefaultTemplate>
        <AppBar position='static' color='default' className={classes.toolbar}>
          <Toolbar>
            <Typography variant='h6' color='inherit' className={classes.grow}>
              Latest Block
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isWebSocketEnabled}
                  onChange={this.toggleAutoUpdate}
                  value='checkedB'
                  color='primary'
                />
              }
              label='Auto Update'
              labelPlacement='start'
            />
          </Toolbar>
        </AppBar>
        { this.state.latestBlockHash &&
          <BlockContext.Provider
            value={{
              hash: this.state.latestBlockHash,
              updateHash: this.updateHash
            }}
          >
            <BlockDashboard hash={this.state.latestBlockHash} />
          </BlockContext.Provider>
        }
      </DefaultTemplate>
    )
  }
}
export default withStyles(styles)(NewBlocksPage)
