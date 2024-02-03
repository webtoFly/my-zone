// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: "UTF-8",
            viewport: "width=device-width, initial-scale=1.0",
            title: "首页",
            meta: [{name: "description", content: "首页"}],
        },
        layoutTransition: {
            name: "layout",
            mode: "out-in"
        },
        pageTransition: {
            name: "page",
            mode: "out-in"
        }
    },
    ssr: false,
    devtools: {enabled: true},
    modules: ["@element-plus/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt"],
    postcss: {},
    css: ["~/assets/css/base.scss", "~/assets/css/element.scss","~/assets/css/index.scss", "~/assets/css/animation.scss",],//全局css
    vite: {
        css: {
            preprocessorOptions: {
                // scss预编译
                scss: {
                    additionalData: '@import "assets/css/config.scss";@import "~/assets/css/common.scss";',
                }
            }
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 2024
    },
    nitro: {
        devProxy: {
            '/webApi': {
                target: "http://192.168.188.32",
                changeOrigin: true,
                prependPath: true
            }
        },
    }
})
