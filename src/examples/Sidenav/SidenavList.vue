<template>
  <div
    class="w-auto h-auto collapse navbar-collapse  h-100"
    id="sidenav-collapse-main" style="z-index: 99"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-collapse navText="داشبورد" :to="{ name: 'Dashboard' }">
          <template #icon>
            <i class="bi bi-house-fill" style="color: #3A416F;font-size: 17px;"></i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item" v-for="(item,i) in items" :key="i">
        <sidenav-collapse
            :navText="item.title"
            :to="{ name: item.route }"
        >
          <template #icon>
          <i :class="item.icon" style="color: #3A416F;font-size: 17px;"></i>
          </template>
        </sidenav-collapse>
      </li>
      <li class="nav-item">
        <sidenav-collapse navText="پروفایل" :to="{ name: 'پروفایل' }">
          <template #icon>
            <i class="bi bi-person-bounding-box" style="color: #3A416F;font-size: 17px;"></i>
          </template>
        </sidenav-collapse>
      </li>
    </ul>
  </div>

</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "کنترل پنل بهارنارنج",
      controls: "داشبورد",
      isActive: "فعال",
      items:[
        {
          title:'کاربران',
          route:'کاربران',
          icon:'bi bi-people-fill',
        },
        {
          title:'محصولات',
          route:'محصولات',
          icon:'bi bi-basket-fill',
        },
        {
          title:'وبلاگ',
          route:'پست ها',
          icon:'bi bi-file-richtext-fill',
        },
        {
          title:'دسته بندی ها',
          route:'دسته بندی ها',
          icon:'bi bi-inboxes-fill',
        },
        {
          title:'تگ ها',
          route:'تگ ها',
          icon:'bi bi-tags-fill',
        },
        {
          title:'سفارشات',
          route:'Orders',
          icon:'bi bi-receipt-cutoff',
        },
        {
          title:'اعضا پنل کنترل',
          route:'ادمین ها',
          icon:'bi bi-person-circle',
        },

      ]
    };
  },
  components: {
    SidenavCollapse,
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
  },
  mounted() {

  }
};
</script>
<style scoped>
i{
  font-size: 20px;
}
</style>
