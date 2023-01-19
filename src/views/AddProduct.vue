<template>
  <div class="py-4 px-5 container rounded-end">
    <!-- Modal -->
    <div class="modal fade"

         id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
         aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">اقدام به حذف عکس محصول</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            آیا از حذف عکس محصول اطمینان دارید؟
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="no" >خیر</button>
            <button type="button" class="btn btn-primary" @click="deleteImage">بله</button>
          </div>
        </div>
      </div>
    </div>
    <!--    modal-->
    <div class="row">
      <div class="col-12 mb-lg-0 mb-4">
        <div class="card">
          <div class="card-body p-3">
            <div class="row">
              <div class="col-lg-6">
                <div class="d-flex flex-row">
                  <h5 class="font-weight-bolder">عکس محصول :</h5>
                </div>
                <div class="d-flex flex-row  w-50 mt-5 me-5">
                  <vsud-button size="lg" color="success" variant="outline"
                               data-bs-toggle="modal" data-bs-target="#staticBackdrop" v-if="!upload">تغییر عکس محصول</vsud-button>
                </div>
              </div>
              <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">

                <div class="border-radius-lg ">
                  <div class="position-relative d-flex align-items-center justify-content-center h-100">

                    <div class="mb-4 col-xl-6 col-md-12 mx-md-2 mb-xl-0" v-if="upload" @click="uploadFake">
                      <input type="file" id="img" name="img" accept="image/*" style="opacity: 0;" @change="loadFile">
                      <place-holder-card
                          :title="{ text: uploadImg ? 'لطفا شکیبا باشید.' :'بارگذاری عکس محصول', variant: 'h5' }"
                      />
                    </div>
                    <img v-else
                         width="500"
                         height="300"
                         class="w-100 position-relative z-index-2"
                         :src="'https://api.photomimmarket.com/public'+imgshowpath"
                         :alt="product.name"
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
          <h6 class="mb-0 p-2">نام محصول :</h6>
        </div>
        <input type="text" class="form-control " placeholder="نام محصول" v-model="product.name"
               title="نام محصول"/>

      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">قیمت محصول :</h6>
        </div>
        <input type="text" class="form-control " placeholder="نام محصول" v-model="product.price"
               title="قیمت محصول"/>

      </div>
      <div class="col-md-4 col-12">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">دسته بندی محصول :</h6>
        </div>
        <select class="form-select text-start " aria-label="Default select example" v-model="category">
          <option v-for="(c,i) in categories" :key="i" :value="c.id">{{c.title}}</option>
        </select>
      </div>
    </div>

    <div class="row py-2">
      <div class="col-12" >
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">توضیحات محصول :</h6>
        </div>
        <div class="example" >
          <QuillEditor  id="product_create"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        :modules="modules"
                        ref="myQuillEditor"
                        placeholder="توضیحات محصول" class="editor" theme="snow" v-model="product.description"/>
        </div>
      </div>
      <div class="col-12 my-3 py-4 px-2">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">محتویات محصول :</h6>
        </div>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"
                  v-model="product.ingredients"></textarea>
      </div>
      <div class="col-12 my-3 py-4 px-2">
        <div class="d-flex align-items-center">
          <h6 class="mb-0 p-2">مبدا محصول :</h6>
        </div>
        <textarea class="form-control" id="exampleFormControlTextarea2" rows="5"
                  v-model="product.origins"></textarea>
      </div>
    </div>

    <div class="row pt-5">
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold">
          <vsud-button
              style="border: none;font-size: 16px"
              @click="$router.push('/products')"
              size="lg"
              variant="outline"
              color="dark"> <i class="bi bi-arrow-return-right"></i>
            بازگشت به محصولات

          </vsud-button>

        </div>
        <div class="font-weight-bold">
          <vsud-button
              @click="create"
              style="font-size: 18px"
              size="lg"
              color="success"
              :disabled="isCreating" :loading="isCreating">
            {{isCreating ? 'در حال ثبت  ...' : 'ثبت '}}
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
import BlotFormatter from "quill-blot-formatter";

