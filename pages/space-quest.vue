<template>
  <div class="space-quest-page">
    <div class="container">
      <div class="parallax-stars">
        <div id="layer1" class="layer"><img class="stars" src="~assets/bk-stars-1.png" alt="Star background"></div>
        <div id="layer2" class="layer"><img class="stars" src="~assets/bk-stars-2.png" alt="Star background"></div>
      </div>
      <div class="content">
        <nav class="navbar">
          <div class="nav-item"><a href="http://byzantine.network/"><img class="logo" src="~assets/Byzantine-logo-yellow.png" alt=""></a></div>
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
        <footer class="footer">
          <div class="footer-item"><a href="http://byzantine.network/">a byzantine thing</a> 🦄</div>
          <div class="footer-item"><a href="https://app.termly.io/document/privacy-policy-for-website/c596a054-bb10-4bc0-b04d-d582f48ee43e" target="_blank">privacy policy</a> &amp; <a href="https://app.termly.io/document/terms-of-use-for-website/afc96613-61ec-4c6d-89fa-c6720e93ffa1" target="_blank">terms</a></div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
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
  transform: translateZ(-.25px) scale(1.14);
}
#layer2 {
  transform: translateZ(-.5px) scale(1.28);
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
  background: rgba(30, 34, 107, .8);
  border-radius: 2px;
}

.banner {
  position: relative;
  height: 90vh;
  text-align: center;
  color: #fff;
}
.banner-container {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.headline {
  font-family: "arame-regular", sans-serif;
  font-size: 8em;
  text-shadow: 0 0 1px #fff;
  letter-spacing: .2em;
  text-transform: uppercase;
}
.description {
  border-radius: 2px;
  font-family: "rational-light", sans-serif;
  font-size: 2.2em;
  color: #F4DF9D;
}

.explanation {
  padding: 40px 24px;
  background: #fff;
  text-align: center;
}
.star-icon {
  margin: 40px 0;
}
.section-subtitle {
  font-family: "arame-regular", sans-serif;
  font-size: 1.4em;
  letter-spacing: .2em;
  text-transform: uppercase;
}
.answer {
  margin: 30px auto;
  font-family: "rational-light", sans-serif;
  font-size: 1em;
  letter-spacing: 1px;
  max-width: 610px;
  line-height: 1.6em;
}
.answer a {
  display: inline-block;
  color: #1E226B;
  text-decoration: none;
  border-bottom: 1px solid #1E226B;
  line-height: 1.4em;
}

.rewards {
  padding: 40px 0;
  background: #fff;
  text-align: center;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: auto;
  padding:  40px 0;
  max-width: 1000px;
}
.reward-card {
  flex: none;
  margin: 20px 0;
  padding: 20px 40px;
  width: 300px;
  background: #1E226B;
  border: 3px solid #F4DF9D;
  border-radius: 8px;
}
.card-title {
  font-family: "arame-regular", sans-serif;
  font-size: 1.6em;
  color: #F4DF9D;
  letter-spacing: 2px;
  min-height: 48px;
}
.card-img {
  margin: 6px 0 20px;
}
.card-img img {
  width: 80%;
}
.card-text {
  font-family: "rational-light", sans-serif;
  font-size: .8em;
  color: #fff;
  line-height: 1.6em;
}

.purchase {
  padding: 40px 0;
  background: #fff;
  font-family: "rational-light", sans-serif;
  text-align: center;
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
.buy-btn {
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
.buy-btn:active {
  transform: translateY(2px);
}

.footer {
  display: flex;
  padding:  24px 0;
  background: #fafafa;
  text-align: right;
  flex-flow: wrap;
  justify-content: flex-end;
}
.footer-item {
  margin: 10px 24px;
  font-size: .8em;
  font-family: rational-light, sans-serif;
  text-align: center;
}
.footer-item a {
  text-decoration: none;
  color: #424242;
  word-spacing: 0px;
}
.footer-item a:hover {
  text-decoration: underline;
}

@media (max-width: 960px) {
  .cards {
    max-width: 680px;
  }
}
@media (max-width: 649px) {
  .cards {
    max-width: 300px;
  }
  .banner-container {
    width: 100%;
  }
  .headline {
    font-size: 16vw;
  }
  .description {
    font-size: 6vw;
  }
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
  .banner {
    height: calc(100vh - 49px);
  }
}
</style>
