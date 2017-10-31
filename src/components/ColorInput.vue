<template>
  <input
    class="jscolor { hash: true } form-control"
    :value="value"
    @change="updateValue($event.target.value)">
</template>

<script>
export default {
  props: ['value', 'setting'],
  methods: {
    updateValue (val) {
      this.$emit('input', {
        value: val,
        setting: this.setting
      })
    }
  }
}
</script>

<style>
</style>
