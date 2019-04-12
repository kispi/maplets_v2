<template>
    <div class="not-found route">
        <div class="container flex-row items-center">
            <div class="c-white text-center flex-row items-center">
                <div>
                    <img src="@/assets/images/orange_mushroom.png">
                    <div
                        :class="labelClass"
                        class="text-xxl m-t-8">404</div>
                    <div
                        :class="labelClass"
                        class="text-xl"
                        v-html="$options.filters.translate('NOT_FOUND')"></div>
                    <button
                        @click="onClick404"
                        class="btn bgm-legendary b-md m-a m-t-16">
                        {{ 'GO_TO_BOARD' | translate }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        }
    },
    methods: {
        onClick404() {
            this.$router.push({
                name: "board"
            })
        },
    }
}
</script>