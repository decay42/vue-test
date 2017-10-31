<template>
  <form>
    <form-row label="Background Color">
      <color-input
        :value="settings.bgColor"
        setting="bgColor"
        @input="update"
      />
    </form-row>

    <form-row label="Active Color">
      <color-input
        :value="settings.activeColor"
        setting="activeColor"
        @input="update"
      />
    </form-row>

    <form-row label="Activity Treshold" displayValue="true">
      <input
        class="form-control"
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="settings.threshold"
        @change="saveSetting('threshold', $event.target.value)"
      />
      <span slot="value">{{ settings.threshold }}</span>
    </form-row>

    <form-row label="Icon Size" displayValue="true">
      <input
        class="form-control"
        type="range"
        min="30"
        max="200"
        step="1"
        :value="settings.fontSize"
        @change="saveSetting('fontSize', $event.target.value)"
      />
      <span slot="value">{{ settings.fontSize }} pt</span>
    </form-row>

    <form-row>
      <div class="form-check">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="checkbox"
            :checked="settings.border"
            @change="saveSetting('border', $event.target.checked)"
          /> Show Border
        </label>
      </div>
    </form-row>

    <button class="btn btn-secondary hover-warn" @click="resetSettings()">Reset to defaults</button>
  </form>
</template>

<script>
import ColorInput from './ColorInput'
import FormRow from './FormRow'

export default {
  props: [
    'settings'
  ],
  components: {
    ColorInput,
    FormRow
  },
  methods: {
    saveSetting (setting, value) {
      this.settings[setting] = value
      localStorage.setItem(setting, value)
    },

    resetSettings () {
      localStorage.clear()
      this.$router.go(-1)
    },

    update (e) {
      this.saveSetting(e.setting, e.value)
    }
  }
}
</script>

<style lang="sass">
  .hover-warn:hover
    background-color: #dc3545
    border-color: #dc3545
</style>
