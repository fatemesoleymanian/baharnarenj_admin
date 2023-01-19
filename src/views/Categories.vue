<template>
  <div class="py-4 container-fluid">
    <!-- Modal to delete -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف دسته بندی</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این دسته بندی اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
            <button type="button" class="btn btn-primary" @click="deletee">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to edit -->
    <div class="modal fade"

         id="editSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editSlideLabel">اقدام به ویرایش دسته بندی</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" >
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان دسته بندی :</h6>
              </div>
              <input type="text" class="form-control" placeholder="عنوان دسته بندی" v-model="category.title">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noEdit" >
              انصراف
            </button>
            <button type="button" class="btn btn-dark" @click="edit" >ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!-- Modal to add -->
    <div class="modal fade"

         id="addSlide" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addSlideLabel">اقدام به افزودن دسته بندی</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" >
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <h6 class="mb-0 p-2">عنوان دسته بندی :</h6>
              </div>
              <input type="text" class="form-control" placeholder="عنوان دسته بندی" v-model="category.title">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="noAdd" >
              انصراف
            </button>
            <button type="button" class="btn btn-dark" @click="add" >ثبت</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <!--   product category-->

    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <div class="col-6 text-start px-5 py-3 me-auto">
              <vsud-button color="dark" size="md" data-bs-toggle="modal" data-bs-target="#addSlide"
              >افزودن دسته بندی
              </vsud-button>
            </div>
            <h6>دسته بندی های محصولات</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div id="loading" v-if="loader"></div>
            <div class="table-responsive p-0" v-if="!loader">
              <table class="table align-items-center mb-0">
                <thead>
                <tr>

                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    عنوان
                  </th>
                  <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                    محصولات
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    تاریخ ثبت
                  </th>
                  <th
                      class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    اقدامات
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(u, i) in getItems" :key="i">
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ u.title }}</p>
                  </td>
                  <td>
                    <p class="text-sm font-weight-bold mb-0" v-for="(p,j) in u.products" :key="j"
                       style="overflow-y: scroll">
                      <router-link :to="`/product/details${p.id}`">
                        {{ p.name.substring(0, 6) }}... ,
                      </router-link>
                    </p>
                  </td>
                  <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="catToDel=u;index=i;">حذف
                    </vsud-badge>
                    <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                                @click="category.id=u.id;category.title=u.title;"
                                data-bs-toggle="modal" data-bs-target="#editSlide" >
                      ویرایش
                    </vsud-badge>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
            <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
              <pagination class="pro-pagination-style shop-pagination mt-30 "
                          v-model="categorypaginate.currentPage" :per-page="categorypaginate.perPage"
                          :records="categories.length" @paginate="paginateClickCallback"
                          :page-count="getPaginateCount"/>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";
import VsudButton from "../components/VsudButton";

export default {
  name: "Categories",
  components: {VsudButton, VsudBadge},
  data() {
    return {
      index: '',
      catToDel: '',
      category: {
        title: '',
        id: ''
      },
      categories: [],
      categorypaginate: {
        currentPage: 1,
        perPage: 5
      },
      loader: false
    }
  },
  async mounted() {
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('category').catch((e) => {
        if (e.response.status === 500) {
          localStorage.removeItem('wugt');
          localStorage.removeItem('vqmgp');
          window.location = '/sign-in'
        }
      }).then((res) => {
            console.log(res)
            this.categories = res.data.data.categories;
            this.loader = false
          });
    }
  },
  methods: {
    async add() {

        if (this.category.title.trim() === '') return this.$notify({
          title: "!خطا",
          text: "عنوان دسته بندی الزامیست! ",
          type: 'error',
        });

        const addd = await HTTP.post('category', this.category)
            .catch(() => {
              return this.$notify({
                title: "عملیات ناموفق!",
                text: addd.data.errors,
                type: 'error',
              });
            });
        document.getElementById("noAdd").click()
        this.$notify({
          title: "عملیات موفق!",
          text: "دسته بندی ایجاد شد.",
          type: 'success',
        });

      window.location = '/categories'
    },
    async edit() {
        if (this.category.title.trim() === '') return this.$notify({
          title: "!خطا",
          text: "عنوان دسته بندی الزامیست! ",
          type: 'error',
        });

        const update = await HTTP.put(`category/${this.category.id}`, this.category)
            .catch(() => {
              return this.$notify({
                title: "عملیات ناموفق!",
                text: update.data.errors,
                type: 'error',
              });
            });
        document.getElementById("noEdit").click()
        this.$notify({
          title: "عملیات موفق!",
          text: "دسته بندی تغییر داده شد.",
          type: 'success',
        });

      window.location = '/categories'
    },
    async deletee() {

        await HTTP.delete(`category/${this.catToDel.id}`)
            .catch(() => {
              document.getElementById('no').click();
              return this.$notify({
                title: "عملیات ناموفق!",
                text: "خطا در حذف دسته بندی",
                type: 'error',
              });
            });

        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "دسته بندی با موفقیت حذف گردید!",
          type: 'success',
        });
        this.categories.splice(this.index, 1)

    },
    paginateClickCallback(page) {
      this.categorypaginate.currentPage = Number(page);
    },

  },
  computed: {
    getPaginateCount() {
      return Math.ceil(this.categories.length / this.categorypaginate.perPage);
    },
    getItems() {
      let start = (this.categorypaginate.currentPage - 1) * this.categorypaginate.perPage;
      let end = this.categorypaginate.currentPage * this.categorypaginate.perPage;
      return this.categories.slice(start, end);
    },

  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);

#loading, #loading2 {
  margin: 50px auto;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(0, 0, 0, .5);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
