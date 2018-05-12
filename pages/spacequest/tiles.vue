<template>
  <div class="tiles">
    <header class="page-header"><Navbar /></header>
    <div id="tileGrid" class="tile-grid"></div>
    <div class="alert-footer"><Footer /></div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
  head () {
    return {
      meta: [
        { hid: 'og_title', property: 'og:title', content: 'Byzantine Space Quest' },
        { hid: 'og_description', property: 'og:description', content: 'An interactive art game exploring space, time, and community.' },
        { hid: 'og_image', property: 'og:image', content: require('~/assets/space_quest_thumbnail.png') },
        { hid: 'og_url', property: 'og:url', content: 'https://byzantine.network/spacequest/' },
        { hid: 'twitter_title', property: 'twitter:title', content: 'Byzantine Space Quest' },
        { hid: 'twitter_description', property: 'twitter:description', content: 'An interactive art game exploring space, time, and community.' },
        { hid: 'twitter_image', property: 'twitter:image', content: require('~/assets/space_quest_thumbnail.png') },
        { hid: 'twitter_url', property: 'twitter:url', content: 'https://byzantine.network/spacequest/' }
      ]
    }
  },
  mounted () {
    const el = document.getElementById("tileGrid")

      // el.appendChild(childNode)

    for (let i = 0; i < 10000; i++) {
      const childNode = document.createElement("div")
      childNode.className = "hexagons"
      // console.log(childNode)
      el.appendChild(childNode)

    }
  }
}
</script>

<style>
.tiles {
  background: #1E226B;
}
.tile-grid {
  margin: 20px 1vw;
  display: grid;
  grid-template-columns: repeat(98, 1vw);
  grid-template-rows: repeat(412, calc(1vw * .8));
  min-height: 100vh;
}
.hexagons {
  background-color: #F4DF9D;
  grid-column-end: span 2;
  grid-row-end: span 2;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  height: calc(1vw * 2);
  border: 1px solid #1E226B;
}

.hexagons:nth-child(97n + 1) {
  grid-column-start: 2;
}
</style>