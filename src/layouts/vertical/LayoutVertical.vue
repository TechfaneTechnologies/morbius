<template>
  <layout-vertical>

    <router-view />

    <!-- Using navbar scoped slot -->
    <!--<div
      slot="navbar"
      class="px-1"
    >
      <p class="mb-0">Welcome Amigo!  This Website Will Help You See Your Live Positions As Well As Let You Fire Autosquareoff Orders Based On The Time or The Preset Rules Set by You.</p>
    </div> -->

    <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    />

  </layout-vertical>
</template>

<script>
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'
import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    AppCustomizer,
    LayoutVertical,
  },
  data() {
    return {
      showCustomizer: $themeConfig.layout.customizer,
    }
  },
}
</script>
