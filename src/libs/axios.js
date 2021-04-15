import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'http://127.0.0.1:3000/',
  // timeout: 1000,
  headers: { 'Access-Control-Allow-Origin': '*' },
})

Vue.prototype.$http = axiosIns

export default axiosIns
