<template>
    <div
        class="article-header pointer-cursor slow-hover p-b-8"
        :class="selected()"
        @click="onClickArticle">
        <div class="m-b-8">
            <small>[{{ article.id }}]</small><span class="m-l-5" v-html="article.title"></span><span class="c-red m-l-5" v-if="replyCount > 0">[{{ replyCount }}]</span>
        </div>
        <div class="flex-row items-center info">
            <div class="flex-wrap flex-row">
                <small class="nickname" v-html="article.nickname"></small>
                <small v-if="article.ip && !article.user">({{ article.ip | ipFront }})</small>
            </div>
            <small class="flex-wrap">{{ article.createdAt | formatDate }}</small>
            <small class="flex-wrap">{{ 'VIEWS' | translate }}: {{ article.views }}</small>
            <small class="flex-wrap" v-if="(article.expressions || {}).up">{{ 'EXPRESS_UP' | translate }} {{ article.expressions.up }}</small>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArticleHeader",
    props: ['article'],
    computed: {
        replyCount() {
            return this.article.replyCount || (this.article.replies || []).length;
        },
    },
    mounted() {
        this.$nuxt.$on('onExpressed', article => {
            if (this.article.id === article.id) {
                this.article.expressions = article.expressions
                this.$forceUpdate()
            }
        })
    },
    beforeDestroy() {
        this.$nuxt.$off('onExpressed')
    },
    methods: {
        onClickArticle() {
            this.$router.push({
                name: 'board-articleId',
                params: { articleId: this.article.id }
            })
        },
        selected() {
            if (this.$route.params.articleId == this.article.id) {
                return "selected"
            }
        }
    }
}
</script>