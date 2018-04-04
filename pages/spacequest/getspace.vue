<template>
  <div class="get-space" v-if="true"><!--  v-if="isInstalled && isLogIn && isMainnet" -->
    <header class="page-header">
      <Navbar />
    </header>
    <div class="content-wrapper">
      <div class="tile-info">
        <div class="token-icon">
          <img src="~assets/erc721-icon-blue.png" alt="ERC721 Token icon">
        </div>
        <div class="info">
          <div class="tiles-left">{{ tileLeft.toLocaleString() }} tiles left</div>
          <div class="last-price">LAST TILE PRICE: {{ lastPrice }} ETH</div>
          <div class="current-price">CURRENT PRICE: <span>{{ currentPrice }} ETH</span></div>
          <div class="button-group" v-if="tileLeft > 9990">
            <button class="create" @click="unpause">Create</button>
            <button class="reserved-buy" @click="mintGenesisTile" v-if="tileLeft < 10000 ">Buy</button>
          </div>
          <div v-else-if="tileLeft < 10000">
            <div class="button-group" v-if="!inTransaction  ">
              <button class="buy1" @click="buyTile">BUY 1</button>
              <button class="buy3" @click="bulkBuyTile">BUY 3</button>
            </div>
            <div class="in-transaction" v-else>
              <div class="loading-icon" v-bind:key="n" v-for="n in purchasedCount"><img src="~/assets/loading-icon.png"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="detail">
        <div class="detail-title">DETAILS</div>
        <div class="detail-items">
          <div class="detail-card">
            <div class="detail-icon"><img src="~assets/arrow-icon.png" alt="arrow icon"></div>
            <p class="detail-text">For each purchase, the price increases for the next tile by .0001 ETH.</p>
          </div>
          <div class="detail-card">
            <div class="detail-icon"><img src="~assets/bundle-icon.png" alt="bundle icon"></div>
            <p class="detail-text">If you purchase in a bundle, the price will be the same for all three.</p>
          </div>
          <div class="detail-card">
            <div class="detail-icon"><img src="~assets/person-icon.png" alt="person icon"></div>
            <p class="detail-text">Share with your friends to complete the quest!</p>
            <div class="social-media">
              <div class="social-icon"><!-- <img src="~assets/facebook-icon.png" alt=""> --></div>
              <div class="social-icon"><!-- <img src="~assets/facebook-icon.png" alt=""> --></div>
              <div class="social-icon"><!-- <img src="~assets/facebook-icon.png" alt=""> --></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
  <div class="message-tab" v-else>
    <div class="alert-msg">
      <div class="alert-header"><Navbar /></div>
      <div class="not-install" v-if="isInstalled === false">
        <div class="alert-title">SET UP METAMASK</div>
        <div class="alert-subtitle"><a href="https://metamask.io/" target="_blank">download and install it here</a></div>
      </div>
      <div class="not-login" v-else-if="isLogIn === false">
        <div class="alert-title">YOUR METAMASK IS LOCKED</div>
        <div class="alert-subtitle">OPEN METAMASK AND LOG IN TO JOIN THE QUEST</div>
        <div class="alert-img-wrapper">
          <div class="alert-img">
            <img src="~assets/loggedout.png" alt="YOUR METAMASK IS LOCKED">
          </div>
        </div>  
      </div>
      <div class="not-mainnet" v-else-if="isMainnet === false">
        <div class="alert-title">OH NO! YOU'RE ON THE WRONG NETWORK</div>
        <div class="alert-subtitle">SIMPLY OPEN METAMASK AND SWITCH TO THE MAIN ETHEREUM NETWORK</div>
        <div class="alert-img-wrapper">
          <div class="alert-img">
            <img src="~assets/mainnetwork.png" alt="ON THE WRONG NETWORK">
          </div>
        </div>  
      </div>
    </div>
    <div class="alert-footer" v-if="isInstalled === false || isLogIn === false || isMainnet === false"><Footer /></div>
  </div>

</template>

<script>
import abi from '~/static/ABI/ByzantineABI.json'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Web3 from 'web3'

