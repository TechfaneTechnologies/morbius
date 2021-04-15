<template>
  <section id="dashboard-squareoff">
    <b-row>
      <b-col cols="12">
        <squareoff-default />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import SquareoffDefault from './SquareoffDefault.vue'

export default {
  components: {
    BRow,
    BCol,
    SquareoffDefault,
  },
}
</script>
