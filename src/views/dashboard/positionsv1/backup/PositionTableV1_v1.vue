<template>
  <!-- <b-card title="The Position Details are as follows:"> -->
  <b-card>
    <b-row class="match-height">
      <b-col
        md="2"
        class="mb-3"
      >
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-primary"
          size="sm"
          pill
          @click="expandAll()"
        >
          Expand All
        </b-button>
      </b-col>
      <b-col
        md="2"
        class="mb-3"
      >
        <!-- <span>&nbsp; &nbsp;</span> -->
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="outline-secondary"
          size="sm"
          pill
          @click="collapseAll()"
        >
          Collapse All
        </b-button>
        <!-- </div> -->
      </b-col>
      <!-- search input -->
      <b-col
        md="8"
        class="mb-3"
      >
        <div class="custom-search d-flex justify-content-end">
          <div class="d-flex align-items-center">
            <b-form-input
              v-model="searchTerm"
              size="sm"
              placeholder="Search"
              type="text"
              class="d-inline-block"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- table -->
    <vue-good-table
      ref="PositionsTable"
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :line-numbers="true"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'Positions Selected',
        clearSelectionText: 'Clear Selection',
        disableSelectInfo: false, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: false,
        perPage:pageLength
      }"
      :group-options="{
        enabled: true,
        headerPosition: 'top',
        collapsable: true,
      }"
      :collapse-options="{enabled: true}"
      :expand-options="{
        enabled: true,
        selfManaged: true,
        showExpansion
      }"
      :bordered="false"
      style-class="vgt-table"
      compact-mode
      @on-select-all="onSelectAll"
      @on-search="onSelectAll"
      @on-row-mouseenter="onMouseover"
      @on-row-mouseleave="onMouseover"
      @on-row-dblclick="toggleExpansion"
    >

      <template
        slot="table-header-row"
        slot-scope="props"
      >

        <!-- <span
          v-if="props.column.field === 'product'"
          :class="'text-dark'+' '+'font-weight-bolder'"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            size="sm"
            variant="outline-primary"
            class="btn-icon rounded-circle"
            target="_blank"
            :href="'https://in.tradingview.com/chart/?symbol=NSE:'+props.row.instrument"
          >
            <feather-icon
            icon="BarChart2Icon"
          />
        </b-button>
        </span>
 -->
        <span
          v-if="props.column.field === 'trading_symbol'"
          :class="'text-dark'+' '+'font-weight-bolder'"
        >
          {{ props.row.trading_symbol }}
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            size="sm"
            variant="flat-primary"
            target="_blank"
            :href="'https://in.tradingview.com/chart/?symbol=NSE:'+props.row.instrument"
          >
            <feather-icon
              icon="BarChart2Icon"
            />
          </b-button>
        </span>

        <span
          v-if="props.column.field === 'pnl'"
          :class="pnlVariant(sumPnl(props.row))+' '+'font-weight-bolder'"
        >
          {{ formatPrice(sumPnl(props.row)) }}
        </span>

        <span
          v-else-if="props.column.field === 'm2m'"
          :class="mtmVariant(sumMtm(props.row))+' '+'font-weight-bolder'"
        >
          {{ formatPrice(sumMtm(props.row)) }}
        </span>

        <span
          v-else-if="props.column.field === 'net_quantity'"
          :class="((sumQty(props.row)) != 0) ? qtyVariant(sumQty(props.row))+' '+'font-weight-bolder':'text-muted'+' '+'font-weight-bolder'"
        >
          {{ formatQuantity(sumQty(props.row)) }}
        </span>

      </template>

      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Product -->
        <span
          v-if="props.column.field === 'trading_symbol'"
          :class="ordertypeVariant(props.row.product)"
        >
          <b-badge :variant="((props.row.net_quantity) != 0) ? ordertypeVariant(props.row.product):'light-secondary'">
            {{ props.row.trading_symbol }}
          </b-badge>
        </span>

        <span
          v-else-if="props.column.field === 'instrument'"
          :class="((props.row.net_quantity) != 0) ? 'font-weight-normal':'text-muted'"
        >
          {{ props.row.instrument }}
        </span>

        <!-- Column: PNL -->
        <span
          v-else-if="props.column.field === 'pnl'"
          :class="((props.row.net_quantity) != 0) ? pnlVariant(props.row.pnl)+' '+'font-weight-normal':'text-muted'"
        >
          {{ formatPrice(props.row.pnl) }}
        </span>

        <span
          v-else-if="props.column.field === 'm2m'"
          :class="((props.row.net_quantity) != 0) ? mtmVariant(props.row.mtm)+' '+'font-weight-normal':'text-muted'"
        >
          {{ formatPrice(props.row.m2m) }}
        </span>

        <span
          v-else-if="props.column.field === 'net_quantity'"
          :class="((props.row.net_quantity) != 0) ? qtyVariant(props.row.quantity)+' '+'font-weight-normal':'text-muted'"
        >
          {{ formatQuantity(props.row.net_quantity) }}
        </span>

        <span
          v-else-if="props.column.field === 'average'"
          :class="((props.row.net_quantity) != 0) ? 'font-weight-normal':'text-muted'"
        >
          {{ formatPrice(props.row.average) }}
        </span>

        <span
          v-else-if="props.column.field === 'ltp'"
          :class="((props.row.net_quantity) != 0) ? 'font-weight-normal':'text-muted'"
        >
          {{ formatPrice(props.row.ltp) }}
        </span>

        <!-- Column: Action -->
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item>
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Edit</span>
              </b-dropdown-item>
              <b-dropdown-item>
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>Delete</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap ">
              Showing 1 to
            </span>
            <b-form-select
              v-model="pageLength"
              :options="['3','5','10','15','20','25','30','35','40','45','50','55','60','65','70','75','80','85','90','95','100','105','110','115','120','125','130','135','140','145','150','155','160','165','170','175','180','185','190','195','200']"
              class="mx-1"
              @input="(value)=>props.perPageChanged({currentPerPage:value})"
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </b-card>
</template>

