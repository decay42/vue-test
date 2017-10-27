<template>
  <div>
    <div id="icon" v-bind:style="microphoneObject">
      <i class="fa" v-bind:class="micIconClass" v-bind:style="borderObject" v-on:click="toggleListening()" aria-hidden="true"></i>
    </div>
    <div id="settings" class="container">
      <h3 v-on:click="testActive()">Settings</h3>
      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Background Color</label>
              <div class="col-sm-10">
                <color-input v-model="bgColor" setting="bgColor" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Active Color</label>
              <div class="col-sm-10">
                <color-input v-model="activeColor" setting="activeColor" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Icon Size</label>
              <div class="col-sm-9">
                <input class="form-control" type="range" min="30" max="200" step="1" v-model="fontSize" v-on:change="saveSetting('fontSize', $event.target.value)" />
              </div>
              <div class="col-sm-1">
                {{ fontSize }} pt
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-2"></div>
              <div class="col-sm-10">
                <div class="form-check">
                  <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" v-model="border"> Show Border
                  </label>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" v-on:click="resetSettings()">Reset to defaults</button>
          </form>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container text-center">
        <a href="https://github.com/decay42/vue-test" target="_blank"><i class="fa fa-2x fa-github-square" aria-hidden="true"></i></a><br>
        2017 <i class="fa fa-copyright"></i> decay42
      </div>
    </footer>
  </div>
</template>

<script>
import DecibelMeter from 'decibel-meter'
export default {
  name: 'MainView',
  data () {
    return {
      bgColor: localStorage.bgColor || '#00B140',
      activeColor: localStorage.activeColor || '#D11C00',
      testColor: localStorage.testColor || '#ff0000',
      fontSize: localStorage.fontSize || '50',
      borderOffset: '10',
      border: false,
      active: false,
      activityCutoff: 0.5,
      meter: null
    }
  },
  computed: {
    microphoneObject: function () {
      return {
        backgroundColor: this.bgColor,
        color: this.active ? this.activeColor : this.bgColor,
        fontSize: `${this.fontSize}pt`
      }
    },

    borderObject: function () {
      return {
        borderWidth: '1px',
        borderColor: '#000',
        borderStyle: this.border ? 'solid' : 'none',
        padding: `${this.borderOffset}px`
      }
    },

    micIconClass: function () {
      return {
        'fa-microphone': this.meter.listening,
        'fa-microphone-slash': !this.meter.listening
      }
    }
  },
  created: function () {
    require('../../assets/jscolor.min.js')

    this.meter = new DecibelMeter('unique-id')
    this.meter.sources.then(sources => {
      this.meter.connect(sources[0])
    })

    this.meter.on('sample', this.checkActivity)
  },
  methods: {
    saveSetting: function (setting, value) {
      localStorage.setItem(setting, value)
    },

    resetSettings: function () {
      localStorage.clear()
      this.$router.go(-1)
    },

    checkActivity: function (dB, percent, value) {
      if (value > this.activityCutoff) {
        this.active = true
      } else {
        this.active = false
      }
    },

    toggleListening: function () {
      if (this.meter.listening) {
        this.meter.stopListening()
      } else {
        this.meter.listen()
      }
    }
  }
}
</script>

<style scoped lang="scss">
$footer-size: 70px;

#icon {
  text-align: center;
  margin-bottom: 10px;
  i {
    text-shadow:
      1px 1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      -1px -1px 0 #000;
    cursor: pointer;
  }
}
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: $footer-size;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: $footer-size;
  line-height: 15px;
  background-color: #f5f5f5;
  .container {
    i {
      margin-top: 8px;
    }
    a, a:link, a:visited {
      text-decoration: none;
      color: #000;
    }
    a:hover {
      color: #2a3741;
    }
  }
}
</style>
