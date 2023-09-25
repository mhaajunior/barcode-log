import axios from "axios";
import env from "@/constants/env";
import qs from "qs";

const getBarcodeLog = (
  startDate,
  endDate,
  page = 1,
  perPage = 100,
  trackingCode = ""
) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${env.VUE_APP_SERVICE_AGENT_NETWORK_URL}/closed-api/get-barcode-log`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        startDate: startDate,
        endDate: endDate,
        page: page,
        perPage: perPage,
        trackingCode: trackingCode,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const submitBarcodeLog = (trackingCode = "") => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${env.VUE_APP_SERVICE_AGENT_NETWORK_URL}/closed-api/submit-barcode-log`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        trackingCode: trackingCode,
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, { arrayFormat: "brackets" });
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getBarcodeLog, submitBarcodeLog };
