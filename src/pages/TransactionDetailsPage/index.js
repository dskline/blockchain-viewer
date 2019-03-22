import React from 'react'

import DefaultTemplate from 'src/templates/DefaultTemplate'
import TransactionCard from 'src/features/transactions/TransactionCard'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

import styles from './styles'

type Props = {
  classes: Object,
  match: {
    params: {
      id: string
    }
  }
}
class TransactionDetailsPage extends React.Component<Props> {

  render () {
    return (
      <DefaultTemplate>
        <Grid container justify='center' className={this.props.classes.container}>
          <Grid item xs={12}>
            <Typography variant='h6' className={this.props.classes.title}>
              Transaction
            </Typography>
            <TransactionCard hash={this.props.match.params.id} />
          </Grid>
        </Grid>
      </DefaultTemplate>
    )
  }
}
export default withStyles(styles)(TransactionDetailsPage)
