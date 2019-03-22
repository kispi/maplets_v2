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
        <div class="app-loading" v-if="loading && shouldShowLoading">
            <ProgressView />
        </div>

    </div>
</template>

<script>
import Menu from '@/components/Menu'
import Chat from '@/components/chat/Chat'
import Toast from '@/components/app/Toast';
import ProgressView from '@/components/app/ProgressView';

export default {
    components: {
        Menu,
        Chat,
        ProgressView,
        Toast
    },
    data: () => ({
        shouldShowLoading: false,
    }),
    watch: {
        loading() {
            this.shouldShowLoading = false;
            if (this.loading) {
                setTimeout(() => {
                    this.shouldShowLoading = true;
                }, 150);
            }
        }
    },
    name: 'App',
    methods: {
        onClickTitle() {
            this.$router.push({
                name: "Main"
            })
        }
    },
    computed: {
        loading() {
            return this.$store.getters['app/app/loading'];
        },
        background() {
            if (this.$store.getters['app/app/background'] === "hide") return;

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

.app-loading {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 20;
}
</style>