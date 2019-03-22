<template>
    <div class="replies">
        <div class="m-b-8" v-if="article.replies">
            <div class="p-8">
                <span>{{ 'REPLY' | translate }}</span><span class="c-red m-l-8">[{{ article.replies.length }}]</span>
            </div>
            <Reply :reply="reply" class="reply" :key="reply.id" v-for="reply in article.replies"/>
        </div>
        <WriteReply :article="article"/>
    </div>
</template>

<script>
import Reply from '@/components/routes/board/Reply'
import WriteReply from '@/components/routes/board/WriteReply'

export default {
    name: "replies",
    props: ['article'],
    components: { Reply, WriteReply },
    data: () => ({
        nickname: null,
        password: null,
        text: null
    }),
}
</script>