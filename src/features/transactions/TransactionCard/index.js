// @flow
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'

import BlockchainApi from 'src/api/BlockchainApi'
import { convertUnixToDateTime } from 'src/utility/datetime/DateFunctions'

import type { TransactionType } from '../types'

import styles from './styles'

const tableRow = (title, value) => (
  <TableRow>
    <TableCell>{ title }</TableCell>
    <TableCell>{ value }</TableCell>
  </TableRow>
)

type Props = {
  classes: Object,
  data?: TransactionType,
  hash: string
}
type State = {
  apiError: boolean,
  isLoading: boolean,
  transactionData?: TransactionType
}
const initialState = ({ data }) => ({
  apiError: false,
  isLoading: false,
  transactionData: data
})
class TransactionCard extends React.Component<Props, State> {

  constructor (props) {
    super(props)
    this.state = initialState(props)
  }

  componentDidMount (): void {
    if (!this.props.data) {
      this.fetchTransactionData()
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!prevState.transactionData || (prevState.transactionData.hash !== nextProps.hash)) {
      return initialState(nextProps)
    }
    return null
  }

  componentDidUpdate (prevProps: Props): void {
    if (!this.props.data && prevProps.hash !== this.props.hash) {
      this.fetchTransactionData()
    }
  }

  fetchTransactionData = () => {
    if (!this.state.isLoading) {
      new BlockchainApi().getTransactionDetails(this.props.hash)
        .catch(() => {
          this.setState({
            apiError: true,
            isLoading: false
          })
        })
        .then(result => {
          this.setState({ transactionData: result })
        })

      this.setState({ isLoading: true })
    }
  }

  render () {
    const { classes } = this.props
    const data = this.state.transactionData

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title}>Hash</Typography>
          <Typography className={classes.hash} color='textSecondary'>
            {this.props.hash}
          </Typography>
          {
            data ? (
              <Table className={classes.table}>
                <TableBody>
                  { tableRow('Created Date', convertUnixToDateTime(data.time)) }
                  { tableRow('Transaction Index', data.tx_index) }
                  { tableRow('Size', data.size + ' (bytes)') }
                  { tableRow('Block Index', data.block_index) }
                  { tableRow('Block Height', data.block_height) }
                </TableBody>
              </Table>
            ) : (
              <Grid container justify='center' alignItems='center' className={classes.loadingContainer}>
                { this.state.apiError &&
                  <Typography className={classes.error}>
                    Oops! There was an error retrieving transaction details for this hash.
                  </Typography>
                }
                { !data && !this.state.apiError &&
                  <CircularProgress size={60} />
                }
              </Grid>
            )
          }
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button
              size='small'
              color='primary'
              onClick={() => { window.open('https://www.blockchain.com/btc/tx/' + this.props.hash, '_blank') }}
            >
              View on blockchain.com
            </Button>
          </Grid>
        </CardActions>
      </Card>
    )
  }
}
export default withStyles(styles)(TransactionCard)
