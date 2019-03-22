// @flow
export default class BaseApi {

  baseUrl: string = ''
  baseOptions: Object = {}

  constructor (baseUrl: string, baseOptions?: Object = {}) {
    if (process.env.NODE_ENV !== 'development') {
      this.baseUrl = baseUrl
    }
    this.baseOptions = baseOptions
  }

  sendRequest (url: string, options: Object = {}) {
    return fetch(this.baseUrl + url, Object.assign({}, this.baseOptions, options))
      .catch(console.error)
  }
}
