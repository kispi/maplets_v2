module.exports = {
    /*
     ** Headers of the page
     */
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
        script: [
            { src: '//ip.fatc.club' }
        ]
    },
    css: [
        { src: '@/assets/styles/index.less', lang: 'less' },
    ],
    plugins: [
        { src: '~/plugins/filters.js', ssr: true },
        { src: '~/plugins/ga.js', ssr: true },
        { src: '~/plugins/axios.js', ssr: true },
        { src: '~/plugins/global.js', ssr: true },
        { src: '~/plugins/querybuilder.js', ssr: true },
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