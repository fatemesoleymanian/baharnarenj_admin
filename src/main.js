/**
=========================================================
* Vue Soft UI Dashboard - v2.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-soft-ui-dashboard
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";
import Notifications from '@kyvg/vue3-notification';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Pagination from 'v-pagination-3';
import vue3JsonExcel from "vue3-json-excel"

const appInstance = createApp(App);
appInstance.config.productionTip = false;
appInstance.component('pagination', Pagination);
appInstance.config.warnHandler = function () {

    return null
};
appInstance.component('QuillEditor', QuillEditor);
appInstance.use(vue3JsonExcel);
appInstance.use(store);
appInstance.use(router);
appInstance.use(Notifications);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
