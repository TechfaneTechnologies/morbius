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
        <!-- primary -->
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
      <template #title>
        <feather-icon
          icon="CalendarIcon"
          size="16"
          class="mr-0 mr-sm-50"
        />
        <strong><span class="d-none d-sm-inline">Date &amp; Time</span></strong>
      </template>
      <br>
      <b-card-title>
        <h2>
          Input The Exact Date and Time At Which All Open Positions Shall Be Squaredoff.
        </h2>
      </b-card-title>
      <b-card-text>
        <strong>The Auto Squareoff will be set as Squareoff All Positions If Current Date &amp; Time = Set Date &amp; Time ( i.e. <span class="text-danger">{{ datevalue }}, {{ timevalue }}</span> )</strong>
      </b-card-text>
      <b-alert
        class="mb-0"
        show
        variant="warning"
      >
        <div class="alert-body">
          <span>The Accepted Date Ranges Are Between</span>
          <code>Today</code>
          <span> To </span>
          <code>+ 07 Days</code>
          <span>, And The Accepted Time Values Are Between</span>
          <code>09:15:01</code>
          <span> To </span>
          <code>15:29:59</code>
        </div>
      </b-alert>
      <br>
      <b-row class="match-height">
        <b-col md="4">
          <h6><label for="Select-Broker"><strong>Select Connected 'Broker / Multiple Brokers' Accounts</strong></label></h6>
          <v-select
            id="Select-Broker"
            v-model="selectedBrokers"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            multiple
            label="title"
            :options="option"
            placeholder="Select Connected 'Broker / Multiple Brokers' Accounts"
          />
        </b-col>

        <b-col md="4">
          <h6><label for="datepicker-full-width"><strong>Choose The Date</strong></label></h6>
          <b-form-datepicker
            id="datepicker-full-width"
            v-model="datevalue"
            today-button
            reset-button
            close-button
            :min="minDat"
            :max="maxDat"
            locale="en"
            menu-class="w-100"
            calendar-width="100%"
            :state="! Boolean(datevalue >= minDate && datevalue <= maxDate)"
            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' }"
            placeholder="Select Squareoff Date"
            selected-variant="success"
          />
        </b-col>

        <!-- :state="Boolean((timevalue.substr(0,2) >=9 && timevalue.substr(0,2) <=15) && ((timevalue.substr(0 ,2) == 9 && timevalue.substr(3,2) >= 15) || (timevalue.substr(0,2) == 15 && timevalue.substr(3,2) <=29) || (timevalue.substr(0 ,2) >= 9 && timevalue.substr(0,2) <= 15)))" -->
        <b-col md="4">
          <h6><label for="timepicker-invalid"><strong>Choose The Time</strong></label></h6>
          <b-form-timepicker
            id="datepicker-invalid"
            v-model="timevalue"
            :state="CorrectTime"
            class="mb-2"
            now-button
            reset-button
            locale="en"
            show-seconds
          />
        </b-col>
        <br>
        <!-- submit button -->
        <b-col md="8">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            v-b-popover.hover.focus="'Please Recheck The Desired Squareoff Date and Time Again Before Clicking Submit, This Process is Irreversible !'"
            block
            title="Warning"
            type="submit"
            variant="relief-info"
            @click="SqrOffDateTime"
          >
            Submit
          </b-button>
        </b-col>
        <b-col md="4">
          <div align="center">
            <b-form-checkbox
              :checked="squareoffactivestatus2"
              class="custom-control-danger"
              name="squareoff-active-button"
              :disabled="squareoffdisabled2"
              switch
              inline
            >
              <h5><span class="text-danger font-weight-bolder"> SquareOff Order Is Active  </span></h5>
            </b-form-checkbox>
            <b-button
              id="squareoff-cancel2"
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              size="sm"
              title="Cancel Suareoff Order"
              type="submit"
              variant="outline-primary"
              :disabled="squareoffcancel2"
              pill
              @click.prevent="ValidationCancel2"
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
import {
  BRow, BCol,
  BCard,
  BCardBody,
  BCardText,
  BCardTitle,
  BAlert,
  BButton,
  VBPopover,
  BFormDatepicker,
  BFormTimepicker,
  BFormCheckbox,
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
    BCardText,
    BCardTitle,
    BAlert,
    BButton,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormDatepicker,
    BFormTimepicker,
    BFormCheckbox,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const minDate = new Date(today)
    minDate.setDate(minDate.getDate())

    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate() + 7)

    return {
      timevalue: '14:50:01',
      datevalue: '',
      minDat: minDate,
      maxDat: maxDate,
      selectedBrokers: [],
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
      squareoffactivestatus2: false,
      squareoffdisabled2: true,
      squareoffcancel2: true,
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
    CorrectTime() {
      const val = Boolean((Date.parse(`'01/01/2021 ${this.timevalue}`) > Date.parse('01/01/2021 9:15:00')) && (Date.parse(`'01/01/2021 ${this.timevalue}`) < Date.parse('01/01/2021 15:30:00')))
      // // console.log(this.minDat.toLocaleDateString(), this.timevalue, val)
      return val
    },
  },
  methods: {
    // setNow() {
    //   const now = new Date()
    //   // Grab the HH:mm:ss part of the time string
    //   this.timevalue = now.toTimeString().slice(0, 8)
    // },
    // clearTime() {
    //   this.timevalue = ''
    // },
    showcancelToast(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'XIcon',
          text: 'Select Connected \'Broker or Multiple Brokers\' Accounts and Provide Valid Date and Time',
          variant,
        },
      }, {
        timeout,
      })
      // var d = new Date();
      // d.toLocaleString();       // -> "2/1/2013 7:37:08 AM"
      // d.toLocaleDateString();   // -> "2/1/2013"
      // d.toLocaleTimeString();  // -> "7:38:05 AM"
      // // console.log(Date.parse(this.minDat.toLocaleDateString(), this.timevalue) <= Date.parse(this.minDat.toLocaleDateString(), '15:29:59'))
      // // console.log(this.minDat.toLocaleDateString(), this.timevalue)
    },
    SqrOffDateTime() {
      this.$swal({
        title: '<span class="font-weight-bolder">ARE YOU SURE ?</span>',
        // text: "You won't be able to revert this!",
        html:
          '<span class="font-weight-bolder">You won\'t be able to revert this!</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, SetSquareoff!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value && Boolean(this.selectedBrokers.length >= 1) && Boolean(this.minDat) && this.CorrectTime && !this.squareoffactivestatus2 && this.squareoffcancel2) {
          this.$swal({
            icon: 'success',
            title: '<span class="font-weight-bolder">DateTime Squareoff Set</span>',
            html:
              '<span class="font-weight-bolder">The DateTime Squareoff Order has been sent to the brokers.</span>',
            // text: 'All Positions has been Squared Off.',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.yesno('yes')
          this.squareoffactivestatus2 = true
          this.squareoffcancel2 = false
        } else if (result.dismiss === 'cancel' && Boolean(this.selectedBrokers.length >= 1) && Boolean(this.minDat) && this.CorrectTime) {
          this.$swal({
            title: '<span class="font-weight-bolder">DateTime Squareoff Cancelled</span>',
            html:
              '<span class="font-weight-bolder">The DateTime Squareoff Cancellation Order has been sent to the brokers :)</span>',
            // text: 'PowerKill Positions Has Been Cancelled :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.yesno('no')
        } else if (this.squareoffactivestatus2 && !this.squareoffcancel2) {
          this.$swal({
            title: '<span class="font-weight-bolder">DateTime Squareoff Already Active</span>',
            html:
              '<span class="font-weight-bolder">The DateTime Squareoff Cancellation Order is already active at the brokers accounts. :)</span>',
            // text: 'PowerKill Positions Has Been Cancelled :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.yesno('no')
        } else {
          this.showcancelToast('danger')
        }
      })
    },
    yesno(variant) {
      const selectedbrokers = this.selectedBrokers.map(({ title }) => title)
      // console.log(selectedbrokers)
      if (variant === 'yes') {
        // console.log('The DateTime Squareoff Order has been sent to these brokers: ', JSON.stringify(this.selectedBrokers), 'Date: ', this.datevalue, ', Time: ', this.timevalue)
      } else {
        // console.log('The DateTime Squareoff Cancellation Order has been sent to these brokers: ', JSON.stringify(this.selectedBrokers), 'Date: ', this.datevalue, ', Time: ', this.timevalue)
        // this.selectedBrokers = []
        // this.datevalue = ''
        // this.timevalue = ''
      }
    },
    ShowCancelToast2(variant, timeout) {
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
    ValidationCancel2() {
      if (this.squareoffactivestatus2 && !this.squareoffcancel2) {
        // console.log('Squareoff Cancel Order Sent Successfully')
        // console.log('The DateTime Squareoff Cancellation Order has been sent to these brokers: ', JSON.stringify(this.selectedBrokers), 'Date: ', this.datevalue, ', Time: ', this.timevalue)
        this.squareoffactivestatus2 = false
        this.squareoffcancel2 = true
        this.ShowCancelToast2('danger')
        this.selectedBrokers = []
        this.datevalue = ''
        this.timevalue = ''
      }
    },
  },
}
</script>
