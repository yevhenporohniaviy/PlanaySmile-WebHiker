export default {
  ssr: false,

  loading: {
    color: '#88b09f',
    height: '5px'
  },

  // target: 'static',

  axios: {
    baseURL: process.env.SERVER_HOST || 'http://localhost:8080/api/',
    proxyHeaders: false,
    credentials: false
  },

  head: {
    title: 'PlanyaSmile',
    htmlAttrs: {
      lang: 'de'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href:'https://fonts.gstatic.com',
        rel:'preconnect',
      },
      {
        href:'https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap',
        rel:'stylesheet preload',
        as: 'style'
      },
      {
        href:'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
        rel:'stylesheet preload',
        as: 'style',
      }
    ]
  },

  auth: {
    localStorage: false,
    cookie: {
      options:{
        prefix: 'auth_',
        secure:true,
      }
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          required: true,
          type: 'Bearer',
          global: true,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 1
        },
        endpoints: {
          login: {url: 'auth/signin', method: 'post', propertyName: 'token'},
          refresh: { url: 'auth/refresh', method: 'post'},
          user: {url: 'users/me', method: 'get'},
          logout: false
        },
        user: {
          property: false,  // `user` property is now `user.property`
          autoFetch: true
        },
        rewriteRedirects: true,
        fullPathRedirect: true
      }
    },
    redirect: {
      login: false,
      logout: '/auth/login',
      callback: false,
      home: false
    }
  },
  router: {
    middleware: 'auth',
    extendRoutes(routes, resolve){
      routes.push({
        path:'/patient/:id/order/:order_id',
        component:resolve(__dirname, 'pages/patient/_id/order/index.vue')
      })
    }
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: 'assets/styles/global.scss', lang: 'scss'}],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src:  '@/plugins/axios',
      ssr: false
    },
    {
      src:  '@/plugins/datepicker',
      ssr: false
    },
    {
      src:  '@/plugins/timepicker',
      ssr: false
    },
    {
      src:  '@/plugins/vee-validate',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/moment'
  ],


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@/modules/planyasmile/index.ts',
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    "@nuxtjs/moment",
    'bootstrap-vue/nuxt',
    '@nuxtjs/style-resources',
    ['@nuxtjs/recaptcha', {
      siteKey: '',
      size: 'invisible',
      hideBadge: false,
      version: 2
    }],
    '@nuxtjs/cloudinary',
    "vue-toastification/nuxt",
    [
      'nuxt-fontawesome', {
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set:'@fortawesome/free-regular-svg-icons',
          icons: ['far']
        }
      ]
    }
    ]
  ],

  cloudinary: {
    cloudName: '',
    apiKey: '',
    apiSecret: '',
    useComponent: true
  },
  i18n: {
    detectBrowserLanguage:false,
    locales:['de'],
    vueI18n: {
      fallbackLocale: "de",
      messages: {
        de: require('./lang/de.json')
      }
    },
    defaultLocale: 'de',
    strategy:'prefix_except_default',
  },
  toast: {
    position: "top-right",
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.5,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  styleResources: {
    scss: [
      'assets/styles/_variables.scss',
      'assets/styles/_main.scss',
      'bootstrap/scss/_functions.scss',
      'bootstrap/scss/_variables.scss',
      'bootstrap/scss/_mixins.scss',
    ]
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
