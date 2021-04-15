<template>
  <section id="dashboard-powerkill">
    <b-row>
      <b-col cols="12">
        <powerkill-default />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import PowerkillDefault from './PowerkillDefault.vue'

export default {
  components: {
    BRow,
    BCol,
    PowerkillDefault,
  },
}
</script>
