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
        clearSelectionText: 'Clear',
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
      style-class="vgt-table condensed striped"
      compact-mode
      @on-search="onSelectAll"
      @on-row-dblclick="toggleExpansion"
      @on-selected-rows-change="selectionChanged1"
    >
      <div
        slot="selected-row-actions"
        class="vgt-selection-info-row__actions vgt-pull-right"
      >
        <b-button
          v-ripple.400="'rgba(255, 159, 67, 0.15)'"
          variant="gradient-danger"
          size="sm"
          pill
          @click="exitAll1()"
        >
          Exit {{ rowSelection1.length != rows.length ? rowSelection1.length+' Positions':'All' }}
        </b-button>
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          v-b-modal.modal-converts
          variant="gradient-primary"
          size="sm"
          pill
        >
          Convert {{ rowSelection1.length != rows.length ? rowSelection1.length+' Positions':'All' }}
        </b-button>
        <!-- modal login-->
        <b-modal
          id="modal-converts"
          cancel-variant="outline-secondary"
          ok-title="Convert"
          cancel-title="Close"
          centered
          title="Convert Positions"
          @ok="convertAll1"
        >
          <b-form-group>
            <v-select
              v-model="convertval1"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="convert"
              placeholder="Select NRML => MIS / MIS => NRML"
              :options="convertoption1"
            />
          </b-form-group>
        </b-modal>
      </div>
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
            :href="'https://in.tradingview.com/chart/?symbol=NSE:'+props.row.trading_symbol"
          >
            <feather-icon
              icon="BarChart2Icon"
            />
          </b-button>
        </span>

        <span
          v-if="props.column.field === 'pnl'"
          :class="((props.row.net_quantity) != 0) ? pnlVariant(props.row.pnl)+' '+'font-weight-bolder':'text-muted'"
        >
          {{ formatPrice(props.row.pnl) }}
        </span>

        <span
          v-else-if="props.column.field === 'mm'"
          :class="((props.row.net_quantity) != 0) ? mtmVariant(props.row.mm)+' '+'font-weight-bolder':'text-muted'"
        >
          {{ formatPrice(props.row.mm) }}
        </span>

        <span
          v-else-if="props.column.field === 'net_quantity'"
          :class="((props.row.net_quantity) != 0) ? qtyVariant(props.row.net_quantity)+' '+'font-weight-bolder':'text-muted'"
        >
          {{ formatQuantity(props.row.net_quantity) }}
        </span>

      </template>

      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Product -->
        <span
          v-if="props.column.field === 'product'"
          :class="ordertypeVariant(props.row.product)"
        >
          <b-badge :variant="((props.row.net_quantity) != 0) ? ordertypeVariant(props.row.product):'light-secondary'">
            {{ props.row.product }}
          </b-badge>
        </span>

        <span
          v-else-if="props.column.field === 'trading_symbol'"
          :class="((props.row.net_quantity) != 0) ? 'font-weight-normal':'text-muted'"
        >
          {{ props.row.trading_symbol }}
        </span>

        <!-- Column: PNL -->
        <span
          v-else-if="props.column.field === 'pnl'"
          :class="((props.row.net_quantity) != 0) ? pnlVariant(props.row.pnl)+' '+'font-weight-normal':'text-muted'"
        >
          {{ formatPrice(props.row.pnl) }}
        </span>

        <span
          v-else-if="props.column.field === 'mm'"
          :class="((props.row.net_quantity) != 0) ? mtmVariant(props.row.mm)+' '+'font-weight-normal':'text-muted'"
        >
          {{ formatPrice(props.row.mm) }}
        </span>

        <span
          v-else-if="props.column.field === 'net_quantity'"
          :class="((props.row.net_quantity) != 0) ? qtyVariant(props.row.net_quantity)+' '+'font-weight-normal':'text-muted'"
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
  BFormGroup,
  BFormInput, BFormSelect, BDropdown, BDropdownItem,
  BModal,
  VBModal,
  BRow, BCol,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BCard,
    VueGoodTable,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BButton,
    BRow,
    BCol,
    vSelect,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
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
          // headerField: this.sumQty,
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
          // headerField: this.sumPnl,
          formatFn: this.formatPrice,
          tdClass: 'text-right',
          thClass: 'text-center',
        },
        {
          label: 'MTM',
          field: 'mm',
          // headerField: this.sumMtm,
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
      rowSelection1: [],
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
      convertval1: '',
      convertoption1: [{ convert: 'NRML2MIS' }, { convert: 'MIS2NRML' }],
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
    // onSelectAll(params) {
    //   // console.log(params)
    // },
    // onMouseover(params) {
    //   // console.log(params)
    // },
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
      // // console.log(rowObj)
      let sum = 0
      for (let i = 0; i < rowObj.children.length; i += 1) {
        sum += rowObj.children[i].quantity
      }
      // // console.log('sumQty', sum)
      return sum
    },
    sumPnl(rowObj) {
      // // console.log(rowObj)
      let sum = 0
      for (let i = 0; i < rowObj.children.length; i += 1) {
        sum += rowObj.children[i].pnl
      }
      // // console.log('sumPnl', sum)
      return sum
    },
    sumMtm(rowObj) {
      // // console.log(rowObj)
      let sum = 0
      for (let i = 0; i < rowObj.children.length; i += 1) {
        sum += rowObj.children[i].mtm
      }
      // // console.log('sumMtm', sum)
      return sum
    },
    // filterFn(data, filterString) {
    //   const x = parseInt(filterString)
    //   return data >= x - 5 && data <= x + 5
    // },
    selectionChanged1(params) {
      // params.selectedRows - all rows that are selected (this page)
      this.rowSelection1 = params.selectedRows
      // // console.log('selection length', params.selectedRows.length, 'rows', params.selectedRows)
      // return params.selectedRows.length
    },
    onSelectAll1(params) {
      // params.selected - whether the select-all checkbox is checked or unchecked
      // params.selectedRows - all rows that are selected (this page)
      this.rowSelection1 = params.selectedRows
      // console.log('selection length', params.selectedRows.length, 'rows', params.selectedRows)
    },
    selectAll2(selected, selectedRows) {
      // selected indicates whether select all
      // was selected or unselected
      this.rowSelection1 = selectedRows
      // console.log(selected, selectedRows)
      // selectedRows contains all selected rows
    },
    // toggleSelectRow1(params) {
    //   // row that was clicked
    //   // console.log(params.row)
    //   // index of page
    //   // console.log(params.pageIndex)
    //   // whether the row was selected or unselected
    //   // console.log(params.selected)
    // },
    toggleAutoSelectAll1() {
      this.rows.forEach(item => {
        if (!item.vgtSelected) {
          this.$set(item, 'vgtSelected', true)
        } else {
          this.$set(item, 'vgtSelected', false)
        }
      }, this)
    },
    toggleCustomSelection1() {
      this.rowSelection1.forEach(item => {
        if (!item.vgtSelected) {
          this.$set(item, 'vgtSelected', true)
        } else {
          this.$set(item, 'vgtSelected', false)
        }
      }, this)
    },
    // exitAll() {
    //   const rowsdata = this.rowSelection
    //   // console.log('Exit: ', rowsdata.length, 'Data: ', JSON.stringify(rowsdata))
    // },
    // convertAll() {
    //   const rowsdata = this.rowSelection
    //   // console.log('Convert: ', rowsdata.length, 'Data: ', JSON.stringify(rowsdata))
    // },
    exitAll1() {
      this.$swal({
        title: '<span class="text-danger font-weight-bolder">Are You Sure ?</u></span>',
        icon: 'warning',
        html:
          `This will exit ${this.rowSelection1.length !== this.rows.length ? `${this.rowSelection1.length} Positions.` : 'All Positions.'}`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes, Exit!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: 'Positions Exited',
            text: 'The Exit Orders has been sent to the brokers',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          // const rowsdata1 = this.rowSelection1
          // console.log('Exit: ', rowsdata1.length, 'Data: ', JSON.stringify(rowsdata1))
          this.toggleCustomSelection1()
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'All Selected Positions are intact :)',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          // console.log('No Positions has been exited!')
          this.toggleCustomSelection1()
        }
      })
    },
    showCancelToast1(variant, timeout) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Notification',
          icon: 'XIcon',
          text: 'Select NRML => MIS / MIS => NRML, You have left it empty :(',
          variant,
        },
      }, {
        timeout,
      })
    },
    convertAll1() {
      if (this.convertval1) {
        this.$swal({
          title: '<span class="text-danger font-weight-bolder">Are You Sure ?</u></span>',
          icon: 'warning',
          html:
            `This will convert ${this.rowSelection1.length !== this.rows.length ? `${this.rowSelection1.length} Positions.` : 'All Positions.'} from ${this.convertval1.convert === 'NRML2MIS' ? 'NMRL to MIS' : 'MIS to NRML'}`,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Yes, Convert!',
          customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.$swal({
              icon: 'success',
              title: 'Positions Converted',
              text: 'The Position Conversion Orders has been sent to the brokers',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            // const rowsdata1 = this.rowSelection1
            // console.log('Convert: ', this.convertval1.convert, 'Total Conversions: ', rowsdata1.length, 'Data: ', JSON.stringify(rowsdata1))
            this.convertval1 = ''
            this.toggleCustomSelection1()
          } else if (result.dismiss === 'cancel') {
            this.$swal({
              title: 'Cancelled',
              text: 'All Selected Positions Product Types are Intact :)',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
            // console.log('No Positions has been converted!')
            this.convertval1 = ''
            this.toggleCustomSelection1()
          }
        })
      } else {
        this.showCancelToast1('danger')
      }
    },
  },
}
</script>
