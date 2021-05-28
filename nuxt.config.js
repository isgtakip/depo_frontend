import colors from 'vuetify/es5/util/colors'


export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr:false,

 

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - depo_frontend',
    title: 'depo_frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Prompt:wght@200;300&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    "vue-toastification/nuxt",
    '@nuxtjs/auth-next',
  ],

  router: {
    middleware: ['auth','custom'],
  },


  auth: {
    cookie: {
      options: {
        secure: true,
        name: 'XSRF-TOKEN',
        secure: true
      },
    },

    redirect: {
      login: "/login",
      logout: "/login",
      callback: false,
      home: "/"

    },
    strategies: {
      'laravelSanctum': {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName:false,
            withCredentials: true, 
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json'
              }
          },
        
          user: { 
            url: '/api/user', 
            method: 'get', 
            propertyName: false,
            withCredentials: true, 
                    headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                    }
        }
        },
      },
    },
//Set-Cookie: widget_session=abc123; SameSite=None; Secure




    
    plugins: [
      '~/plugins/axios.js',
      '~/plugins/laravel_permissions.js',
      '~/plugins/ability.js',
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    credentials:true,
  },



  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          error: '#b71c1c',
        },
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {

  },

  

}
