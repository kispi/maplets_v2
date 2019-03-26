<template>
    <div
        class="article-header pointer-cursor slow-hover p-b-8"
        :class="selected()"
        @click="onClickArticle">
        <div class="m-b-8">
            <small class="m-r-8">[{{ article.id }}]</small><span v-html="article.title"></span>
            <span class="c-red m-l-8" v-if="replyCount > 0">[{{ replyCount }}]</span>
        </div>
        <div class="flex-row items-center">
            <div class="nickname" v-html="article.nickname"></div>
            <div class="flex-wrap m-l-8">{{ article.createdAt | formatDate }}</div>
            <div class="flex-wrap lines-1 m-l-8">{{ 'VIEWS' | translate }}: {{ article.views }}</div>
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