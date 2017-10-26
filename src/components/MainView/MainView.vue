<template>
  <div>
    <div id="icon" v-bind:style="{ backgroundColor: `#${bgColor}`, color: `#${bgColor}`, fontSize }">
      <i class="fa fa-microphone" aria-hidden="true"></i>
    </div>
    <div id="settings" class="container">
      <h3>Settings</h3>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Background Color</label>
              <div class="col-sm-10">
                <input ref="input" id="bgColor" class="jscolor" v-bind:value="bgColor" v-on:change="updateColor($event.target.value)" />
                {{ bgColor }}
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Icon Size</label>
              <div class="col-sm-10">
                <input class="form-control" type="range" min="30" max="100" v-model="fontSize"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  data () {
    return {
      bgColor: '00b140',
      fontSize: '50pt'
    }
  },
  created: function () {
    require('../../assets/jscolor.min.js')
  },
  methods: {
    updateColor: function (value) {
      console.log(value)
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped lang="scss">
#icon {
  text-align: center;
  margin-bottom: 10px;
  i {
    text-shadow:
      1px 1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      -1px -1px 0 #000;
  }
}
</style>
