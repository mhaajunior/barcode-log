<template>
  <div class="big-box">
    <div class="box-2">
      <b-row style="margin-bottom: 10px">
        <b-col cols="10">
          <b-form-input
            v-model="trackingCode"
            cols="10"
            placeholder="ใส่หมายเลข Tracking"
            type="text"
          ></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-overlay
            :show="loading.submit"
            class="d-inline-block"
            opacity="0.4"
            spinner-small
            spinner-variant="primary"
          >
            <b-button
              class="search-box"
              size="lg"
              variant="primary"
              @click="onClickSubmitTracking"
            >
              <b-icon
                aria-label="Help"
                class="search"
                icon="arrow-right-circle"
              ></b-icon>
            </b-button>
          </b-overlay>
        </b-col>
      </b-row>
    </div>
    <div class="box">
      <div class="tool-box-1">
        <b-row style="margin-bottom: 10px">
          <b-col cols="3">
            <b-form-input v-model="form.startDate" type="date"></b-form-input>
            <b-form-timepicker
              v-model="form.startTime"
              :hour12="false"
              no-close-button
            >
            </b-form-timepicker>
          </b-col>
          <b-col cols="3">
            <b-form-input v-model="form.endDate" type="date"></b-form-input>
            <b-form-timepicker
              v-model="form.endTime"
              :hour12="false"
              no-close-button
            >
            </b-form-timepicker>
          </b-col>
          <b-col cols="3">
            <b-form-input
              v-model="form.trackingCode"
              cols="3"
              placeholder="tracking code"
              type="text"
            ></b-form-input>
          </b-col>
          <b-col cols="1">
            <b-overlay
              :show="loading.get"
              class="d-inline-block"
              opacity="0.4"
              spinner-small
              spinner-variant="primary"
            >
              <b-button
                class="search-box"
                size="lg"
                variant="primary"
                @click="onClickGetOrder"
              >
                <b-icon aria-label="Help" class="search" icon="search"></b-icon>
              </b-button>
            </b-overlay>
          </b-col>
        </b-row>
      </div>
      <div class="right">
        <b>ทั้งหมด {{ result.totalItem }} รายการ</b>
      </div>
      <div class="tb">
        <b-table
          id="barcode-log-table"
          :busy="loading.get"
          :fields="fields"
          :fixed="true"
          :items="result.data"
          :show-empty="true"
          :sticky-header="true"
          empty-text="ไม่มีรายการให้แสดง"
          style="max-height: 100%"
        >
          <template #table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{ ...field.style }"
            />
          </template>
          <template #cell(index)="data">
            {{ perPage * (result.currentPage - 1) + (data.index + 1) }}
          </template>
          <template #cell(createdDate)="data">
            {{ data.item.date }}
          </template>
          <template #cell(createdTime)="data">
            {{ data.item.time.join(", ") }}
          </template>
          <template #cell(trackingCode)="data">
            {{ `${data.item.tracking_code}` }}
          </template>
        </b-table>
      </div>
      <div style="display: flex">
        <b-pagination
          v-model="result.currentPage"
          :per-page="perPage"
          :total-rows="result.totalItem"
          class="mx-auto"
          @change="onChangePage"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { currentDate } from "@/utils/date";
import "@/styles/common.css";
import { getBarcodeLog, submitBarcodeLog } from "@/api/agent-network";

export default {
  name: "BarcodeLogTable",
  async created() {
    await this.onClickGetOrder();
  },
  data() {
    return {
      //Loading status
      loading: {
        get: false,
        submit: false,
      },

      //Form data
      form: {
        startDate: currentDate(),
        endDate: currentDate(),
        startTime: "00:00:00",
        endTime: "23:59:59",
        trackingCode: "",
      },

      //Table
      fields: [
        {
          key: "index",
          label: "ลำดับ",
          sortable: false,
          style: { width: "75px" },
        },
        {
          key: "createdDate",
          label: "วันที่สแกน",
          sortable: false,
          style: { width: "125px" },
        },
        {
          key: "createdTime",
          label: "เวลาที่สแกน",
          sortable: false,
          style: { width: "125px" },
        },
        {
          key: "trackingCode",
          label: "tracking code",
          sortable: false,
          style: { width: "100px" },
        },
      ],

      //Log data
      result: {
        previousPage: null,
        currentPage: 1,
        nextPage: null,
        firstPage: 1,
        lastPage: 1,
        isFirstPage: true,
        isLastPage: false,
        totalPage: 1,
        totalItem: 0,
        data: [],
      },

      trackingCode: null,

      //Per page use to request order.
      perPage: 100,
    };
  },
  methods: {
    async onClickGetOrder() {
      this.loading.get = true;
      try {
        const res = await getBarcodeLog(
          `${this.form.startDate} ${this.form.startTime}`,
          `${this.form.endDate} ${this.form.endTime}`,
          this.result.currentPage,
          this.perPage,
          this.form.trackingCode
        );
        if (res.data.data) {
          this.result = res.data.data;
        }
        this.loading.get = false;
      } catch (error) {
        this.loading.get = false;
        console.log(error);
      }
    },
    async onClickSubmitTracking() {
      this.loading.submit = true;
      try {
        const res = await submitBarcodeLog(this.trackingCode);
        if (res.data.code === 1) {
          this.trackingCode = null;
          this.onClickGetOrder();
        }
        this.loading.submit = false;
      } catch (error) {
        this.loading.submit = false;
        console.log(error);
      }
    },
    onChangePage(page) {
      this.result.currentPage = page;
      this.onClickGetOrder();
    },
  },
};
</script>

<style>
.right {
  text-align: right;
  margin: 10px;
}
</style>
