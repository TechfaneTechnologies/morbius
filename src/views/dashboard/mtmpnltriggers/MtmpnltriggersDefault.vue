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
      <!-- <b-tabs pills nav-class="nav-pill-secondary"> -->
      <b-tabs
        pills
        align="center"
      >
        <b-tab active>
          <template #title>
            <feather-icon
              icon="ZapIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <strong><span class="d-none d-sm-inline">Advanced</span></strong>
          </template>
          <br>
          <b-card-title>
            <h2>
              Input The Minimum &amp; Maximum Value At Which All Open Positions Shall Be Squaredoff.
            </h2>
          </b-card-title>
          <b-card-text>
            <strong>The Auto Squareoff will be set as - Squareoff All Positions if <span class="text-success">{{ greaterthanval }}</span> &lt; {{ mtmorpnlval == 'mtm' ? 'Net MTM':'Net P&amp;L' }} &lt; <span class="text-danger">{{ lessthanval }}</span></strong>
          </b-card-text>
          <br>
          <validation-observer ref="simpleRules">
            <b-form-row>
              <b-col md="4">
                <div align="center">
                  <h6><strong><label for="mtmpnl">Select Net MTM / Net P&amp;L</label></strong></h6>
                  <b-form-radio-group
                    id="mtmpnl"
                    v-model="mtmorpnlval"
                    :options="radios"
                    :state="mtmorpnlvalstate"
                    value-field="mtmorpnlval"
                    text-field="text"
                    class="custom-control-success"
                  >
                    <b-form-invalid-feedback :state="mtmorpnlvalstate">
                      Please select Net MTM / Net P&amp;L
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="mtmorpnlvalstate">
                      You have selected {{ mtmorpnlval == 'mtm' ? 'Net MTM':'Net P&amp;L' }}
                    </b-form-valid-feedback>
                  </b-form-radio-group>
                </div>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <h6><strong><label for="lessthan">Less Than</label></strong></h6>
                  <validation-provider
                    #default="{ errors }"
                    name="Less Than"
                    rules="required|min:1"
                  >
                    <cleave
                      id="lessthan"
                      v-model="lessthanval"
                      class="form-control"
                      :raw="false"
                      :options="options.number"
                      :state="errors.length > 0 ? false:lessthanval.length > 0 ? true:null"
                      placeholder="10,000"
                    />
                    <small class="text-danger">{{ errors.length > 0 ? 'Provide A Valid [Less Than] or Type [0]':null }}</small>
                    <small class="text-success">{{ errors.length > 0 ? null:greaterthanval.length > 0 ? 'Looks Good!':null }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <h6><strong><label for="greaterthan">Greater Than</label></strong></h6>
                  <validation-provider
                    #default="{ errors }"
                    name="Greater Than"
                    rules="required|min:1"
                  >
                    <cleave
                      id="greaterthan"
                      v-model="greaterthanval"
                      class="form-control"
                      :raw="false"
                      :options="options.number"
                      :state="errors.length > 0 ? false:greaterthanval.length > 0 ? true:null"
                      placeholder="10,000"
                    />
                    <small class="text-danger">{{ errors.length > 0 ? 'Provide A Valid [Less Than] or Type [0]':null }}</small>
                    <small class="text-success">{{ errors.length > 0 ? null:greaterthanval.length > 0 ? 'Looks Good!':null }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-button
                  id="squareoff-submit"
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  block
                  title="Warning"
                  type="submit"
                  variant="relief-primary"
                  @click.prevent="validationForm"
                >
                  Submit
                </b-button>
                <b-popover
                  target="squareoff-submit"
                  variant="danger"
                  triggers="hover"
                  placement="right"
                >
                  <template #title>
                    <span>Warning!</span>
                  </template>
                  <span>Please Recheck The Minimum &amp; Maximum Values Once Again Before Clicking Submit, This Process is Irreversible !</span>
                </b-popover>
              </b-col>
              <b-col md="4">
                <b-alert
                  class="mb-0"
                  show
                  variant="success"
                >
                  <div
                    class="alert-body"
                    align="center"
                  >
                    <span>Provide A Valid</span>
                    <code>Less Than</code>
                    <span> and </span>
                    <code>Greater Than</code>
                    <span> or Put </span>
                    <code>0</code>
                  </div>
                </b-alert>
              </b-col>
              <b-col md="4">
                <div align="center">
                  <b-form-checkbox
                    :checked="squareoffactivestatus"
                    class="custom-control-danger"
                    name="squareoff-active-button"
                    :disabled="squareoffdisabled"
                    switch
                    inline
                  >
                    <h5><span class="text-danger font-weight-bolder"> SquareOff Order Is Active  </span></h5>
                  </b-form-checkbox>
                  <b-button
                    id="squareoff-cancel"
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    size="sm"
                    title="Cancel Suareoff Order"
                    type="submit"
                    variant="outline-primary"
                    :disabled="squareoffcancel"
                    pill
                    @click.prevent="validationCancel"
                  >
                    Cancel
                  </b-button>
                  <!-- <b-popover
                    target="squareoff-cancel"
                    variant="danger"
                    triggers="hover"
                    placement="right"
                  >
                    <template #title>
                      <span>Warning!</span>
                    </template>
                    <span>Please Recheck That you want to cancel the placed square off orders!, This Process is Irreversible !</span>
                  </b-popover> -->
                </div>
              </b-col>
            </b-form-row>
          </validation-observer>
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon
              icon="ZapIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <strong><span class="d-none d-sm-inline">Advanced-V1</span></strong>
          </template>
          <br>
          <b-card-title>
            <h2>
              Input The Minimum &amp; Maximum Value (₹) At Which All Open Positions Shall Be Squaredoff.
            </h2>
          </b-card-title>
          <b-card-text>
            <strong>The Auto Squareoff will be set as - Squareoff All Positions if <span class="text-success">{{ formatPrice(greaterthanval1) }}</span> &lt; {{ mtmorpnlval1 == 'mtm' ? 'Net MTM':'Net P&amp;L' }} &lt; <span class="text-danger">{{ formatPrice(lessthanval1) }}</span></strong>
          </b-card-text>
          <br>
          <validation-observer ref="simpleRules1">
            <b-form-row>
              <b-col md="4">
                <div align="center">
                  <h6><strong><label for="mtmpnl1">Select Net MTM / Net P&amp;L</label></strong></h6>
                  <b-form-radio-group
                    id="mtmpnl1"
                    v-model="mtmorpnlval1"
                    :options="radios1"
                    :state="mtmorpnlvalstate1"
                    value-field="mtmorpnlval1"
                    text-field="text"
                    class="custom-control-success"
                  >
                    <b-form-invalid-feedback :state="mtmorpnlvalstate1">
                      Please select Net MTM / Net P&amp;L
                    </b-form-invalid-feedback>
                    <b-form-valid-feedback :state="mtmorpnlvalstate1">
                      You have selected {{ mtmorpnlval1 == 'mtm' ? 'Net MTM':'Net P&amp;L' }}
                    </b-form-valid-feedback>
                  </b-form-radio-group>
                </div>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <h6><strong><label for="lessthan1">Less Than (In Multiples of 50)</label></strong></h6>
                  <validation-provider
                    #default="{ errors }"
                    name="Less Than"
                    rules="required|min:2"
                  >
                    <b-form-spinbutton
                      id="lessthan1"
                      v-model="lessthanval1"
                      min="-100000000"
                      max="100000000"
                      step="50"
                      :state="errors.length > 0 ? false:true"
                    />
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <h6><strong><label for="greaterthan1">Greater Than (In Multiples of 50)</label></strong></h6>
                  <validation-provider
                    #default="{ errors }"
                    name="Greater Than"
                    rules="required|min:2"
                  >
                    <b-form-spinbutton
                      id="greaterthan1"
                      v-model="greaterthanval1"
                      min="-100000000"
                      max="100000000"
                      step="50"
                      :state="errors.length > 0 ? false:true"
                    />
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-button
                  id="squareoff-submit1"
                  v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                  block
                  title="Submit Squareoff Order"
                  type="submit"
                  variant="relief-primary"
                  @click.prevent="validationForm1"
                >
                  Submit
                </b-button>
                <b-popover
                  target="squareoff-submit1"
                  variant="danger"
                  triggers="hover"
                  placement="right"
                >
                  <template #title>
                    <span>Warning!</span>
                  </template>
                  <span>Please Recheck The Minimum &amp; Maximum Values Once Again Before Clicking Submit, This Process is Irreversible !</span>
                </b-popover>
              </b-col>
              <b-col md="4">
                <b-alert
                  class="mb-0"
                  show
                  variant="success"
                >
                  <div
                    class="alert-body"
                    align="center"
                  >
                    <span>The </span>
                    <code>ArrowUp</code>
                    <span> and </span>
                    <code>ArrowDown</code>
                    <span> keys can be used to </span>
                    <code>+</code>
                    <span>&amp;</span>
                    <code>-</code>
                  </div>
                </b-alert>
              </b-col>
              <b-col md="4">
                <div align="center">
                  <b-form-checkbox
                    :checked="squareoffactivestatus1"
                    class="custom-control-danger"
                    name="squareoff-active-button"
                    :disabled="squareoffdisabled1"
                    switch
                    inline
                  >
                    <h5><span class="text-danger font-weight-bolder"> SquareOff Order Is Active  </span></h5>
                  </b-form-checkbox>
                  <b-button
                    id="squareoff-cancel1"
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    size="sm"
                    title="Cancel Suareoff Order"
                    type="submit"
                    variant="outline-primary"
                    :disabled="squareoffcancel1"
                    pill
                    @click.prevent="validationCancel1"
                  >
                    Cancel
                  </b-button>
                </div>
              </b-col>
            </b-form-row>
          </validation-observer>
        </b-tab>
      </b-tabs>
    </b-card-body>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCol,
  BCard,
  BCardBody,
  BCardText,
  BCardTitle,
  BAlert,
  BFormRow,
  BFormGroup,
  BFormValidFeedback,
  BFormInvalidFeedback,
  BButton,
  BTabs,
  BTab,
  VBPopover,
  BFormRadioGroup,
  BFormSpinbutton,
  BPopover,
  BFormCheckbox,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Cleave from 'vue-cleave-component'
import { required } from '@validations'

export default {
  components: {
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BCardTitle,
    BAlert,
    BButton,
    BPopover,
    BFormRow,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BFormGroup,
    BTabs,
    BTab,
    BFormRadioGroup,
    Cleave,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormSpinbutton,
    ValidationProvider,
    ValidationObserver,
    BFormCheckbox,
  },
  directives: {
    'b-popover': VBPopover,
    Ripple,
  },
  data() {
    return {
      lessthanval1: '0',
      greaterthanval1: '0',
      lessthanval: '',
      greaterthanval: '',
      required,
      mtmorpnlval: null,
      mtmorpnlval1: null,
      squareoffactivestatus: false,
      squareoffdisabled: true,
      squareoffcancel: true,
      squareoffactivestatus1: false,
      squareoffdisabled1: true,
      squareoffcancel1: true,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'lakh',
        },
      },
      radios: [
        { text: 'Net MTM', mtmorpnlval: 'mtm' },
        { text: 'Net P&L', mtmorpnlval: 'pnl' },
      ],
      radios1: [
        { text: 'Net MTM', mtmorpnlval1: 'mtm' },
        { text: 'Net P&L', mtmorpnlval1: 'pnl' },
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
    mtmorpnlvalstate() {
      // // console.log(this.mtmpnlval)
      return Boolean(this.mtmorpnlval)
    },
    mtmorpnlvalstate1() {
      // // console.log(this.mtmpnlval)
      return Boolean(this.mtmorpnlval1)
    },
  },
  methods: {
    showToast(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'CheckIcon',
          /* eslint prefer-template: "error" */
          text: `Your Auto Squareoff Order Has Been Succesfully Placed as - Squareoff if ${this.greaterthanval} < Net${this.mtmorpnlval.toUpperCase()} < ${this.lessthanval}`,
          variant,
        },
      }, {
        timeout,
      })
    },
    showToast1(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'CheckIcon',
          /* eslint prefer-template: "error" */
          text: `Your Auto Squareoff Order Has Been Succesfully Placed as - Squareoff if ${this.greaterthanval1} < Net${this.mtmorpnlval1.toUpperCase()} < ${this.lessthanval1}`,
          variant,
        },
      }, {
        timeout,
      })
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          // alert('form submitted!')
          if (!this.squareoffactivestatus && this.squareoffdisabled && Boolean(this.mtmorpnlval)) {
            // console.log('Squareoff Parameters Sent Successfully')
            // console.log('Minimum Value: ', this.lessthanval, ' ,Maximum Value: ', this.greaterthanval)
            this.squareoffactivestatus = true
            // this.squareoffdisabled1 = true
            this.squareoffcancel = false
            this.showToast('success')
          } else if (this.squareoffactivestatus && !this.squareoffdisabled) {
            this.showToast3('danger')
          }
        }
      })
    },
    validationForm1() {
      this.$refs.simpleRules1.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          // alert('form submitted!')
          if (!this.squareoffactivestatus1 && this.squareoffdisabled1 && Boolean(this.mtmorpnlval1)) {
            // console.log('Squareoff Parameters Sent Successfully')
            // console.log('Minimum Value1: ', this.lessthanval1, ' ,Maximum Value1: ', this.greaterthanval1)
            this.squareoffactivestatus1 = true
            // this.squareoffdisabled1 = true
            this.squareoffcancel1 = false
            this.showToast1('success')
          } else if (this.squareoffactivestatus1 && !this.squareoffdisabled1) {
            this.showToast3('danger')
          }
        }
      })
    },
    showCancelToast(variant, timeout) {
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
    showToast3(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'XIcon',
          /* eslint prefer-template: "error" */
          text: 'Your Auto Squareoff Orders are already active.',
          variant,
        },
      }, {
        timeout,
      })
    },
    validationCancel() {
      if (this.squareoffactivestatus && !this.squareoffcancel) {
        // console.log('Squareoff Cancel Order Sent Successfully')
        this.squareoffactivestatus = false
        // this.squareoffdisabled1 = true
        this.squareoffcancel = true
        this.showCancelToast('danger')
        this.mtmorpnlval = null
        this.lessthanval = ''
        this.greaterthanval = ''
      }
    },
    validationCancel1() {
      if (this.squareoffactivestatus1 && !this.squareoffcancel1) {
        // console.log('Squareoff Cancel Order Sent Successfully')
        this.squareoffactivestatus1 = false
        // this.squareoffdisabled1 = true
        this.squareoffcancel1 = true
        this.showCancelToast('danger')
        this.mtmorpnlval1 = null
        this.lessthanval1 = ''
        this.greaterthanval1 = ''
      }
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, '$1,')
      return val
    },
  },
}
</script>
