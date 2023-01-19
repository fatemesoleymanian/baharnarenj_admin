<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header vh-100">
        <div class="container ">
          <div class="row ">
            <div class="col-md-6 ">
              <div
                  class="top-0 oblique position-absolute h-100 d-md-block d-none me-n8"
              >
                <div
                    class="bg-cover  position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                    :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved9.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column ">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-end" v-if="!show">
                  <h3 class="font-weight-bolder text-success text-gradient">
                   به بهارنارنج خوش آمدید!
                  </h3>
                  <p class="mb-0">برای ورود به بخش مدیریت ابتدا لاگین کنید.</p>
                </div>
                <div class="card-body">
                  <form role="form" class="text-end">
                    <div class="mb-3" v-if="!show">
                    <div class="d-flex align-items-center">
                      <h6 class="mb-0 p-2"> ایمیل :</h6>
                    </div>
                    <input type="email" class="form-control"  placeholder="  نام کاربری" v-model="username">
                    </div>
                    <div class="mb-4" v-if="!show">
                    <div class="d-flex align-items-center">
                      <h6 class="mb-0 p-2">گذرواژه:</h6>
                    </div>
                    <input type="password" class="form-control text-md-end"  placeholder=" گذرواژه" v-model="password">
                    </div>
                    <div class="mb-4" v-if="show">
                    <div class="d-flex align-items-center">
                      <h6 class="mb-0 p-2">کد تایید:</h6>
                    </div>
                    <input type="number" class="form-control" maxlength="5" minlength="5"
                           placeholder=" کد تایید" v-model="code">
                    </div>
                    <vsud-switch id="rememberMe" name="rememberMe" v-if="!show" checked>
                      مرا به خاطر بسپار.
                    </vsud-switch>
                    <div class="text-center" v-if="!show">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                        @click="login"
                        >{{ loading ? 'در حال پردازش اطلاعات' : 'ورود'}}
                      </vsud-button>
                    </div>
                    <div class="text-center" v-if="show">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="dark"
                        full-width
                        @click="resetPassword"
                        >{{ loading ? 'در حال پردازش اطلاعات' : 'ثبت'}}
                      </vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2" v-if="!show">
                  <p class="mx-auto mb-4 text-sm text-dark text-gradient font-weight-bold cursor-pointer"
                     @click="forgetPassword">
                    {{ sending? 'لطفا صبر کنید' : 'فراموشی رمزعبور'}}

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
const body = document.getElementsByTagName("body")[0];
import { mapMutations } from "vuex";
import {HTTP} from "../http-common";

export default {
  name: "SignIn",
  components: {
    VsudSwitch,
    VsudButton,
  },
  data()
  {
    return{
      show:false,
      username:'',
      password:'',
      code:'',
      loading:false,
      sending:false
    }
  },
  mounted()
  {
    if (localStorage.getItem('vqmgp')) window.location = '/';

  },
  created() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),
    async login(e)
    {
      e.preventDefault();
      if (this.username.trim() === '') return this.$notify({
        title: "خطا!",
        text: " لطفا ایمیل را وارد کنید.",
        type: 'error',
      });
      if (this.password.trim() === '') return this.$notify({
        title: "خطا!",
        text: " لطفا گذرواژه را وارد کنید.",
        type: 'error',
      });
      if (this.password.length > 15 || this.password.length <6 ) return this.$notify({
        title: "خطا!",
        text: " گذرواژه باید حداقا 6 کاراکتر و حداکثر 15 کاراکتر باشد.",
        type: 'error',
      });

      this.loading = true
      const data = {
        username : this.username,
        password : this.password
      }
       await HTTP.post('admin/login',data)
          .then((res)=>{
            localStorage.setItem('wugt',JSON.stringify(res.data.data.admin));
            localStorage.setItem('vqmgp',res.data.data.token);
             this.$notify({
              title: "عملیات موفق!",
              text:"به پنل کنترل بهارنارنج خوش آمدید!",
              type: 'success',
            });
            window.location = '/'
          })
      .catch((e)=>{
        return this.$notify({
          title: "عملیات ناموفق!",
          text:e.response.data.message,
          type: 'error',
        });
      });
    this.loading = false
    },
    async forgetPassword(e)
    {
      e.preventDefault();
      if (this.username.trim() === '') return this.$notify({
        title: "خطا!",
        text: " لطفا ایمیل را وارد کنید.",
        type: 'error',
      });
      this.sending = true
      const data = {username : this.username}
      await HTTP.post('admin/forget_password',data)
          .then((res)=>{
            localStorage.setItem('liame',this.username)
            this.$notify({
              title: "عملیات موفق!",
              text:res.data.message,
              type: 'success',
            });
            this.show = true
          })
          .catch((e)=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text:e.response.data.message,
              type: 'error',
            });
          });
      this.sending = false
    },
    async resetPassword(e)
    {
      e.preventDefault()
      if (this.code === '') return this.$notify({
        title: "خطا!",
        text: " لطفا کد تایید را وارد کنید.",
        type: 'error',
      });
      this.loading = true
      const data =
          {
            username:localStorage.getItem('liame'),
            code:this.code
          }
      await HTTP.post('admin/reset_password',data)
          .then((res)=>{
            localStorage.removeItem('liame')
            localStorage.setItem('wugt',res.data.admin);
            localStorage.setItem('vqmgp',res.data.token);
            localStorage.setItem('rgtokuukqp',res.data.permission);
            this.$notify({
              title: "عملیات موفق!",
              text:"به پنل کنترل بهارنارنج خوش آمدید!",
              type: 'success',
            });
            window.location = '/profile'
          })
          .catch((e)=>{
            return this.$notify({
              title: "عملیات ناموفق!",
              text:e.response.data.message,
              type: 'error',
            });
          });

          this.loading = false
    }
  },
};
</script>
