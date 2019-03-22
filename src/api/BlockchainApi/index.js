// @flow
import ApiDirectory from '../ApiDirectory'
import BaseJsonApi from '../BaseJsonApi'

export default class BlockchainApi extends BaseJsonApi {

  constructor () {
    super(ApiDirectory.BLOCKCHAIN_API.url)
  }

  getTransactionDetails (hash: string) {
    return this.sendRequest('/rawtx/' + hash)
  }
}
