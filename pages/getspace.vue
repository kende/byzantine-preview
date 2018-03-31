<template>
  <div class="get-space">
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
          <div class="not-install" v-if="isInstalled === false">MetaMask is not installed.</div>
          <div class="not-login" v-else-if="isLogIn === false">MetaMask is not login.</div>
          <div class="not-mainnet" v-else-if="isMainnet === false">Your are not on the Main Ethereum Network.</div>
          <div class="button-group" v-else-if="isInstalled && isLogIn && isMainnet">
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
      account: null,
      currentPrice: '.00000',
      lastPrice: '.00000',
      tileLeft: 10000
    }
  },
  methods: {
    init () {
      const vm = this
      if (typeof web3 !== 'undefined') {
        vm.web3 = new Web3(web3.currentProvider)
        vm.isInstalled = true
        vm.checkStatus()
      } else {
        // vm.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        vm.isInstalled = false
      }

      vm.accountInterval = setInterval(function() {
        if (vm.web3.eth.accounts[0] !== vm.account) {
          vm.account = vm.web3.eth.accounts[0]
          vm.checkStatus()
        }
      }, 1000)

      vm.CoursetroContract = vm.web3.eth.contract(abi)
      vm.Contract = vm.CoursetroContract.at('0x2111a1a8aad809b29aa38199d5b81bd6d0604897')

      vm.Contract.tilePrice(function(error, result){
        if(!error) {
          console.log(vm.web3.fromWei(result.toNumber(), "ether" ))
          vm.currentPrice = vm.web3.fromWei(result.toNumber(), "ether").replace('0.', '.')
        } else {
          console.error(error)
        }
      })

      vm.Contract.totalSupply(function(error, result){
        if(!error)
          console.log(result.toNumber())
        else
          console.error(error)
      })
    },
    checkStatus () {
      const vm = this

      console.log(vm.web3.eth.accounts)

      vm.web3.eth.getAccounts((err, acc) => {
        if (err != null) {
          console.error("An error occurred: " + err)
        } else if (acc.length == 0) {
          vm.isLogIn = false
        } else {
          vm.isLogIn = true
          vm.account = acc[0]
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
    buyTile () {
      alert('Buy 1 tile')
    },
    bulkBuyTile () {
      alert('Buy 5 tile')
    },
    tempUpdate () {
      // example1
      console.log(document.querySelector("#name").value)
      console.log(document.querySelector("#age").value)
      this.Coursetro.setInstructor(document.querySelector("#name").value, document.querySelector("#age").value)
    },
    example1 () {
      // https://coursetro.com/posts/code/99/Interacting-with-a-Smart-Contract-through-Web3.js-(Tutorial)
      if (typeof web3 !== 'undefined') {
        vm.web3 = new Web3(web3.currentProvider);
      } else {
        // set the provider you want from Web3.providers
        vm.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
        console.log('please install MetaMask')
      }
      vm.web3.eth.defaultAccount = vm.web3.eth.accounts[0]

      const CoursetroContract = vm.web3.eth.contract([{"constant": false, "inputs": [{"name": "_fName", "type": "string"}, {"name": "_age", "type": "uint256"} ], "name": "setInstructor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},{"constant": true, "inputs": [], "name": "getInstructor", "outputs": [{"name": "", "type": "string"}, {"name": "", "type": "uint256"} ], "payable": false, "stateMutability": "view", "type": "function"}])

      vm.Coursetro = CoursetroContract.at('0xfd5e120f67de6a0e465ec9f6a5e61b56fe084977')
      console.log(vm.Coursetro)

      vm.Coursetro.getInstructor(function(error, result){
        if(!error)
          {
            document.querySelector("#instructor").innerHTML = result[0]+' ('+result[1]+' years old)'
            console.log(result)
          }
        else
          console.error(error)
      })
    }
  },
  mounted () {
    this.init()

    // const vm = this
    // if (typeof web3 !== 'undefined') {
    //   vm.isInstalled = true
    //   vm.metamaskInit()
    // } else {
    //   // set the provider you want from Web3.providers
    //   // vm.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
    //   vm.isInstalled = false
    // }



    // console.log(vm.web3)

    // vm.web3.eth.defaultAccount = vm.web3.eth.accounts[0]

  }
}
</script>

<style scoped>
{/*
body {
    background-color:#F0F0F0;
    padding: 2em;
    font-family: 'Raleway','Source Sans Pro', 'Arial';
}
.container {
    width: 50%;
    margin: 0 auto;
}
label {
    display:block;
    margin-bottom:10px;
}
input {
    padding:10px;
    width: 50%;
    margin-bottom: 1em;
}
button {
    margin: 2em 0;
    padding: 1em 4em;
    display:block;
}

#instructor {
    padding:1em;
    background-color:#fff;
    margin: 1em 0;
}
*/}

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