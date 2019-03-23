// @flow
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/es/Tabs/Tabs'
import { Tab } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'

import BlockchainApi from 'src/api/BlockchainApi'
import BlockSummaryCard from 'src/features/blocks/BlockSummaryCard'
import TransactionListView from 'src/features/transactions/TransactionListView'

import styles from './styles'
import type { BlockType } from '../types'

type Props = {
  classes: Object,
  hash: string
}
type State = {
  apiError: boolean,
  blockData?: BlockType,
  tabIndex: number
}
class BlockDashboard extends React.Component<Props, State> {

  state = {
    apiError: false,
    tabIndex: 0
  }

  componentDidMount (): void {
    this.fetchBlockDetails()
  }

  componentDidUpdate (prevProps: Props): void {
    if (prevProps.hash !== this.props.hash) {
      this.setState({ blockData: undefined }) // eslint-disable-line react/no-did-update-set-state
      this.fetchBlockDetails()
    }
  }

  fetchBlockDetails = () => {
    new BlockchainApi().getBlockDetails(this.props.hash)
      .catch(() => { this.setState({ apiError: true }) })
      .then(result => { this.setState({ blockData: result }) })
  }

  render () {
    const data = this.state.blockData
    return (
      <>
        <Typography variant='h6' className={this.props.classes.title}>
          { data ? `Block #${data.block_index}` : 'Loading block...' }
        </Typography>
        <Paper>
          <Tabs
            value={this.state.tabIndex}
            onChange={(e, value) => { this.setState({ tabIndex: value }) }}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Summary' />
            <Tab label='Transactions' />
          </Tabs>
        </Paper>
        <Grid container className={this.props.classes.tabContainer}>
          { this.state.tabIndex === 0 && data && <BlockSummaryCard blockData={data} /> }
          { this.state.tabIndex === 1 && data && <TransactionListView transactions={data.tx} /> }
          { this.state.apiError && (
            <Typography>
              Oops! There was an error retrieving block details for this hash.
            </Typography>
          ) }
          { !data && !this.state.apiError && (
            <Grid container justify='center' alignItems='center'>
              <CircularProgress size={60} />
            </Grid>
          ) }
        </Grid>
      </>
    )
  }
}
export default withStyles(styles)(BlockDashboard)
