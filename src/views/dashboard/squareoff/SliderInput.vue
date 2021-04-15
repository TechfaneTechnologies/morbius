<template>
  <b-card no-body>
    <b-card-body class="pb-1">
      <b-card-title>
        <br>
        <h2>
          Auto Squareoff All Positions When Net PNL Meets or Exceeds: <span class="text-danger"> -{{ ldot }} %</span> 'or' <span class="text-success"> +{{ rdot }} %</span> Of My {{ broker.map(({ title }) => title) }} Account Capital.
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
      <b-row class="match-height">
        <b-col md="4">
          <h6><strong><label for="select-broker">Select Broker</label></strong></h6>
          <b-form-group>
            <v-select
              id="select-broker"
              v-model="broker"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="title"
              :options="option"
              placeholder="Select Connected 'Broker / Multiple Brokers' Accounts"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <h6><strong><label for="Squareoff-Submit">Ensure Broker Selection for Capital Calculation</label></strong></h6>
          <b-button
            id="Squareoff-Submit"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            v-b-popover.hover.focus="'Please Recheck The Drawdown &amp; Takeprofit Percentage Once Again Before Clicking Submit, This Process is Irreversible !'"
            title="Squareoff-Submit"
            type="submit"
            variant="relief-primary"
            @click.prevent="validationForm"
          >
            Submit
          </b-button>
        </b-col>
        <b-col md="4">
          <div align="center">
            <b-form-checkbox
              :checked="Squareoffactivestatus"
              class="custom-control-danger"
              name="Squareoff-active-button"
              :disabled="Squareoffdisabled"
              switch
              inline
            >
              <h5><span class="text-danger font-weight-bolder"> SquareOff Order Is Active  </span></h5>
            </b-form-checkbox>
            <b-button
              id="Squareoff-cancel"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              title="Cancel Suareoff Order"
              type="submit"
              variant="outline-primary"
              :disabled="Squareoffcancel"
              pill
              @click.prevent="ValidationCancel"
            >
              Cancel
            </b-button>
          </div>
        </b-col>
      </b-row>
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
  BFormGroup,
  BFormCheckbox,
} from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'
import store from '@/store/index'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    VueSlider,
    BButton,
    BFormGroup,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormCheckbox,
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
      broker: [],
      option: [
        { title: 'Alice Blue' },
        { title: 'Zerodha' },
        { title: 'Upstox' },
        { title: 'Angel Broking' },
        { title: 'IIFL' },
        { title: '5 Paisa' },
        { title: 'Samco' },
        { title: 'Fyers' },
        { title: 'Alpaca' },
        { title: 'Binance' },
        { title: 'FXCM' },
      ],
      Squareoffactivestatus: false,
      Squareoffdisabled: true,
      Squareoffcancel: true,
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
    ShowToast(variant, timeout) {
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
    ShowToast1(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'XIcon',
          text: 'Your Auto Squareoff Order is Already Active',
          variant,
        },
      },
      {
        timeout,
      })
    },
    validationForm() {
      if (Boolean(this.ldot) && Boolean(this.rdot) && Boolean(this.broker.length >= 1) && !this.Squareoffactivestatus && this.Squareoffcancel) {
        console.log('Squareoff Parameters Sent Successfully')
        console.log('Broker: ', JSON.stringify(this.broker.map(({ title }) => title)), ',Minimum Value: ', this.ldot, '% ,Maximum Value: ', this.rdot, '%')
        this.Squareoffactivestatus = true
        this.Squareoffcancel = false
        this.ShowToast('success')
      } else if (this.Squareoffactivestatus && !this.Squareoffcancel) {
        this.ShowToast1('danger')
      }
    },
    ShowCancelToast(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'XIcon',
          /* eslint prefer-template: "error" */
          text: 'Your Auto Squareoff CancellationOrder Has Been Succesfully Placed',
          variant,
        },
      }, {
        timeout,
      })
    },
    ValidationCancel() {
      if (this.Squareoffactivestatus && !this.Squareoffcancel) {
        console.log('Squareoff Cancel Order Sent Successfully')
        console.log('Broker: ', JSON.stringify(this.broker.map(({ title }) => title)), ',Minimum Value: ', this.ldot, '% ,Maximum Value: ', this.rdot, '%')
        this.Squareoffactivestatus = false
        this.Squareoffcancel = true
        this.ShowCancelToast('danger')
        this.ldot = '0.01'
        this.rdot = '0.01'
        this.broker = []
      }
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-slider.scss';
</style>
