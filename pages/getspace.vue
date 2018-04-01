<template>
  <div class="get-space" v-if="true" ><!-- v-if="isInstalled && isLogIn && isMainnet" -->
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
          <div class="button-group">
            <button class="create" @click="create">Create</button>
            <button class="buy1" @click="buyTile">BUY 1</button>
            <button class="buy3" @click="bulkBuyTile">BUY 3</button>
          </div>
        </div>
      </div>

      <!-- example1 -->
      <!-- <div class="container">
        <h1>Coursetro Instructor</h1>
        <h2 id="instructor"></h2>
        <label for="name" class="col-lg-2 control-label">Instructor Name</label>
        <input id="name" type="text">
        <label for="name" class="col-lg-2 control-label">Instructor Age</label>
        <input id="age" type="text">
        <button id="button" @click="tempUpdate">Update Instructor</button>
      </div> -->


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
      <Navbar />
      <div class="not-install" v-if="isInstalled === false">MetaMask is not installed.</div>
      <div class="not-login" v-else-if="isLogIn === false">MetaMask is not login.</div>
      <div class="not-mainnet" v-else-if="isMainnet === false">Your are not on the Main Ethereum Network.</div>
    </div>
    <div class="alert-footer"><Footer /></div>
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
      tileLeft: 0,
      bulkQuantity: 3,
    }
  },
  methods: {
    init () {
      const vm = this
      // if (typeof web3 !== 'undefined') {
      //   vm.web3 = new Web3(web3.currentProvider)
      //   vm.isInstalled = true
      //   vm.checkStatus()
      // } else {
        vm.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
      //   vm.isInstalled = false
      // }

      vm.accountInterval = setInterval(function() {
        if (vm.web3.eth.accounts[0] !== vm.web3.eth.defaultAccount) {
          vm.web3.eth.defaultAccount = vm.web3.eth.accounts[0]
          vm.checkStatus()
        }
      }, 1000)
      
      vm.CoursetroContract = vm.web3.eth.contract(abi)
      vm.Contract = vm.CoursetroContract.at('0x83fd6b53c2dc46e7a0b5953a2a59a27bc098a224')
      
      vm.updateUI()
    },
    checkStatus () {
      const vm = this
      vm.web3.eth.getAccounts((error, account) => {
        if(!error) {
          if (account.length == 0) {
            vm.isLogIn = false
          } else {
            vm.isLogIn = true
            vm.web3.eth.defaultAccount = account[0]
          }
        } else {
          console.error(error)
        }
      })

      vm.web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case "1":
            vm.isMainnet = true
            break
          default:
            vm.isMainnet = false
        }
      })
    },
    updateUI () {
      this.getPrice()
      this.getSoldTileCount()
    },
    buyTile () {
      const vm = this
      // // console.log(vm.account, vm.web3.toWei(Number(vm.currentPrice)))
      vm.Contract.purchaseTile.sendTransaction({ from: vm.account, value: vm.web3.toWei(Number(vm.currentPrice)), gas: 4000000 })
      vm.updateUI()
      console.log('Bought 1 tile')
    },
    bulkBuyTile () {
      const vm = this
      vm.Contract.bulkPurchaseTile.sendTransaction({ from: vm.account, value: vm.web3.toWei(Number(vm.currentPrice * vm.bulkQuantity)), gas: 4000000 })
      vm.updateUI()
      console.log('Bought 5 tiles')
    },
    getPrice () {
      const vm = this
      vm.Contract.tilePrice((error, result) => {
        if(!error) {
          // console.log(vm.web3.fromWei(result.toNumber(), "ether" ) - 0.000215)
          vm.currentPrice = vm.web3.fromWei(result.toNumber(), "ether").replace('0.', '.')
          vm.lastPrice = (vm.web3.fromWei(result.toNumber(), "ether") - 0.000215).toString().replace('0.', '.')
        } else {
          console.error(error)
        }
      })
    },
    getSoldTileCount () {
      const vm = this
      vm.Contract.totalSupply(function(error, result){
        if(!error) {
          // console.log(result.toNumber())
          vm.tileLeft = 10000 - result.toNumber()
        } else {
          console.error(error)
        }
      })
    },
    create () {
      const vm = this
      vm.Contract.unpausePresale({ value: 0, from: vm.web3.eth.defaultAccount })
      vm.Contract.mintGenesisByzantineTile(vm.web3.eth.defaultAccount, { value: 0, from: vm.web3.eth.defaultAccount, gas: 3000000 })
      vm.updateUI()
    }
  },
  mounted () {
    this.init()

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
  background-color: #1E226B;
  background-image: url('~assets/bk-stars-1.png'), url('~assets/bk-stars-2.png');
  background-size: 100%;
  background-repeat: no-repeat;
  color: #fff;
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
  padding-bottom: 200px;
  background-color: #1E226B;
  background-image: url('~assets/bk-stars-1.png'), url('~assets/bk-stars-2.png');
  background-size: 100%;
  background-repeat: no-repeat;
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
  margin-left: 60px;
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