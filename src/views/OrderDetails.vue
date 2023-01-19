<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>جزئیات سفارش</h6>
      <h6 class="text-start">
      <span>مجموع : {{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}تومان</span>
      </h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader" >
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              نام محصول
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              ظرفیت
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              قیمت
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
              تعداد
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in items" :key="i">
            <td>
              <router-link :to="`/product/details${u.product.id}`">
              <div class="d-flex ">
                <div>
                  <img
                      :src="'https://api.photomimmarket.com/public'+u.product.image"
                      class="avatar avatar-sm rounded-circle mx-2"
                      :alt="u.product.name"
                  />
                </div>
                <div class="my-auto">
                  <h6 class="mb-0 text-sm">{{ u.product.name }}</h6>
                  <p class="text-xs text-secondary mb-0">
                    {{u.product.discount}}%
                  </p>
                </div>
              </div>
              </router-link>
            </td>
            <td>
              <p class="text-sm font-weight-bold mb-0">{{ u.state.type}}</p>
            </td>
            <td width="150px">
              <span class="text-xs font-weight-bold">{{ u.state.discounted_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}تومان</span>
            </td>
            <td class="align-middle text-center">
              <div class="d-flex align-items-center justify-content-center">
                <span class="me-2 text-xs font-weight-bold">{{u.count}}</span>
              </div>
            </td>
<!--            <td class="align-middle">-->
<!--              <button class="btn btn-link text-secondary mb-0">-->
<!--                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>-->
<!--              </button>-->
<!--            </td>-->
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";

export default {
  name: "OrderDetails",
  components:{
  },
  data()
  {
    return{
      loader:false,
      order_id:this.$route.params.order,
      items:[],
      total:''
    }
  },
  async mounted() {
    const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    for (let i in permissions)
    {
      if (permissions[i].module.name === 'سفارشات'){
        if (permissions[i].read === 0) return window.location = '/'
      }
    }
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      const orders = await HTTP.get(`/order/items${this.order_id}`)
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then(()=> {
            this.items = orders.data.products
            this.total = orders.data.total_price;
            this.loader = false
          });
    }
  }
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
