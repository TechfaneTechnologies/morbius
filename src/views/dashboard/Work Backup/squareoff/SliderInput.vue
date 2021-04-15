<template>
  <b-card no-body>
    <b-card-body class="pb-1">
      <b-card-title>
        <br>
        <h2>
          Auto Squareoff All Positions When Net PNL Meets or Exceeds: <span class="text-danger"> -{{ ldot }} %</span> 'or' <span class="text-success"> +{{ rdot }} %</span> of Capital.
        </h2>
      </b-card-title>
      <br>
      <br>
      <b-row class="match-height">
        <b-col md="6">
          <b-card-title>
            <h6>Set The Drawdown Percentage</h6>
            <br>
            <br>
          </b-card-title>
          <vue-slider
            v-model="ldot"
            :tooltip="'always'"
            :interval="0.01"
            class="mb-3 vue-slider-danger"
            :direction="direction"
          />
        </b-col>
        <b-col md="6">
          <b-card-title>
            <h6>Set The Take Profit Percentage</h6>
            <br>
            <br>
          </b-card-title>
          <vue-slider
            v-model="rdot"
            :tooltip="'always'"
            :interval="0.01"
            class="mb-3 vue-slider-success"
            :direction="direction"
          />
        </b-col>
      </b-row>
      <b-col md="12">
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          v-b-popover.hover.focus="'Please Recheck The Drawdown & Takeprofit Percentage Once Again Before Clicking Submit, This Process is Irreversible !'"
          block
          title="Warning"
          type="submit"
          variant="relief-primary"
          @click="showToast('success')"
        >
          Submit
        </b-button>
      </b-col>
      <!-- </b-row> -->
    </b-card-body>
  </b-card>
</template>

<script>
// import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BRow,
  BCol,
  BButton,
  VBPopover,
} from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    VueSlider,
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      ldot: 1,
      rdot: 2,
      dir: 'ltr',
    }
  },
  computed: {
    values: {
      get() {
        return [this.ldot, this.rdot]
      },
      set([ldot, rdot]) {
        this.ldot = ldot
        this.rdot = rdot
      },
    },
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
  methods: {
    showToast(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'CheckIcon',
          text: 'Your Auto Squareoff Order Has Been Succesfully Placed',
          variant,
        },
      },
      {
        timeout,
      })
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-slider.scss';
</style>
