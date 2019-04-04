<template>
    <Board
        :board="board"
        :article="article"
        :articles="articles"/>
</template>

<script>
import Board from '@/components/routes/Board'
import qb from '@/plugins/querybuilder'

export default {
    layout: 'default',
    components: { Board },
    scrollToTop: true,
    async asyncData({ app, params, store, redirect }) {
        let board, article, articles;

        const defaultQuery = () => {
            return qb().sortby("id").order("desc").limit(20)
        }
        
        try {
            await store.dispatch('loadBoard')
            board = store.getters.board
        } catch (e) {
            return
        }
        if (!board) { return }

        let query = defaultQuery().where("board_id", board.id)
        try {
            await store.dispatch('loadArticles', query.build())
            articles = store.getters.articles
        } catch (e) { return }

        try {
            await store.dispatch('loadArticle', params.articleId)
            article = store.getters.article
        } catch (e) {
            redirect("/not-found")
        } 
        
        return {
            board,
            article,
            articles
        }
    },
}
</script>