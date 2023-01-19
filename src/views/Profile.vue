<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-300 border-radius-xl"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <img
              src="@/assets/img/profile.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1">{{admin.username}}</h5>
          </div>
        </div>
        <div class="mx-auto mt-3 col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0">
        </div>
      </div>
    </div>
  </div>
  <div class="py-4 container-fluid">
    <div class="mt-3 row">

      <div class="mt-4 col-12 mt-md-0">
        <profile-info-card
          :title="`  پروفایل ادمین `"
          :info="{
            username:admin.username
          }"

        />
      </div>
    </div>

  </div>
</template>

<script>
import ProfileInfoCard from "./components/ProfileInfoCard.vue";

import {

} from "@fortawesome/free-brands-svg-icons";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "ProfileOverview",
  components: {
    ProfileInfoCard,
  },
  data() {
    return {
      showMenu: false,
      admin:{
        username:'',
        password:'',
        email:'',
        address:'',
        role:'',
        phone_number:''
      }
    };
  },

  mounted() {
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      const user = JSON.parse(localStorage.getItem('wugt'));
      this.admin.username = user.username;
      this.admin.password = user.password;

    }
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
