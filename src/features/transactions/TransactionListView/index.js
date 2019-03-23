// @flow
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

import { convertUnixToDateTime } from 'src/utility/datetime/DateFunctions'

import type { TransactionType } from '../types'
import styles from './styles'
import TransactionCard from '../TransactionCard'

type Props = {
  classes: Object,
  transactions: Array<TransactionType>
}
type State = {
  selectedTransaction?: TransactionType
}
class TransactionListView extends React.Component<Props, State> {

  state = {}

  render () {
    const { classes } = this.props
    return (
      <Grid container>
        <Grid item>
          <Table className={classes.table}>
            <TableBody>
              {
                this.props.transactions.map((transaction: TransactionType) => (
                  <TableRow key={transaction.tx_index}>
                    <TableCell>{transaction.tx_index}</TableCell>
                    <TableCell>{convertUnixToDateTime(transaction.time)}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Grid>
        { this.state.selectedTransaction &&
          <TransactionCard data={this.state.selectedTransaction} />
        }
      </Grid>
    )
  }
}
export default withStyles(styles)(TransactionListView)
