<template>
    <div id="app">
        <div id="background" class="img-cover" :style="background"/>
        <transition name="fade">
            <router-view/>
        </transition>
        
        <div class="header flex-row flex-between">
            <div class="title-bar flex-row items-center flex-fill cursor-pointer" @click="onClickTitle">
                <img class="logo flex-wrap m-r-8" src="@/assets/logo.png">
                <div class="text-xl flex-fill">Maplets</div>
            </div>
            <Menu/>
        </div>

        <Toast/>
        <Loading/>

    </div>
</template>

<script>
import Menu from '@/components/Menu'
import Loading from '@/components/app/Loading'
import Toast from '@/components/app/Toast'
import mobileDetect from '@/modules/mobile-detect'

export default {
    components: {
        Menu,
        Loading,
        Toast,
    },
    name: 'App',
    methods: {
        onClickTitle() {
            this.$router.push("/")
        },
        redirectToIENotSupported() {
            let ua = window.navigator.userAgent
            let msie = ua.indexOf('MSIE')
            let trident = ua.indexOf('Trident/')

            if (process.client && (msie > 0 || trident > 0)) {
                this.$store.commit('chat', 'hide')
                this.$router.push({
                    name: 'ie-not-supported'
                })
            }
        },
    },
    watch: {
        $route() {
            this.redirectToIENotSupported()
        }
    },
    mounted() {
        this.redirectToIENotSupported()
    },
    computed: {
        background() {
            if (this.$store.getters.background === "hide") return;

            let idx = Math.floor(Math.random() * this.backgrounds.length);
            let result = "background-image: url('" + this.backgrounds[idx].img + "');";
            return result;
        },
        backgrounds() {
            return [
                { title: "arcana" },
                { title: "ellinia" },
                { title: "esfera" },
                { title: "kerningcity" },
                { title: "lacheln" },
                { title: "sleepywood" },
                { title: "treedungeon" }].map(bg => {
                    return {
                        title: bg.title,
                        img: require("@/assets/images/backgrounds/bg-" + bg.title + ".jpg")
                    }
                })
        },
    },
}
</script>

<style lang="less">
#app {
    height: 100%;
}

#__nuxt, #__layout {
    height: 100%;
}
</style>
