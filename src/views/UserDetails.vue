<template>
  <div class="py-4 container-fluid">
    <div id="loading" v-if="loader"></div>
    <div class="row bg-white p-3 mb-5" v-if="!loader" style="border-radius: 0 0 1rem 1rem">
      <div class="card-header pb-0">
        <h6>اطلاعات و مشخصات کاربر</h6>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="name"
              type="text"
              placeholder="نام و نام خانوادگی"
              aria-label="name"
              :value="user.name"
              title="نام و نام خانوادگی"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="phone_number"
              type="tel"
              placeholder="شماره تماس"
              aria-label="phone_number"
              :value="user.mobile"
              title="شماره تماس"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="email"
              type="email"
              placeholder="ایمیل"
              aria-label="email"
              title="ایمیل"
              :value="user.email"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="email"
              type="email"
              placeholder="نام کاربری"
              aria-label="username"
              title="نام کاربری"
              :value="user.username"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="company"
              type="text"
              placeholder="نام شرکت"
              aria-label="company"
              title="نام شرکت"
              :value="user.birthdate"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="job"
              type="text"
              placeholder="شغل"
              aria-label="job"
              title="شغل"
              :value="user.job"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="created_at"
              type="text"
              placeholder="تاریخ ساخت اکانت"
              aria-label="created_at"
              title="تاریخ ساخت اکانت"
              :value="user.created_at"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="national_id"
              type="text"
              placeholder="کدملی"
              aria-label="national_id"
              title="کدملی"
              :value="user.national_code"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="address"
              type="text"
              placeholder="آدرس"
              aria-label="address"
              title="آدرس"
              :value="user.address"
              :size="'lg'"
          />
        </div>
      </div>
      <div class="col-md-4 col-12 ">
        <div class="mb-3">
          <vsud-input
              :read-only="false"
              id="address"
              type="text"
              placeholder="شهر"
              aria-label="city"
              title="شهر"
              :value="user.city"
              :size="'lg'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from  "../components/VsudInput"
import {HTTP} from '../http-common'

export default {
  name: "UserDetails",
  components: {
    VsudInput,
  },
  data()
  {
      return {
        id: this.$route.params.id,
        loader:false,
        user:'',
        orders:[],
        orderToDel:'',
        index:0,
        remove:1
      }
  },
  async mounted() {
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get(`/user/${this.id}`)

          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              window.location = '/sign-in'
            }
          })
          .then((res)=> {
            this.user = res.data.data.user;
            this.loader = false
          });
    }
  },
  methods:{
    async deleteOrder()
    {
      const data = {
        id : this.orderToDel.id
      }
      const delet = await HTTP.delete(`order/delete`,{data})
      if (delet.status === 200)
      {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "سفارش کاربر با موفقیت حذف گردید!",
          type: 'success',
        });
        this.orders.splice(this.index,1)
      }
      else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف سفارش کاربر",
          type: 'error',
        });
      }
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
