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
      :src="require('@/assets/images/broker/tradingview.png')"
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
      {{ TVapicount }} Saved API
    </b-badge>
    <br>
    <br>
    <b-button
      id="addtradingviewapi"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      v-b-modal.modal-addtradingviewapi
      block
      variant="gradient-primary"
    >
      <feather-icon
        icon="PlusSquareIcon"
        class="mr-50"
      />
      <span class="align-middle">Add API</span>
    </b-button>

    <!-- modal addtradingviewapi-->
    <b-modal
      id="modal-addtradingviewapi"
      ref="tradingviewupt-modal"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      cancel-title="Close"
      centered
      size="lg"
      title="Add Tradingview Web Credentials"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <b-col md="6">
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
                  name="User Name / User ID"
                  rules="required|min:6"
                >
                  <label for="userid">User Name / User ID</label>
                  <b-form-input
                    id="userid"
                    v-model="userid"
                    :state="userid.length == 0 ? null:Boolean(userid.length >= 6)"
                    placeholder="User Name / User ID"
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
                  rules="required|min:6"
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
                  name="TFA / PIN"
                  rules="required|min:6"
                >
                  <label for="tfa">Two Factor Authentication</label>
                  <b-form-input
                    id="tfa"
                    v-model="tfa"
                    :state="tfa.length == 0 ? null:Boolean(tfa.length >= 6)"
                    placeholder="TFA / PIN"
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
  // BCardText,
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
    // BCardText,
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
      passValue: '',
      userid: '',
      tfa: '',
      broker: 'Tradingview',
      TVapicount: '00',
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
            this.$refs['tradingview-modal'].toggle('#addtradingviewapi')
          })
          // eslint-disable-next-line
          // alert('API Details Submitted.')
          console.log('API Data Saved Successfully')
          console.log(this.broker, ' => App Name: ', this.appname, ' ,User ID: ', this.userid, ' ,Password: ', this.passValue, ' ,TFA: ', this.tfa)
        }
      })
    },
    checkFormValidity() {
      const valid = this.validationForm()
      return valid
    },
    resetModal() {
      this.appname = ''
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
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        console.log('Invalid API Data')
        console.log(this.broker, ' => App Name: ', this.appname, ' ,User ID: ', this.userid, ' ,Password: ', this.passValue, ' ,TFA: ', this.tfa)
        return
      }
      this.$nextTick(() => {
        this.$refs['tradingview-modal'].toggle('#addtradingviewapi')
      })
    },
  },
}
</script>
