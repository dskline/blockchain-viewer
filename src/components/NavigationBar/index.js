// @flow
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseSearchIcon from 'mdi-material-ui/MagnifyClose'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Link from 'src/elements/Link'

import NavigationSearch from './NavigationSearch'
import styles from './styles'

type Props = {
  classes: Object
}
type State = {
  mobileSearchExpanded: boolean
}
class NavigationBar extends React.Component<Props, State> {

  state = {
    mobileSearchExpanded: false
  }

  toggleMobileSearchExpanded = () => {
    this.setState({ mobileSearchExpanded: !this.state.mobileSearchExpanded })
  }

  render () {
    const { classes } = this.props
    const { mobileSearchExpanded } = this.state

    return (
      <AppBar position='sticky' className={classes.root}>
        <Toolbar
          className={classNames(classes.container, {
            [classes.containerExpanded]: mobileSearchExpanded
          })}
        >
          <Typography variant='h6' color='inherit' noWrap>
            <Link url='/'>
              Blockchain Viewer
            </Link>
          </Typography>
          <div className={classes.grow} />
          <IconButton
            className={classes.mobileSearchButton}
            aria-label='Toggle search bar display'
            onClick={this.toggleMobileSearchExpanded}
          >
            { mobileSearchExpanded ? <CloseSearchIcon /> : <SearchIcon /> }
          </IconButton>
          <NavigationSearch
            id='navigation-search'
            searchExpanded={mobileSearchExpanded}
          />
        </Toolbar>
      </AppBar>
    )
  }
}
export default withStyles(styles)(NavigationBar)
