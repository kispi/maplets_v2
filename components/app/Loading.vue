<template>
    <div class="loading" v-show="show && shouldShowLoading">
        <Preloader/>
    </div>
</template>

<script>
import Preloader from "@/components/app/Preloader";

export default {
    name: 'Loading',
    components: { Preloader },
    data: () => ({
        shouldShowLoading: false,
        show: false,
    }),
    watch: {
        show() {
            this.shouldShowLoading = false;
            if (this.show) {
                setTimeout(() => {
                    this.shouldShowLoading = true;
                }, 150);
            }
        }
    },
    mounted() {
        this.$nuxt.$on('onSetLoading', v => {
            this.show = v;
        })
    }
};
</script>


<style lang="less">
.center {
    margin: 16px 0px;
}

.loading {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 20;
}

.preloader-wrapper {
    margin: auto;
}
</style>