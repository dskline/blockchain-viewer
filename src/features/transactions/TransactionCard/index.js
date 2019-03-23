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
  transactionData?: TransactionType
}
class TransactionCard extends React.Component<Props, State> {

  state = {
    apiError: false
  }

  constructor (props: Props) {
    super(props)
    if (props.data) {
      this.state.transactionData = props.data
    }
  }

  componentDidMount (): void {
    new BlockchainApi().getTransactionDetails(this.props.hash)
      .catch(() => { this.setState({ apiError: true }) })
      .then(result => { this.setState({ transactionData: result }) })
  }

  render () {
    const { classes } = this.props
    const data = this.state.transactionData

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            {this.props.hash}
          </Typography>
          {
            data ? (
              <Table className={classes.table}>
                <TableBody>
                  { tableRow('Created Date', convertUnixToDateTime(data.time)) }
                  { tableRow('Transaction Index', data.tx_index) }
                  { tableRow('Size', data.size) }
                  { tableRow('Block Index', data.block_index) }
                  { tableRow('Block Height', data.block_height) }
                </TableBody>
              </Table>
            ) : (
              <Grid container justify='center' alignItems='center' className={classes.loadingContainer}>
                { this.state.apiError ? (
                  <Typography className={classes.error}>
                    Oops! There was an error retrieving transaction details for this hash.
                  </Typography>
                ) : (
                  <CircularProgress size={60} />
                )}
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
