// @flow
import BaseApi from './BaseApi'

/**
 * Convenience class for APIs that only return JSON as a content type
 */
export default class BaseJsonApi extends BaseApi {

  constructor (baseUrl: string, baseOptions?: Object = {}) {
    if (!baseOptions.headers) {
      baseOptions.headers = {}
    }
    baseOptions.headers['Accept'] = 'application/json'
    super(baseUrl, baseOptions)
  }

  sendRequest (url: string, options: Object = {}) {
    return super.sendRequest(url, options).then(result => result.json())
  }
}
