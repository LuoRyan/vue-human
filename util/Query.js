import toNumber from 'lodash/toNumber'
import toLower from 'lodash/toLower'

/** Class 转化地址栏中的 query 参数 */
export default class Query {
  /**
   * 遍历 queries，解析每个 query 的值，如将字符串 '1' 转化为数字 1
   * @param {Object} importQueries - 导入的 queries 的对象，通常由 this.$route.query 来获取
   * @returns {Object} 解析后的 queries 对象
   */
  parse (importQueries) {
    let outputQueries = {}

    for (var name in importQueries) {
      if (importQueries.hasOwnProperty(name)) {
        outputQueries[name] = this.parseQuery(name, importQueries[name])
      }
    }

    return outputQueries
  }

  /**
   * 转化单个 query
   * @param {String} name - 对象的 key
   * @param {*} query - 对象的值
   * @returns {*}
   */
  parseQuery (name, query) {
    if (this.parseOther) {
      return this.parseOther(query, name)
    }

    if (['', 'undefined'].includes(toLower(query))) {
      return this.parseUndefined(query)
    }

    if (toLower(query) === 'null') {
      return this.parseNull(query)
    }

    if (!Number.isNaN(query)) {
      return this.parseNumber(query)
    }

    if (typeof query === 'object' && query.constructor === Object) {
      return this.parseObject(query)
    }

    if (typeof query === 'object' && query.constructor === Array) {
      return this.parseObject(query)
    }

    return query
  }

  /**
   * 将类数字转化为数字
   * @param {String} query
   * @returns {Number}
   */
  parseNumber (query) {
    return toNumber(query)
  }

  /**
   * 转化 'undefined'
   * @param {String} query
   * @returns {undefined}
   */
  parseUndefined (query) {
    return undefined
  }

  /**
   * 转化 'null'
   * @param {String} query
   * @returns {null}
   */
  parseNull (query) {
    return null
  }
}