export default {
  name: "AddProduct",
  components: {
    PlaceHolderCard,
    VsudButton,
  },
  data()
  {
    return{
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
            ['table', 'column-left', 'column-right', 'row-above', 'row-below', 'row-remove', 'column-remove'],
            ['link', 'image', 'video']
          ],
        },
      },
      module: BlotFormatter,
      isCreating:false,
      id:this.$route.params.id,
      product:{
        name:'',
        category_id:'',
        image:'',
        description:'',
        ingredients:'',
        slug:'',
        origins:'',
        price:'',
      },
      imgshowpath:'/storage/',
      categories:[],
      category:'',
      upload:true,
      tmp:'',
    }
  },
  async created() {
    const cat= await HTTP.get(`/category`)

    this.categories = cat.data.data.categories
  },
  methods:{
    onEditorBlur(quill) {
      this.product.description = quill.value.innerHTML
    },
    async create(){
      this.isCreating = true

      if(this.product.name.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "نام محصول الزامیست!",
          type: 'error',
        });

      }
      if(this.product.image.trim() === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "عکس محصول الزامیست!",
          type: 'error',
        });

      }
      if(this.category === '') {
        this.isCreating = false
        return  this.$notify({
          title: "خطا",
          text: "دسته بندی محصول الزامیست!",
          type: 'error',
        });

      }
      this.product.description = this.$refs.myQuillEditor.getHTML();
      const data = {
        name:this.product.name,
        image:this.product.image,
        category_id : this.category,
        description: this.product.description,
        ingredients : this.product.ingredients,
        origins : this.product.origins,
        price : this.product.price,
        slug : this.product.slug
      }
      const res = await HTTP.post( '/product/', data);
      if(res.status===200){
        this.$notify({
          title: "عملیات موفق!",
          text: res.data,
          type: 'success',
        });
      }
      else {
        this.isCreating = false
        return this.$notify({
          title: "عملیات ناموفق!",
          text:"خطا در ایجاد محصول",
          type: 'error',
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
        document.getElementById('no').click();
        this.$notify({
          title: "عملیات موفق!",
          text: deleteUploaded.data.msg,
          type: 'success',
        });
        this.upload = true
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
    },
    uploadFake()
    {
      document.getElementById('img').click()
    },
    async loadFile(event)
    {
      this.isCreating = true;
      this.uploadImg = true
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      formData.append("location", '/public/products/');
      const upload =  await HTTP.post('/upload',formData)
          .catch(()=>{
            this.$notify({
              title: "عملیات ناموفق!",
              text: 'خطایی رخ داد. ',
              type: 'error',
            });
            this.uploadImg = false
            this.isCreating = false
          });
      if (upload.status === 200)
      {
        this.product.image = upload.data.replace('/public/','');
        this.imgshowpath = this.imgshowpath.concat(this.product.image)
        this.$notify({
          title: "عملیات موفق!",
          text: "لطفا برای ثبت عکس روی ثبت تغییرات کلیک کنید. ",
          type: 'success',
        });
        this.upload = false
      }
      else {
        this.$notify({
          title: "عملیات ناموفق!",
          text: upload.data.errors.message,
          type: 'error',
        });

      }
      this.uploadImg = false
      this.isCreating = false
    },
  },
  mounted()
  {
    // console.log('this is current quill instance object', this.editor)
    // const permissions = JSON.parse(localStorage.getItem('rgtokuukqp'));
    // for (let i in permissions)
    // {
    //   if (permissions[i].module.name === 'محصولات'){
    //     if (permissions[i].create === 0) return window.location = '/'
    //   }
    // }
    // if (!localStorage.getItem('vqmgp')) window.location = '/sign-in';
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill && this.$refs.myQuillEditor2.quill;
    }
  },
}
</script>
<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #101010;
}

input:focus + .slider {
  box-shadow: 0 0 1px #101010;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
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
