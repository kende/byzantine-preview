<template>
  <ul class="side-navbar">
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'startquest' }">
      <nuxt-link to='/startquest'>Origin</nuxt-link>
    </li>
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'startquest-getstarted' }">
      <nuxt-link to='/startquest/getstarted'>Get Started</nuxt-link>
    </li>
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'startquest-marketplace' }">
      <nuxt-link to='/startquest/marketplace'>The Details</nuxt-link>
    </li>
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'startquest-collect' }">
      <nuxt-link to='/startquest/collect'>What's Next?</nuxt-link>
    </li>
    <!-- <li class="side-nav-item" v-bind:class="{ active: currPage === 'startquest-FAQ' }">
      <nuxt-link to='/startquest/FAQ'>FAQ</nuxt-link>
    </li> -->
  </ul>
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
    console.log(this.currPage)
  },
  watch: {
    '$nuxt.$route' () {
      this.currPage = $nuxt.$route.name
    }
  }
}
</script>

<style scoped>
.side-navbar {
  width: 100%;
}
.side-nav-item {
  margin: 20px;
}
.side-nav-item a {
  font-family: "rational-light", sans-serif;
  font-weight: 600;
  color: #bdbdbd;
  line-height: 1.6em;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: .1em;
  transition: color .6s;
}
.side-nav-item.active a {
  color: #f86bcf;
}

@media (max-width: 767px) {
  .side-nav-item {
    margin: 10px;
  }
  .answer {
    margin: 30px auto;
  }
}
</style>
