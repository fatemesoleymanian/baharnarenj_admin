<template>
  <div class="fixed-plugin">
    <div class="shadow-lg card blur" style="overflow-y: scroll">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <div class="pt-0 card-body pt-sm-3">
        <!--        tabs-->

        <div class="tab">
          <button class="tablinks w-50" @click="openTab('read-button','read')" id="read-button">خوانده شده</button>
          <button class="tablinks w-50" @click="openTab('unread-button','unread')" id="unread-button">خوانده نشده
          </button>
        </div>

        <div id="read" class="tabcontent">
          <ul v-if="readNotifications.length">
            <li class="mb-2" v-for="(notif,index) in readNotifications" :key="index">
              <a class="dropdown-item border-radius-md" href="javascript:;">
                <div class="py-1 d-flex">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-1 text-sm font-weight-normal">
                      {{ JSON.parse(notif.data).action }}
                    </h6>
                    <p class="mb-0 text-xs text-secondary">
                      <i class="fa fa-clock me-1"></i>
                      {{ notif.created_at }}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div class="pt-5 " v-else><b>هیچ اعلان خوانده شده ای یافت نشد!</b></div>
        </div>

        <div id="unread" class="tabcontent">
          <ul v-if="unreadNotifications.length">
            <li class="mb-2" v-for="(notif,index) in unreadNotifications" :key="index">
              <a class="dropdown-item border-radius-md" href="javascript:;">
                <div class="py-1 d-flex">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-1 text-sm font-weight-normal">
                      {{ JSON.parse(notif.data).action }}
                    </h6>
                    <p class="mb-0 text-xs text-secondary">
                      <i class="fa fa-clock me-1"></i>
                      {{ notif.created_at }}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <div class="pt-5 " v-else><b>هیچ اعلان خوانده نشده ای ای یافت نشد!</b></div>

          <vsud-button color="dark" size="lg" @click="markAsRead" v-if="unreadNotifications.length" class="mt-3 mx-3">
            اعلان ها خوانده شد
          </vsud-button>

        </div>

        <!--tabs-->

      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapActions} from "vuex";
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";

export default {
  name: "configurator",
  components: {VsudButton},
  props: ["toggle"],
  data() {
    return {
      fixedKey: "",
      unreadNotifications: [],
      readNotifications: [],
    };
  },
  async created() {
    // const [response1, response2] = await Promise.all([
    //   HTTP.get('/admin/unread_notifications'),
    //   HTTP.get('/admin/read_notifications'),
    // ])
    // this.unreadNotifications = response1.data.notifications;
    // this.readNotifications = response2.data.notifications;


  },
  methods: {
    ...mapMutations(["navbarMinimize", "sidebarType", "navbarFixed"]),
    ...mapActions(["toggleSidebarColor"]),
    async markAsRead() {
      await HTTP.post('/admin/mark_as_read_notifications')
          .then(() => {
            this.unreadNotifications = [];
          });
      this.readNotifications = await HTTP.get('/admin/read_notifications')
          .then((response) => {
            this.readNotifications = response.data.notifications;

          })
    },
    openTab(e, cityName) {
      let i;
      let tabcontent;
      let tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
      }
      document.getElementById(cityName).style.display = "block";
      document.getElementById(e).className += " active";
    },
    sidebarColor(color = "success") {
      document.querySelector("#sidenav-main").setAttribute("data-color", color);
      this.$store.state.mcolor = `card-background-mask-${color}`;
    },

    sidebarType(type) {
      this.toggleSidebarColor(type);
    },

    setNavbarFixed() {
      if (this.$route.name !== "Profile") {
        this.$store.state.isNavFixed = !this.$store.state.isNavFixed;
      }
    },

    sidenavTypeOnResize() {
      let transparent = document.querySelector("#btn-transparent");
      let white = document.querySelector("#btn-white");
      if (window.innerWidth < 1200) {
        transparent.classList.add("disabled");
        white.classList.add("disabled");
      } else {
        transparent.classList.remove("disabled");
        white.classList.remove("disabled");
      }
    },
  },
  computed: {
    ifTransparent() {
      return this.$store.state.isTransparent;
    },
    sidenavResponsive() {
      return this.sidenavTypeOnResize;
    },
  },
  beforeMount() {
    this.$store.state.isTransparent = "bg-transparent";
    // Deactivate sidenav type buttons on resize and small screens
    window.addEventListener("resize", this.sidenavTypeOnResize);
    window.addEventListener("load", this.sidenavTypeOnResize);
  },
};
</script>
<style>
.tab {
  overflow: hidden;
  border-bottom: 1px solid #252f40;
  background: none;
  text-align: center;
}

/* Style the buttons inside the tab */
.tab button {
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background: #252f40;
  color: white;
  border-radius: 10px;
}

/* Create an active/current tablink class */
.tab button.active {
  background: #252f40;
  color: white;
  border-radius: 10px;
}

/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border-top: none;
}

</style>
