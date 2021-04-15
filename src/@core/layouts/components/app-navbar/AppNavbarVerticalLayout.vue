<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">

      <!-- <b-button
        id="powerkill"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
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
      <b-popover
        target="powerkill"
        variant="danger"
        triggers="hover"
        placement="auto"
      >
        <template #title>
          <span>PowerKill All Positions !</span>
        </template>
        <span>This Process is Irreversible !!!, Please Ensure That You Want To Squareoff All Positions At Once.</span>
      </b-popover> -->
      <!-- Bookmarks Container -->
      <bookmarks />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale /> -->
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <search-bar /> -->
      <!-- <cart-dropdown /> -->
      <notification-dropdown />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav,
  // BButton,
  // VBPopover,
  // BPopover,
} from 'bootstrap-vue'
// import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Bookmarks from './components/Bookmarks.vue'
// import Locale from './components/Locale.vue'
// import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
// import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    Bookmarks,
    // Locale,
    // SearchBar,
    DarkToggler,
    // CartDropdown,
    NotificationDropdown,
    UserDropdown,
    // BButton,
    // BPopover,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  // directives: {
  //   'b-popover': VBPopover,
  //   Ripple,
  // },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  // methods: {
  //   showToast(variant, timeout) {
  //     this.$toast({
  //       component: ToastificationContent,
  //       props: {
  //         title: 'Kill Notification',
  //         icon: 'CheckIcon',
  //         text: 'Your All Positions Squareoff Order Has Been Succesfully Placed',
  //         variant,
  //       },
  //     }, {
  //       timeout,
  //     })
  //   },
  //   withHtml() {
  //     this.$swal({
  //       title: '<span class="font-weight-bolder">ARE YOU SURE ?</span>',
  //       // text: "You won't be able to revert this!",
  //       html:
  //         '<span class="font-weight-bolder">You won\'t be able to revert this!</span>',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'Yes, PowerKill!',
  //       customClass: {
  //         confirmButton: 'btn btn-danger',
  //         cancelButton: 'btn btn-outline-danger ml-1',
  //       },
  //       buttonsStyling: false,
  //     }).then(result => {
  //       if (result.value) {
  //         this.$swal({
  //           icon: 'success',
  //           title: '<span class="font-weight-bolder">PowerKilled!</span>',
  //           html:
  //             '<span class="font-weight-bolder">All Positions has been Squared Off.</span>',
  //           // text: 'All Positions has been Squared Off.',
  //           customClass: {
  //             confirmButton: 'btn btn-success',
  //           },
  //         })
  //       } else if (result.dismiss === 'cancel') {
  //         this.$swal({
  //           title: '<span class="font-weight-bolder">Cancelled</span>',
  //           html:
  //             '<span class="font-weight-bolder">PowerKill Positions Has Been Cancelled :)</span>',
  //           // text: 'PowerKill Positions Has Been Cancelled :)',
  //           icon: 'error',
  //           customClass: {
  //             confirmButton: 'btn btn-success',
  //           },
  //         })
  //       }
  //     })
  //   },
  // },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
