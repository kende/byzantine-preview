<template>
  <div class="space-quest-page">
    <div class="container">
      <div class="parallax-stars">
        <div id="layer1" class="layer"><img class="stars" src="~assets/bk-stars-1.png" alt="Star background"></div>
        <div id="layer2" class="layer"><img class="stars" src="~assets/bk-stars-2.png" alt="Star background"></div>
      </div>
      <div class="content">
        <Navbar />
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
          <p class="answer">For every tile purchased, a .02 ETH contribution is given to connect our world with <a href="https://nycmesh.net/faq/" target="_blank">mesh networks</a>, the first 10k tile owners will receive a physical representation of your Proof of Community Stake, in the form of an enamel pin. You will see your tile projected across the digital and physical worlds in light installations throughout <a href="https://liminal.network/" target="_blank">Liminal</a> spaces and beyond.</p>
        </section>
        <section class="rewards">
          <h4 class="section-subtitle">Quest Rewards</h4>
          <div class="cards">
            <div class="reward-card">
              <div class="card-title">ERC721 Token</div>
              <div class="card-img"><img src="~assets/erc721-icon.png" alt="ERC721 Token icon"></div>
              <div class="card-text">See your unique ERC-721 token visualized on installations online and off</div>
            </div>
            <div class="reward-card">
              <div class="card-title">Mesh Network Contribution</div>
              <div class="card-img"><img src="~assets/meshnetwork-icon.png" alt="mesh network icon"></div>
              <div class="card-text">Your purchase will help connect the world with mesh networks, helping to fight for Net Neutrality</div>
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
          <!-- <div class="purchase-text">Launching March 21, 2018</div> -->
          <div class="purchase-text purchase-pink">Space Quest Badge</div>
          <div class="purchase-text"><small class="purchase-small">Limited 10K Token release</small></div>
          <nuxt-link class="purchase-btn" to="/spacequest/getspace"><button>Buy</button></nuxt-link>
          <!-- <div class="subscription-form">
            <div class="subscription-group">
              <input type="email" placeholder="email..." @keypress='emailChange' v-model='email' required>
              <button @click='submit'>Subscribe</button>
            </div>
            <div class="error-msg">{{errorMsg}}</div>
          </div> -->
        </section>
        <Footer />
      </div>
    </div>        
    <!-- <div class='success-popup'>
      <div class='popup-body'>
        <div class='popup-title'>You've successfully subscribed!</div>
        <div class='popup-text'>Keep an eye out for the upcoming token release ✨</div>
        <button class='close-btn' @click='closePopup'>OK</button>
      </div>
    </div> -->
  </div>
</template>

<script>
// import axios from 'axios'
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
  }
  // data() {
  //   return {
      // email: '',
      // errorMsg: '',
  //   }
  // },
  // methods: {
    // closePopup () {
    //   const el = document.querySelector('.success-popup')
    //   el.className = 'success-popup'
    // },
    // emailChange () {
    //   this.errorMsg = !this.validEmail(this.email) ? 'Valid email required.' : ''
    // },
    // validEmail:function(email) {
    //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   return re.test(email)
    // },
    // addEmailToSubscriptionList () {
    //   const el = document.querySelector('.success-popup')
    //   console.log(this.email)
    //   axios({
    //     url: "https://api.node.nyc/api/email-subscrption/space-quest",
    //     // url: "http://localhost:9090/api/email-subscrption/space-quest",
    //     method: 'post',
    //     data: {
    //       "email": this.email
    //     }
    //   })
    //   .then(function(response) {
    //     if (response) {
    //       console.log(response)
    //       el.className += ' active'
    //     }
    //   })
    //   .then(function(error) {
    //     if (error) console.log(error)
    //   })
    // },
    // submit () {
    //   if (this.validEmail(this.email)) {
    //     this.addEmailToSubscriptionList()
    //   } else {
    //     console.log('Valid email required.')
    //   }
    // }
  // }
}
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
  max-width: 650px;
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
  min-height: 56px;
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

.subscription-form {
  margin: 40px auto;
  height: 40px;
  max-width: 500px;
  font-family: 'Roboto Mono', monospace;
}
.subscription-group {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.subscription-form input {
  flex: 1;
  padding: 0 14px;
  background: rgba(255, 255, 255, .4);
  height: 100%;
  border: 1px solid #ccc;
  border-right: none;
}
.subscription-form button {
  flex: 0;
  padding: 13px 20px;
  height: 100%;
  background: #f86bcf;
  border: none;
  font-family: "arame-regular", sans-serif;
  font-size: .9em;
  text-decoration: none;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
}
.subscription-form button:hover {
  background: #ffa8e5;
}
.error-msg {
  margin-top: 4px;
  font-size: 12px;
  text-align: left;
  color: #D52427;
}
.success-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .8);
  display: none;
}
.success-popup.active {
  display: block;
}
.popup-body {
  position: absolute;
  left: 50%;
  top: 40%;
  padding: 40px 24px;
  width: 90%;
  max-width: 500px;
  background: #fff;
  text-align: center;
  transform: translate(-50%, -50%);
  font-family: 'Roboto Mono', monospace;
  color: #212121;
}
.popup-title {
  font-family: "arame-regular", sans-serif;
  font-size: 30px;
  letter-spacing: 4px;
}
.popup-text {
  margin: 30px auto;
  max-width: 400px;
}
.close-btn {
  padding: 13px 30px;
  height: 40px;
  min-width: 120px;
  background: #f86bcf;
  border: none;
  font-size: .9em;
  text-decoration: none;
  border-radius: 2px;
  font-family: "arame-regular", sans-serif;
  color: #fff;
  letter-spacing: 4px;
  outline: none;
}

.purchase-btn button {
  margin: 40px 0 80px;
  height: 50px;
  min-width: 200px;
  background: #f86bcf;
  border: none;
  font-family: "arame-regular", sans-serif;
  font-size: 1.2em;
  line-height: 50px;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
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
  .banner {
    height: calc(100vh - 49px);
  }
}
</style>
