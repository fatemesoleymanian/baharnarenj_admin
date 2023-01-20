<template>
  <div class="py-4 px-5 container rounded-end">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف عکس پست</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف عکس پست اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no">خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteImage">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div id="loading" v-if="loader"></div>
    <div class="row">
      <div class="col-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-row">
                  <h5 class="font-weight-bolder">عکس پست :</h5>
                </div>
                <div class="d-flex flex-row  w-50 mt-5 me-5">
<!--                  <vsud-button size="lg" color="success" variant="outline"-->
<!--                               data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-if="!upload">تغییر عکس پست-->
<!--                  </vsud-button>-->
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">

                <div class="border-radius-lg ">
                  <div class="position-relative d-flex align-items-center justify-content-center h-100">

                    <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                      <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                      <place-holder-card
                          :title="{ text: uploadImg ? 'لطفا شکیبا باشید.' : 'بارگذاری عکس پست', variant: 'h5' }"
                      />
                    </div>
                    <img v-else
                         width="500"
                         height="300"
                         class="w-100 position-relative z-index-2"
                         :src="'https://api.photomimmarket.com'+imgshowpath"
                         :alt="post.slug"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row py-5">
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2"> تیتر :</h6>
        </div>
        <input type="text" class="form-control " placeholder="تیتر " v-model="post.title"
               title="تیتر"/>

      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">تگ ها :</h6>
        </div>
        <input type="text" @keyup.enter="addTag" v-model="tag" class="form-control mb-2">
        <div v-for="(t,i) in post.tags" :key="i"  style="display: inline" class="p-2">
          <vsud-badge color="dark" variant="gradient" size="lg"
                      @click="dropTag(t)" style="cursor: pointer;"
                      title="برای حذف تگ روی آن کیک کنید.">{{t.title}}</vsud-badge></div>
      </div>
    </div>
    <div class="row py-2">
      <div class="col-12 ">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">پست :</h6>
        </div>
        <div class="example">
          <QuillEditor id="post_create"
                       :options="editorOption"
                       @blur="onEditorBlur($event)"
                       :modules="modules"
                       ref="myQuillEditor"
                       placeholder="متن پست" class="editor" theme="snow" v-model="post.text"/>
        </div>
      </div>
    </div>
    <div class="row py-3 my-2 px-1">
      <div class="d-flex align-items-center">
        <h4 class="mb-0 p-2 font-weight-bolder">سئو</h4>
      </div>
      <hr class="bg-dark text-dark " style="width: 100%;height: 2px">

      <div class="col-md-6 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">نشانک:</h6>
        </div>
        <input type="text" class="form-control " placeholder="عنوان صفحه به انگلیسی" v-model="post.slug"/>
      </div>

    </div>

    <div class="row pt-5">
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          <vsud-button
              style="border: none;font-size: 16px"
              @click="$router.push('/posts')"
              size="lg"
              variant="outline"
              color="dark"><i class="bi bi-arrow-return-right"></i>
            بازگشت به وبلاگ

          </vsud-button>

        </div>
        <div class="font-weight-bold">
          <vsud-button
              @click="create"
              style="font-size: 18px"
              size="lg"
              color="success"
              :disabled="isCreating" :loading="isCreating">
            {{ isCreating ? 'در حال ثبت  ...' : 'ثبت ' }}
          </vsud-button>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {HTTP} from "../http-common";
import VsudButton from "../components/VsudButton";
import PlaceHolderCard from "../examples/Cards/PlaceHolderCard";
import VsudBadge from "../components/VsudBadge";
import BlotFormatter from 'quill-blot-formatter'

