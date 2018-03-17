<template>
  <div class="start-quest">
    <header class="page-header">
      <Navbar />
    </header>
    <div class="content-wrapper">
      <div class="side-nav">
        <SideNavbar />
      </div>
      <div class="content">
        <div class="description">
          <nuxt-child />
        </div>
        <div class="purchase">
          <h5 class="section-title">Space is limited.</h5>
          <h5 class="section-title">Discover yours now.</h5>
          <div class="purchase-text">Launching March 21, 2018</div>
          <div class="purchase-text purchase-pink">Space Quest Badge</div>
          <div class="purchase-text"><small class="purchase-small">Limited 10K Token release</small></div>
          <div class="purchase-btn"><button>Buy</button></div>
        </div>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import SideNavbar from '~/components/SideNavbar.vue'

export default {
  components: {
    Navbar,
    SideNavbar,
    Footer,
  }
}

</script>

<style scoped>
.start-quest {
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
  display: flex;
  margin: 0 auto;
  padding:  60px 0;
  width: 100%;
  max-width: 1000px;
}
.side-nav {
  flex: none;
  width: 30%;
  font-size: .8em;
  word-spacing: .1em;
}

.content {
  flex: 1;
  margin:  20px;
  margin-left: 0;
}
.description {
  border-bottom: 2px solid #eee;
}

.purchase {
  padding: 40px 0;
  background: #fff;
  font-family: "rational-light", sans-serif;
}
.section-title {
  font-family: "arame-regular", sans-serif;
  font-size: 1.8em;
  letter-spacing: .2em;
  text-transform: uppercase;
}
.purchase-text {
  margin: 10px 0;
  font-size: 1.3em;
}
.section-title + .purchase-text {
  margin-top: 40px;
}
.purchase-pink {
  color: #f86bcf;
  text-transform: uppercase;
  letter-spacing: 4px;
}
.purchase-small {
  font-size: .6em;
}
.purchase-btn button {
  margin: 40px 0 80px;
  height: 50px;
  min-width: 200px;
  background: #f86bcf;
  border: none;
  font-family: "arame-regular", sans-serif;
  font-size: 1.2em;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
}

.footer {
  flex: 0 0;
}
</style>