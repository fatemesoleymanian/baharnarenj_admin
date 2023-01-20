<template>
  <div class="py-4 px-5 container rounded-end">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف عکس </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف عکس پست اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteImage">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div id="loading" v-if="loader"></div>
    <div class="row" v-if="!loader" >
      <div class="col-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-row">
                  <h5 class="font-weight-bolder">عکس  :</h5>
                </div>
                <div class="d-flex flex-row  w-50 mt-5 me-5">
                  <vsud-button size="lg" color="success" variant="outline"
                               data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-if="!upload">تغییر عکس </vsud-button>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">

                <div class="border-radius-lg ">
                  <div class="position-relative d-flex align-items-center justify-content-center h-100">

                    <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                      <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                      <place-holder-card
                          :title="{ text :uploadImg ? 'لطفا شکیبا باشید.' : loading ? '...لطفا صبر کنید': 'بارگذاری عکس ', variant: 'h5' }"
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
    <div class="row py-5" v-if="!loader" >
      <div class="col-md-6 col-12 ">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">تیتر  :</h6>
        </div>
        <input type="text" class="form-control " placeholder="تیتر" v-model="post.title"
               title="تیتر"/>

      </div>
      <div class="col-md-6 col-12 ">
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
    <div class="row py-2" v-if="!loader" >
      <div class="col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">متن پست :</h6>
        </div>
        <div class="example">
          <QuillEditor  id="post_create"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        :modules="modules"
                        ref="myQuillEditor"
                        placeholder="متن پست" class="editor" theme="snow"
                        v-model:content="post.text" contentType="html"/>
        </div>
      </div>
    </div>
    <div class="row py-3 my-2 px-1" v-if="!loader" >
      <div class="d-flex align-items-center">
        <h4 class="mb-0 p-2 font-weight-bolder">سئو</h4>
      </div>
      <hr class="bg-dark text-dark " style="width: 100%;height: 2px">
      <div class="col-md-6 col-12 py-3">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">نشانک:</h6>
        </div>
        <input type="text" class="form-control " placeholder="عنوان صفحه به انگلیسی" v-model="post.slug"
              />
      </div>

    </div>
    <div class="row pt-5" v-if="!loader" >
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          <span class="text-muted" style="font-size: 14px">
            ثبت محصول در تاریخ : {{post.created_at}}
          </span>
        </div>
        <div class="font-weight-bold">
            <span class="text-muted" style="font-size: 14px">
            ویرایش محصول در تاریخ : {{post.updated_at}}
          </span>
        </div>
      </div>
    </div>
    <div class="row pt-5" v-if="!loader" >
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          <vsud-button
              style="border: none;font-size: 16px"
              @click="$router.push('/posts')"
              size="lg"
              variant="outline"
              color="dark"> <i class="bi bi-arrow-return-right"></i>
            بازگشت به وبلاگ

          </vsud-button>

        </div>
        <div class="font-weight-bold">
          <vsud-button
              @click="update"
              style="font-size: 18px"
              size="lg"
              color="success"
              :disabled="isCreating" :loading="isCreating">
            {{isCreating ? 'در حال ثبت تغییرات ...' : 'ثبت تغییرات'}}
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
import BlotFormatter from "quill-blot-formatter";

export default {
  name: "PostDetails",
  components: {VsudBadge, PlaceHolderCard, VsudButton},
  data()
  {
    return{
      content:'',
      uploadImg:false,
      editorOption: {
        // debug: 'info',
        readOnly: false,
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            ['clean'],
            ['link', 'image', 'video']
          ],
        },
      },
      module: BlotFormatter,
      isCreating:false,
      id:this.$route.params.id,
      post:'',
      upload:false,
      tag:'',
      loading:false,
      loader:false,
      imgshowpath:''
      }
  },
  async mounted(){

    if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
    else {
      this.loader = true
      await HTTP.get(`/post/${this.id}`)
          .catch((e)=>{
            if(e.response.status ===500){
              localStorage.removeItem('wugt');
              localStorage.removeItem('vqmgp');
              window.location = '/sign-in'
            }
          })
          .then((post)=> {
            this.post = post.data.data.post
            this.imgshowpath = this.post.image
            this.loader = false

          });
    }
  },
  methods:{
    onEditorBlur(quill) {
      console.log(quill.value.innerHTML)
    },

    async update(){
      this.isCreating = true
      let tags = [] ;
      for (let i in this.post.tags)
      {
        tags.push(this.post.tags[i].title)
      }
       this.post.text = this.$refs.myQuillEditor.getHTML();
      this.post.image = this.post.image.replace('/storage/','');

      const updated_data = {
        title:this.post.title,
        image:this.post.image,
        tags : tags,
        text:this.post.text,
        slug:this.post.slug
      }

      const res = await HTTP.put( `/post/${this.post.id}`, updated_data).catch(()=>{
        this.isCreating = false
        this.$notify({
          title: "عملیات ناموفق!",
          text:"خطا در ایجاد محصول",
          type: 'error',
        });
      });
      if(res.status===200){
        this.$notify({
          title: "عملیات موفق!",
          text: res.data.msg,
          type: 'success',
        });
      }
      this.isCreating = false
    },
    async deleteImage()
    {
      this.isCreating = true;
      const data = {
        imageName : this.imgshowpath
      }
      const deleteUploaded = await HTTP.post('/remove_upload',data);
      if (deleteUploaded.data.success === 1) {
        this.$notify({
          title: "عملیات موفق!",
          text: deleteUploaded.data,
          type: 'success',
        });
        this.isCreating = false
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: deleteUploaded.data.msg,
          type: 'error',
        });
        this.isCreating = false
      }
      document.getElementById('no').click();

      this.upload = true
      this.isCreating = false
    },
    uploadFake()
    {
      document.getElementById('img').click()
    },
    async loadFile(event)
    {
      this.isCreating = true;
      this.uploadImg = true
      this.loading = true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", '/public/posts/');
      const upload =  await HTTP.post('/upload',formData).catch(()=>{
        this.$notify({
          title: "عملیات ناموفق!",
          text: upload.data.errors.message,
          type: 'error',
        });
        this.uploadImg = false
        this.isCreating = false
      });


      if (upload.status === 200)
      {
        this.post.image = upload.data.replace('/public/','');
        this.imgshowpath = '/storage/app'.concat(upload.data)
        this.$notify({
          title: "عملیات موفق!",
          text: "لطفا برای ثبت عکس روی ثبت تغییرات کلیک کنید. ",
          type: 'success',
        });
        this.upload = false
        this.loading=false
      }
      this.uploadImg = false
      this.isCreating = false
    },
    dropTag(id)
    {
      this.post.tags = this.post.tags.filter(function(ele){
        return ele.title !== id.title
      });
      console.log(this.post.tags)
    },
    addTag()
    {
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
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  }
}
</script>
<style lang="scss" scoped>


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