export default {
  name: "AddPost",
  components: {VsudBadge, PlaceHolderCard, VsudButton},
  data() {
    return {
      uploadImg: false,
      editorOption: {
        // debug: 'info',
        readOnly: false,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'direction': 'rtl'}],
            [{'size': ['small', false, 'large', 'huge']}],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'font': []}],
            [{'color': []}, {'background': []}],
            [{align: ''}, {align: 'center'}, {align: 'right'}, {align: 'justify'}],
            ['clean'],
            ['table', 'column-left', 'column-right', 'row-above', 'row-below', 'row-remove', 'column-remove'],
            ['link', 'image', 'video']
          ],
        },
      },
      module: BlotFormatter,
      isCreating: false,
      id: this.$route.params.id,
      post: {
        title: '',
        tags: [],
        image: '',
        text: '',
        slug: '',
      },
      tag: [],
      imgshowpath:'/storage/app',
      upload: true,
      }
  },

  methods: {
    onEditorBlur(quill) {
      this.post.text = quill.value.innerHTML
    },

    async create() {
      this.isCreating = true
      this.post.text = this.$refs.myQuillEditor.getHTML()

      let tags = [] ;
      for (let i in this.post.tags)
      {
        tags.push(this.post.tags[i].title)
      }
      const data = {
        title: this.post.title,
        image: this.post.image,
        tags: tags,
        text: this.post.text,
        slug: this.post.slug
      }
      const res = await HTTP.post('post', data).catch(() => {
        this.isCreating = false
        return this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در ایجاد محصول",
          type: 'error',
        });
      });
      if (res.status === 200) {
        this.$notify({
          title: "عملیات موفق!",
          text: res.data.msg,
          type: 'success',
        });
      } else {
        this.isCreating = false
        this.$notify({
          title: "عملیات ناموفق!",
          text: "خطا در ایجاد محصول",
          type: 'error',
        });
      }
      this.isCreating = false
    },
    async deleteImage() {
      this.isCreating = true
      const data = {
        imageName: this.imgshowpath
      }
      const deleteUploaded = await HTTP.post('/remove_upload', data)
          .catch(() => {
            this.$notify({
              title: "عملیات ناموفق!",
              text: deleteUploaded.data.msg,
              type: 'error',
            });
            this.isCreating = false
          });
      if (deleteUploaded.status === 200) {
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: deleteUploaded.data,
          type: 'success',
        });
        this.upload = true
      } else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: deleteUploaded.data.msg,
          type: 'error',
        });
      }
      this.isCreating = false
      this.upload = true
    },
    uploadFake() {
      document.getElementById('img').click()
    },
    async loadFile(event) {
      this.isCreating = true
      this.uploadImg = true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", '/public/posts/');
      const upload = await HTTP.post('/upload', formData)
          .catch(() => {
            this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطایی رخ داد. ',
              type: 'error',
            });
            this.uploadImg = false
            this.isCreating = false
          });

      if (upload.status === 200) {
        this.post.image = upload.data.replace('/public/','');
        this.imgshowpath = this.imgshowpath.concat(upload.data)
        this.$notify({
          title: "عملیات موفق!",
          text: "لطفا برای ثبت عکس روی ثبت تغییرات کلیک کنید. ",
          type: 'success',
        });
        this.upload = false
      } else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: upload.data,
          type: 'error',
        });

      }
      this.uploadImg = false
      this.isCreating = false
    },
    dropTag(id) {
      this.post.tags = this.post.tags.filter(function(ele){
        return ele.title !== id.title
      });
      console.log(this.post.tags)
    },
    addTag() {
      if (this.tag.trim() !== ''){
        let flag = false

        for (let i in this.post.tags) {
          if (this.post.tags[i].title === this.tag) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          this.post.tags.push({'title': this.tag});
          this.tag = ''
        }
        console.log(this.post.tags)
      }

   },
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)

    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
}
</script>
<style lang="scss" scoped>
.example {
  display: flex;
  flex-direction: column;
  background: white;

  .editor {
    height: 80rem;
    text-align: right;
    float: right;
    overflow: hidden;
  }

  .output {
    width: 100%;
    height: 20rem;
    margin: 0;
    border: 1px solid #ccc;
    overflow-y: auto;
    resize: vertical;

    &.code {
      padding: 1rem;
      height: 16rem;
    }

    &.ql-snow {
      border-top: none;
      height: 24rem;
    }
  }
}
</style>
