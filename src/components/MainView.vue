<template>
  <div>
    <div id="icon" :style="microphoneObject">
      <i
        class="fa"
        :class="micIconClass"
        :style="borderObject"
        @click="toggleListening()"
        aria-hidden="true" />
    </div>
    <div id="settings" class="container">
      <h3>Settings <i class="fa fa-wrench" aria-hidden="true"></i></h3>
      <div class="card">
        <div class="card-body">
          <settings :settings="settings" />
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container text-center">
        <a href="https://github.com/decay42/vue-test" target="_blank">
          <i class="fa fa-2x fa-github-square" aria-hidden="true"></i>
        </a>
        <br>
        2017 <i class="fa fa-copyright"></i> decay42
      </div>
    </footer>
  </div>
</template>

<script>
import Settings from './Settings'
import DecibelMeter from 'decibel-meter'

export default {
  data () {
    return {
      settings: {
        activeColor: localStorage.activeColor || '#D11C00',
        bgColor: localStorage.bgColor || '#00B140',
        border: localStorage.border === 'true',
        fontSize: localStorage.fontSize || '100',
        threshold: localStorage.threshold || 0.5
      },
      active: false,
      borderOffset: '10',
      meter: null
    }
  },
  components: {
    Settings
  },
  computed: {
    microphoneObject () {
      return {
        backgroundColor: this.settings.bgColor,
        color: this.active ? this.settings.activeColor : this.settings.bgColor,
        fontSize: `${this.settings.fontSize}pt`
      }
    },

    borderObject () {
      return {
        borderWidth: '1px',
        borderColor: '#000',
        borderStyle: this.settings.border ? 'solid' : 'none',
        padding: `${this.borderOffset}px`
      }
    },

    micIconClass () {
      return {
        'fa-microphone': this.meter.listening,
        'fa-microphone-slash': !this.meter.listening
      }
    }
  },
  created  () {
    require('../assets/jscolor.min.js')

    this.meter = new DecibelMeter('unique-id')
    this.meter.sources.then(sources => {
      this.meter.connect(sources[0])
    })

    this.meter.on('sample', this.checkActivity)
  },
  methods: {
    checkActivity (dB, percent, value) {
      if (value > this.settings.threshold) {
        this.active = true
      } else {
        this.active = false
      }
    },

    toggleListening () {
      if (this.meter.listening) {
        this.meter.stopListening()
      } else {
        this.meter.listen()
      }
    }
  }
}
</script>

<style scoped lang="sass">
  @import "../assets/text-stroke"

  $footer-size: 70px

  #icon
    text-align: center
    margin-bottom: 10px
    i
      /*text-shadow: 1px 1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000*/
      @include text-stroke(1, #000, 0)
      cursor: pointer

  html
    position: relative
    min-height: 100%

  body
    margin-bottom: $footer-size

  .footer
    position: absolute
    bottom: 0
    width: 100%
    height: $footer-size
    line-height: 15px
    background-color: #f5f5f5
    .container
      i
        margin-top: 8px
      a, a:link, a:visited
        text-decoration: none
        color: #000
      a:hover
        color: #004b81
</style>
