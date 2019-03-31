<template>
    <div class="main route">
        <div class="grid-container">
            <button
                class="btn font-hover-shadow"
                :class="btn.class"
                @click="onClick(btn.route)"
                v-for="btn in buttons"
                :key="btn.title">{{ btn.name | translate }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data: () => ({
        data: {}
    }),
    computed: {
        buttons() {
            return [{ route: "starforce", name: "STARFORCE", class: "bgm-yellow c-black" },
                { route: "arcane", name: "ARCANE", class: "bgm-teal" },
                { route: "tips", name: "MAPLE_TIPS", class: "bgm-legendary" },
                { route: "board", name: "BOARD", class: "bgm-epic" },
                { route: "settings", name: "SETTINGS", class: "bgm-rare" },
                { route: "about", name: "ABOUT", class: "bgm-unique" }]
        }
    },
    methods: {
        onClick(route) {
            this.$router.push({
                name: route
            })
        }
    },
}
    
</script>

<style lang="less" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
}
</style>
