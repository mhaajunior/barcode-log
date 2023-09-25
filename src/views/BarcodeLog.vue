<template>
  <div class="wrapper">
    <BarcodeLogTable />
  </div>
</template>

<script>
import BarcodeLogTable from "@/components/BarcodeLogTable";

export default {
  name: "ReportFulfilment",
  components: {
    BarcodeLogTable,
  },
};
</script>

<style>
.wrapper {
  width: 80%;
  margin: 5% auto;
}
</style>
