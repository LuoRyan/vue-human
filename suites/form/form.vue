<template>
  <form class="mn-form" @submit.prevent="submit" novalidate>
    <slot></slot>
  </form>
</template>

<script>
  import Element from '../../utils/Element'

  export default new Element({
    name: 'mn-form',
    props: {
      validate: Object
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      submit ($event) {
        if (this.loading) return

        if (!this.validate) {
          this.emitSuccess()
          return
        }

        this.validate.$touch()

        if (!this.validate.$invalid) {
          this.emitSuccess($event)
        } else {
          this.emitError($event)
        }
      },
      emitSuccess ($event) {
        this.$emit('submit', $event, this, true)
        this.$emit('success', $event, this)
      },
      emitError ($event) {
        this.$emit('submit', $event, this, false)
        this.$emit('error', $event, this)
      }
    }
  })
</script>
