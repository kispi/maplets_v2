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
    computed: {
        articles() {
            return this.$store.getters.articles
        },
        article() {
            return this.$store.getters.article
        },
        board() {
            return this.$store.getters.board
        }
    },
    watch: {
        async $route(to, from) {
            this.reload()
        }
    },
    data: () => ({
        selected: 0,
        limit: -1,
    }),
    components: { Article, ArticleHeader },//, Pagination },
    created() {
        this.$nuxt.$on('onRepliesMutated', this.reload)
    },
    beforeDestroy() {
        this.$nuxt.$off('onRepliesMutated', this.reload)
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            await this.$store.dispatch('loadBoard')
            this.reload();
        },
        async reload() {
            if (!this.board) {
                return
            }

            let query = this.defaultQuery().offset(this.limit * this.selected).where("board_id", this.board.id);
            try {
                await this.$store.dispatch('loadArticles', query.build())
            } catch (e) {
                return
            }

            try {
                await this.$store.dispatch('loadArticle', this.$route.params.articleId)
            } catch (e) {
                this.$toast.error("ARTICLE_NOT_EXIST")
                this.$router.push({
                    name: "board"
                })
            }
            this.$scrollToTop();
        },
        onClickPage(page) {
            this.selected = page
            this.reload()
        },
        onClickWrite() {
            this.$router.push({
                name: "board-write"
            })
        },
        defaultQuery() {
            return this.$qb().sortby("id").order("desc").limit(this.limit)
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