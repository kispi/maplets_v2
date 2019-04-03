const config = {
    /*
     ** Headers of the page
     */
    env: {},
    head: {
        title: 'MAPLETs',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'keywords', content: 'HTML,CSS,JavaScript' },
            { name: 'application-name', content: 'maplets' },
            { name: 'author', content: 'kispi' },
            { name: 'description', content: '' },
            { hid: 'description', name: 'description', content: '메이플스토리 헬퍼, 유틸리티들의 모음입니다. 스타포스 계산기, 아케인 포스 계산기 등을 제공합니다.' }
        ],
        link: [
            { rel: 'icon', href: '/favicon.png' }
        ],
    },
    router: {
        scrollBehavior: () => {
            return { x: 0, y: 0 }
        }
    },
    css: [
        { src: '@/assets/styles/index.less', lang: 'less' },
    ],
    plugins: [
        { src: '~/plugins/filters.js', ssr: true },
        { src: '~/plugins/ga.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: true },
        { src: '~/plugins/global.js', ssr: true },
        { src: '~/plugins/querybuilder.js', ssr: true },
        { src: '~/modules/arcane.js', ssr: true },
    ],
    dev: (process.env.NODE_ENV !== 'production'),
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}

config.env.VUE_APP_CHAT_URL = config.dev ? "http://127.0.0.1:4600/v1/" : "http://api.kispi.net:4600/v1/"
config.env.VUE_APP_API_URL = config.dev ? "http://127.0.0.1:4500/v1/" : "http://api.kispi.net:4500/v1/"

export default config