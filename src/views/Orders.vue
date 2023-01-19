<template>
  <div class="card mb-4 mt-5 mx-2">
    <div class="card-header pb-0">
      <h6>جدول سفارشات </h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader" >
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              کاربر
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
              مجموع
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
            >
              وضعیت
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              اقدامات
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تاریخ ثبت سفارش
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in getItems" :key="i" >
            <td>
              <p class="text-xs font-weight-bold mb-0">
              <router-link :to="`/users/details${u.user.id}`">
                مشاهده
              </router-link>
              </p>
            </td>
            <td>
              <div class="d-flex px-2 py-1">
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{u.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}} تومان</h6>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.current_state}}</p>
            </td>
            <td class="align-middle text-center text-sm ">

              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/orders/details${u.card_id}`)">جزئیات</vsud-badge>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="order.currentPage" :per-page="order.perPage"
                    :records="orders.length" @paginate="paginateClickCallback"
                    :page-count="getPaginateCount" />
      </div>
    </div>
  </div>
</template>
<script>
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";

export default {
  components: { VsudBadge},
  data()
  {
    return {
       orders:[],
      index:'',
      orderToDel:'',
      hide:1,
      order:{
        currentPage: 1,
        perPage: 10
      },
      loader:false
    }
  },
  async mounted()
  {
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('orders')
          .catch(()=>{

              // localStorage.removeItem('wugt');
              // localStorage.removeItem('vqmgp');
              // window.location = '/sign-in'

          })
          .then((order)=> {
            this.orders = order.data.data.orders;
            this.loader = false
          });
    }
  },
  methods:{
    paginateClickCallback(page) {
      this.order.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.orders.length / this.order.perPage);
    },
    getItems() {
      let start = (this.order.currentPage - 1) * this.order.perPage;
      let end = this.order.currentPage * this.order.perPage;
      return this.orders.slice(start, end);
    },
  },

}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);
#loading {
  margin: 50px auto;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(0,0,0,.5);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
