<template>
  <div class="home-page">
    <div class="container">
      <div class="page-content">
        <div class="page-header">
          <!--<img class="geode-logo" src="~assets/geode-logo.png" alt="geode logo">-->
          <div>BYZANTINE</div>
        </div>
        <div class="page-slogans">
          <div class="slogan">A polychain cryptoeconomic network for shared discovery, creativity, and gameplay in any environment</div>
        </div>
        <div class="gallery-img-mobile">
          <img src="~assets/byzantine-bk.png" alt="byzantine background">
        </div>
        <div class="page-footer">
          <div class="copyright">
            <div class="byzantine-thing">Byzantine Inc. 2018</div>
          </div>
        </div>
      </div>
      <div class="gallery-image">
        <img src="~assets/byzantine-bk.png" alt="gallery images">
      </div>
    </div>
  </div>
</template>

<script>
// import AppLogo from '~/components/AppLogo.vue'

// export default {
//   components: {
//     AppLogo
//   }
// }
</script>

<style scoped>
.container {
  display: flex;
}

.page-content {
  flex: 1 1 auto;
  padding: 24px;
}
.geode-logo {
  height: 50px;
}
.page-slogans {
  padding: 24px 0;
  font-size: 3.4vw;
}

.input-group {
  display: flex;
  margin: 20px 0 50px;
  width: 100%;
  max-width: 400px;
}
.input-group input[type=email] {
  flex: 1 1 auto;
  vertical-align: top;
  margin-right: -1px;
  padding: 16px;
  margin-top: 10px;
  height: 40px;
  width: 280px;
  border: 1px solid #616161;
}
.input-group button {
  flex: 0 0 auto;
  vertical-align: top;
  height: 40px;
  width: 120px;
  margin-top: 10px;
  background: linear-gradient(45deg, #b1fdd8, #96f3ff, #c7b0fd, #f3cbe4);
  border: 1px solid #616161;
}
.input-group input[type=submit] {
  height: 100%;
  width: 100%;
  background: transparent;
  border: 0;
  font-family: "Avenir Next", Arial, Helvetica, sans-serif;
  font-size: 1.2em;
  font-weight: 500;
  color: #5a5a5a;
  letter-spacing: 3px;
}

.gallery-img-mobile {
  display: none;
  margin-left: -24px;
  margin-right: -24px;
}
.gallery-img-mobile img {
  width: 100%;
}

.app-info-wrapper {
  position: relative;
  z-index: 1;
  margin-left: -24px;
  margin-top: 18px;
  padding: 24px;
}
.app-info-wrapper:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(45deg, #b1fdd8, #96f3ff, #c7b0fd, #f3cbe4);
  opacity: .4;
}
.app-info {
  position: relative;
}
.paragraph {
  padding: 16px 0;
  line-height: 1.4em;
}
.paragraph .linebreak {
  display: block;
}
.paragraph a{
  text-decoration: none;
}
.highlight {
  color: #f466ac;
}
.byzantine-thing {
  padding-top: 30px;
}
.byzantine-thing a {
  text-decoration: none;
}
.creativecommons {

}
.creativecommons a {
  text-decoration: none;
}
.credits {

}
.credits a {
  text-decoration: none;
}
.app-info .line {
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
}

.media-list {
  margin-top: 24px;
  margin-bottom: 10px;
  padding: 0;
  list-style: none;
}
.media-list li {
  display: inline-block;
  vertical-align: top;
  margin-right: 16px;
  height: 40px;
}
.media-list img {
  height: 100%;
}
.copyright {
  font-size: .7em;
  color: #bdbdbd;
}

.gallery-image {
  flex: 0 0 auto;
  height: 100vh;
  overflow: hidden;
}
.gallery-image img {
  height: 100%;
}

@media (max-width: 940px) {
  .page-slogans {
    font-size: 6vw;
  }
  .gallery-img-mobile {
    display: block;
  }
  .app-info-wrapper {
    margin-right: -24px;
  }
  .gallery-image {
    display: none;
  }
}
@media (max-width: 786px) {
  .page-slogans {
    font-size: 7vw;
  }
  .slogan {
    display: inline;
  }
}
@media (max-width: 683px) {
  .page-slogans {
    font-size: 8vw;
  }
}
</style>
