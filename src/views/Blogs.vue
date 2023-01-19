<template>
  <div class="card mb-4 mt-5">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف پست</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این پست اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deletePost">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="card-header pb-0">
      <h6>جدول پست های وبلاگ</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="md" @click="$router.push('/post/new')">افزودن پست</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
             تیتر
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تگ ها
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              تاریخ ایجاد
            </th>
            <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              اقدامات
            </th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(u, i) in getItems" :key="i" >
            <td>
              <div class="d-flex  py-1">
                <div >
                  <vsud-avatar
                      :img="'https://api.photomimmarket.com/public'+u.image"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.slug"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{u.title}}</h6>
                </div>
              </div>
            </td>
            <td class="align-middle text-center text-sm " width="260px">
              <router-link to="/tags">
              <p class="text-s font-weight-bold mb-0" style="display: inline" v-for="s in u.tags" :key="s">
                {{s.title.substring(0,5)}}... - </p>
              </router-link>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{u.created_at}}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="postToDel=u;index=i;">حذف </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/post/details${u.slug}`)">
                جزئیات</vsud-badge>
            </td>

          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="post.currentPage" :per-page="post.perPage"
                    :records="posts.length" @paginate="paginateClickCallback"
                    :page-count="getPaginateCount" />
      </div>
    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import VsudAvatar from "../components/VsudAvatar";
import VsudBadge from "../components/VsudBadge";

export default {
  name: "Blogs",
  components: { VsudBadge, VsudAvatar, VsudButton},
  data()
  {
    return{
      posts:[],
      postToDel:'',
      index:0,
      hide:1,
      post:{
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
      await HTTP.get('/post/all-for-admin')
          .catch((e)=>{
            console.log(e)
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              localStorage.removeItem('rgtokuukqp');
              window.location = '/sign-in'
            }
          })
          .then((resp)=> {
            this.posts = resp.data.data.posts;
            console.log(this.posts)
            this.loader = false
          });
    }
  },
  methods:{
    async deletePost()
    {

       await HTTP.delete(`/post/${this.postToDel.id}`)
     .catch(()=>{
       document.getElementById('no').click();
       return this.$notify({
         title: "عملیات ناموفق!",
         text: "خطا در حذف پست",
         type: 'error',
       });
     });
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "پست با موفقیت حذف گردید!",
          type: 'success',
        });
        this.posts.splice(this.index,1)

    },
    paginateClickCallback(page) {
      this.post.currentPage = Number(page);
    },
  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.posts.length / this.post.perPage);
    },
    getItems() {
      let start = (this.post.currentPage - 1) * this.post.perPage;
      let end = this.post.currentPage * this.post.perPage;
      return this.posts.slice(start, end);
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
