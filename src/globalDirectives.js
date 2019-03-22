import { directive as vClickOutside } from 'vue-clickaway'
import VTooltip from 'v-tooltip'

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install (Vue) {
    Vue.directive('click-outside', vClickOutside)
    Vue.use(VTooltip)
  }
}

export default GlobalDirectives
