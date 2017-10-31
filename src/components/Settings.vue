<template>
  <form>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Background Color</label>
      <div class="col-sm-10">
        <color-input
          :value="settings.bgColor"
          setting="bgColor"
          @input="update"
        />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Active Color</label>
      <div class="col-sm-10">
        <color-input
          :value="settings.activeColor"
          setting="activeColor"
          @input="update"
        />
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Activity Threshold</label>
      <div class="col-sm-9">
        <input
          class="form-control"
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="settings.threshold"
          v-on:change="saveSetting('threshold', $event.target.value)"
        />
      </div>
      <div class="col-sm-1">
        {{ settings.threshold }}
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label">Icon Size</label>
      <div class="col-sm-9">
        <input
          class="form-control"
          type="range"
          min="30"
          max="200"
          step="1"
          :value="settings.fontSize"
          v-on:change="saveSetting('fontSize', $event.target.value)"
        />
      </div>
      <div class="col-sm-1">
        {{ settings.fontSize }} pt
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm-2"></div>
      <div class="col-sm-10">
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
      </div>
    </div>
    <button class="btn btn-secondary" v-on:click="resetSettings()">Reset to defaults</button>
  </form>
</template>

<script>
import ColorInput from './ColorInput'
export default {
  props: [
    'settings'
  ],
  components: {
    ColorInput
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
</style>
