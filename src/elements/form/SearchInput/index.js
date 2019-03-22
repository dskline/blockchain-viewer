// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import styles from './styles'

type Props = {
  classes: Object,
  placeholder: string
}
class SearchInput extends React.Component<Props> {

  render () {
    const { classes } = this.props

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          className={classes.input}
          placeholder={this.props.placeholder}
        />
        <IconButton
          className={classes.iconButton}
          aria-label='Search'
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }
}

export default withStyles(styles)(SearchInput)
