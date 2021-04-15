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
          variant="warning"
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
              icon="TrendingUpIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <strong><span class="d-none d-sm-inline">Basic</span></strong>
          </template>
          <div>
            <slider-input />
          </div>
        </b-tab>
        <b-tab>
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
              Input The Minimum &amp; Maximum Value (₹) At Which All Open Positions Shall Be Squaredoff.
            </h2>
          </b-card-title>
          <b-card-text>
            <strong>The Auto Squareoff will be set as " Squareoff All Positions if NetPNL ≥ Maximum 'or' NetPNL ≤ Minimum "</strong>
          </b-card-text>
          <br>
          <b-form
            novalidate
            class="needs-validation"
            @submit.prevent
          >
            <b-form-row>
              <!-- valid input  -->
              <b-col
                md="4"
                class="mb-3"
              >
                <h6><label for="input-invalid1"><strong>Select Net MTM / Net PNL</strong></label></h6>
                <b-form-group>
                  <v-select
                    v-model="selected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="sqroffif"
                    label="title"
                  >
                    <template #option="{ title, icon }">
                      <feather-icon
                        :icon="icon"
                        size="18"
                        class="align-middle mr-50"
                      />
                      <strong><span> {{ title }}</span></strong>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <!-- invalid input -->
              <b-col
                md="4"
                class="mb-3"
              >
                <h6><label for="input-invalid2"><strong>Less Than or Equal To 0 ( ≤ 0 ) Value (₹)</strong></label></h6>
                <b-form-input
                  id="input-invalid2"
                  v-model="value1"
                  :state="value1 <= 0 && value1.length > 0"
                  placeholder="Invalid input"
                />
                <b-form-valid-feedback tooltip>
                  Looks Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback tooltip>
                  Please provide a valid input ≤ 0.
                </b-form-invalid-feedback>
              </b-col>
              <!-- invalid input -->
              <b-col
                md="4"
                class="mb-3"
              >
                <h6><label for="input-invalid3"><strong>Greater Than or Equal To 0 ( ≥ 0 ) Value (₹)</strong></label></h6>
                <b-form-input
                  id="input-invalid3"
                  v-model="value2"
                  :state="value2 >= 0 && value2.length > 0"
                  placeholder="Invalid input"
                />
                <b-form-valid-feedback tooltip>
                  Looks Good!
                </b-form-valid-feedback>
                <b-form-invalid-feedback tooltip>
                  Please provide a valid input ≥ 0.
                </b-form-invalid-feedback>
              </b-col>
              <br>
              <br>
              <!-- submit button -->
              <b-col cols="12">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  v-b-popover.hover.focus="'Please Recheck The Minimum &amp; Maximum Values Once Again Before Clicking Submit, This Process is Irreversible !'"
                  block
                  title="Warning"
                  type="submit"
                  variant="relief-success"
                  @click="showToast('success')"
                >
                  Submit
                </b-button>
              </b-col>
            </b-form-row>
          </b-form>
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
            <strong>The Auto Squareoff will be set as " Squareoff All Positions if NetPNL ≥ Maximum 'or' NetPNL ≤ Minimum "</strong>
          </b-card-text>
          <br>
          <b-form
            novalidate
            class="needs-validation"
            @submit.prevent
          >
            <b-form-row>
              <!-- valid input  -->
              <b-col
                md="4"
                class="mb-3"
              >
                <h6><label for="input-invalid4"><strong>Select Net MTM / Net PNL</strong></label></h6>
                <b-form-group>
                  <v-select
                    v-model="selected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="sqroffif"
                    label="title"
                  >
                    <template #option="{ title, icon }">
                      <feather-icon
                        :icon="icon"
                        size="18"
                        class="align-middle mr-50"
                      />
                      <strong><span> {{ title }}</span></strong>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col
                md="4"
                class="mb-3"
              >
                <div>
                  <h6><label for="sb-maxmin1"><strong>Less Than or Equal To 0 ( ≤ 0 ) Value In Multiples of (₹ 50)</strong></label></h6>
                  <b-form-spinbutton
                    id="sb-maxmin1"
                    v-model="spinvalue_min"
                    min="-1000000"
                    max="0"
                    step="50"
                    :state="Boolean(spinvalue_min <= 0)"
                  />
                </div>
              </b-col>
              <b-col
                md="4"
                class="mb-3"
              >
                <div>
                  <h6><label for="sb-maxmin2"><strong>Greater Than or Equal To 0 ( ≥ 0 ) Value In Multiples of (₹ 50)</strong></label></h6>
                  <b-form-spinbutton
                    id="sb-maxmin2"
                    v-model="spinvalue_max"
                    min="-0"
                    max="1000000"
                    step="50"
                    :state="Boolean(spinvalue_max >= 0)"
                  />
                </div>
              </b-col>
              <!-- submit button -->
              <!-- <b-col cols="12"> -->
              <b-col md="4">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  v-b-popover.hover.focus="'Please Recheck The Minimum &amp; Maximum Values Once Again Before Clicking Submit, This Process is Irreversible !'"
                  block
                  title="Warning"
                  type="submit"
                  variant="relief-success"
                  @click="showToast('success')"
                >
                  Submit
                </b-button>
              </b-col>
              <b-col md="8">
                <b-alert
                  class="mb-0"
                  show
                  variant="success"
                >
                  <div class="alert-body">
                    <span>The </span>
                    <code>ArrowUp</code>
                    <span> and </span>
                    <code>ArrowDown</code>
                    <span> keys can be used to increment or decrement the value.</span>
                  </div>
                </b-alert>
              </b-col>
            </b-form-row>
          </b-form>
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon
              icon="ClockIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <strong><span class="d-none d-sm-inline">Time</span></strong>
          </template>
          <br>
          <b-card-title>
            <h2>
              Input The Exact Time At Which All Open Positions Shall Be Squaredoff.
            </h2>
          </b-card-title>
          <b-card-text>
            <strong>The Auto Squareoff will be set as Squareoff All Positions If Current Time = Set Time ( i.e. <span class="text-danger">{{ timevalue }}</span> )</strong>
          </b-card-text>
          <b-alert
            class="mb-0"
            show
            variant="warning"
          >
            <div class="alert-body">
              <span>The Accepted Time Values Are Between</span>
              <code>09:15:01</code>
              <span> to </span>
              <code>15:29:59</code>
            </div>
          </b-alert>
          <br>
          <div align="center">
            <b-time
              v-model="timevalue"
              show-seconds
              locale="en"
            >
              <div
                class="d-flex"
                dir="ltr"
              >
                <b-button
                  v-if="timevalue"
                  size="sm"
                  variant="outline-danger"
                  @click="clearTime"
                >
                  Clear time
                </b-button>
                <b-button
                  size="sm"
                  variant="outline-primary"
                  class="ml-auto"
                  @click="setNow"
                >
                  Set Now
                </b-button>
              </div>
            </b-time>
            <br>
            <br>
            <!-- submit button -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                v-b-popover.hover.focus="'Please Recheck The Desired Squareoff Time Again Before Clicking Submit, This Process is Irreversible !'"
                block
                title="Warning"
                type="submit"
                variant="relief-info"
                @click="showToast('success')"
              >
                Submit
              </b-button>
            </b-col>
          </div>
        </b-tab>

        <b-tab>
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
            <b-col md="6">
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

            <b-col md="6">
              <h6><label for="timepicker-invalid"><strong>Choose The Time</strong></label></h6>
              <b-form-timepicker
                id="datepicker-invalid"
                v-model="timevalue"
                :state="Boolean((timevalue.substr(0,2) >=9 && timevalue.substr(0,2) <=15) && ((timevalue.substr(0 ,2) == 9 && timevalue.substr(3,2) >= 15) || (timevalue.substr(0,2) == 15 && timevalue.substr(3,2) <=29)))"
                class="mb-2"
                now-button
                reset-button
                locale="en"
                show-seconds
              />
            </b-col>

            <!-- submit button -->
            <b-col cols="12">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                v-b-popover.hover.focus="'Please Recheck The Desired Squareoff Date and Time Again Before Clicking Submit, This Process is Irreversible !'"
                block
                title="Warning"
                type="submit"
                variant="relief-info"
                @click="showToast('success')"
              >
                Submit
              </b-button>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon
              icon="XCircleIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <strong><span class="d-none d-sm-inline">PowerKill</span></strong>
          </template>
          <br>
          <b-card-title>
            <h2>
              PowerKill / Square Off All Open Positions At Once.
            </h2>
          </b-card-title>
          <b-alert
            class="mb-0"
            show
            variant="warning"
          >
            <div class="alert-body">
              <span>This Process is Irreversible !, Please Ensure That You Want To Squareoff All Open Positions At Once.</span>
            </div>
          </b-alert>
          <br>
          <b-row class="match-height">
            <!-- submit button -->
            <b-col cols="12">
              <b-button
                id="powerkill1"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                size="lg"
                block
                type="submit"
                variant="gradient-danger"
                @click="withHtml"
              >
                <feather-icon
                  icon="XCircleIcon"
                  class="mr-50"
                />
                <span class="align-middle">PowerKill</span>
              </b-button>
            </b-col>
          </b-row>
        </b-tab>

      </b-tabs>
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
  // BTableSimple, BTr, BTbody, BTd,
  BAlert,
  BFormInput,
  BForm,
  BFormRow,
  BFormGroup,
  BFormValidFeedback,
  BFormInvalidFeedback,
  BButton,
  BTabs,
  BTab,
  VBPopover,
  BTime,
  BFormSpinbutton,
  BFormDatepicker,
  BFormTimepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import SliderInput from './SliderInput.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardText,
    BCardTitle,
    // BTableSimple, BTr, BTbody, BTd,
    BAlert,
    SliderInput,
    BForm,
    BFormInput,
    BButton,
    BFormRow,
    BFormValidFeedback,
    BFormInvalidFeedback,
    BFormGroup,
    vSelect,
    BTabs,
    BTab,
    BTime,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    BFormSpinbutton,
    BFormDatepicker,
    BFormTimepicker,
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
      selected: {
        title: 'If Net PNL is',
        icon: 'FileTextIcon',
      },
      value1: '-1000',
      value2: '1000',
      sqroffif: [{
        title: 'If Net MTM is',
        icon: 'TrendingUpIcon',
      },
      {
        title: 'If Net PNL is',
        icon: 'FileTextIcon',
      },
      ],
      timevalue: '15:20:22',
      spinvalue_min: '-50',
      spinvalue_max: '50',
      datevalue: '',
      minDat: minDate,
      maxDat: maxDate,
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
    setNow() {
      const now = new Date()
      // Grab the HH:mm:ss part of the time string
      this.timevalue = now.toTimeString().slice(0, 8)
    },
    clearTime() {
      this.timevalue = ''
    },
    showToast(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'CheckIcon',
          text: 'Your Auto Squareoff Order Has Been Succesfully Placed',
          variant,
        },
      }, {
        timeout,
      })
    },
    withHtml() {
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
        if (result.value) {
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
        } else if (result.dismiss === 'cancel') {
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
        }
      })
    },
  },
}
</script>
