import NewBlocksPage from './NewBlocksPage'
import BlockDetailsPage from './BlockDetailsPage'
import TransactionDetailsPage from './TransactionDetailsPage'

const pageDirectory = {
  NEW_BLOCKS_PAGE: {
    path: '/new',
    component: NewBlocksPage
  },
  BLOCK_DETAILS_PAGE: {
    path: '/block/:id',
    component: BlockDetailsPage
  },
  TRANSACTION_DETAILS_PAGE: {
    path: '/tx/:id',
    component: TransactionDetailsPage
  }
}
export default pageDirectory
