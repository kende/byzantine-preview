<template>
  <div class="home-page">
    <div class="container">
      <div class="parallax-stars">
        <!-- <div class="stars-group"> -->
          <div id="layer1" class="layer"><img class="stars" src="~assets/bk-stars-1.png" alt="Star background"></div>
          <div id="layer2" class="layer"><img class="stars" src="~assets/bk-stars-2.png" alt="Star background"></div>
        <!-- </div> -->
      </div>
      <div class="content">
        <nav class="navbar">
          <div class="nav-item"><a href="#"><img class="logo" src="~assets/Byzantine-Logo-yellow.png" alt=""></a></div>
          <div class="item-group">
            <div class="nav-item"><a href="#">START QUEST</a></div>
            <div class="nav-item"><a href="#">GET SPACE</a></div>
          </div>
        </nav> 
        <section class="banner">
          <div class="banner-container">
            <div class="headline">SPACE</div>
            <div class="headline">QUEST</div>
            <div class="description">COLLECT THE MULTIVERSE</div>
          </div>
        </section>
        <section class="explanation">
          <div class="star-icon"><img src="~assets/large-star.png" alt="star" height="40" width="40"></div>
          <h4 class="section-subtitle">What is this?</h4>
          <p class="answer">The Byzantine Space Quest is the first of many quests in our multiverse that spans the digital and physical worlds. Your first quest? Collect and trade digital space - starting in outer space!</p>
          <p class="answer">For every tile purchased, you'll be contributing .02 ETH of the transfer price for connecting our world with <a href="#">mesh networks</a>, receive a physical tile in the form of an enamel pin, and see your tile across the digital and physical worlds in installations throughout <a href="#">Byzantine</a>'s space.</p>
        </section>
        <section class="rewards">
          <h4 class="section-subtitle">Quest Rewards</h4>
          <div class="cards">
            <div class="reward-card">
              <div class="card-title">ERC721 Token</div>
              <div class="card-img"><img src="~assets/pin-rocketship.png" alt="rocketship pin"></div>
              <div class="card-text">See your unique ERC-721 token visualized on installations online and off</div>
            </div>
            <div class="reward-card">
              <div class="card-title">Mesh Network Contribution</div>
              <div class="card-img"><img src="~assets/pin-rocketship.png" alt="rocketship pin"></div>
              <div class="card-text">Your purchase will help connect the world with a mesh network, helping to fight Net Neutrality</div>
            </div>
            <div class="reward-card">
              <div class="card-title">Enamel Pin</div>
              <div class="card-img"><img src="~assets/pin-rocketship.png" alt="rocketship pin"></div>
              <div class="card-text">Show your support with a limited edition enamel pin</div>
            </div>
          </div>
        </section>
        <section class="purchase">
          <h5 class="section-title">Space is limited.</h5>
          <h5 class="section-title">Discover yours now.</h5>
          <div class="purchase-text">0.215 ETH</div>
          <div class="purchase-text purchase-pink">Space Quest Badge</div>
          <div class="purchase-text"><small class="purchase-small">Limited 10K Token release</small></div>
          <div class="purchase-btn"><button class="buy-btn">Buy Now</button></div>
        </section>
      </div>
      <!-- 

      -->
      
      <!-- <div class="content">
        <div class="logo-wrapper"><img class="logo" src="~assets/Byzantine-Logo.png" alt="Company logo"></div>
        <div class="description">DECENTRALIZED PLATFORMS AND SPACES</div>
      </div>
      <footer class="footer">
        cc Byzantine Inc. 2018
      </footer> -->
      <!-- <div class="page-content">
        <div class="page-header">
          <img class="geode-logo" src="~assets/geode-logo.png" alt="geode logo">
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
      </div> -->
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
  background: #1E226B;
  perspective: 1px;
  transform-style: preserve-3d;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.parallax-stars {
  transform: translateZ(-.75px) scale(1.75);
  height: 100vh;
  transform-style: preserve-3d;
}
.layer {
  position: absolute;
  height: 100vh;
}
#layer1 {
  transform: translateZ(-.5px) scale(1.28);
}
#layer2 {
  transform: translateZ(-.25px) scale(1.14);
}

.stars {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.content {
  position: absolute;
  top: 0;
  width: 100%;
}

.navbar {
  display: flex;
  justify-content: space-between;
  top: 0;
  padding:  0 24px;
  height: 10vh;
  line-height: 10vh;
}
.logo {
  margin: 2vh;
  height: 6vh;
}
.item-group {
  display: flex;
}

.banner {
  height: 90vh;
  text-align: center;
  color: #fff;
}

.explanation {
  height: 200vh;
  background: #fff;
}










/*















stify-content: center;
  position: absolute;
}



.stars-wrapper {
  
}



.stars {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
}
 .content {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo {
  margin: auto;
  width: 90%;
  max-width: 760px;
}
.description {
  margin-top: 20px;
  font-family: "arame-regular", sans-serif;
  font-size: 1.8em;
  color: #424242;
  letter-spacing: .2em;
}

.footer {
  flex: 0;
  text-align: center;
  line-height: 60px;
  font-size: .8em;
  color: #8a8a8a;
}

@media (max-width: 860px) {
  .description {
    font-size: 1.5em;
  }
}
@media (max-width: 668px) {
  .description {
    font-size: 1.2em;
  }
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
} */
</style>
