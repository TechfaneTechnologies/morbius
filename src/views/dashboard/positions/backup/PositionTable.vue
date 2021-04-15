<template>
  <!-- <b-card title="The Position Details are as follows:"> -->
  <b-card>
    <b-row class="match-height">
      <!-- search input -->
      <b-col
        md="12"
        class="mb-3"
      >
        <!-- <label class="mr-1">Search</label> -->
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
    <br>
    <!-- table -->
    <vue-good-table
      ref="PositionTable"
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :line-numbers="true"
      :select-options="{
        enabled: false,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: false,
        perPage:pageLength
      }"
      :group-options="{
        enabled: false
      }"
      :bordered="false"
      style-class="vgt-table"
      compact-mode
    >
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Product -->
        <span
          v-if="props.column.field === 'product'"
          :class="ordertypeVariant(props.row.product)"
        >
          <!-- <feather-icon
            size="24"
            :icon="lossorprofit(props.row.pnl) ? 'TrendingDownIcon':'TrendingUpIcon'"
            :class="lossorprofit(props.row.pnl) ? 'text-danger':'text-success'"
          /> -->
          <b-badge :variant="((props.row.quantity) != 0) ? ordertypeVariant(props.row.product):'light-secondary'">
            {{ props.row.product }}
          </b-badge>
          <!-- <span class="text-nowrap">{{ props.row.product }}</span> -->
        </span>

        <span
          v-else-if="props.column.field === 'instrument'"
          :class="((props.row.quantity) != 0) ? 'font-weight-bolder':'text-muted'"
        >
          <!-- <b-badge :variant="pnlVariant(props.row.pnl)"> -->
          {{ props.row.instrument }}
          <!-- </b-badge> -->
        </span>

        <!-- Column: PNL -->
        <span
          v-else-if="props.column.field === 'pnl'"
          :class="((props.row.quantity) != 0) ? pnlVariant(props.row.pnl)+' '+'font-weight-bolder':'text-muted'"
        >
          <!-- <b-badge :variant="pnlVariant(props.row.pnl)"> -->
          {{ formatPrice(props.row.pnl) }}
          <!-- </b-badge> -->
        </span>

        <span
          v-else-if="props.column.field === 'mtm'"
          :class="((props.row.quantity) != 0) ? mtmVariant(props.row.mtm)+' '+'font-weight-bolder':'text-muted'"
        >
          <!-- <b-badge :variant="mtmVariant(props.row.mtm)"> -->
          {{ formatPrice(props.row.mtm) }}
          <!-- </b-badge> -->
        </span>

        <span
          v-else-if="props.column.field === 'quantity'"
          :class="((props.row.quantity) != 0) ? qtyVariant(props.row.quantity)+' '+'font-weight-bolder':'text-muted'"
        >
          <!-- <b-badge :variant="mtmVariant(props.row.mtm)"> -->
          {{ formatQuantity(props.row.quantity) }}
          <!-- </b-badge> -->
        </span>

        <span
          v-else-if="props.column.field === 'average'"
          :class="((props.row.quantity) != 0) ? 'font-weight-bolder':'text-muted'"
        >
          <!-- <b-badge :variant="pnlVariant(props.row.pnl)"> -->
          {{ formatPrice(props.row.average) }}
          <!-- </b-badge> -->
        </span>

        <span
          v-else-if="props.column.field === 'ltp'"
          :class="((props.row.quantity) != 0) ? 'font-weight-bolder':'text-muted'"
        >
          <!-- <b-badge :variant="mtmVariant(props.row.mtm)"> -->
          {{ formatPrice(props.row.ltp) }}
          <!-- </b-badge> -->
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
  BPagination,
  // BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
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
          label: 'Broker',
          field: 'broker',
          tdClass: 'text-center',
          thClass: 'text-center',
          width: '130px',
          hidden: true,
        },
        {
          label: 'Product',
          field: 'product',
          tdClass: 'text-center',
          thClass: 'text-left',
          width: '125px',
        },
        {
          label: 'Instrument',
          field: 'instrument',
          tdClass: 'text-left',
          thClass: 'text-left',
        },
        {
          label: 'Qty.',
          field: 'quantity',
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
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'MTM',
          field: 'mtm',
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
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
        TRIGGERPENDING : 'light-dark',
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
  methods: {
    formatPrice(value) {
      // const val = (value / 1).toFixed(2).replace('.', '.')
      // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      const val = (value / 1).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
      return val
    },
    formatQuantity(value) {
      const val = (value / 1).toFixed(0).replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, '$1,')
      return val
    },
  },
}
</script>
