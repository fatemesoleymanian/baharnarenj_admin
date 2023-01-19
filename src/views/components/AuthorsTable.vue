<template>
  <div class="card mb-4">
<!--    &lt;!&ndash; Modal &ndash;&gt;-->
<!--    <div class="modal fade"-->

<!--         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">-->
<!--      <div class="modal-dialog">-->
<!--        <div class="modal-content">-->
<!--          <div class="modal-header">-->
<!--            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف کاربر</h5>-->
<!--            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--          </div>-->
<!--          <div class="modal-body">-->
<!--            آیا از حذف کاربر اطمینان دارید؟-->
<!--          </div>-->
<!--          <div class="modal-footer">-->
<!--            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>-->
<!--            <button type="button" class="btn btn-primary" @click="deleteUser">بله</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--&lt;!&ndash;    modal&ndash;&gt;-->
<!--    <div class="card-header pb-0">-->
<!--      <h6>جدول کاربران فروشگاه</h6>-->
<!--    </div>-->
<!--    <div class="card-body px-0 pt-0 pb-2">-->
<!--      <div class="table-responsive p-0">-->
<!--        <table class="table align-items-center mb-0">-->
<!--          <thead>-->
<!--            <tr>-->
<!--              <th-->
<!--                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"-->
<!--              >-->
<!--                نام و نام خانوادگی-->
<!--              </th>-->
<!--              <th-->
<!--                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"-->
<!--              >-->
<!--                شماره تلفن همراه-->
<!--              </th>-->
<!--              <th-->
<!--                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"-->
<!--              >-->
<!--                اقدامات-->
<!--              </th>-->
<!--              <th-->
<!--                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"-->
<!--              >-->
<!--                تاریخ ساخت حساب-->
<!--              </th>-->
<!--            </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--            <tr  v-for="(u, i) in users" :key="i" >-->
<!--              <td>-->
<!--                <div class="d-flex px-2 py-1">-->
<!--                  <div>-->
<!--                    <vsud-avatar-->
<!--                      :img="img1"-->
<!--                      size="sm"-->
<!--                      border-radius="lg"-->
<!--                      class="me-3"-->
<!--                      :alt="u.name"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="d-flex flex-column justify-content-center">-->
<!--                    <h6 class="mb-0 text-sm">{{u.name}}</h6>-->
<!--                    <p class="text-xs text-secondary mb-0">-->
<!--                      {{u.email}}-->
<!--                    </p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </td>-->
<!--              <td>-->
<!--                <p class="text-xs font-weight-bold mb-0">{{u.phone_number}}</p>-->
<!--              </td>-->
<!--              <td class="align-middle text-center text-sm ">-->
<!--                <vsud-badge color="dark" variant="gradient" size="lg" style="cursor:pointer"-->
<!--                 data-bs-toggle="modal" data-bs-target="#staticBackdrop"-->
<!--                            @click="userToDel=u" v-if="remove"-->
<!--                  >حذف </vsud-badge-->
<!--                >-->
<!--                  <vsud-badge color="success" variant="gradient" size="lg" style="cursor:pointer"-->
<!--                  @click="$router.push(`/users/details${u.id}`)"-->
<!--                  >جزئیات</vsud-badge-->
<!--                >-->
<!--              </td>-->
<!--              <td class="align-middle text-center">-->
<!--                <span class="text-secondary text-xs font-weight-bold"-->
<!--                  >{{u.created_at}}</span-->
<!--                >-->
<!--              </td>-->

<!--            </tr>-->
<!--          </tbody>-->
<!--        </table>-->
<!--      </div>-->
<!--      <vsud-pagination class="my-3 float-start  mx-5" color="success" size="sm">-->
<!--        <vsud-pagination-item v-for="(e,i) in paginate" :key="i" v-show="hide"-->
<!--                              :label="checkLabel(e.label)" :active="e.active" @click="updateBlogs(e.label)"/>-->
<!--      </vsud-pagination>-->
<!--    </div>-->

  </div>
</template>

<script>
// import VsudAvatar from "@/components/VsudAvatar.vue";
// import VsudBadge from "@/components/VsudBadge.vue";
// import img1 from "../../assets/img/team-2.jpg";
// import { HTTP } from '../../http-common';
// import VsudPagination from "../../components/VsudPagination";
// import VsudPaginationItem from "../../components/VsudPaginationItem";


export default {
  // props:['users','remove','paginate'],
  // name: "authors-table",
  // data() {
  //   return {
  //     img1,
  //     userToDel:'',
  //     hide:1
  //   };
  // },
  // components: {
  //   VsudPaginationItem,
  //   VsudPagination,
  //   VsudAvatar,
  //   VsudBadge,
  // },
  // methods:{
  //   async deleteUser()
  //   {
  //     const data = {
  //       id : this.userToDel.id
  //     }
  //     const delet = await HTTP.delete('/delete_acc',{data})
  //    if (delet.status === 200)
  //    {
  //     document.getElementById('no').click();
  //     this.$notify({
  //       title: "عملیات موفق!",
  //       text: "کاربر با موفقیت حذف گردید!",
  //       type: 'success',
  //     });
  //
  //     window.location = '/users'
  //    }
  //    else {
  //      document.getElementById('no').click();
  //      this.$notify({
  //        title: "عملیات ناموفق!",
  //        text: "خطا در حذف کاربر",
  //        type: 'error',
  //      });
  //    }
  //   },
  //   async updateBlogs(page) {
  //     const user= await HTTP.get(`/users?page=${page}`)
  //         .catch(() => {
  //           return this.$notify({
  //             title: "خطا!",
  //             text: "خطایی در نمایش اطلاعات جدول رخ داد!",
  //             type: 'error',
  //           });
  //         });
  //
  //   },
  //   checkLabel(label) {
  //     if (label === 'Next &raquo;') {
  //       return this.hide = 0
  //     }
  //     else if (label === '&laquo; Previous') {
  //       return this.hide= 0
  //     }
  //     else {
  //       this.hide = 1
  //       return label
  //     }
  //   }
  // }
};
</script>
