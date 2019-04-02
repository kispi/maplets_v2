<template>
    <div class="write-reply">
        <div class="flex-row items-center m-b-8">
            <input
                name="nickname"
                maxlength="30"
                class="m-r-8"
                :placeholder="'NICKNAME' | translate"
                v-model="reply.nickname"/>
            <input
                type="password"
                maxlength="12"
                class="m-r-8"
                name="password"
                :placeholder="'PASSWORD' | translate"
                v-model="reply.password"/>
            <button
                type="button"
                ref="save"
                class="btn btn-sm bgm-rare b-sm flex-fill"
                style="min-width: 160px;"
                :class="{ 'disabled' : !valid }"
                @click="onClickSave">{{ 'SAVE' | translate }}</button>
        </div>
        <textarea
            class="input-block"
            name="text"
            maxlength="1000"
            :placeholder="'WRITE_REPLY_PLACEHOLDER' | translate"
            v-model="reply.text"/>
    </div>
</template>
<script>
import * as $http from 'axios';

export default {
    props: ['article'],
    data: () => ({
        reply: {
            article: null,
            user: null,
            nickname: null,
            password: null,
            text: null,
        },
        valid: false,
        validLength: false
    }),
    watch: {
        reply: {
            handler(newVal) {
                if (!newVal.nickname ||
                    !newVal.password ||
                    !newVal.text) {
                    this.valid = false;
                    this.validLength = false;
                    return
                }

                this.valid =   
                    (newVal.nickname !== "" &&
                    this.$options.filters.alphaNumeric(newVal.nickname) &&
                    newVal.password !== "" &&
                    newVal.text !== "");

                this.validLength =
                    (newVal.nickname.length <= 30 &&
                    newVal.password.length <= 12 &&
                    newVal.text.length <= 1000);
            },
            deep: true
        },
        article: {
            handler(newVal) {
                this.reply.article.id = newVal.id
            },
            deep: true
        }
    },
    mounted() {
        this.initReply();
    },
    methods: {
        initReply() {
            this.reply = {
                article: {
                    id: this.article.id
                },
                user: null,
                nickname: this.$store.getters.user.nickname,
                password: null,
                text: null,
                ip: this.$ip()
            }
        },
        async onClickSave() {
            let save = this.$refs["save"];
            if (!this.valid) {
                this.$shake(save);
                this.$toast.error("ERROR_REQUIRED_FIELDS")
                return
            }
            if (!this.validLength) {
                this.$shake(save)
                this.$toast.error("ERROR_INVALID_LENGTH")
                return
            }
            if (!this.$options.filters.alphaNumeric(this.reply.nickname)) {
                this.$shake(save)
                this.$toast.error("ERROR_NICKNAME_INVALID")
                return
            }

            try {
                const resp = await this.$api("post", "replies", {}, this.reply);
                this.$nuxt.$emit('onRepliesMutated', resp.data.data);
                this.$toast.success("SAVED");
                this.initReply();
            } catch (e) {
                let errMsg = "ERROR_SAVE"
                if (e.response && e.response.data) {
                    errMsg = e.response.data
                }
                this.$toast.error(errMsg)
            }
        }
    }
}
</script>