import element from './util/element/plugins.js'
import browser from './util/browser/plugins.js'
import popup from './util/popup/plugins.js'
import scroller from './util/scroller/plugins.js'

export default {
  options: {
    /**
     * Human css prefix, using it in scss
     * @type {String}
     */
    cssPrefix: 'mn-',
    /**
     * Human load function
     * @example function (resolve) { require(['./file/path'], resolve) }
     * @type {Function}
     */
    loading: undefined,
    /**
     * Human icon array
     * @type {Array}
     */
    icons: {}
  },
  /**
   * Vue install
   * @param  {Object} Vue
   * @param  {Object} options
   */
  install (Vue, options) {
    this.$vue = Vue

    // Merge and assign options
    this.options = { ...this.options, options }

    // Set up vue human
    Vue.human = {
      cssPrefix: this.options.cssPrefix,
      loading: this.options.loading,
      icons: this.options.icons
    }

    // Alias for human
    Vue.prototype.$human = Vue.human

    // Using human plugins
    Vue.use(scroller)
    Vue.use(element)
    Vue.use(popup)
    Vue.use(browser)
  },
  /**
   * Register VueComponent to Vue
   *
   * @param {VueComponent}   VueComponent
   * @param {String}         name
   */
  register (VueComponent, name = VueComponent.name) {
    if (!this.$vue) {
      console && console.warn('可能没有执行 Vue.use(VueHuman) 来初始化。')
    }

    this.$vue.component(name, VueComponent)
  },
  /**
   * Add lots or one of VueComponent to Vue
   *
   * @param {Array|VueComponent}   components
   * @param {String}               name
   */
  add (components, name) {
    if (typeof components !== 'object') {
      console && console.warn('传递的 component 存在错误。')
    }

    if (components instanceof Array) {
      components.forEach(item => this.register(item))
    } else {
      this.register(components, name)
    }
  }
}