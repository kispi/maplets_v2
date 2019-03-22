<template>        
    <div class="article shadow">
        
        <Modal v-if="showConfirmPassword" @close="showConfirmPassword = false">
            <h2 class="c-danger" slot="header">{{ 'DELETE_ARTICLE_TITLE' | translate }}</h2>
            <div slot="body">
                <input type="password" v-model="password" :placeholder="'PASSWORD' | translate">
            </div>
            <div slot="footer" class="m-l-a" style="width: 240px;">
                <div class="flex-row">
                    <button @click="showConfirmPassword = false" class="btn btn-default b-md m-r-8">{{ 'CANCEL' | translate }}</button>
                    <button @click="onClickConfirm" class="btn btn-danger b-md">{{ 'CONFIRM' | translate }}</button>
                </div>
            </div>
        </Modal>

        <ArticleHeader
            class="c-white p-8"
            :article="article"/>
        <div
            :class="'article-' + article.id">
            <div class="article-buttons m-8 m-l-a">
                <div class="flex-row flex-between">
                    <button
                        class="btn btn-sm b-md bgm-epic flex-fill m-r-8"
                        @click="onClickEdit"><i class="zmdi zmdi-edit m-r-8"></i>{{ 'EDIT' | translate }}</button>
                    <button
                        class="btn btn-sm b-md btn-danger flex-fill"
                        @click="showConfirmPassword = true">
                        <i class="zmdi zmdi-delete m-r-8"></i>{{ 'DELETE' | translate }}</button>
                </div>
            </div>
            <div class="text pre-wrap" v-html="article.text"></div>
            <Replies :article="article"/>
        </div>
    </div>
</template>

<script>
import ArticleHeader from '@/components/routes/board/ArticleHeader'
import Replies from '@/components/routes/board/Replies'
import Modal from '@/components/modals/Modal'

export default {
    name: "Article",
    props: ['article'],
    data: () => ({
        password: null,
        showConfirmPassword: false,
    }),
    components: { ArticleHeader, Replies, Modal },
    methods: {
        onClickEdit() {
            this.$router.push({
                name: 'Write-ArticleId',
                params: {
                    articleId: this.article.id
                }
            })
        },
        async onClickConfirm() {
            if (this.password) {
                try {
                    await this.$api("delete", "articles/" + this.article.id + "?password=" + this.password)
                    this.$toast.success("DELETED")
                    this.$router.push({
                        name: "Board"
                    })
                } catch (e) {
                    this.$toast.error("DELETE_FAILED")
                }
            }
            this.password = null
            this.showConfirmPassword = false
        }
    }
}
</script>
<style lang="less">
.article {
    .article-buttons {
        width: 240px;
    }

    .text {
        padding: 16px 8px;
        border-top: 1px dotted gray;
        border-bottom: 1px dotted gray;
        max-width: 100%;
        
        img {
            max-width: 100% !important;
        }
    }
}
</style>