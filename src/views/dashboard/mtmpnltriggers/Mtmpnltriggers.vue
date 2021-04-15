<template>
  <section id="dashboard-mtmpnltriggers">
    <b-row>
      <b-col cols="12">
        <mtmpnltriggers-default />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import MtmpnltriggersDefault from './MtmpnltriggersDefault.vue'

export default {
  components: {
    BRow,
    BCol,
    MtmpnltriggersDefault,
  },
}
</script>
