<template>
    <div class="message" :class="messageClass">
        {{ message.timestamp | formatDate("HH:mm:ss") }}
        <span v-if="!isWhisper">
            <span>{{ (message.user || {}).nickname }}</span><WorldIcon :world="(message.user || {}).world"/>
        </span>
        <span v-else>
            <span>{{ partner.nickname }}</span><span v-if="isMyMessage">{{ left }}</span>
            <span v-else>
                <span v-if="partner.world !== me.world">[{{ partner.world | translate }}]</span><span>{{ right }}</span>
            </span>
        </span><span :class="shouldPadLeft">{{ (message.content || {}).text }}</span>
    </div>
</template>

<script>
import WorldIcon from '@/components/WorldIcon'

export default {
    name: 'Message',
    props: ['message'],
    components: {
        WorldIcon
    },
    computed: {
        left() {
            return "<<"
        },
        right() {
            return ">>"
        },
        // partner, me is for history.
        // 'me' is technically 'user', but they might have different nickname if user changed nickname.
        partner() {
            return (this.message.to.find(u => u.authToken !== this.user.authToken) || {})
        },
        me() {
            return (this.message.to.find(u => u.authToken === this.user.authToken) || {})
        },
        user() {
            return this.$store.getters.user
        },
        isWhisper() {
            return this.message.content.type === "WHISPER"
        },
        isMyMessage() {
            return this.message.user.authToken === this.user.authToken
        },
        messageClass() {
            if (this.message &&
            this.message.content &&
            this.message.content.type) {
                return 'ms-' + (this.message.content || {}).type.toLowerCase()
            }
            return ""
        },
        shouldPadLeft() {
            return ["ERROR", "NOTICE"].indexOf(this.message.content.type) === -1 ? 'm-l-8' : undefined
        }
    }
}
</script>
<style lang="less">
.message {
    width: 100%;
    padding: 2px;
    display: inline-block;
    word-break: break-all;
}
</style>