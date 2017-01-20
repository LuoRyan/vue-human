import LoadingIcon from '../loading-icon/loading-icon'
import Icon from '../icon/icon'

export default {
  components: {
    [LoadingIcon.name]: LoadingIcon,
    [Icon.name]: Icon
  },
  props: {
    title: String,
    icon: null,
    // is disabled
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    // is-primary, is-secondary, is-error etc.
    type: {
      type: String
    },
    // is block
    block: {
      type: Boolean,
      default: false
    },
    // is-sm
    size: {
      type: String
    },
    // is circle
    circle: {
      type: Boolean,
      default: false
    },
    margin: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    cssPrefix () {
      return this.$human.cssPrefix
    },
    classes () {
      let classes = {}

      // type
      classes[`is-${this.type}`] = this.type

      // size
      classes[`is-${this.size}`] = this.size

      // block
      classes['is-block'] = this.block

      // disabled
      classes['is-disabled'] = this.disabled || this.loading

      // active
      classes['is-active'] = this.active

      // circle
      classes['is-circle'] = this.circle

      // margin bottom
      classes['is-margin-bottom'] = this.margin

      return classes
    }
  },
  methods: {
    click ($event) {
      // If loading, prevent
      if (this.loading) return

      if (!this.disabled) {
        this.$emit('click', $event, this)
      } else {
        $event.preventDefault()
        this.$emit('error', $event, this)
      }
    }
  }
}
