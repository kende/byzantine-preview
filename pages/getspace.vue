<template>
  <div class="get-space">
    <header class="page-header">
      <Navbar />
    </header>
    <div class="content-wrapper"></div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.get-space {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  flex: 0 0;
  background-color: #1E226B;
  background-image: url('~assets/bk-stars-1.png'), url('~assets/bk-stars-2.png');
  background-size: 100%;
  background-repeat: no-repeat;
}

.content-wrapper {
  flex: 1 1;
}

.footer {
  flex: 0 0;
}
</style>