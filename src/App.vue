<template>
  <div>
    <b-navbar
      fixed="top"
      style="background: #242f3d !important"
      type="dark"
      variant="light"
    >
      <b-navbar-brand> Barcode Log </b-navbar-brand>
    </b-navbar>
    <BarcodeLog />
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import BarcodeLog from "@/views/BarcodeLog.vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

export default {
  name: "App",
  components: {
    BarcodeLog,
  },
};
</script>

<style>
.navbar {
  height: 56px;
}
</style>
