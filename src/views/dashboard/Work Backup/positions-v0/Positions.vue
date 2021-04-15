<template>
  <section id="dashboard-positions">
    <b-row class="match-height">
      <b-col
        lg="6"
        md="12"
      >
        <positions-congratulation :data="data.congratulations" />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="data.NetMTM"
          icon="TrendingUpIcon"
          color="warning"
          :statistic="kFormatter(data.NetMTM.netmtm)"
          statistic-title="Net Market To Market (MTM) Value (₹)"
          :chart-data="data.NetMTM.series"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="data.NetPNL"
          icon="FileTextIcon"
          color="success"
          :statistic="kFormatter(data.NetPNL.netpnl)"
          statistic-title="Net Profit and Loss (PNL) Value (₹)"
          :chart-data="data.NetPNL.series"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <position-table :rows="data.position.positions" />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
import PositionTable from './PositionTable.vue'
import PositionsCongratulation from './PositionsCongratulation.vue'

export default {
  components: {
    BRow,
    BCol,

    PositionsCongratulation,
    StatisticCardWithAreaChart,
    PositionTable,
  },

  data() {
    return {
      data: {},
    }
  },
  created() {
    // data
    this.$http.get('/positions/data')
      .then(response => { this.data = response.data })
  },
  methods: {
    kFormatter,
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
