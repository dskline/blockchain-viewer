// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import SearchInput from 'src/elements/form/SearchInput'

import styles, { navbarTransitionMs } from './styles'

type Props = {
  classes: Object,
  id: string,
  searchExpanded: boolean
}
class NavigationSearch extends React.Component<Props> {

  componentDidUpdate (prevProps: Props): void {
    // If the search has just been toggled, focus the search bar
    if (this.props.searchExpanded && !prevProps.searchExpanded) {
      setTimeout(() => {
        const searchInput: any = document.querySelector(`#${this.props.id} input`)
        if (searchInput) searchInput.focus()
      }, navbarTransitionMs)
    }
  }

  render () {
    return (
      <div
        id={this.props.id}
        className={classNames(this.props.classes.search, {
          [this.props.classes.searchExpanded]: this.props.searchExpanded
        })}
      >
        <SearchInput
          placeholder='Search by block/transaction hash'
        />
      </div>
    )
  }
}
export default withStyles(styles)(NavigationSearch)
