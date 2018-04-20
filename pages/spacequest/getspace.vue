<template>
  <div class="get-space" v-if="isInstalled && isLogIn && isMainnet && !isPurchasing">
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
          <div class="owner-count">
            My tiles: {{ownerTileCount}} 
            <span class="message" v-if="message === 'Rejected'">{{ message }}</span>
            <a class="message" v-bind:class="{'success': message === 'Success'}" v-bind:href="transaction" target="_blank" v-else>{{ message }}</a>
          </div>
          <div v-if="isSaleStarted && isPaused === false && isSaleEnded === false">
            <!-- <div v-if="isSaleStarted"> -->
              <div class="button-group" v-if="!inTransaction">
                <button class="buy1" @click="buyTile">BUY 1</button>
                <button class="buy3" @click="bulkBuyTile" v-if="isBulkAvailable">BUY 3</button>
                <button class="buy-larger" @click="togglePopup">WANT TO BUY A LARGER AMOUNT?</button>
              </div>
              <div class="in-transaction" v-else>
                <div class="loading-icon" v-bind:key="n" v-for="n in purchasedCount"><img src="~/assets/loading-icon.png"></div>
                <div class="transaction-text" v-if="isProcessing"><a v-bind:href="transaction" target="_blank">Transaction</a> in progress</div>
              </div>
            <!-- </div> -->
            <!-- <div class="button-group" v-else>
              <button class="reserved-buy" @click="mintGenesisTile">Buy</button>
            </div> -->
          </div>
          <!-- <div v-else-if="isSaleEnded === false">
            <div class="button-group">
              <button class="create" @click="unpause">{{ tileLeft === 10000 ? 'Create' : 'Unpause' }}</button>
            </div>
          </div> -->
        </div>
      </div>

      <div class="detail">
        <div class="detail-title">DETAILS</div>
        <div class="detail-items">
          <div class="detail-card">
            <div class="detail-icon"><img src="~assets/arrow-icon.png" alt="arrow icon"></div>
            <p class="detail-text">For each purchase, the price increases for the next tile by .001011 ETH.</p>
          </div>
          <div class="detail-card">
            <div class="detail-icon"><img src="~assets/bundle-icon.png" alt="bundle icon"></div>
            <p class="detail-text">If you purchase in a bundle, the price will be the same for all three.</p>
          </div>
          <div class="detail-card">
            <div class="detail-icon"><img src="~assets/person-icon.png" alt="person icon"></div>
            <p class="detail-text">Share with your friends to complete the quest!</p>
            <!-- <div class="social-media">
              <div class="social-icon"><img src="~assets/facebook-icon.png" alt=""></div>
              <div class="social-icon"><img src="~assets/facebook-icon.png" alt=""></div>
              <div class="social-icon"><img src="~assets/facebook-icon.png" alt=""></div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="isOpenPopup">
      <div class="popup-body">
        <div class="close-btn" @click="togglePopup"></div>
        <div class="title">HOW MANY TILES DO YOU WANT TO PURCHASE?</div>
        <div class="num-input"><input type="text" placeholder="number of tiles" v-model="bulkNumber" @keyup="calcEstimatedValue"></div>
        <div class="estimated-nums">
          <div class="plus-icon">+</div>
          <div>{{ estimatedGas == 0 ? 0 : estimatedGas.toFixed(6) }} ESTIMATED GAS(ETH)</div>
          <div>{{ estimatedCost == 0 ? 0 : estimatedCost.toFixed(6) }} ESTIMATED TILE COST(ETH)</div>
          <hr>
          <div>{{ (estimatedGas + estimatedCost) == 0 ? 0 : (estimatedGas + estimatedCost).toFixed(6) }} ESTIMATED TOTAL COST(ETH)</div>
        </div>
        <div class="button-group">
          <button class="buy" @click="buyLargeNumTiles">BUY</button>
          <button class="cancel" @click="togglePopup">CANCEL</button>
        </div>    
      </div>
    </div>
    <div class="footer"><Footer /></div>
  </div>
  <div class="bulkbuy-game" v-else-if="isPurchasing">
    <div class="bulkbuy-header"><Navbar /></div>
    <div class="bulkbuy-content">
      <div class="title">CLICK SUBMIT TO CREATE YOUR STAR</div>
      <div class="num">{{ processingNum }}/{{ bulkNumber }}</div>
      <div class="icons-wrapper">
        <div class="blackhole-wrapper">
          <div class="black-hole" v-bind:class="{ 'white-bg': processingNum !== 0 }" v-bind:style="{ transform: 'scale(' + (processingNum / bulkNumber * 5 + 1) + ')', left: processingNum === 0 ? '10%' : processingNum / bulkNumber / 0.02 + '%' }">
            <div class="completed-text" v-if="processingNum == bulkNumber">
              <div>{{ completedNum }}/{{ bulkNumber }}<br>completed</div>
              <div class="progressbar"><div class="progressbar-cover" v-bind:style="{ width: completedNum / bulkNumber * 100 + '%' }"></div></div>
              <div class="back-btn" v-if="isBackBtn" @click="backToPurchasePage">back</div>
            </div>
          </div>
        </div>
        <div class="icons-group" v-bind:style="{ left: processingNum === 0 ? '30%' : processingNum / bulkNumber / 0.02 + '%', width: (processingNum / bulkNumber) === 1 ? 0 : (140 - processingNum / bulkNumber * 100) + '%' }">
          <div class="image" style="transform: translateX(-40px)"><img src="~assets/icons/alien.png" alt="alien"></div>
          <div class="image" style="transform: translateX(-80px)"><img src="~assets/icons/UFO.png" alt="UFO"></div>
          <div class="image" style="transform: translateX(-120px)"><img src="~assets/icons/ethereum.png" alt="ethereum"></div>
          <div class="image" style="transform: translateX(-160px)"><img src="~assets/icons/star.png" alt="star"></div>
          <div class="image" style="transform: translateX(-200px)"><img src="~assets/icons/fighter.png" alt="fighter"></div>
          <div class="image" style="transform: translateX(-240px)"><img src="~assets/icons/helmet.png" alt="helmet"></div>
          <div class="image" style="transform: translateX(-280px)"><img src="~assets/icons/rocket.png" alt="rocket"></div>
          <div class="image" style="transform: translateX(-320px)"><img src="~assets/icons/satellite.png" alt="satellite"></div>
        </div>
      </div>
    </div>
    <div class="bulkbuy-footer"><Footer /></div>
  </div>
  <div class="message-tab" v-else>
    <div class="alert-msg">
      <div class="alert-header"><Navbar /></div>
      <div class="not-install" v-if="isInstalled === false">
        <div class="alert-title">SET UP METAMASK</div>
        <div class="alert-subtitle"><a href="https://metamask.io/" target="_blank">download and install it here</a></div>
        <img src="https://raw.githubusercontent.com/MetaMask/faq/master/images/download-metamask-dark.png" alt="MetaMask Logo">
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
import ByzantineContractABI from '~/static/ABI/ByzantineContractABI.json'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Web3 from 'web3'

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
        { hid: 'og_url', property: 'og:url', content: 'https://byzantine.network/spacequest/getspace/' },
        { hid: 'twitter_title', property: 'twitter:title', content: 'Byzantine Space Quest' },
        { hid: 'twitter_description', property: 'twitter:description', content: 'An interactive art game exploring space, time, and community.' },
        { hid: 'twitter_image', property: 'twitter:image', content: require('~/assets/space_quest_thumbnail.png') },
        { hid: 'twitter_url', property: 'twitter:url', content: 'https://byzantine.network/spacequest/getspace/' }
      ]
    }
  },
  data () {
    return {
      currentPrice: '.00000',
      lastPrice: '.00000',
      tileLeft: '10,000',
      bulkQuantity: 3,
      startingPrice: 0.021111,
      increaseRate: 0.001011,
      inTransaction: false,
      isProcessing: false,
      isOpenPopup: false,
      isPurchasing: false,
      isBackBtn: false,
      processingNum: 0,
      completedNum: 0,
      purchasedCount: 1,
      ownerTileCount: 0,
      isInstalled: undefined,
      isLogIn: undefined,
      isPurchaseBtn: undefined,
      isMainnet: undefined,
      isPaused: undefined,
      isSaleStarted: undefined,
      isSaleEnded: undefined,
      isBulkAvailable: undefined,
      message: null,
      transaction: null,
      bulkNumber: null,
      estimatedGas: 0,
      estimatedCost: 0
    }
  },
  methods: {
    init () {
      const vm = this
      if (typeof web3 !== 'undefined') {
        vm.web3 = new Web3(web3.currentProvider)
        vm.isInstalled = true
        // console.log('currentProvider')
      } else {
        // vm.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
        vm.isInstalled = false
        // console.log('http://localhost:8545')
      }

      vm.startApp()
    },
    startApp () {
      const vm = this
      if (vm.isInstalled) {
        const contractAddress = '0xb9f0e42d13e1c4da786e5af83e4c6ea3ab5210e8'

        vm.Contract = new vm.web3.eth.Contract(ByzantineContractABI, contractAddress)

        vm.accountInterval = setInterval(function() {
          vm.getAccount()
        }, 100)
        // vm.accountInterval = setInterval(vm.getAccount, 100)

        vm.checkNet()
        vm.getSoldTileCount()

        // // for event
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
          if (vm.web3.eth.defaultAccount !== account[0]) {
            vm.web3.eth.defaultAccount = account[0]
            vm.getTokenCount(account[0])
          }
        }
      })
    },
    checkNet () {
      const vm = this
      const net = vm.web3.eth.net.getId()

      net.then(netId => {
        switch (netId) {
          case 1:
            vm.isMainnet = true
            break
          default:
            vm.isMainnet = false
        }
      })
    }, 
    getSoldTileCount () {
      const vm = this
      const threshold = ['1098', '1099', '1998', '1999', '9998', '9999']
      const totalSupply = this.Contract.methods.totalSupply().call()

      totalSupply.then(result => {
        vm.tileLeft = 10000 - result
        vm.isBulkAvailable = threshold.indexOf(result) === -1
        console.log(result)

        if (result > 0) this.getPrice()
      })

      vm.checkPauseStatus()
      vm.checkSaleStarted()
      vm.checkSaleEnded()
    },    
    getPrice () {
      const vm = this
      const tilePrice = this.Contract.methods.tilePrice().call()

      tilePrice.then(result => {
        const price = vm.web3.utils.fromWei(result, 'ether')
        vm.currentPrice = price.replace('0.', '.')
        vm.lastPrice = price !== vm.startingPrice ? (price - vm.increaseRate).toFixed(6).toString().replace('0.', '.') : '.00000'
      })
    },
    getTokenCount (address) {
      const vm = this
      const balance = vm.Contract.methods.balanceOf(address).call()
      balance.then(result => {
        vm.ownerTileCount = result
      })
    },
    // unpause () {
    //   const vm = this
    //   const unpausePresale = vm.Contract.methods.unpausePresale().send({ from: vm.web3.eth.defaultAccount })

    //   unpausePresale.on('receipt', result => {
    //     if (vm.tileLeft === 10000) vm.mintGenesisTile()
    //     vm.checkPauseStatus()
    //     vm.checkSaleStarted()
    //   })
    //   .on('error', err => {
    //     console.error(err)
    //   })
    // },
    // mintGenesisTile () {
    //   const vm = this
    //   const mintGenesisByzantineTile = vm.Contract.methods.mintGenesisByzantineTile(vm.web3.eth.defaultAccount).send({ 
    //     from: vm.web3.eth.defaultAccount, 
    //     // gas: 30000 
    //   })

    //   mintGenesisByzantineTile.on('receipt', result => {
    //     vm.getSoldTileCount()
    //   })
    //   .on('error', err => {
    //     console.error(err)
    //   })
    // },
    buyTile () {
      const vm = this
      vm.message = null
      vm.inTransaction = true
      vm.purchasedCount = 1

      const purchaseTile = vm.Contract.methods.purchaseTile().send({ 
        from: vm.web3.eth.defaultAccount, 
        gas: 300000,
        value: vm.web3.utils.toWei(vm.currentPrice)
      })

      purchaseTile.on('transactionHash', transactionHash => {
        vm.isProcessing = true
        vm.transaction = 'https://etherscan.io/tx/' + transactionHash
      })
      .on('receipt', result => {
        vm.inTransaction = false
        vm.isProcessing = false
        vm.getSoldTileCount()
        vm.getTokenCount(vm.web3.eth.defaultAccount)
        vm.message = result.status === '0x1' ? 'Success' : 'Fail'
      })
      .on('error', err => {
        vm.inTransaction = false
        vm.isProcessing = false
        vm.message = 'Rejected'
        console.error(err)
      })
    },
    bulkBuyTile () {
      const vm = this
      vm.message = null
      vm.inTransaction = true
      vm.purchasedCount = vm.bulkQuantity

      const purchaseTile = vm.Contract.methods.bulkPurchaseTile().send({ 
        from: vm.web3.eth.defaultAccount, 
        gas: 300000,
        value: vm.web3.utils.toWei(vm.currentPrice) * vm.bulkQuantity
      })

      purchaseTile.on('transactionHash', transactionHash => {
        vm.isProcessing = true
        vm.transaction = 'https://etherscan.io/tx/' + transactionHash
      })
      .on('receipt', result => {
        vm.inTransaction = false
        vm.isProcessing = false
        vm.getSoldTileCount()
        vm.getTokenCount(vm.web3.eth.defaultAccount)
        vm.message = result.status === '0x1' ? 'Success' : 'Fail'
      })
      .on('error', err => {
        vm.inTransaction = false
        vm.isProcessing = false
        vm.message = 'Rejected'
        console.error(err)
      })
    },
    checkPauseStatus () {
      const vm = this
      vm.Contract.methods.pausedPresale().call().then(result => {
        vm.isPaused = result
        // console.log('isPaused', vm.isPaused)
      })
    },
    checkSaleStarted () {
      const vm = this
      vm.Contract.methods.byzantineSaleStarted().call().then(result => {
        vm.isSaleStarted = result
        // console.log('isSaleStarted',vm.isSaleStarted)
      })
    },
    checkSaleEnded () {
      const vm = this
      vm.Contract.methods.byzantineSaleEnded().call().then(result => {
        vm.isSaleEnded = result
        // console.log('isSaleEnded',vm.isSaleEnded)
      })
    },
    calcEstimatedValue () {
      const vm = this
      const bulkNum = Number(vm.bulkNumber)
      if ( Number(vm.bulkNumber) <= vm.tileLeft) {
        const result = Math.floor(bulkNum / 3)
        const remainder = bulkNum % 3
        const currentPrice = Number(vm.currentPrice)

        const increaseRate = Number(vm.increaseRate)

        vm.estimatedGas = (Math.floor(bulkNum / 3) + remainder) * 0.0012
        vm.estimatedCost = (currentPrice + (result - 1) / 2 * increaseRate) * result * vm.bulkQuantity + (currentPrice + (result + (remainder - 1) / 2) * increaseRate) * remainder
      }
    },
    buyLargeNumTiles () {
      const vm = this
      vm.isPurchasing = true
    
      const bulkNum = Number(vm.bulkNumber)
      let counter = 0
      let result = Math.floor(bulkNum / 3)
      let remainder = bulkNum % 3
      let currentPrice = Number(vm.currentPrice)

      while (result > 0) {
        const purchaseTile = vm.Contract.methods.bulkPurchaseTile().send({ 
          from: vm.web3.eth.defaultAccount, 
          gas: 300000,
          value: vm.web3.utils.toWei(currentPrice.toFixed(6).toString()) * vm.bulkQuantity
        })

        purchaseTile.on('transactionHash', transactionHash => {
          vm.processingNum += vm.bulkQuantity
        })
        .on('receipt', result => {
          vm.completedNum += result.status === '0x1' ? vm.bulkQuantity : 0
          counter += vm.bulkQuantity
          if (counter === bulkNum) {
            vm.isBackBtn = true
          }
        })
        .on('error', err => {
          console.error(err)
        })
        currentPrice += vm.increaseRate
        result--
      }

      while (remainder > 0) {
        const purchaseTile = vm.Contract.methods.purchaseTile().send({ 
          from: vm.web3.eth.defaultAccount, 
          gas: 300000,
          value: vm.web3.utils.toWei(currentPrice.toFixed(6).toString())
        })

        purchaseTile.on('transactionHash', transactionHash => {
          vm.processingNum += 1
        })
        .on('receipt', result => {
          vm.completedNum += result.status === '0x1' ? 1 : 0
          counter += 1
          if (counter === bulkNum) {
            vm.isBackBtn = true
          }
        })
        .on('error', err => {
          console.error(err)
        })
        currentPrice += vm.increaseRate
        remainder--
      }
    },
    backToPurchasePage () {
      this.isBackBtn = true
      this.isPurchasing = false
      this.togglePopup()
    },
    togglePopup () {
      this.isOpenPopup = !this.isOpenPopup
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
.not-install {
  margin: auto;
  padding: 0 20px;
  max-width: 800px;
}
.not-install img {
  width: 100%;
  height: auto;
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
.alert-subtitle a {
  color: #fff;
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
.owner-count {
  position: relative;
  text-transform: uppercase;
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
  margin-top: 30px;
}
.create,
.reserved-buy,
.buy1,
.buy3,
.buy,
.cancel {
  padding: .7em 2em;
  background: #f86bcf;
  border: none;
  font-family: "arame-regular", sans-serif;
  font-size: 1em;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
}
.buy3 {
  margin-left: 20px;
}
.buy-larger {
  margin-top: 20px;
  padding: 0 1.4em;
  border: none;
  font-family: "arame-regular", sans-serif;
  font-size: .8em;
  color: #f86bcf;
  text-decoration: underline;
  cursor: pointer;
}
.buy,
.cancel {
  width: 160px;
}
.cancel {
  margin-left: 10px;
  background: #969696;
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
  margin-top: 20px;
  display: flex;
  align-items: center;
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
.transaction-text {
  margin-left: 10px;
  font-size: .8em;
  color: #616161;
}
.transaction-text a {
  color: #616161;
}

.message {
  position: absolute;
  top: .25em;
  margin-left: 10px;
  font-size: .7em;
  color: rgb(255, 0, 0);
  text-transform: capitalize;
  line-height: 1em;
}
.message:before {
  content: '(';
}
.message:after {
  content: ')';
}
.message:empty:before,
.message:empty:after {
  content: '';
}
.success {
  color: rgb(0, 128, 0);
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, .5);
  z-index: 5000;
}
.popup-body {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 60px 24px 40px;
  width: 90%;
  max-width: 600px;
  background: #fff;
  border: 4px solid #fce096;
  text-align: center;
  transform: translate(-50%, -50%);
}
.popup .title {
  font-family: "arame-regular", sans-serif;
  font-size: 1.4em;
}
.popup .num-input {
  margin: 20px 0;
}
.popup .num-input input {
  padding: 0 10px;
  height: 40px;
  width: 90%;
  max-width: 240px;
  border: 1px solid #616161;
  font-family: "rational-light", sans-serif;
  font-size: 1em;
  text-align: center;
}
.num-input input::-webkit-input-placeholder {
  font-family: "rational-light", sans-serif;
  color: #ccc;
}
.num-input input::-moz-placeholder {
  font-family: "rational-light", sans-serif;
  color: #ccc;
}
.num-input input:-ms-input-placeholder {
  font-family: "rational-light", sans-serif;
  color: #ccc;
}
.num-input input:-moz-placeholder {
  font-family: "rational-light", sans-serif;
  color: #ccc;
}
.estimated-nums {
  position: relative;
  margin: 40px auto;
  width: 100%;
  max-width: 350px;
  font-family: "arame-regular", sans-serif;
  text-align: right;
}
.estimated-nums hr {
  border-color: #616161;
  border-top: none;
}
.estimated-nums div:not(.plus-icon) {
  margin: 20px 0;
  color: #aaa;
}
.plus-icon {
  position: absolute;
  left: 0;
  top: 30%;
  font-size: 1.4em;
  color: #616161;
}

.close-btn {
  position: absolute;
  right: 14px;
  top: 14px;
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.close-btn:before,
.close-btn:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  border: 1px solid #616161;
  width: 100%;
}
.close-btn:before {
  transform: rotate(45deg);
} 
.close-btn:after {
  transform: rotate(-45deg);
}

.bulkbuy-game {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #1e226b;
}
.bulkbuy-game:before {
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

.bulkbuy-header,
.bulkbuy-footer {
  flex: 0 0 auto;
  position: relative;
  z-index: 4;
}

.bulkbuy-content {
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
}

.bulkbuy-content .title {
  padding: 40px 20px 20px;
  font-family: "arame-regular", sans-serif;
  font-size: 2.4em;
  color: #fff;
  text-align: center;
  letter-spacing: .1em;
}
.bulkbuy-content .num {
  font-family: "arame-regular", sans-serif;
  font-size: 1.4em;
  color: #fff;
  text-align: center;
}

.icons-wrapper {
  display: flex;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  width: 100%;
  z-index: 4;
}
.icons-group {
  display: flex;
  position: absolute;
  left: 30%;
  width: 50%;
  transition: all 1s;
}
.icons-group .image {
  flex: none;
  margin-right: 12%;
  height: 40px;
  width: 40px;
  background: #fff;
  border-radius: 50%;
  overflow: hidden;
}
.black-hole {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: -20px;
  height: 40px;
  width: 40px;
  background: #000;
  border-radius: 50%;
  box-shadow: 0 0 0 10px rgba(116, 227, 255, .8), 0 0 0 10px rgba(116, 227, 255, .8);
  transition: all 1s;
  z-index: 10;
}
.black-hole.white-bg {
  background: #fff;
  box-shadow: 0 0 2px 10px rgba(116, 227, 255, .4), 0 0 0 8px rgba(116, 227, 255, .2), 0 0 0 6px rgba(116, 227, 255, .4), 0 0 0 4px rgba(116, 227, 255, .5), 0 0 0 2px rgba(116, 227, 255, .6);
}
.completed-text {
  padding-top: 28%;
  font-family: "rational-light", sans-serif;
  font-size: 3px;
  text-align: center;
}
.progressbar {
  position: relative;
  margin: 2px auto;
  height: 2px;
  width: 80%;
  background-color: #eee;
  border-radius: 2px;
  transform: scaleY(.5);
}
.progressbar-cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #74e3ff;
  border-radius: 2px;
  transition: all 1s;
}
.icons-group .image img {
  height: 40px;
  width: 40px;
  object-fit: contain;
}

.back-btn {
  margin: -.5em auto;
  font-size: 4em;
  text-decoration: underline;
  transform: scale(.2);
  cursor: pointer;
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