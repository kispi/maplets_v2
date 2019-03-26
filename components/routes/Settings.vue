<template>
    <div class="settings route">
        <RadioButtons
            v-model="lang"
            @change="onLanguage"
            :items="languages"/>
        <RadioButtons
            class="m-t-8"
            v-model="background"
            @change="onBackground"
            :items="backgroundOption"/>
        <RadioButtons
            class="m-t-8"
            v-model="chat"
            @change="onChat"
            :items="chatOption"/>
    </div>
</template>

<script>
import RadioButtons from '@/components/app/RadioButtons'

export default {
    name: 'Settings',
    components: { RadioButtons },
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
        backgroundOption() {
            return [{ title: "SHOW_BACKGROUND", value: "show" }, { title: "HIDE_BACKGROUND", value: "hide" }]
        },
        background: {
            get() {
                return this.$store.getters.background
            },
            set(val) {
                this.$store.commit('background', val)
            }
        },
        chatOption() {
            return [{ title: "SHOW_CHAT", value: "show" }, { title: "HIDE_CHAT", value: "hide" }]
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
    methods: {
        onLanguage(lang) {
            this.lang = lang.value
            this.$toast.success("SUCCESS")
        },
        onBackground(background) {
            this.background = background.value
            this.$toast.success("SUCCESS")
        },
        onChat(chat) {
            this.chat = chat.value
            this.$toast.success("SUCCESS")
        }
    },
}
</script>