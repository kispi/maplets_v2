<template>
    <div class="write-article route">

        <Modal v-if="!writeAllowed" @close="onCloseWriteArticlePassword">
            <h2 class="c-danger" slot="header">{{ 'ENTER_PASSWORD' | translate }}</h2>
            <div slot="body">
                <input type="password" v-model="article.password" :placeholder="'PASSWORD' | translate">
            </div>
            <div slot="footer" class="m-l-a" style="width: 240px;">
                <div class="flex-row">
                    <button @click="onCloseWriteArticlePassword" class="btn btn-default b-md m-r-8">{{ 'CANCEL' | translate }}</button>
                    <button @click="onClickConfirmPassword" class="btn btn-danger b-md">{{ 'CONFIRM' | translate }}</button>
                </div>
            </div>
        </Modal>

        <div v-if="writeAllowed">
            <form>
                <div class="flex-row m-b-8">
                    <input
                        name="nickname"
                        maxlength="30"
                        class="form-control m-r-8"
                        :placeholder="'NICKNAME' | translate"
                        v-model="article.nickname"/>
                    <input
                        type="password"
                        name="password"
                        maxlength="12"
                        class="form-control"
                        :placeholder="'PASSWORD' | translate"
                        v-model="article.password"/>
                </div>
                <input
                    name="title"
                    maxlength="100"
                    class="form-control m-b-8"
                    :placeholder="'WRITE_TITLE_PLACEHOLDER' | translate"
                    v-model="article.title"/>
                <textarea
                    name="text"
                    maxlength="10000"
                    :placeholder="'WRITE_TEXT_PLACEHOLDER' | translate"
                    v-model="article.text"/>
            </form>
            <div class="flex-row m-t-8">
                <button
                    class="btn btn-default b-sm m-r-8" @click="onClickCancel">{{ 'CANCEL' | translate }}</button>
                <button
                    ref="save"
                    class="btn bgm-rare b-sm"
                    :class="{ 'disabled' : !valid || !validLength }"
                    @click="onClickSave">{{ 'SAVE' | translate }}</button>
            </div>
        </div>
    </div>
</template>

<script>
import * as $http from 'axios'
import Modal from '@/components/modals/Modal'

export default {
    name: "WriteArticle",
    data: () => ({
        article: {
            board: null,
            nickname: null,
            password: null,
            title: null,
            text: null,
        },
        valid: false,
        validLength: false,
        passedArticle: null,
        writeAllowed: false,
    }),
    components: { Modal },
    computed: {
        board() {
            return this.$store.getters.board
        },
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        article: {
            handler(newVal) {
                if (!newVal.nickname ||
                    !newVal.password ||
                    !newVal.title ||
                    !newVal.text) {
                    this.valid = false;
                    this.validLength = false;
                    return
                }

                this.valid =   
                    (newVal.nickname !== "" &&
                    newVal.password !== "" &&
                    newVal.title !== "" &&
                    newVal.text !== "");

                this.validLength =
                    (newVal.nickname.length <= 30 &&
                    newVal.password.length <= 12 &&
                    newVal.title.length <= 100 &&
                    newVal.text.length <= 10000);
            },
            deep: true
        }
    },
    methods: {
        onClickCancel() {
            this.$router.go(-1)
        },
        async onClickSave() {
            let save = this.$refs["save"]
            if (!this.valid) {
                this.$shake(save)
                this.$toast.error("ERROR_REQUIRED_FIELDS")
                return
            }
            if (!this.validLength) {
                this.$shake(save)
                this.$toast.error("ERROR_INVALID_LENGTH")
                return
            }
            if (!this.$options.filters.alphaNumeric(this.article.nickname)) {
                this.$shake(save)
                this.$toast.error("ERROR_NICKNAME_INVALID")
                return
            }

            this.article.board = this.board;
            try {
                this.$loading(true);
                let posted;
                if (this.passedArticle) {
                    const resp = await this.$api("put", "articles/" + this.$route.params.articleId, {}, this.article)
                    posted = resp.data.data
                } else {
                    const resp = await this.$api("post", "articles", {}, this.article)
                    posted = resp.data.data
                }
                this.$toast.success("SAVED")
                this.$router.push({ name: "board-articleId", params: { articleId: posted.id } })
            } catch (e) {
                let errMsg = "ERROR_SAVE"
                if (e.response && e.response.data) {
                    errMsg = e.response.data
                }
                this.$toast.error(errMsg)
            } finally {
                this.$loading(false)
            }
        },
        goBack() {
            this.$router.push({ name: "board-articleId", params: { articleId: this.$route.params.articleId } })
        },
        onCloseWriteArticlePassword() {
            this.goBack()            
        },
        async populateFromPassedArticle() {
            try {
                const resp = await this.$api("get", "articles/" + this.$route.params.articleId)
                this.passedArticle = resp.data.data
                if (this.passedArticle) {
                    this.article = this.passedArticle
                    this.article.password = null
                }
            } catch (e) {}
        },
        async onClickConfirmPassword() {
            try {
                const resp = await this.$api("post", "articles/" + this.$route.params.articleId + "/checkPassword", {}, {
                    password: this.article.password
                })
                this.writeAllowed = resp.data.data === "success"
                this.populateFromPassedArticle()
            } catch (e) {
                this.$toast.error("ERROR_WRITE_ARTICLE")
                this.goBack()
            }
        },
        async init() {
            if (!this.$route.params.articleId) {
                this.writeAllowed = true
                this.article.ip = this.$ip()
                this.article.nickname = this.$store.getters.user.nickname
            }
            await this.$store.dispatch('loadBoard')
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="less" scoped>
.write-article {
    input, textarea {
        width: 100%;
    }

    textarea {
        height: 240px;
        resize: none;
    }
}
</style>