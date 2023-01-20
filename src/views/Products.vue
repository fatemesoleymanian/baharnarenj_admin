<template>

  <div class="card mb-4 mt-5">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف محصول</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف این محصول اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteProduct">بله</button>
          </div>
        </div>
      </div>
    </div>

    <!--    modal-->
    <div class="card-header pb-0">
      <h6>جدول محصولات فروشگاه</h6>
    </div>
    <div class="col-6 text-start px-5 py-3 me-auto">
      <vsud-button color="dark" size="md" @click="$router.push('/product/new')">افزودن محصول</vsud-button>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div id="loading" v-if="loader"></div>
      <div class="table-responsive p-0" v-if="!loader">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              نام محصول
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              دسته بندی
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
          <tr v-for="(u, i) in getItems" :key="i">
            <td>
              <div class="d-flex  py-1">
                <div>
                  <vsud-avatar
                      :img="'https://api.photomimmarket.com'+u.image"
                      size="sm"
                      border-radius="md"
                      class="mx-2"
                      :alt="u.name"
                  />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ u.name }}</h6>
                </div>
              </div>
            </td>
            <td>
              <router-link to="/categories">
                <p class="text-xs font-weight-bold mb-0">{{ u.category.title }}</p>
              </router-link>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                >{{ u.created_at }}</span
                >
            </td>
            <td class="align-middle text-center text-sm">
              <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"
                          data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                          @click="productToDel=u;index=i;" v-if="remove">حذف
              </vsud-badge>
              <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"
                          @click="$router.push(`/product/details${u.id}`)">
                جزئیات
              </vsud-badge>
              <button hidden id="hiddenButtonForCheckModel" data-bs-target="#model-check" data-bs-toggle="modal">
              </button>
              <button hidden id="hiddenButtonForCheckState" data-bs-target="#state-check" data-bs-toggle="modal"></button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div v-if="getPaginateCount > 1 " class="px-4 py-3 d-flex float-start">
        <pagination class="pro-pagination-style shop-pagination mt-30 "
                    v-model="product.currentPage" :per-page="product.perPage"
                    :records="products.length" @paginate="paginateClickCallback"
                    :page-count="getPaginateCount"/>
      </div>
    </div>

  </div>
</template>
<script>
import {HTTP} from "../http-common";
import VsudBadge from "../components/VsudBadge";
import VsudButton from "../components/VsudButton";
import VsudAvatar from "../components/VsudAvatar";

export default {
  components: {VsudAvatar, VsudButton, VsudBadge},
  data() {
    return {
      remove: 1,
      products: [],
      productToDel: '',
      index: 0,
      hide: 1,
      product: {
        currentPage: 1,
        perPage: 5
      },
      loader: false,
      models: [],
      states: [],
      chosen_product:'',
      data: {
        model_id: '',
        product_id:'',
        discount:''
      },
      tmp:'',
      newStateName:'',
      newStateCost:'',
      newStateOff:'',
      costs:[],
      final_states:[],
      off:[],
      ids:[],
    }
  },
  async mounted() {
    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get('products')
          .catch((e) => {
            if (e.status === 500) {
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              window.location = '/sign-in'
            }
          })
          .then((products) => {
            console.log(products)
            this.products = products.data.data.products;
            this.loader = false
          });
    }
  },
  methods: {
    async deleteProduct() {

      const delet = await HTTP.delete(`/product/${this.productToDel.id}`)
      if (delet.status === 200) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: "محصول با موفقیت حذف گردید!",
          type: 'success',
        });
        this.products.splice(this.index, 1)
      } else {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در حذف محصول",
          type: 'error',
        });
      }
    },
    paginateClickCallback(page) {
      this.product.currentPage = Number(page);
    },

    },
    computed: {
      getPaginateCount() {
        return Math.ceil(this.products.length / this.product.perPage);
      },
      getItems() {
        let start = (this.product.currentPage - 1) * this.product.perPage;
        let end = this.product.currentPage * this.product.perPage;
        return this.products.slice(start, end);
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
