<template>
  <div class="card h-100">
    <div class="p-3 pb-0 card-header">
      <div class="row">
        <div class="col-md-8 d-flex align-items-center">
          <h6 class="mb-0">{{ title }}</h6>
        </div>
        <div class="col-md-4 text-end">

        </div>
      </div>
    </div>
    <div class="p-3 card-body">
     <ul class="list-group">
        <li class="pt-0 text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">نام کاربری:</strong> &nbsp;
          {{ info.username }}
        </li>
        <li class="text-sm border-0 list-group-item ps-0">
          <strong class="text-dark">گذرواژه:</strong> &nbsp; {{ info.password }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "ProfileInfoCard",
  components: {
  },
  props: {
    title: {
      type: String,
      default: "",
    },

    info: {
      type: Object,
      username: String,
      password: String,
      default: () => {},
    },
    role: {
      type: Object,
      title: String,

    },
  },
};
</script>
