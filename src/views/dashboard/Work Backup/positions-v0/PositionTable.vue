<template>
  <!-- <b-card title="The Position Details are as follows:"> -->
  <b-card>
    <!-- search input -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :rtl="direction"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >

        <!-- Column: Name -->
        <span
          v-if="props.column.field === 'product'"
          class="text-nowrap"
        >
          <feather-icon
            size="24"
            :icon="lossorprofit(props.row.pnl) ? 'TrendingDownIcon':'TrendingUpIcon'"
            :class="lossorprofit(props.row.pnl) ? 'text-danger':'text-success'"
          />
          <span class="text-nowrap">    {{ props.row.product }}</span>
        </span>

        <!-- Column: Status -->
        <span v-else-if="props.column.field === 'pnl'">
          <b-badge :variant="pnlVariant(props.row.pnl)">
            {{ props.row.pnl }}
          </b-badge>
        </span>

        <span v-else-if="props.column.field === 'mtm'">
          <b-badge :variant="mtmVariant(props.row.mtm)">
            {{ props.row.mtm }}
          </b-badge>
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
  BCard, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import { kFormatter } from '@core/utils/filter'

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
          label: 'Product',
          field: 'product',
        },
        {
          label: 'Instrument',
          field: 'instrument',
        },
        {
          label: 'Quantity',
          field: 'quantity',
        },
        {
          label: 'Average (₹)',
          field: 'average',
        },
        {
          label: 'LTP (₹)',
          field: 'ltp',
        },
        {
          label: 'PNL (₹)',
          field: 'pnl',
        },
        {
          label: 'MTM (₹)',
          field: 'mtm',
        },
      ],
      // rows: [],
      searchTerm: '',
      pnl: [{
        1: true,
        2: false,
      },
      {
        1: 'light-success',
        2: 'light-danger',
      }],
      mtm: [{
        1: true,
        2: false,
      },
      {
        1: 'light-info',
        2: 'light-warning ',
      }],
    }
  },
  computed: {
    pnlVariant() {
      const pnlColor = {
        /* eslint-disable key-spacing */
        true      : 'light-success',
        false     : 'light-danger',
        /* eslint-enable key-spacing */
      }

      return pnl => pnlColor[(!Number.isNaN(pnl) && Number(pnl) > 0)]
    },
    mtmVariant() {
      const mtmColor = {
        /* eslint-disable key-spacing */
        true      : 'light-info',
        false     : 'light-warning',
        /* eslint-enable key-spacing */
      }

      return mtm => mtmColor[(!Number.isNaN(mtm) && Number(mtm) > 0)]
    },
    lossorprofit() {
      const iconColor = {
        /* eslint-disable key-spacing */
        true      : false,
        false     : true,
        /* eslint-enable key-spacing */
      }

      return updown => iconColor[(!Number.isNaN(updown) && Number(updown) > 0)]
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
    kFormatter,
  },
}
</script>
