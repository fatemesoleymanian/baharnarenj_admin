<template>
  <sidenav
    :custom_class="this.$store.state.mcolor"
    :class="[
      this.$store.state.isTransparent,
      this.$store.state.isRTL ? 'fixed-end' : 'fixed-start',
    ]"
    v-if="this.$store.state.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.showNavbar"
    />
    <router-view />
    <app-footer v-show="this.$store.state.showFooter" />
    <configurator
        :toggle="toggleConfigurator"
        :class="[
        this.$store.state.showConfig ? 'show' : '',
        this.$store.state.hideConfigButton ? 'd-none' : '',
      ]"
    />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Navbar from "@/examples/Navbars/Navbar.vue";
import Configurator from "@/examples/Configurator.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    Sidenav,
    Navbar,
    AppFooter,
    Configurator
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
    ...mapActions(["toggleSidebarColor"]),

    sidebarType() {
      this.toggleSidebarColor('bg-white');
    },
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky": this
          .$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state
          .isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-white";
    this.$store.state.isRTL = true;
    document.querySelector("html").setAttribute("lang", "ar");
    document.querySelector("html").setAttribute("dir", "rtl");
    document.querySelector("#app").classList.add("rtl");
  },
  beforeUnmount() {
    document.querySelector("#sidenav-main").setAttribute("data-color", 'dark');
    this.$store.state.mcolor = `card-background-mask-dark`;
    this.$store.state.isRTL = false;
    document.querySelector("html").removeAttribute("lang");
    document.querySelector("html").removeAttribute("dir");
    document.querySelector("#app").classList.remove("rtl");
  },

};
</script>
<style>
@import '~typeface-yekan';
*{
  font-family: 'Yekan';
}
</style>
