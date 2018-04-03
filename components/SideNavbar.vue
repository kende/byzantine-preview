<template>
  <ul class="side-navbar">
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'start' }">
      <nuxt-link to='/spacequest/start'>Origin</nuxt-link>
    </li>
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'getstarted' }">
      <nuxt-link to='/spacequest/start/getstarted'>Get Started</nuxt-link>
    </li>
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'detail' }">
      <nuxt-link to='/spacequest/start/detail'>The Details</nuxt-link>
    </li>
    <li class="side-nav-item" v-bind:class="{ active: currPage === 'next' }">
      <nuxt-link to='/spacequest/start/next'>What's Next?</nuxt-link>
    </li>
    <!-- <li class="side-nav-item" v-bind:class="{ active: currPage === 'startquest-FAQ' }">
      <nuxt-link to='/spacequest/start/FAQ'>FAQ</nuxt-link>
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
  methods: {
    setRouteName () {
      this.currPage = $nuxt.$route.name.replace('spacequest-', '').replace('start-', '')
    }
  },
  mounted () {
    this.setRouteName()
  },
  watch: {
    '$nuxt.$route' () {
      this.setRouteName()
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
