<template>
    <div class="chat">

        <div v-if="connected === false && chat === 'show'">
            <div class="overlay bgm-gray o-50"></div>
            <div class="overlay flex-row items-center">
                <button
                    class="btn btn-default b-md m-a"
                    @click="connect"
                    style="max-width: 120px;">{{ 'RECONNECT' | translate }}</button>
            </div>
        </div>

        <ConfirmChatUser v-show="showConfirmChatUser" @close="showConfirmChatUser = false"/>
        <ConfirmChatType v-show="showConfirmChatType" @close="showConfirmChatType = false" @onConfirm="onConfirmChatType"/>

        <div class="flex-row o-hidden">
            <div class="btn-container p-relative chat-buttons flex-wrap">
                <transition-group name="fade">
                    <div class="overlay" v-show="chat === 'show'" :key="0"></div>
                    <button
                        :key="1"
                        v-show="chat === 'show'"
                        class="btn font-hover-shadow flex-fill"
                        @click="showConfirmChatUser = true"><i class="zmdi zmdi-account"></i></button>
                    <button
                        :key="2"
                        v-show="chat === 'show'"
                        class="btn font-hover-shadow flex-fill m-t-8"
                        @click="clearMessages"><i class="zmdi zmdi-delete"></i></button>
                </transition-group>
                <button
                    :key="1"
                    class="btn font-hover-shadow flex-fill m-t-8"
                    @click="toggleWindow">
                    <i class="zmdi zmdi-comment" v-show="chat !== 'show'"></i>
                    <i class="zmdi zmdi-close" v-show="chat === 'show'"></i>
                </button>
            </div>
            <transition name="slide-up">
                <div class="flex-fill" v-show="chat === 'show'">
                    <div class="flex-row chat-upper">
                        <div class="chat-window" ref="chat-window">
                            <Message
                                :message="message"
                                v-for="(message, idx) in messages"
                                :key="idx"/>
                        </div>
                        <ChatUsers class="flex-wrap" v-show="chat === 'show'" @onClickUser="focusChatInputBox"/>
                    </div>
                    <div class="flex-row items-center chat-status">
                        <div class="btn flex-wrap chat-type text-ellipsis" @click="showConfirmChatType = true">{{ displayedChatType }}</div>
                        <input
                            class="flex-fill"
                            :disabled="disableChat"
                            @focus="onFocus"
                            @blur="onBlur"
                            v-model="text"
                            @keypress.enter="send"
                            :ref="'chatInputBox'"
                            maxlength="100">
                        <button type="button" class="btn flex-wrap" @click="send">{{ 'SEND' | translate }}</button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import ConfirmChatType from '@/components/modals/ConfirmChatType'
import ConfirmChatUser from '@/components/modals/ConfirmChatUser'
import ChatUsers from '@/components/chat/ChatUsers'
import Message from '@/components/chat/Message'
import Selector from '@/components/app/Selector'
import mobileDetect from '@/modules/mobile-detect'
import * as $http from 'axios'

