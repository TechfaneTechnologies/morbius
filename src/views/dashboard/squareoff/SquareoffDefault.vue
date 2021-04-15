<template>
  <b-card no-body>
    <b-card-body class="pb-1">
      <b-card-title>
        <!-- <h1><span class="text-danger">Auto Squareoff</span> - <span class="text-success">Auto Takeprofit</span></h1> -->
        <h1>Set Auto Squareoff Parameters</h1>
      </b-card-title>
      <b-card-text>
        <strong>Please set your auto square off target or auto take profit target for all positions at once.</strong>
      </b-card-text>
      <div class="demo-spacing-0">
        <b-alert
          variant="primary"
          show
        >
          <h4 class="alert-heading">
            Warning !
          </h4>
          <div class="alert-body">
            <span>Auto Squareoff or Auto Takeprofits are execeuted at market prices and are subjected to market slippages. We do not take any responsibility of slippage losses due to auto squareoff of all positions in line with your set parameters.</span>
          </div>
        </b-alert>
      </div>
      <br>
      <br>
      <div>
        <slider-input />
      </div>
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BCard,
  BCardBody,
  BCardText,
  BCardTitle,
  BAlert,
  VBPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import SliderInput from './SliderInput.vue'

export default {
  components: {
    BCard,
    BCardBody,
    BCardText,
    BCardTitle,
    BAlert,
    SliderInput,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = 'rtl'
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = 'ltr'
      return this.dir
    },
  },
}
</script>
