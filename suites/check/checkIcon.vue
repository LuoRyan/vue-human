<script>
  import Element from '../../utils/Element'
  import MnRadioIcon from '../radio/radioIcon'
  import checkmarkOutline from 'vue-human-icons/js/ios/checkmark-outline'
  import circleOutline from 'vue-human-icons/js/ios/circle-outline'

  export default new Element({
    name: 'mn-check-icon',
    mixins: [ MnRadioIcon ],
    props: {
      active: {
        type: [String, Object],
        default: () => checkmarkOutline
      },
      unactive: {
        type: [String, Object],
        default: () => circleOutline
      }
    },
    computed: {
      checked () {
        return this.value.includes(this.data)
      }
    }
  })
</script>
