<template>
    <div class="settings">
        <div class="flex-row">
            <i
                @click="btn.action"
                class="zmdi"
                :class="btn.icon"
                :key="btn.title"
                v-for="btn in items"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data: () => ({
        items: [],
    }),
    computed: {
        languages() {
            return [{ title: "KOREAN", value: "kr"}, { title: "ENGLISH", value: "en"}]
        },
        lang: {
            get() {
                return this.$store.getters.translation.locale
            },
            set(langVal) {
                this.$store.commit('setLocale', langVal)
            }
        },
        background: {
            get() {
                return this.$store.getters.background
            },
            set(val) {
                this.$store.commit('background', val)
            }
        },
        chat: {
            get() {
                return this.$store.getters.chat
            },
            set(val) {
                this.$store.commit('chat', val)
            }
        }
    },
    mounted() {
        this.items = [{
            title: "languages",
            icon: "zmdi-font",
            action: lang => {
                this.lang = this.lang === "kr" ? "en" : "kr"
                this.$toast.success("SUCCESS")
            }
        }, {
            title: "background",
            icon: "zmdi-image-o",
            action: background => {
                this.background = this.background === "show" ? "hide" : "show"
                this.$toast.success("SUCCESS")
            }
        }, {
            title: "chat",
            icon: "zmdi-comment-outline",
            action: chat => {
                this.chat = this.chat === "show" ? "hide" : "show"
                this.$toast.success("SUCCESS")
            }
        }]
    }
}
</script>