<script>
import {
  BCard,
  BBadge,
  BButton,
  BPagination,
  // BFormGroup,
  BFormInput, BFormSelect, BDropdown, BDropdownItem,
  BRow, BCol,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import store from '@/store/index'

export default {
  components: {
    BCard,
    VueGoodTable,
    BBadge,
    BPagination,
    // BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  props: {
    rows: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      pageLength: 15,
      dir: false,
      columns: [
        {
        //   label: 'Product',
          label: '',
          field: 'product',
          tdClass: 'text-center',
          thClass: 'text-center',
          width: '75px',
        },
        {
          label: 'Instrument',
          field: 'trading_symbol',
          tdClass: 'text-left',
          thClass: 'text-left',
        },
        {
          label: 'Qty.',
          field: 'net_quantity',
          headerField: this.sumQty,
          formatFn: this.formatQuantity,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'Avg.',
          field: 'average',
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'LTP',
          field: 'ltp',
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'P&L',
          field: 'pnl',
          headerField: this.sumPnl,
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'MTM',
          field: 'm2m',
          headerField: this.sumMtm,
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'Broker',
          field: 'broker',
          tdClass: 'text-center',
          thClass: 'text-center',
          width: '130px',
          hidden: true,
          // filterOptions: {
          // // styleClass: 'class1', // class to be added to the parent th element
          //   enabled: true, // enable filter for this column
          //   placeholder: 'Select Broker', // placeholder for filter input
          //   filterValue: '', // initial populated value for this filter
          //   filterDropdownItems: ['Alice Blue', 'Zerodha', 'Upstox', 'Angel Broking', 'IIFL', '5 Paisa', 'Samco', 'Fyers', 'Alpaca', 'Binance', 'FXCM'], // dropdown (with selected values) instead of text input
          //   // filterFn: this.columnFilterFn, //custom filter function that
          //   trigger: 'enter', // only trigger on enter not on keyup
          // },
        },
        {
          label: 'Client ID',
          field: 'client_id',
          tdClass: 'text-center',
          thClass: 'text-center',
          width: '130px',
          hidden: true,
        },
      ],
      // rows: [],
      searchTerm: '',
      pnl: [{
        1: true,
        2: false,
      },
      {
        1: 'text-success',
        2: 'text-danger',
      }],
      mtm: [{
        1: true,
        2: false,
      },
      {
        1: 'text-success',
        2: 'text-danger ',
      }],
      expandedIds: [],
    }
  },
  computed: {
    pnlVariant() {
      const pnlColor = {
        /* eslint-disable key-spacing */
        true      : 'text-success',
        false     : 'text-danger',
        /* eslint-enable key-spacing */
      }

      return pnl => pnlColor[(!Number.isNaN(pnl) && Number(pnl) > 0)]
    },
    mtmVariant() {
      const mtmColor = {
        /* eslint-disable key-spacing */
        true      : 'text-success',
        false     : 'text-danger',
        /* eslint-enable key-spacing */
      }

      return mtm => mtmColor[(!Number.isNaN(mtm) && Number(mtm) > 0)]
    },
    lossorprofit() {
      const iconColor = {
        /* eslint-disable key-spacing */
        true      : true,
        false     : false,
        /* eslint-enable key-spacing */
      }

      return updown => iconColor[(!Number.isNaN(updown) && Number(updown) > 0)]
    },
    ordertypeVariant() {
      const ordertypecolor = {
        /* eslint-disable key-spacing */
        NRML      : 'light-primary',
        MIS       : 'light-warning',
        BO        : 'light-info',
        CO        : 'light-success',
        CNC       : 'light-danger',
        /* eslint-enable key-spacing */
      }
      return color => ordertypecolor[color]
    },
    orderVariant() {
      const ordercolor = {
        /* eslint-disable key-spacing */
        OPEN      : 'light-secondary',
        COMPLETED : 'light-success',
        REJECTED  : 'light-danger',
        BUY       : 'light-primary',
        SELL      : 'light-danger',
        /* eslint-enable key-spacing */
      }
      return color => ordercolor[color]
    },
    qtyVariant() {
      const qtycolor = {
        /* eslint-disable key-spacing */
        true        : 'text-primary',
        false       : 'text-danger',
        0           : 'text-secondary',
        /* eslint-enable key-spacing */
      }
      return qty => qtycolor[(!Number.isNaN(qty) && Number(qty) >= 0)]
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  mounted() {
    this.expandAll()
    // Code that will run only after the
    // entire view has been rendered
  },
  methods: {
    formatPrice(value) {
      const val = (value / 1).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
      return val
    },
    formatQuantity(value) {
      const val = (value / 1).toFixed(0).replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, '$1,')
      return val
    },
    expandAll() {
      // this.$refs.groupedTable.expandAll()
      this.$refs.PositionsTable.expandAll()
    },
    collapseAll() {
      // this.$refs.groupedTable.collapseAll()
      this.$refs.PositionsTable.collapseAll()
    },
    onSelectAll(params) {
      console.log(params)
    },
    onMouseover(params) {
      console.log(params)
    },
    toggleExpansion(row) {
      if (this.showExpansion(row)) {
        this.expandedIds = this.expandedIds.filter(id => id !== row.id)
      } else {
        this.expandedIds.push(row.id)
      }
    },
    showExpansion(row) {
      return this.expandedIds.some(id => id === row.id)
    },
    sumQty(rowObj) {
      // console.log(rowObj)
      let sum = 0
      for (let i = 0; i < rowObj.children.length; i += 1) {
        sum += rowObj.children[i].quantity
      }
      // console.log('sumQty', sum)
      return sum
    },
    sumPnl(rowObj) {
      // console.log(rowObj)
      let sum = 0
      for (let i = 0; i < rowObj.children.length; i += 1) {
        sum += rowObj.children[i].pnl
      }
      // console.log('sumPnl', sum)
      return sum
    },
    sumMtm(rowObj) {
      // console.log(rowObj)
      let sum = 0
      for (let i = 0; i < rowObj.children.length; i += 1) {
        sum += rowObj.children[i].mtm
      }
      // console.log('sumMtm', sum)
      return sum
    },
    // filterFn(data, filterString) {
    //   const x = parseInt(filterString)
    //   return data >= x - 5 && data <= x + 5
    // },
  },
}
</script>
