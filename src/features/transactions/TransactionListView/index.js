// @flow
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TableBody from '@material-ui/core/TableBody'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import Button from '@material-ui/core/Button'
import TouchRipple from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import type { TransactionType } from '../types'
import styles from './styles'
import TransactionCard from '../TransactionCard'

type Props = {
  classes: Object,
  transactions: Array<TransactionType>
}
type State = {
  page: number,
  selectedTransaction?: TransactionType
}
class TransactionListView extends React.Component<Props, State> {

  state = {
    page: 0
  }

  handleTransactionSelected = (transaction) => {
    const isAlreadySelected = this.state.selectedTransaction && (transaction.hash === this.state.selectedTransaction.hash)
    this.setState({
      selectedTransaction: isAlreadySelected ? undefined : transaction
    })
  }

  render () {
    const { classes, transactions } = this.props
    const { selectedTransaction } = this.state
    const transactionsInView = transactions.slice(this.state.page * 10, this.state.page * 10 + 10)

    return (
      <Card className={classes.root}>
        <CardContent>
          <Table className={classes.table}>
            <TableBody>
              {
                transactionsInView.map((transaction: TransactionType) => {
                  const isSelected = selectedTransaction && (selectedTransaction.hash === transaction.hash)
                  return (
                    <React.Fragment key={transaction.tx_index}>
                      <TableRow>
                        <TableCell
                          onClick={() => { this.handleTransactionSelected(transaction) }}
                        >
                          <Grid container justify='space-between' className={classes.transactionHeader}>
                            <TouchRipple>
                              <Typography>
                                Transaction Index #{transaction.tx_index}
                              </Typography>
                            </TouchRipple>
                            <Button>
                              { isSelected ? (<ExpandLessIcon />) : (<ExpandMoreIcon />) }
                            </Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      { isSelected &&
                        <TableRow>
                          <TableCell className={classes.transactionDetails}>
                            <TransactionCard
                              data={this.state.selectedTransaction}
                              hash={this.state.selectedTransaction.hash}
                            />
                          </TableCell>
                        </TableRow>
                      }
                    </React.Fragment>
                  )
                })
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={3}
                  count={this.props.transactions.length}
                  rowsPerPage={10}
                  page={this.state.page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={(e, page) => { this.setState({ page }) }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    )
  }
}
export default withStyles(styles)(TransactionListView)
