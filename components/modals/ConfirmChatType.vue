<template>
    <transition name="modal">
        <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
            <div class="modal-wrapper confirm-chat-type">
                <div class="modal-container">
                    <div class="modal-body">
                        <RadioButtons
                            v-model="selectedChatType"
                            @change="onSelectChatType"
                            :hideCheck="true"
                            :items="chatTypes"/>
                        <div class="form-control m-t-8">
                            <label
                                class="c-white"
                                v-if="chatType === 'WHISPER'">{{ 'TYPE_CHAT_PARTNER' | translate }}</label>
                            <input
                                :ref="'lastChatWith'"
                                class="block m-t-8"
                                v-model="nickname"
                                v-if="chatType === 'WHISPER'"
                                :placeholder="'NICKNAME' | translate"
                                maxlength="12"
                                @focus="$event.target.select()"
                                @keyup.enter="onConfirmChatType">
                        </div>
                        <div class="btn-container flex-row justify-end m-t-8">
                            <button class="btn btn-accent flex-fill b-sm m-r-8" @click="onConfirmChatType">{{ 'CONFIRM' | translate }}</button>
                            <button class="btn btn-accent flex-fill b-sm" @click="$emit('close')">{{ 'CANCEL' | translate }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import RadioButtons from '@/components/app/RadioButtons'

export default {
    name: 'ConfirmChatType',
    components: {
        RadioButtons
    },
    data: () => ({
        chatType: null,
        nickname: null,
    }),
    mounted() {
        this.chatType = this.selectedChatType
        if (this.lastChatWith) {
            this.nickname = this.lastChatWith
        }
        // since this.userWhisperedToMe will always be set to null after user confirmed,
        // it should have higher priority than this.lastChatWith
        if (this.userWhisperedToMe) {
            this.nickname = this.userWhisperedToMe
        }
        if (this.chatType === "WHISPER") {
            setTimeout(_ => this.$refs['lastChatWith'].select(), 0)
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        userWhisperedToMe: {
            get() {
                return this.$store.getters.userWhisperedToMe
            },
            set(val) {
                this.$store.commit('setUserWhisperedToMe', val)
            }
        },
        selectedChatType: {
            get() {
                return this.user.selectedChatType
            },
            set(chatType) {
                this.user.selectedChatType = chatType
                this.$store.dispatch('setUser', this.user)
            }
        },
        chatTypes() {
            return ['ITEM', 'NORMAL', 'MEGAPHONE', 'WHISPER'].map(title => {
                return {
                    title,
                    value: title
                }
            })
        },
        lastChatWith: {
            get() {
                return this.user.lastChatWith
            },
            set(thisGuy) {
                this.user.lastChatWith = thisGuy
                this.$store.dispatch('setUser', this.user)
            }
        }
    },
    methods: {
        emitIfMaskIsClicked(e) {
            if (e.target.className.includes('modal-wrapper'))
                this.$emit('close');
        },
        onSelectChatType(emitted) {
            this.chatType = emitted.value;
            if (emitted.value === "WHISPER") {
                setTimeout(_ => this.$refs['lastChatWith'].focus(), 0)
                return
            }
            this.onConfirmChatType()
        },
        onConfirmChatType() {
            if (this.chatType !== "WHISPER") {
                this.selectedChatType = this.chatType;
                this.$emit('onConfirm');
                return;
            }

            let nicknameError = this.$options.filters.hasNicknameError(this.nickname)
            if (nicknameError) {
                this.$toast.error(nicknameError)
                return
            }

            if (this.nickname === this.user.nickname) {
                this.$toast.error("ERROR_SELF_WHISPER")
                return
            }

            this.selectedChatType = this.chatType;
            this.lastChatWith = this.nickname;
            this.userWhisperedToMe = null;
            this.$emit('onConfirm');
        },
    }
}
</script>