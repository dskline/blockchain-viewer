// @flow
import ApiDirectory from '../ApiDirectory'
import BaseJsonApi from '../BaseJsonApi'

export default class BlockchainApi extends BaseJsonApi {

  constructor () {
    super(ApiDirectory.BLOCKCHAIN_API.url)
  }

  sendRequest (url: string, options: Object = {}) {
    return super.sendRequest(url + '?cors=true', options)
  }

  getTransactionDetails (hash: string) {
    return this.sendRequest('/rawtx/' + hash)
  }

  getBlockDetails (hash: string) {
    return this.sendRequest('/rawblock/' + hash)
  }

  getLatestBlock () {
    return this.sendRequest('/latestblock')
  }
}
