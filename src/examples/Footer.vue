<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between font-weight-bolder">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="this.$store.state.isRTL ? 'text-lg-start' : 'text-lg-start'">
            تمامی حقوق این وبسایت متعلق به
            <a
              href="http://localhost:3000"
              class="font-weight-bold"
              target="_blank"
              >بهارنارنج</a
            >
            می باشد.
          </div>
        </div>
        <div class="col-lg-6">
          <div
              class="text-sm text-center copyright text-muted"
              :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'">

            {{ new Date().getFullYear() }}©
          </div>
  <!--          <ul-->
  <!--            class="nav nav-footer justify-content-center justify-content-lg-end"-->
  <!--          >-->
  <!--            <li class="nav-item">-->
  <!--              <a-->
  <!--                href="https://www.creative-tim.com"-->
  <!--                class="nav-link text-muted"-->
  <!--                target="_blank"-->
  <!--                >Creative Tim</a-->
  <!--              >-->
  <!--            </li>-->
  <!--            <li class="nav-item">-->
  <!--              <a-->
  <!--                href="https://www.creative-tim.com/presentation"-->
  <!--                class="nav-link text-muted"-->
  <!--                target="_blank"-->
  <!--                >About Us</a-->
  <!--              >-->
  <!--            </li>-->
  <!--            <li class="nav-item">-->
  <!--              <a-->
  <!--                href="https://www.creative-tim.com/blog"-->
  <!--                class="nav-link text-muted"-->
  <!--                target="_blank"-->
  <!--                >Blog</a-->
  <!--              >-->
  <!--            </li>-->
  <!--            <li class="nav-item">-->
  <!--              <a-->
  <!--                href="https://www.creative-tim.com/license"-->
  <!--                class="nav-link pe-0 text-muted"-->
  <!--                target="_blank"-->
  <!--                >License</a-->
  <!--              >-->
  <!--            </li>-->
  <!--          </ul>-->
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
