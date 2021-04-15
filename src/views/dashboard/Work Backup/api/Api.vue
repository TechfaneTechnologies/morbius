<template>
  <b-row class="match-height">
    <b-col lg="3">
      <api-zerodha />
    </b-col>
    <b-col lg="3">
      <api-upstox />
    </b-col>
    <b-col lg="3">
      <api-aliceblue />
    </b-col>
    <b-col lg="3">
      <api-fyers />
    </b-col>
    <b-col lg="3">
      <api-fivepaisa />
    </b-col>
    <b-col lg="3">
      <api-angel />
    </b-col>
    <b-col lg="3">
      <api-samco />
    </b-col>
    <b-col lg="3">
      <api-iifl />
    </b-col>
    <b-col lg="3">
      <api-alpaca />
    </b-col>
    <b-col lg="3">
      <api-binance />
    </b-col>
    <b-col lg="3">
      <api-fxcm />
    </b-col>
    <b-col lg="3">
      <api-tradingview />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import ApiAliceblue from './ApiAliceblue.vue'
import ApiAlpaca from './ApiAlpaca.vue'
import ApiAngel from './ApiAngel.vue'
import ApiBinance from './ApiBinance.vue'
import ApiFivepaisa from './ApiFivepaisa.vue'
import ApiFyers from './ApiFyers.vue'
import ApiIifl from './ApiIifl.vue'
import ApiSamco from './ApiSamco.vue'
import ApiTradingview from './ApiTradingview.vue'
import ApiUpstox from './ApiUpstox.vue'
import ApiZerodha from './ApiZerodha.vue'
import ApiFxcm from './ApiFxcm.vue'

export default {
  components: {
    BRow,
    BCol,
    ApiAliceblue,
    ApiAlpaca,
    ApiAngel,
    ApiBinance,
    ApiFivepaisa,
    ApiFyers,
    ApiIifl,
    ApiSamco,
    ApiTradingview,
    ApiUpstox,
    ApiZerodha,
    ApiFxcm,
    // BBadge,
  },
}
</script>
