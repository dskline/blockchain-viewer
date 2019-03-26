// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import { onEnterKeyPress } from 'src/utility/accessibility/AccessibilityFunctions'

import styles from './styles'

type Props = {
  classes: Object,
  inputProps: Object,
  onSubmit: (string) => void,
  placeholder: string
}
type State = {
  inputValue: string
}
class SearchInput extends React.Component<Props, State> {

  state = {
    inputValue: ''
  }

  render () {
    const { classes, ...rest } = this.props

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          className={classes.input}
          onChange={event => { this.setState({ inputValue: event.target.value }) }}
          onKeyPress={onEnterKeyPress(() => { this.props.onSubmit(this.state.inputValue) })}
          {...rest}
        />
        <IconButton
          className={classes.iconButton}
          aria-label='Search'
          onClick={() => { this.props.onSubmit(this.state.inputValue) }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    )
  }
}

export default withStyles(styles)(SearchInput)
