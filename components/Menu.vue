<template>
    <div class="menu" :ref="'menu'">
        <div class="icons flex-row">
            <Settings/>
            <i
                class="toggle-menu zmdi" :class="{'zmdi-menu': !show, 'zmdi-close': show}"
                @click="show = !show"/>
        </div>
        <transition name="slide-left">
            <ul class="shadow bgm-white p-0" v-show="show">
                <li
                    class="menu-item flex-row items-center"
                    :class="{'selected': selectedRoute === item.route}"
                    :key="item.title"
                    @click="onSelectMenu(item)"
                    v-for="item in items">
                    <i class="flex-wrap m-r-8 p-8 zmdi" :class="item.icon"/>
                    <span class="f-700">{{ item.title | translate }}</span>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import Settings from '@/components/Settings'

export default {
    name: 'Menu',
    components: { Settings },
    data: _ => ({
        selectedRoute: null,
        show: false
    }),
    watch: {
        $route (to, from, next) {
            if (to) {
                this.checkRoute(to)
            }
        }
    },
    computed: {
        items() {
            return [{
                title: "STARFORCE_CALCULATOR",
                icon: "zmdi-star",
                route: "starforce"
            }, {
                title: "MAPLE_TIPS",
                icon: "zmdi-info-outline",
                route: "tips"
            }, {
                title: "ABOUT",
                icon: "zmdi-help",
                route: "about"
            }]
        }
    },
    created() {
        if (process.client)
            document.addEventListener('click', this.collapse)
    },
    beforeDestroy() {
        if (process.client)
            document.removeEventListener('click', this.collapse)
    },
    mounted() {
        this.checkRoute(this.$route)
    },
    methods: {
        collapse(e) {
            let el = this.$refs['menu'];
            let target = e.target;
            if (el !== target && !el.contains(target)) {
                this.show = false;
            }
        },
        onSelectMenu(item) {
            this.show = false;
            this.selectedRoute = item.route
            this.$router.push({
                name: this.selectedRoute
            })
        },
        checkRoute(route) {
            let curRoute = this.items.find(menuItem => {
                return route.name === menuItem.route
            })
            this.selectedRoute = (curRoute || {}).route
        }
    }
}
</script>

<style lang="less" scoped>
.slide-left-enter-active {
    transition: all .2s ease;
}
.slide-left-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-left-enter, .slide-left-leave-to {
    transform: translateX(240px);
}
</style>
