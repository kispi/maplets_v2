<template>
    <div class="board route">
        <a
            @click="onClickWrite"
            class="btn bgm-legendary b-sm m-l-a m-b-32">
            <i class="zmdi zmdi-edit m-r-8"></i>
            {{ 'WRITE' | translate }}
        </a>

        <transition name="fade">
            <Article
                class="m-b-32"
                :article="article"
                v-if="article"/>
        </transition>

        <div class="articles">
            <ArticleHeader
                :article="article"
                class="bgm-white p-8 m-0"
                :key="article.id"
                v-for="article in articles"/>
        </div>

        <!-- <Pagination
            @click="onClickPage"
            :selected="selected"
            :limit="limit"
            :items="articles"/> -->
    </div>
</template>

<script>
import * as $http from 'axios'
import Article from '@/components/routes/board/Article'
import ArticleHeader from '@/components/routes/board/ArticleHeader'
// import Pagination from '@/components/routes/board/Pagination'

export default {
    name: 'Board',
    components: { Article, ArticleHeader },//, Pagination },
    data: () => ({
        selected: 0,
        limit: -1,
    }),
    props: ['articles', 'article', 'board'],
    head: () => ({
        title: '자유게시판 :: MAPLETs',
        meta: [
            { name: 'description', content: '익명 사용 가능한 자유게시판입니다. 계정생성 & 로그인 기능은 추후 제공 될 수 있습니다.' }
        ]
    }),
    created() {
        this.$nuxt.$on('onRepliesMutated', this.reload)
    },
    beforeDestroy() {
        this.$nuxt.$off('onRepliesMutated', this.reload)
    },
    methods: {
        async reload() {
            if (!this.board) {
                return
            }

            let query = this.defaultQuery().offset(this.limit * this.selected).where("board_id", this.board.id);
            try {
                await this.$store.dispatch('loadArticles', query.build())
                this.$store.getters.articles.forEach(newAtc => {
                    this.articles.some(oldAtc => {
                        if (newAtc.id === oldAtc.id) {
                            oldAtc.replyCount = newAtc.replyCount
                            return
                        }
                    })
                })
            } catch (e) { return }

            try {
                await this.$store.dispatch('loadArticle', this.$route.params.articleId)
                this.article.replies = this.$store.getters.article.replies
            } catch (e) {
                this.$toast.error("ARTICLE_NOT_EXIST")
                this.$router.push({
                    name: "board"
                })
            }
            this.$forceUpdate();
        },
        onClickWrite() {
            this.$router.push({
                name: "board-write"
            })
        },
        defaultQuery() {
            return this.$qb().sortby("id").order("desc").limit(20)
        }
    }
}
</script>
<style lang="less">
.articles {
    .article-header {
        &:not(:first-child) {
            border-top: 1px solid lightgray;
        }
    }
}
</style>