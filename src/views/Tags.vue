<template>
  <div class="card mb-4 mt-5 mx-2">
    <div class="card-header pb-0">
      <h6>تگ ها</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader" >
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              عنوان
            </th>

            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              پست
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تاریخ ایجاد
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in getItems" :key="i" >
            <td>
              <p class="text-xs font-weight-bold mb-0">{{u.title}}</p>
            </td>

            <td class="align-middle text-center text-sm " width="260px">
              <router-link :to="`post/details${u.post.slug}`">
                  {{u.post.title}}
              </router-link>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="tag.currentPage" :per-page="tag.perPage"
                    :records="tags.length" @paginate="paginateClickCallback"
                    :page-count="getPaginateCount" />
      </div>
    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";

export default {
  name: "Tags",
  data()
  {
    return{
      tags:[],
      tagToDel:'',
      index:0,
      id:'',
      title:'',
      tag:{
        currentPage: 1,
        perPage: 5
      },
      loader:false
    }
  },
  async mounted(){

    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('tag')
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              window.location = '/sign-in'
            }
          })
          .then((tag)=> {
            this.tags = tag.data.data.tags;
            this.loader = false
          });
    }
  },
  methods:{
    paginateClickCallback(page) {
      this.tag.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.tags.length / this.tag.perPage);
    },
    getItems() {
      let start = (this.tag.currentPage - 1) * this.tag.perPage;
      let end = this.tag.currentPage * this.tag.perPage;
      return this.tags.slice(start, end);
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
