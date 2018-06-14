import Value from './components/Value.vue'
import Multistate from './components/Multistate.vue'
import Chart from './components/Chart.vue'
import Trend from './components/Trend.vue'

import PIWebAPI from './piwebapi.js'

import AsyncComputed from 'vue-async-computed'
import axios from 'axios'

import _ from 'lodash'

window._ = _

function assign (target, source) { // eslint-disable-line no-unused-vars
  for (var index = 1, key, src; index < arguments.length; ++index) {
    src = arguments[index]

    for (key in src) {
      if (Object.prototype.hasOwnProperty.call(src, key)) {
        target[key] = src[key]
      }
    }
  }
  return target
}

// Install the components
export function install (Vue, options) {
  const DEFAULT_OPTIONS = {
    url: '/piwebapi',
    auth_header: '',
    defeat_cache: true
  }

  options = assign(DEFAULT_OPTIONS, options)
  axios.defaults.headers.common['Authorization'] = options['auth_header']

  Vue.use(AsyncComputed)
  Vue.use(PIWebAPI, options)

  Vue.component('pi-value', Value)
  Vue.component('pi-multistate', Multistate)
  Vue.component('pi-trend', Trend)
  Vue.component('pi-chart', Chart)
  /* -- Add more components here -- */
}

// Expose the components
export {
  Value
  /* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  install
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
