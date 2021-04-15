<template>
  <b-card no-body>
    <b-card-body class="pb-1">
      <b-card-title>
        <h1>PowerKill / Square Off All Open Positions At Once.</h1>
      </b-card-title>
      <div class="demo-spacing-0">
        <b-alert
          variant="primary"
          show
        >
          <h4 class="alert-heading">
            Warning !
          </h4>
          <div class="alert-body">
            <span>Auto Squareoff or Auto Takeprofits are execeuted at market prices and are subjected to market slippages. We do not take any responsibility of slippage losses due to auto squareoff of all positions in line with your set parameters. This Process is Irreversible !, Please Ensure That You Want To Squareoff All Open Positions At Once.</span>
          </div>
        </b-alert>
      </div>
      <br>
      <br>
      <b-row class="match-height">
        <b-col md="6">
          <v-select
            v-model="BrokerSelection"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="option"
            placeholder="Select Connected 'Broker / Multiple Brokers' Accounts"
          />
        </b-col>
        <br>
        <!-- submit button -->
        <b-col md="6">
          <b-button
            id="powerkill1"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            block
            type="submit"
            variant="gradient-danger"
            @click="PowerKill"
          >
            <feather-icon
              icon="XCircleIcon"
              class="mr-50"
            />
            <span class="align-middle">Power Kill / Square Off All Open Positions At Once</span>
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script>
import {
  BRow, BCol,
  BCard,
  BCardBody,
  BCardTitle,
  BAlert,
  BButton,
  VBPopover,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardTitle,
    BAlert,
    BButton,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      BrokerSelection: [],
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
    }
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
  methods: {
    showCancelToast(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'XIcon',
          text: 'Select Connected \'Broker or Multiple Brokers\' Accounts',
          variant,
        },
      }, {
        timeout,
      })
    },
    PowerKill() {
      this.$swal({
        title: '<span class="font-weight-bolder">ARE YOU SURE ?</span>',
        // text: "You won't be able to revert this!",
        html:
          '<span class="font-weight-bolder">You won\'t be able to revert this!</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, PowerKill!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value && Boolean(this.BrokerSelection.length >= 1)) {
          this.$swal({
            icon: 'success',
            title: '<span class="font-weight-bolder">PowerKilled!</span>',
            html:
              '<span class="font-weight-bolder">All Positions has been Squared Off.</span>',
            // text: 'All Positions has been Squared Off.',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.powerkill('yes')
        } else if (result.dismiss === 'cancel' && Boolean(this.BrokerSelection.length >= 1)) {
          this.$swal({
            title: '<span class="font-weight-bolder">Cancelled</span>',
            html:
              '<span class="font-weight-bolder">PowerKill Positions Has Been Cancelled :)</span>',
            // text: 'PowerKill Positions Has Been Cancelled :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.powerkill('cancel')
        } else {
          this.showCancelToast('danger')
        }
      })
    },
    powerkill(variant) {
      const selectedbrokers = this.BrokerSelection.map(({ title }) => title)
      console.log(selectedbrokers)
      if (variant === 'yes') {
        console.log('PowerKilled at All Brokers: ', JSON.stringify(this.BrokerSelection))
      } else {
        console.log('PowerKilled Cancelled at All Brokers: ', JSON.stringify(this.BrokerSelection))
        this.BrokerSelection = []
      }
    },
  },
}
</script>
