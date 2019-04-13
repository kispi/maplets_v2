<template>
    <div class="reply">
        <div class="flex-row flex-between items-center">
            <div class="flex-row info">
                <div class="flex-wrap flex-row">
                    <small class="nickname lines-1" v-html="reply.nickname"></small>
                    <small class="c-text" v-if="reply.ip && !reply.user">({{ reply.ip | ipFront }})</small>
                </div>
                <small>{{ reply.createdAt | formatDate }}</small>
            </div>
            <div
                class="delete-reply flex-row flex-wrap">
                <transition name="fade">
                    <div
                        class="flex-row items-center"
                        v-if="showDeleteConfirm">
                        <input
                            type="password"
                            :ref="'replyPassword'"
                            class="flex-fill m-r-8"
                            v-model="password"
                            :placeholder="'PASSWORD' | translate"
                            @keypress.enter="onConfirmDelete">
                        <button
                            class="btn btn-sm bgm-danger b-sm flex-fill m-r-8"
                            @click="onConfirmDelete">{{ 'CONFIRM' | translate }}</button>
                    </div>
                </transition>
            </div>
            <i
                class="zmdi zmdi-close f-16"
                @click="onClickDeleteReply"></i>
        </div>
        <div class="pre-wrap m-t-8 m-b-16" v-html="reply.text"></div>
        <div class="flex-row flex-between items-center">
            <div class="expressions-reply m-l-a">
                <Expressions
                    :referenceType="'reply'"
                    :obj="reply"/>
            </div>
        </div>
    </div>
</template>

<script>
import Expressions from '@/components/routes/board/Expressions'

export default {
    name: "Reply",
    components: { Expressions },
    props: ['reply'],
    data: () => ({
        showDeleteConfirm: false,
        password: null,
    }),
    methods: {
        async onConfirmDelete() {
            try {
                await this.$api("delete", "replies/" + this.reply.id + "?password=" + this.password);
                this.$nuxt.$emit('onRepliesMutated')
                this.$toast.success("DELETED")
            } catch (e) {
                this.password = null;
                this.$toast.error("INVALID_PASSWORD")
            }
            this.showDeleteConfirm = false
        },
        onClickDeleteReply() {
            this.showDeleteConfirm = !this.showDeleteConfirm
            setTimeout(_ => {
                let dom = this.$refs['replyPassword']
                if (dom) {
                    dom.focus()
                }
            }, 0)
        }
    }
}
</script>

<style lang="less">
.reply {
    padding: 8px;
    border-top: 1px dotted gray;
    position: relative;

    .nickname {
        max-width: 120px;
    }

    img {
        max-width: 240px !important;
    }

    .delete-reply {
        position: absolute;
        top: 4px;
        right: 24px;

        button, input {
            font-size: 12px;
            height: 24px;
            line-height: 12px;
            width: 80px !important;
        }
    }
}
</style>