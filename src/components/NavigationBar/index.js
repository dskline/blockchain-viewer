// @flow
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseSearchIcon from 'mdi-material-ui/MagnifyClose'
import GithubIcon from 'mdi-material-ui/GithubCircle'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Link from 'src/elements/Link'

import NavigationSearch from './NavigationSearch'
import styles from './styles'
import Tooltip from '@material-ui/core/Tooltip'

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
    this.setState({
      mobileSearchExpanded: !this.state.mobileSearchExpanded
    })
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
          <Typography variant='h6' noWrap className={classes.logo}>
            <Link url='/'>
              Blockchain Viewer
            </Link>
          </Typography>
          <div className={classes.grow} />
          <Tooltip title='Open Project in GitHub' placement='bottom'>
            <Link url='https://github.com/dskline/blockchain-viewer'>
              <IconButton className={classes.githubButton}>
                <GithubIcon />
              </IconButton>
            </Link>
          </Tooltip>
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
