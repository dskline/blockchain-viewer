// @flow
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Grid from '@material-ui/core/Grid'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'

import Link from 'src/elements/Link'
import PageDirectory from 'src/pages/PageDirectory'
import { convertUnixToDateTime } from 'src/utility/datetime/DateFunctions'

import type { BlockType } from '../types'
import BlockContext from '../context'
import styles from './styles'

const tableRow = (title, value) => (
  <TableRow>
    <TableCell>{ title }</TableCell>
    <TableCell>{ value }</TableCell>
  </TableRow>
)

type Props = {
  classes: Object,
  blockData: BlockType
}
class BlockSummaryCard extends React.Component<Props> {

  static contextType = BlockContext;

  render () {
    const { classes } = this.props
    const data = this.props.blockData

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container justify='flex-start' spacing={16}>
            <Grid item md={5} className={classes.tableContainer}>
              <Typography className={classes.tableTitle}>
                Summary
              </Typography>
              <Table>
                <TableBody>
                  { tableRow('Number of Transactions', data.n_tx) }
                  { tableRow('Timestamp', convertUnixToDateTime(data.time)) }
                  { tableRow('Transaction Fees', (data.fee / 100000000) + ' BTC') }
                  { tableRow('Height', data.height) }
                  { tableRow('Bits', data.bits) }
                </TableBody>
              </Table>
            </Grid>
            <Grid item className={classes.hashesContainer}>
              <Typography className={classes.tableTitle}>Hash</Typography>
              <Typography className={classes.blockHash}>{ data.hash }</Typography>

              <Typography className={classes.tableTitle}>Previous Block</Typography>
              <Typography color='primary' className={classes.blockHash}>
                <Link
                  url={PageDirectory.BLOCK_DETAILS_PAGE.path.replace(':id', data.prev_block)}
                  onClick={() => { this.context.updateHash(data.prev_block) }}
                >
                  { data.prev_block }
                </Link>
              </Typography>

              { data.next_block.length > 0 &&
                <Typography className={classes.tableTitle}>Next Block</Typography>
              }
              <Typography color='primary' className={classes.blockHash}>
                { data.next_block.map(hash => (
                  <Link
                    key={hash}
                    url={PageDirectory.BLOCK_DETAILS_PAGE.path.replace(':id', hash)}
                    onClick={() => { this.context.updateHash(hash) }}
                  >
                    { hash }
                  </Link>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justify='center'>
            <Button
              size='small'
              color='primary'
              onClick={() => { window.open('https://www.blockchain.com/btc/block/' + data.hash, '_blank') }}
            >
              View block on blockchain.com
            </Button>
          </Grid>
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles)(BlockSummaryCard)