export default {
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      isInstalled: undefined,
      isLogIn: undefined,
      isPurchaseBtn: undefined,
      isMainnet: undefined,
      currentPrice: '.00000',
      lastPrice: '.00000',
      tileLeft: '10,000',
      bulkQuantity: 3,
      startingPrice: 0.021111,
      increaseRate: 0.001011,
      inTransaction: false,
      purchasedCount: 1,
    }
  },
  methods: {
    init () {
      const vm = this
      // if (typeof web3 !== 'undefined') {
      //   vm.web3 = new Web3(web3.currentProvider)
        vm.isInstalled = true
      //   // console.log('currentProvider')
      // } else {
        vm.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      //   vm.isInstalled = false
      //   // console.log('http://localhost:8545')
      // }

      vm.startApp()
    },
    startApp () {
      const vm = this
      if (vm.isInstalled) {
        const contractAddress = '0x633c9d79f92b35c4606492cedf92b9337ba7989d'
        // '0x6b0949805cb2bddf91ea221695d7c949acb33357'
        vm.Contract = new vm.web3.eth.Contract(abi, contractAddress)

        vm.accountInterval = setInterval(function() {
          vm.getAccount()
        }, 800)

        vm.checkNet()
        vm.getSoldTileCount()

        // // for temp
        // const web3Infura = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"))
        // const contractEvents = new web3Infura.eth.Contract(abi, contractAddress)

        // contractEvents.events.TilesPurchased({
        //   filter: { purchaser: vm.web3.eth.defaultAccount }
        // }, function (error, event) { 
        //   console.log(event)
        // })
        // .on('data', function(event){
        //     console.log(event)
        // })
        // .on('error', console.error)
      }
    },
    getAccount () {
      const vm = this
      const accounts = this.web3.eth.getAccounts()

      accounts.then(account => {
        if (account.length === 0) {
          vm.isLogIn = false
        } else {
          vm.isLogIn = true
          if (vm.web3.eth.defaultAccount !== account[0]) vm.web3.eth.defaultAccount = account[0]
        }
      })
    },
    checkNet () {
      const vm = this
      const net = vm.web3.eth.net.getId()

      net.then(netId => {
        switch (netId) {
          case 3:
          case 1:
            vm.isMainnet = true
            break
          default:
            vm.isMainnet = false
        }
      })
    },
    buyTile () {
      const vm = this
      vm.inTransaction = true

      const purchaseTile = vm.Contract.methods.purchaseTile().send({ 
        from: vm.web3.eth.defaultAccount, 
        gas: 300000 ,
        value: vm.web3.utils.toWei(vm.currentPrice)
      })

      purchaseTile.on('receipt', result => {
        console.log(result)
        vm.getSoldTileCount()
        vm.inTransaction = false
      })
      .on('error', err => {
        console.error(err)
      })
    },
    bulkBuyTile () {
      const vm = this
      vm.inTransaction = true

      const purchaseTile = vm.Contract.methods.purchaseTile().send({ 
        from: vm.web3.eth.defaultAccount, 
        gas: 300000 ,
        value: vm.web3.utils.toWei(vm.currentPrice)
      })

      purchaseTile.on('receipt', result => {
        console.log(result)
        vm.getSoldTileCount()
        vm.inTransaction = false
      })
      .on('error', err => {
        console.error(err)
      })
    },
    getPrice () {
      const vm = this
      const tilePrice = this.Contract.methods.tilePrice().call()

      tilePrice.then(result => {
        const price = vm.web3.utils.fromWei(result, 'ether')
        vm.currentPrice = price.replace('0.', '.')
        console.log(vm.tileLeft)
        vm.lastPrice = price !== vm.startingPrice ? (price - vm.increaseRate).toString().replace('0.', '.') : '.00000'
      })
    },
    getSoldTileCount () {
      const vm = this
      const totalSupply = this.Contract.methods.totalSupply().call()

      totalSupply.then(result => {
        vm.tileLeft = 10000 - result
        if (result > 0) this.getPrice()
      })
    },
    unpause () {
      const vm = this
      const unpausePresale = vm.Contract.methods.unpausePresale().send({ from: vm.web3.eth.defaultAccount })

      unpausePresale.on('receipt', result => {
        vm.mintGenesisTile()
        console.log('mintGenesisTile', result)
      })
      .on('error', err => {
        console.error(err)
      })
    },
    mintGenesisTile () {
      const vm = this
      console.log(vm.web3.eth.defaultAccount)
      const mintGenesisByzantineTile = vm.Contract.methods.mintGenesisByzantineTile(vm.web3.eth.defaultAccount).send({ from: vm.web3.eth.defaultAccount, gas: 300000 })

      mintGenesisByzantineTile.on('receipt', result => {
        console.log(result)
        vm.getSoldTileCount()
      })
      .on('error', err => {
        console.error(err)
      })
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$nuxt.$route' () {
      this.init()
    }
  }
}
</script>

<style scoped>

