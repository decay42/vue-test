// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.component('color-input', {
  template: `
    <input
      class="jscolor { hash: true } form-control"
      v-bind:value="value"
      v-on:change="updateValue($event.target.value)">
  `,
  props: ['value', 'setting'],
  methods: {
    updateValue: function (value) {
      localStorage.setItem(this.setting, value)
      this.$emit('input', value)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
