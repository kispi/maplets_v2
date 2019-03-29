<template>
    <div id="app">
        <div id="background" class="img-cover" :style="background"/>
        <transition name="fade">
            <router-view/>
        </transition>
        
        <div class="header flex-row flex-between">
            <div class="title-bar flex-row items-center flex-fill pointer-cursor" @click="onClickTitle">
                <img class="logo flex-wrap m-r-8" src="@/assets/logo.png">
                <div class="text-xl flex-fill">Maplets</div>
            </div>
            <Menu/>
        </div>

        <Toast/>
        <Chat/>
        <Loading/>

    </div>
</template>

<script>
import Menu from '@/components/Menu'
import Chat from '@/components/chat/Chat'
import Loading from '@/components/app/Loading'
import Toast from '@/components/app/Toast'

export default {
    components: {
        Menu,
        Chat,
        Loading,
        Toast,
    },
    name: 'App',
    methods: {
        onClickTitle() {
            this.$router.push("/")
        }
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
        }
    }
}
</script>

<style lang="less">
#app {
    padding: 16px;
}
</style>