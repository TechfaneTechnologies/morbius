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
      :src="require('@/assets/images/broker/5paisa.png')"
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
      {{ FPapicount }} Saved API
    </b-badge>
    <br>
    <br>
    <b-button
      id="addfivepaisaapi"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      v-b-modal.modal-addfivepaisaapi
      block
      variant="gradient-primary"
    >
      <feather-icon
        icon="PlusSquareIcon"
        class="mr-50"
      />
      <span class="align-middle">Add API</span>
    </b-button>

    <!-- modal addfivepaisaapi-->
    <b-modal
      id="modal-addfivepaisaapi"
      ref="fivepaisa-modal"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      cancel-title="Close"
      centered
      size="lg"
      title="Add FivePaisa API Credentials"
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
            id="addfivepaisaupt"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            v-b-modal.modal-addfivepaisaupt
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
        <b-form>
          <b-row>
            <b-col md="12">
              <b-card-text class="my-1">
                <strong>Have API Access! Good, </strong> <u>Now Fill This Form With Correct Details &amp; Submit.</u>
              </b-card-text>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Client ID"
                  rules="required|min:6"
                >
                  <label for="clientid">Client ID</label>
                  <b-form-input
                    id="clientid"
                    v-model="clientid"
                    :state="clientid.length == 0 ? null:Boolean(clientid.length >= 6)"
                    placeholder="Add Client ID"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Add App Name"
                  rules="required|min:3"
                >
                  <label for="appname">App Name</label>
                  <b-form-input
                    id="appname"
                    v-model="appname"
                    :state="appname.length == 0 ? null:Boolean(appname.length >= 3)"
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
                  name="App Source"
                  rules="required|min:6"
                >
                  <label for="appsource">App Source</label>
                  <b-form-input
                    id="appsource"
                    v-model="appsource"
                    :state="appsource.length == 0 ? null:Boolean(appsource.length >= 6)"
                    placeholder="Add App Source"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="User ID"
                  rules="required|min:6"
                >
                  <label for="euserid">User ID</label>
                  <b-form-input
                    id="euserid"
                    v-model="euserid"
                    :state="euserid.length == 0 ? null:Boolean(euserid.length >= 6)"
                    placeholder="User Key"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Authorization Page Password"
                  rules="required|min:3"
                >
                  <label for="appwd">Authorization Page Password</label>
                  <b-form-input
                    id="appwd"
                    v-model="appwd"
                    :state="appwd.length == 0 ? null:Boolean(appwd.length >= 3)"
                    placeholder="Authorization Page Password"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="User Key"
                  rules="required|min:6"
                >
                  <label for="userkey">User Key</label>
                  <b-form-input
                    id="userkey"
                    v-model="userkey"
                    :state="userkey.length == 0 ? null:Boolean(userkey.length >= 6)"
                    placeholder="Add User Key"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Encrypted Email"
                  rules="required|min:6"
                >
                  <label for="eemail">Encrypted Email</label>
                  <b-form-input
                    id="eemail"
                    v-model="eemail"
                    :state="eemail.length == 0 ? null:Boolean(eemail.length >= 6)"
                    placeholder="Encrypted Email"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Encrypted Password"
                  rules="required|min:5"
                >
                  <label for="epassword">Encrypted Password</label>
                  <b-form-input
                    id="epassword"
                    v-model="epassword"
                    :state="epassword.length == 0 ? null:Boolean(epassword.length >= 6)"
                    placeholder="Encrypted Password"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Encrypted DOB"
                  rules="required|min:4"
                >
                  <label for="edob">Encrypted DOB</label>
                  <b-form-input
                    id="edob"
                    v-model="edob"
                    :state="edob.length == 0 ? null:Boolean(edob.length >= 4)"
                    placeholder="Encrypted DOB"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>

    <!-- modal addfivepaisaupt-->
    <b-modal
      id="modal-addfivepaisaupt"
      ref="fivepaisaupt-modal"
      cancel-variant="outline-secondary"
      ok-title="Submit"
      cancel-title="Close"
      centered
      size="lg"
      title="Add FivePaisa Web Credentials"
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
      userkey: '',
      appsource: '',
      clientid: '',
      appwd: '',
      euserid: '',
      eemail: '',
      epassword: '',
      edob: '',
      passValue: '',
      userid: '',
      tfa: '',
      broker: 'FivePaisa',
      FPapicount: '01',
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
            this.$refs['fivepaisa-modal'].toggle('#addfivepaisaapi')
          })
          // eslint-disable-next-line
          // alert('API Details Submitted.')
          // console.log('API Data Saved Successfully')
          // console.log(this.broker, ' => API ID: ', ' ,Appname: ', this.appname, ' ,Userkey: ', this.userkey, ' ,Appsource: ', this.appsource, ' ,Clientid: ', this.clientid, ' ,Appwd: ', this.appwd, ' ,Euserid: ', this.euserid, ' ,Eemail: ', this.eemail, ' ,Epassword: ', this.epassword, ' ,Edob: ', this.edob)
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
            this.$refs['fivepaisaupt-modal'].toggle('#addfivepaisaupt')
          })
          // eslint-disable-next-line
          // alert('API Details Submitted.')
          // console.log('Web App Login Credentials Saved Succesfully')
          // console.log(this.broker, ' => User ID: ', this.userid, ' ,Password: ', this.passValue, ' ,TFA: ', this.tfa)
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
      this.userkey = ''
      this.appsource = ''
      this.clientid = ''
      this.appwd = ''
      this.euserid = ''
      this.eemail = ''
      this.epassword = ''
      this.edob = ''
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
        // console.log('Invalid API Data')
        // console.log(this.broker, ' => API ID: ', ' ,Appname: ', this.appname, ' ,Userkey: ', this.userkey, ' ,Appsource: ', this.appsource, ' ,Clientid: ', this.clientid, ' ,Appwd: ', this.appwd, ' ,Euserid: ', this.euserid, ' ,Eemail: ', this.eemail, ' ,Epassword: ', this.epassword, ' ,Edob: ', this.edob)
        return
      }
      this.$nextTick(() => {
        this.$refs['fivepaisa-modal'].toggle('#addfivepaisaapi')
      })
    },
    handleSubmit1() {
      // Exit when the form isn't valid
      if (!this.checkForm1Validity()) {
        // console.log('Invalid Web App Login Credentials')
        // console.log(this.broker, ' => User ID: ', this.userid, ' ,Password: ', this.passValue, ' ,TFA: ', this.tfa)
        return
      }
      this.$nextTick(() => {
        this.$refs['fivepaisaupt-modal'].toggle('#addfivepaisaupt')
      })
    },
  },
}
</script>
