// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import PageDirectory from 'src/pages/PageDirectory'
import SearchInput from 'src/elements/form/SearchInput'

import styles, { navbarTransitionMs } from './styles'

const BLOCK_NUMBER_OF_LEADING_ZEROES = 10

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

  onSubmit = (value: string) => {
    // Decide whether to redirect the user to block details or transaction details page
    const blockRegex = new RegExp('^[0]{' + BLOCK_NUMBER_OF_LEADING_ZEROES + ',}.*')

    window.location = (blockRegex.exec(value)
      ? PageDirectory.BLOCK_DETAILS_PAGE : PageDirectory.TRANSACTION_DETAILS_PAGE)
      .path.replace(':id', value)
  }

  render () {
    return (
      <div
        id={this.props.id}
        className={this.props.classes.search}
      >
        <SearchInput
          placeholder='Search by block/transaction hash'
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}
export default withStyles(styles)(NavigationSearch)
