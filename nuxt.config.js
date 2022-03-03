import fs from 'fs'

export default {
  server: {
    https: {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.crt'),
    },
  },

  router: {
    middleware: ['auth'],
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'yamabuki-qr2',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/firebase'],

  firebase: {
    config: {
      apiKey: 'AIzaSyAImcH1soXHZ5W6CjNyFTmOgYLZ1Jqw0Wc',
      authDomain: 'yamabuki-qr.firebaseapp.com',
      projectId: 'yamabuki-qr',
      storageBucket: 'yamabuki-qr.appspot.com',
      messagingSenderId: '729937068755',
      appId: '1:729937068755:web:19dc1bfe07d5426a548a26',
      measurementId: 'G-ZV28E2VEEW',
      databaseURL: 'https://yamabuki-qr-default-rtdb.firebaseio.com',
    },
    services: {
      auth: true,
      database: true,
      analytics: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
