<template>
  <!-- card image top -->
  <b-card
    title=""
    class="text-center"
    body-class="bg-overlay"
  >
    <b-img
      fluid
      class="mb-2"
      :src="require('@/assets/images/broker/alpaca.png')"
    />
    <b-badge
      href="#"
      variant="primary"
      class="badge-glow"
      align="right"
    >
      <feather-icon
        icon="StarIcon"
        class="mr-25"
      />
      {{ ALPapicount }} Saved API
    </b-badge>
    <br>
    <br>
    <b-button
      id="addalpacaapi"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      v-b-modal.modal-addalpacaapi
      block
      variant="gradient-primary"
    >
      <feather-icon
        icon="PlusSquareIcon"
        class="mr-50"
      />
      <span class="align-middle">Add API</span>
    </b-button>

    <!-- modal addalpacaapi-->
    <b-modal
      id="modal-addalpacaapi"
      ref="alpaca-modal"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      cancel-title="Close"
      centered
      size="lg"
      title="Add Alpaca API Credentials"
      no-stacking
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-row>
        <b-col md="12">
          <b-card-text class="my-1">
            <strong>Don't Have API Access,</strong> <u>No Problem, Click Here And Fill The Next Form.</u>
          </b-card-text>
          <b-button
            id="addalpacaupt"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            v-b-modal.modal-addalpacaupt
            block
            variant="gradient-primary"
          >
            <feather-icon
              icon="PlusSquareIcon"
              class="mr-50"
            />
            <span class="align-middle">Don't Have API Access</span>
          </b-button>
        </b-col>
      </b-row>

      <validation-observer ref="simpleRules">
        <!-- <form
          ref="form"
          @submit.stop.prevent="handleSubmit"
        > -->
        <b-form>
          <b-row>
            <b-col md="12">
              <b-card-text class="my-1">
                <strong>Have API Access! Good, </strong> <u>Now Fill This Form With Correct Details &amp; Submit.</u>
              </b-card-text>
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Add App Name"
                  rules="required|min:6"
                >
                  <label for="appname">App Name</label>
                  <b-form-input
                    id="appname"
                    v-model="appname"
                    :state="appname.length == 0 ? null:Boolean(appname.length >= 6)"
                    placeholder="Add App Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="API Key / APP ID / Client ID"
                  rules="required|min:6"
                >
                  <label for="apikey">API Key</label>
                  <b-form-input
                    id="apikey"
                    v-model="apikey"
                    :state="apikey.length == 0 ? null:Boolean(apikey.length >= 6)"
                    placeholder="Add  'API Key / APP ID / Client ID'"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="API Secret / Public Key / Secret key / Client Secret"
                  rules="required|min:6"
                >
                  <label for="apisecret">API Secret / Secret Key</label>
                  <b-form-input
                    id="apisecret"
                    v-model="apisecret"
                    :state="apisecret.length == 0 ? null:Boolean(apisecret.length >= 6)"
                    placeholder="Add  'API Secret / Public Key / Secret key / Client Secret'"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>

    <!-- modal addalpacaupt-->
    <b-modal
      id="modal-addalpacaupt"
      ref="alpacaupt-modal"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      cancel-title="Close"
      centered
      size="lg"
      title="Add Alpaca Web Credentials"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk1"
    >
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col md="12">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="User Name / User ID / Client ID"
                  rules="required|min:6"
                >
                  <label for="userid">User Name / User ID / Client ID</label>
                  <b-form-input
                    id="userid"
                    v-model="userid"
                    :state="userid.length == 0 ? null:Boolean(userid.length >= 6)"
                    placeholder="User Name / User ID / Client ID"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  rules="required|min:5"
                >
                  <label for="password">Password</label>
                  <b-form-input
                    id="password"
                    v-model="passValue"
                    type="password"
                    :state="passValue.length == 0 ? null:Boolean(passValue.length >= 6)"
                    placeholder="Password"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="TFA / PIN / DOB / YOB / PAN"
                  rules="required|min:1"
                >
                  <label for="tfa">Two Factor Authentication</label>
                  <b-form-input
                    id="tfa"
                    v-model="tfa"
                    :state="tfa.length == 0 ? null:Boolean(tfa.length >= 1)"
                    placeholder="TFA / PIN / DOB / YOB / PAN"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>

  </b-card>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BCardText,
  BImg,
  BButton,
  BModal,
  VBModal,
  // BForm,
  BBadge,
  BFormInput,
  BFormGroup,
} from 'bootstrap-vue'
import {
  ValidationProvider,
  ValidationObserver,
} from 'vee-validate'
import {
  required,
} from '@validations'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BCard,
    BRow,
    BCol,
    BCardText,
    BImg,
    BButton,
    BModal,
    // BForm,
    BBadge,
    BFormInput,
    BFormGroup,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      appname: '',
      apikey: '',
      apisecret: '',
      passValue: '',
      userid: '',
      tfa: '',
      broker: 'Alpaca',
      ALPapicount: '00',
      required,
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$swal({
            icon: 'success',
            title: '<span class="font-weight-bolder">Success</span>',
            html:
              '<span class="font-weight-bolder">The API Details Has Been Saved Succesfully.</span>',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.$nextTick(() => {
            this.$refs['alpaca-modal'].toggle('#addalpacaapi')
          })
          // eslint-disable-next-line
          // alert('API Details Submitted.')
          console.log('API Data Saved Successfully')
          console.log(this.broker, ' => API ID: ', this.appname, ' ,API Key: ', this.apikey, ' ,API Secret: ', this.apisecret)
        }
      })
    },
    validationForm1() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$swal({
            icon: 'success',
            title: '<span class="font-weight-bolder">Success</span>',
            html:
              '<span class="font-weight-bolder">The Web App Login Credentials Has Been Saved Succesfully.</span>',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.$nextTick(() => {
            this.$refs['alpacaupt-modal'].toggle('#addalpacaupt')
          })
          // eslint-disable-next-line
          // alert('API Details Submitted.')
          console.log('Web App Login Credentials Saved Succesfully')
          console.log(this.broker, ' => User ID: ', this.userid, ' ,Password: ', this.passValue, ' ,TFA: ', this.tfa)
        }
      })
    },
    checkFormValidity() {
      const valid = this.validationForm()
      return valid
    },
    checkForm1Validity() {
      const valid1 = this.validationForm1()
      return valid1
    },
    resetModal() {
      this.appname = ''
      this.apikey = ''
      this.apisecret = ''
      this.userid = ''
      this.passValue = ''
      this.tfa = ''
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleOk1(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit1()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        console.log('Invalid API Data')
        console.log(this.broker, ' => API ID: ', this.appname, ' ,API Key: ', this.apikey, ' ,API Secret: ', this.apisecret)
        return
      }
      this.$nextTick(() => {
        this.$refs['alpaca-modal'].toggle('#addalpacaapi')
      })
    },
    handleSubmit1() {
      // Exit when the form isn't valid
      if (!this.checkForm1Validity()) {
        console.log('Invalid Web App Login Credentials')
        console.log(this.broker, ' => User ID: ', this.userid, ' ,Password: ', this.passValue, ' ,TFA: ', this.tfa)
        return
      }
      this.$nextTick(() => {
        this.$refs['alpacaupt-modal'].toggle('#addalpacaupt')
      })
    },
  },
}
</script>
