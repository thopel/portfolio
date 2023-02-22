export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:1337', // process.env.baseUrl to call it
    baseUrlAPI: process.env.BASE_URL || 'http://localhost:1337/api' // process.env.baseUrlAPI to call it
  },

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
    '@nuxtjs/axios'
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
