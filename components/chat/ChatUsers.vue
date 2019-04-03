<template>
    <div class="chat-users" v-if="users">
        <div
            class="flex-row items-center pointer-cursor"
            v-for="(user, idx) in users" :key="idx"
            v-show="user.nickname"
            @click="onClickUser(user.nickname)">
            <WorldIcon class="m-r-8" :world="user.world"/>
            <div class="c-white lines-1" :class="nameColorClass(user)">{{ user.nickname }}</div>
        </div>
    </div>
</template>
<script>
import WorldIcon from '@/components/WorldIcon'

export default {
    components: {
        WorldIcon
    },
    name: 'ChatUsers',
    computed: {
        users() {
            return this.$store.getters.users
        },
    },
    methods: {
        onClickUser(nickname) {
            if (nickname !== this.$store.getters.user.nickname) {
                this.$store.dispatch('setUser', {
                    lastChatWith: nickname,
                    selectedChatType: "WHISPER"
                })
            }
            this.$emit('onClickUser')
        },
        nameColorClass(user) {
            return this.$store.getters.user.nickname === user.nickname ? 'f-700 text-underline' : undefined
        }
    }
}
</script>
<style lang="less">
.chat-users {
    width: 120px;
    padding: 4px;

    .flex-row {
        padding: 2px;
    }
}
</style>