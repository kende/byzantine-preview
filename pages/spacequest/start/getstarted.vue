<template>
  <div class="text">
    <h4 class="section-subtitle">Getting Started</h4>
    <p class="answer">1. Set up Metamask</p>
    <ul class="answer-list">
      <li class="answer-item"><iframe width="560" height="315" src="https://www.youtube.com/embed/6Gf_kRE4MJU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></li>
      <li class="answer-item">- If you’re new to Metamask, <a href="https://metamask.io/">download and install it here</a>. It’s a chrome browser plugin that allows websites that you approve to access your Ethereum wallet.</li>
      <li class="answer-item">- If you’re logged out of Metamask, follow the instructions shown on the wallet to log back in.</li>
    </ul>
    <p class="answer">2. Send Ether to your wallet</p>
    <ul class="answer-list">
      <li class="answer-item">- If you’re a US citizen, you should be able to purchase Ether directly through Metamask.</li>
      <li class="answer-item">- If you’re not a US citizen, you can purchase Ether from another exchange, like <a href="https://www.coinbase.com/join/592f472f816b990267963e2b" target="_blank">Coinbase</a>.</li>
    </ul>
    <p class="answer">3. Buy tiles</p>
    <ul class="answer-list">
      <li class="answer-item">- Once you have Metamask and Ether in your wallet, go to <a href="../getspace">Get Space</a> and you should see the option to buy 1 or 3 tiles.</li>
      <li class="answer-item">- The price will only increment for each purchase, not tile, so if you buy in sets of 3, the price for all three tiles will be the same.</li>
      <li class="answer-item">- Each tile purchased increments the price by .001011 ETH.</li>
      <li class="answer-item">- For each tile purchased, .02 ETH will be used to build a mesh network infrastructure.</li>
    </ul>
  </div>
</template>

<script></script>

<style scoped>
.text {
  margin-bottom: 80px;
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
  margin: 50px 0 0;
  width: 100%;
  max-width: 560px;
  /* font-family: "rational-light", sans-serif; */
  font-family: "arame-regular", sans-serif;
  font-size: .9em;
  letter-spacing: 1px;
  line-height: 1.6em;
}
.answer a {
  /* display: inline-block; */
  color: #1E226B;
  text-decoration: none;
  border-bottom: 1px solid #1E226B;
  line-height: 1.4em;
}
.answer-list {
  margin-bottom: 50px;
}
.answer-item {
  margin-top: 15px;
  font-size: .9em;
  font-family: "rational-light", sans-serif;
}

@media (max-width: 767px) {
  .answer {
    margin: 30px auto;
  }
}
</style>
