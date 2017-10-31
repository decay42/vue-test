<template>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label">{{label}}</label>
    <div class="col-sm-10" v-if="!displayValue">
      <slot />
    </div>
    <div class="col-sm-9" v-if="displayValue">
      <slot />
    </div>
    <div class="col-sm-1" v-if="displayValue">
      <slot name="value" />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'displayValue'
  ]
}
</script>

<style lang="css">
</style>
