module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Byzantine',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Decentralized platforms and spaces' },
      { hid: 'og_title', property: 'og:title', content: 'Byzantine' },
      { hid: 'og_description', property: 'og:description', content: 'Decentralized platforms and spaces' },
      { hid: 'og_image', property: 'og:image', content: 'https://byzantine.network/_nuxt/img/Byzantine-Logo.3ff488c.png'},
      { hid: 'og_url', property: 'og:url', content: 'https://byzantine.network/' },
      { hid: 'twitter_title', property: 'twitter:title', content: 'Byzantine' },
      { hid: 'twitter_description', property: 'twitter:description', content: 'Decentralized platforms and spaces' },
      { hid: 'twitter_image', property: 'twitter:image', content: 'https://byzantine.network/_nuxt/img/Byzantine-Logo.3ff488c.png'},
      { hid: 'twitter_url', property: 'twitter:url', content: 'https://byzantine.network/' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#000000' },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/font-awesome',
  ]
}