.message-tab {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.alert-msg {
  flex: 1 1  auto;
  position: relative;
  background-color: #1E226B;
  color: #fff;
}
.alert-msg:before {
  content: "";
  top: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url('~assets/bk-stars-1.png'), url('~assets/bk-stars-2.png');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.5;
}
.alert-header {
  position: relative;
  z-index: 2;
}

.not-install,
.not-login,
.not-mainnet {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  font-family: "arame-regular", sans-serif;
  text-align: center;
  height: calc(100vh - 147px);
}

.alert-title {
  flex: 0 0 auto;
  padding: 40px 24px 20px;
  font-size: 34px;
  letter-spacing: .1em;
}
.alert-subtitle {
  flex: 0 0 auto;
  padding-bottom: 50px;
  font-size: 20px;
}
.alert-img-wrapper {
  flex: 1 1 auto;
  position: relative;
}
.alert-img {
  position: absolute;
  top: 0;
  bottom: 40px;
  width: 100%;
}
.alert-img img {
  height: 100%;
}

.alert-footer {
  flex: 0 0 auto;
}

.get-space {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-header {
  flex: 0 0;
  position: relative;
  padding-bottom: 200px;
  background-color: #1E226B;
}
.page-header:before {
  content: "";
  top: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url('~assets/bk-stars-1.png'), url('~assets/bk-stars-2.png');
  background-size: 100%;
  background-repeat: no-repeat;
  opacity: 0.5;
}

.content-wrapper {
  padding: 0 20px;
}

.tile-info {
  display: flex;
  margin: -170px auto 0;
  padding: 0 24px 40px;
  width: 100%;
  max-width: 800px;
  border-bottom: 2px solid #eee;
}
.token-icon {
  flex: 2;
}
.token-icon img {
  height: 340px;
  filter: drop-shadow(0px 0px 40px #ffe28c);
}
.info {
  flex: 3;
  position: relative;
  margin-left: 60px;
  z-index: 2;
}
.tiles-left {
  margin-top: 100px;
  line-height: 80px;
  font-family: "arame-regular", sans-serif;
  font-size: 38px;
  color: #fff;
}

.last-price {
  margin-top: 10px;
  font-family: "rational-light", sans-serif;
  font-size: .8em;
  font-weight: 600;
  color: #a5a5a5;
}

.content-wrapper {
  flex: 1 1;
}
.current-price {
  margin: .4em 0;
  font-family: "arame-regular", sans-serif;
  font-size: 1.1em;
  line-height: 2em;
}
.button-group {
  margin-top: 20px;
}
.create,
.reserved-buy,
.buy1,
.buy3 {
  padding: .7em 2em;
  background: #f86bcf;
  border: none;
  font-family: "arame-regular", sans-serif;
  font-size: 1em;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
}
.reserved-buy,
.buy3 {
  margin-left: 20px;
}

.detail {
  margin: 60px auto;
  text-align: center;
  width: 100%;
  max-width: 1000px;
}
.detail-title {
  margin: 80px 0 20px;
  font-family: "arame-regular", sans-serif;
  font-size:  1.4em;
  font-weight: 500;
  letter-spacing: .2em;
}
.detail-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.detail-card {
  flex: none;
  margin: 20px;
  width: 258px;
}
.detail-icon {
  margin: auto;
  height: 40px;
  width: 40px;
}
.detail-icon img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
.detail-text {
  margin: 20px 0;
  font-family: "rational-light", sans-serif;
  font-size: .8em;
}

.social-media {
  display: flex;
  justify-content: center;
}
.social-icon {
  flex: none;
  margin: 5px;
  height: 30px;
  width: 30px;
  background: #e0e0e0;
}
.social-icon img {
  height: 100%;
  width: 100%;
}

.footer {
  flex: 0 0;
}

.in-transaction {
  display: flex;
}
.loading-icon {
  animation: rotate 2s infinite;
}
.loading-icon:nth-child(2) {
  animation-delay: .2s;
}
.loading-icon:last-child {
  animation-delay: .4s;
}
.loading-icon img {
  height: 60px;
}

@keyframes rotate {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

@media (max-width: 804px) {
  .page-header {
    padding-bottom: 180px;
  }
  .tile-info {
    margin: -150px auto 0;
    max-width: 652px;
  }
  .token-icon img {
    height: 300px;
  }
  .tiles-left {
    margin-top: 80px;
    font-size: 30px;
  }
}
@media (max-width: 690px) {
  .tile-info {
    flex-wrap: wrap;
    text-align: center;
  }
  .token-icon {
    flex: none;
    width: 100%;
  }
  .info {
    margin: 0;
    flex: none;
    width: 100%;
  }
  .tiles-left {
    margin-top: 40px;
    color: #212121;
  }
  .alert-title {
    font-size: 28px;
  }
  .alert-subtitle {
    font-size: 20px;
  }
}
@media (max-width: 345px) {
  .token-icon img {
    height: auto;
    width: 100%;
  }
  .buy1,
  .buy3 {
    margin: 10px auto;
    display: block;
    width: 120px;
  }
}
</style>