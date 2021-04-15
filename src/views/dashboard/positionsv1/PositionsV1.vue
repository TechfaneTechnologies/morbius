<template>
  <section id="dashboard-positions">
    <b-row class="match-height">
      <b-col
        lg="6"
        md="12"
      >
        <positions-congratulation-v1 :data="data.congratulations" />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="data.NetPNL"
          :icon="pnliconVariant(data.NetPNL.netpnl)"
          :color="pnlVariant(data.NetPNL.netpnl)"
          :statistic="formatPrice(data.NetPNL.netpnl)"
          statistic-title="Net Profit and Loss (PNL) Value"
          :chart-data="data.NetPNL.series"
        />
      </b-col>
      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          v-if="data.NetMTM"
          :icon="pnliconVariant(data.NetMTM.netmtm)"
          :color="pnlVariant(data.NetMTM.netmtm)"
          :statistic="formatPrice(data.NetMTM.netmtm)"
          statistic-title="Net Market To Market (MTM) Value"
          :chart-data="data.NetMTM.series"
        />
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <position-table-v1 :rows="data.position.positiongrp" />
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
import PositionTableV1 from './PositionTableV1.vue'
import PositionsCongratulationV1 from './PositionsCongratulationV1.vue'

export default {
  components: {
    BRow,
    BCol,
    PositionsCongratulationV1,
    StatisticCardWithAreaChart,
    PositionTableV1,
  },

  data() {
    return {
      data: {},
    }
  },
  // mounted() {
  //   this.fetchData()
  //   console.log('Positions Fetched')
  // },
  created() {
    // data
    this.$http.get('/positions/data')
      .then(response => { this.data = response.data })
    // console.log(this.data)
  },
  methods: {
    kFormatter,
    formatPrice(value) {
      // const val = (value / 1).toFixed(2).replace('.', '.')
      // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      const val = (value / 1).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
      return val
    },
    pnliconVariant(val) {
      const iconType = {
        /* eslint-disable key-spacing */
        true      : 'TrendingUpIcon',
        false     : 'TrendingDownIcon',
        /* eslint-enable key-spacing */
      }
      return iconType[(!Number.isNaN(val) && Number(val) > 0)]
    },
    pnlVariant(val) {
      const pnlColor = {
        /* eslint-disable key-spacing */
        true      : 'success',
        false     : 'danger',
        /* eslint-enable key-spacing */
      }

      return pnlColor[(!Number.isNaN(val) && Number(val) > 0)]
    },
    getUser() {
      this.$http.get('http://127.0.0.1:5000/users/get_user')
        .then(response => {
          this.user = response.data.username
          return this.user
        })
    },
    getAppointments() {
      this.getUser()
        .then(data => {
          const url = `http://127.0.0.1:5000/appointments/get_appointments?user=' + ${data}`
          this.$http.get(url)
            .then(response => { this.appointments = response.data })
        })
    },
    getPositionsData() {
      // data
      this.$http.get('/positions/data')
        .then(response => { this.data = response.data })
      // console.log(this.data)
    },
    fetchData() {
      setInterval(() => {
        // this.getAppointments()
        this.getPositionsData()
      }, 3000)
    },
  },
}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