export default {
    name: 'Chat',
    components: {
        ConfirmChatType,
        ConfirmChatUser,
        ChatUsers,
        Message,
        Selector
    },
    data: () => ({
        showConfirmChatUser: false,
        showConfirmChatType: false,
        messages: [],
        text: null,
        disableChat: false,
        connected: undefined,
    }),
    computed: {
        user: {
            get() {
                return this.$store.getters.user
            },
            set(user) {
                this.$store.dispatch('setUser', user)
            }
        },
        displayedChatType() {
            if (this.user.selectedChatType !== 'WHISPER') 
                return this.$translate(this.user.selectedChatType)
            return this.user.lastChatWith
        },
        chat: {
            get() {
                return this.$store.getters.chat
            },
            set(chat) {
                this.$store.commit('chat', chat)
            }
        },
    },
    created() {
        this.$nuxt.$on('requestSetUser', user => {
            this.dataStream.send(JSON.stringify({
                eventType: "SET_USER",
                user
            }))
        })
        if (process.client) document.addEventListener('keyup', this.keyBinding);
    },
    beforeDestroy() {
        this.$nuxt.$off('requestSetUser');
        if (process.client) document.removeEventListener('keyup', this.keyBinding);
        this.dataStream.close();
    },
    mounted() {
        this.connect();
        if (!mobileDetect()) {
            this.chat = "show"
        }
        this.$options.filters.translate("CHAT_HELP").split("\n").forEach(msg => {
            this.pushNoticeMessage(msg)
        })
    },
    methods: {
        connect() {
            if (this.connected) {
                return
            }

            if (this.dataStream) {
                this.dataStream.close();
            }
            this.dataStream = undefined;

            const base = process.env.VUE_APP_CHAT_URL.replace("http", "ws");
            const uri = base + "webchat/socket";
            this.dataStream = new WebSocket(uri);

            this.dataStream.onopen = event => {
                this.login()
                this.scrollToBottom();
                this.$toast.success("CONNECTED");
            }

            this.dataStream.onerror = event => {
                this.connected = false;
            }

            this.dataStream.onclose = event => {
                this.$toast.error("DISCONNECTED");
                this.connected = false;
            }

            this.dataStream.onmessage = event => {
                this.handleMessage(event)
            }
        },
        // This tries to reconnect automatically, but I'll use just reconnect button instead for now.
        reconnect() {
            if (this.interv) {
                return
            }

            this.interv = setInterval(_ => {
                if (this.connected) {
                    clearInterval(this.interv)
                    return
                }
                this.connect()
            }, 1000)
        },
        pushNoticeMessage(msg) {
            this.pushMessageToArray({
                content: {
                    text: msg,
                    type: "NOTICE"
                }
            })
        },
        pushErrorMessage(errMsg) {
            this.pushMessageToArray({
                content: {
                    text: errMsg,
                    type: "ERROR"
                }
            })
        },
        handleMessage(e) {
            const onEventMsg = msg => {
                if (msg) {
                    switch (msg.eventType) {
                    case "CHAT":
                        if (msg.status === "SUCCESS") {
                            this.pushMessageToArray(msg)
                            if (msg.content.type === "WHISPER") {
                                // Don't set userWhisperedToMe from myself.
                                if (msg.user.nickname !== this.user.nickname) {
                                    this.$store.commit('setUserWhisperedToMe', msg.user.nickname)
                                }
                            }
                        } else if (msg.status.includes("USER_NOT_FOUND")) {
                            let errMsg = msg.status.split(":")[0]
                            let triedPartner = msg.status.split(":")[1]
                            msg.to.push({ nickname: triedPartner })
                            this.pushMessageToArray(msg)
                            this.pushErrorMessage(this.$translate(errMsg).replace(/%s/, triedPartner))
                        } else if (msg.status === "INVALID_USER_INFO") {
                            this.pushErrorMessage(this.$translate(msg.status))
                        }
                        break;
                    case "SET_USER":
                        if (msg.status === "SUCCESS") {
                            this.$nuxt.$emit("onSuccessSetUser", msg.user);
                            this.disableChat = false
                            this.connected = true
                            if (!this.user.selectedChatType) {
                                this.user.selectedChatType = "NORMAL";
                            }
                            this.broadcastChange()
                            this.focusChatInputBox()
                        } else {
                            this.$store.dispatch("removeUser")
                            this.connect()
                        }
                        break;
                    case "GET_USERS":
                        if (msg.status === "SUCCESS") {
                            this.$store.commit('updateUsersList', msg.connectedClients)
                        }
                        break;
                    case "BROADCAST_CHANGE":
                    case "ENTER":
                    case "LEAVE":
                        this.getUsers();
                    }
                }
            }

            let msg;
            let data = event.data || "";
            data.split("\n").forEach(item => {
                try {
                    msg = JSON.parse(data);
                    if (msg) {
                        onEventMsg(msg);
                    }
                } catch (e) {
                    msg = JSON.parse(item);
                    onEventMsg(msg);
                }
            });
        },
        login() {
            if (this.dataStream && this.user) {
                this.dataStream.send(JSON.stringify({
                    eventType: "SET_USER",
                    user: this.user
                }))
            }        
        },
        getUsers() {
            this.dataStream.send(JSON.stringify({
                eventType: "GET_USERS",
                user: this.user
            }))
        },
        broadcastChange() {
            this.dataStream.send(JSON.stringify({
                eventType: "BROADCAST_CHANGE",
                user: this.user
            }))
        },
        async send() {
            if (!this.text) {
                return;
            } else if (this.text.trim().length === 0) {
                this.text = null;
                return;
            }

            let message = {
                user: this.user,
                eventType: "CHAT",
                content: {
                    type: this.user.selectedChatType,
                    text: this.text.trim(),
                }
            }
            if (this.user.selectedChatType === "WHISPER" &&
                this.user.lastChatWith) {
                message.user = this.user
                message.to = [{
                    nickname: this.user.lastChatWith,
                }, this.user]
            }
            this.dataStream.send(JSON.stringify(message))

            this.text = null;
            this.focusChatInputBox();
        },
        focusChatInputBox() {
            setTimeout(_ => {
                let chatInputBox = this.$refs['chatInputBox'];
                if (chatInputBox) {
                    chatInputBox.focus();
                    this.onFocus();
                }
            }, 0)
        },
        pushMessageToArray(message) {
            if ((this.messages || []).length >= 200) {
                this.messages.shift()
            }
            this.messages.push(message)
            this.scrollToBottom();
        },
        scrollToBottom() {
            setTimeout(_ => {
                let container = this.$refs['chat-window'];
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            }, 0)
        },
        clearMessages() {
            this.messages = [];
        },
        onFocus() {
            this.$refs['chatInputBox'].classList.add('focused')
        },
        onBlur() {
            this.$refs['chatInputBox'].classList.remove('focused')
        },
        keyBinding(e) {
            let tag = e.target.tagName.toUpperCase()
            if (tag === "TEXTAREA" || tag === "INPUT") {
                return
            }
            
            let chatBox = this.$refs['chatInputBox']
            if (e.keyCode === 72 && chatBox && !chatBox.classList.contains('focused')) {
                if (!this.showConfirmChatUser) {
                    this.showConfirmChatType = true;
                }
            } else if (e.keyCode === 27) {
                if (this.showConfirmChatType) {
                    this.showConfirmChatType = false
                }
                if (chatBox && chatBox.classList.contains('focused')) {
                    chatBox.blur();
                    this.onBlur();
                }
            }
        },
        onConfirmChatType() {
            this.focusChatInputBox();
            this.showConfirmChatType = false;
        },
        toggleWindow() {
            this.chat = this.chat === "show" ? "hide" : "show"
        }
    }
}
</script>
<style lang="less" scoped>
.slide-up-enter-active {
    transition: all .15s ease;
}

.slide-up-leave-active {
    transition: all .15s ease;
}

.slide-up-enter, .slide-fade-leave-to {
    transform: translateY(100%);
    opacity: 1;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.chat {
    font-family: Arial;
    font-size: 14px;
}
</style>