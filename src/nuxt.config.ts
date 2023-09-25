// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/docs/api/configuration/nuxt-config#srcdir
  srcDir: '',

  /**
   * SSR
   * https://nuxt.com/docs/api/configuration/nuxt-config#ssr
   */
  ssr: true,

  /**
   * App Config
   */
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  /**
   * Auto import components
   * https://nuxt.com/docs/api/configuration/nuxt-config#components
   */
  components: [
    {
      path: '@/components',
      pathPrefix: false,
      extensions: ['vue'],
      extendComponent(component) {
        /**
         * Remove 'Component' suffix for generated component names
         * e.g.
         *  components/Xyz.component.vue
         *    XyzComponent -> Xyz
         */
        component.pascalName = component.pascalName.replace('Component', '')
        component.kebabName = component.kebabName.replace('component', '')
      }
    }
  ],

  /**
   * Vite config
   */
  vite: {
    css: {
      preprocessorOptions: {
        /*
         ** Global Styles (Do not import actual styles)
         */
        scss: {
          additionalData: `
                @import "@/assets/style/scss/functions/_center.scss";
                @import "@/assets/style/scss/functions/_triangle.scss";
                @import "@/assets/style/scss/mixins/_font.scss";
                @import "@/assets/style/scss/mixins/_gradient.scss";
              `
        }
      }
    }
  },

  /*
   ** Global Styles (Actual styles)
   */
  css: [
    // Actual styles entry point
    '@/assets/style/scss/app.scss'
  ],

  /**
   * PostCSS config
   */
  postcss: {
    plugins: {
      autoprefixer: {
        grid: true
      }
    }
  },

  /**
   * Modules
   */
  modules: [
    [
      '@nuxtjs/eslint-module',
      {
        // eslint module options
      }
    ],
    // https://github.com/nuxt-community/stylelint-module
    [
      '@nuxtjs/stylelint-module',
      {
        include: './src/{assets/style,components,layouts,pages}/**/*.{css,sass,scss,less,stylus,vue}'
      }
    ]
  ],

  /**
   * Hooks
   */
  hooks: {
    'pages:extend'(routes) {
      routes.push(
        {
          name: 'index',
          path: '/',
          file: '@/pages/Home/Home.page.vue'
        },
        {
          path: '/about',
          file: '@/pages/About/About.page.vue'
        }
      )
    }
  },

  /**
   * Experimental options
   */
  experimental: {
    typedPages: true
  }
})
