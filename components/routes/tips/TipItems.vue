<template>
    <div class="tip-items">
        <div
            class="tip-item flex-fill c-white text-center slow-hover pointer-cursor b-md p-8 m-b-8"
            :class="tip.class"
            :key="tip.title"
            v-for="tip in tips"
            @click="onClickTip(tip.route)">
            {{ tip.title | translate }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'TipItems',
    computed: {
        tips() {
            return [{
                title: "ABILITY",
                route: "tips-ability",
                class: "bgm-legendary",
            }, {
                title: "LINK",
                route: "tips-link",
                class: "bgm-rare",
            }, {
                title: "CUBE_PROBABILITY",
                route: "tips-cube-probability",
                class: "bgm-unique"
            }, {
                title: "UNION",
                route: "tips-union",
                class: "bgm-gray",
            }]
        },
    },
    methods: {
        onClickTip(route) {
            this.$router.push({ name: route })
        }
    }
}
</script>
<style lang="less">
.tip-items {
    .tip-item {
        min-height: 60px;
        line-height: 60px;
    }
}
</style>