<template>
  <nav class="navbar">
    <div class="nav-item"><a href="http://byzantine.network/"><img class="logo" src="../assets/Byzantine-logo-yellow.png" alt="Byzantine logo"></a></div>
    <div class="item-group">
      <!-- <div class="nav-item" v-if="currPage && !currPage.includes('spacequest')"><nuxt-link to="/spacequest">HOME</nuxt-link></div> -->
      <!-- <div class="nav-item" v-if="currPage && !currPage.includes('startquest')"><nuxt-link to="/startquest">START QUEST</nuxt-link></div> -->
      <!-- <div class="nav-item" v-if="currPage && !currPage.includes('getspace')"><nuxt-link to="/getspace">GET SPACE</nuxt-link></div> -->
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      currPage: null
    }
  },
  mounted () {
    this.currPage = $nuxt.$route.name
    console.log('navbar', this.currPage)
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  top: 0;
  padding:  0 24px;
  height: 10vh;
  line-height: 10vh;
}
.navbar a {
  color: #e0e0e0;
  text-decoration: none;
}
.logo {
  margin: 2vh 0;
  height: 6vh;
}
.item-group {
  display: flex;
}
.item-group .nav-item {
  margin-left: 20px;
}
.item-group .nav-item:hover {
  text-decoration: underline;
}
.nav-item a {
  border-radius: 2px;
}

@media (max-width: 424px) {
  .navbar {
    padding: 0 8px;
    height: 50px;
    line-height: 50px;
  }
  .logo {
    flex: 1;
    margin: 10px 0;
    height: 40px;
  }
  .item-group {
    flex: none;
  }
  .item-group .nav-item {
    margin: 10px 0 0 10px;
    height: 60px;
    font-size: .8em;
  }
}
</style>