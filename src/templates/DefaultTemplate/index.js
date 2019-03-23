// @flow
import React from 'react'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'

import NavigationBar from 'src/components/NavigationBar'

import styles from './styles'

type Props = {
  children: Node,
  classes: Object
}
class DefaultTemplate extends React.Component<Props> {
  render () {
    return (
      <>
        <NavigationBar />
        <Grid container justify='center' className={this.props.classes.body}>
          <Grid item xs={11} sm={10} lg={8}>
            { this.props.children }
          </Grid>
        </Grid>
      </>
    )
  }
}
export default withStyles(styles)(DefaultTemplate)
