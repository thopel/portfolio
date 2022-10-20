export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Portfolio Thomas Pelfrene",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Bonjour! Venez découvrir mes réalisations web et graphique sur mon portfolio ! Contactez-moi si vous souhaitez discuter !",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    components: true,
    // dirs: [
    //   "~components",
    //   {
    //     path: "~components/color/",
    //     prefix: "Color",
    //   },
    // ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources", "nuxt-gsap-module"],

  styleResources: {
    scss: ["~/assets/scss/mixins.scss", "~/assets/scss/variables/*.scss"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      // '@nuxtjs/sitemap',
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: "AIzaSyBiP8Zm5f4CZ_4sgUPL5Rb4qW5L0yE4MgA",
          authDomain: "portfolio-d0ca8.firebaseapp.com",
          projectId: "portfolio-d0ca8",
          storageBucket: "portfolio-d0ca8.appspot.com",
          messagingSenderId: "443553158329",
          appId: "1:443553158329:web:76247e484bf4fd18823768",
          measurementId: "G-DRKS78C3Z6",
        },
        services: {
          firestore: true,
          analytics: true,
          performance: true,
          database: true,
        },
      },
    ],
  ],

  // sitemap: {
  //   generate: true,
  //   hostname: 'https://tpelfrene.fr',
  // exclude: [
  //   '/profile'
  // ]
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  //   build: {
  //     loaders: {
  //       vue: {
  //         transformAssetUrls: {
  //           audio: "src",
  //         },
  //       },
  //     },

  //     extend(config, ctx) {
  //       config.module.rules.push({
  //         test: /\.(ogg|mp3|wav|mpe?g)$/i,
  //         loader: "file-loader",
  //         options: {
  //           name: "[path][name].[ext]",
  //         },
  //       });
  //     },
  //   },
};
