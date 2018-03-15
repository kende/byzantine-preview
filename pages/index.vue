<template>
  <div class="home-page">
    <div class="container">
      <div class="content">
        <div class="logo-wrapper"><img class="logo" src="~assets/Byzantine-Logo.png" alt="Company logo"></div>
        <div class="description">DECENTRALIZED PLATFORMS AND SPACES</div>
      </div>
      <div class="display-images">
        <div class="image-container"><img src="~assets/spacequest-thumb.png" alt="space quest thumb"></div>
        <div class="image-container"><img src="~assets/liminalnetwork-thumb.png" alt="liminal network thumb"></div>
      </div>
      <footer class="footer">
        cc Byzantine Inc. 2018
      </footer>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  margin: 40px 0;
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

.display-images {
  display: flex;
}
.image-container {
  flex: 1;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
@media (max-width: 425px) {
  .display-images {
    flex-wrap: wrap;
  }
  .image-container {
    flex: none;
    width: 100%;
  }
}
</style>
