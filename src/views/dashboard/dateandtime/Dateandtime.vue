<template>
  <section id="dashboard-dateandtime">
    <b-row>
      <b-col cols="12">
        <dateandtime-default />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import DateandtimeDefault from './DateandtimeDefault.vue'

export default {
  components: {
    BRow,
    BCol,
    DateandtimeDefault,
  },
}
</script>
