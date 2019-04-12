<template>
    <div class="expressions">
        <div class="flex-row buttons">
            <button
                class="btn btn-default slow-hover b-sm flex-fill"
                :class="btn.class"
                @click="express(btn.actionType)"
                :key="btn.actionType"
                v-for="btn in buttons()">
                <i class="zmdi m-r-5" :class="btn.icon"/>
                {{ btn.title | translate }} {{ btn.value || 0 }}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Expressions',
    props: ['obj', 'referenceType'],
    methods: {
        buttons() {
            return [{
                title: "EXPRESS_UP",
                actionType: "up",
                class: "c-accent",
                // icon: "zmdi-thumb-up c-accent",
                value: (this.obj.expressions || {}).up,
            }, {
                title: "EXPRESS_DOWN",
                actionType: "down",
                class: "c-danger",
                // icon: "zmdi-thumb-down c-danger",
                value: (this.obj.expressions || {}).down,
            }]
        },
        express(expressionType) {
            let payload = {
                referenceType: this.referenceType,
                referenceID: this.obj.id,
                expressionType: expressionType,
                nickname: this.$store.getters.user.nickname
            }
            this.post(payload)
        },
        async post(payload) {
            try {
                const resp = await this.$api("post", "expressions", {}, payload)
                this.obj.expressions = resp.data.data.expressions
                if (payload.referenceType === "article") {
                    this.$nuxt.$emit('onExpressed', this.obj)
                }
                this.$forceUpdate()
            } catch (e) {
                this.$toast.error(e.response.data)
            }
        },
    }
}
</script>
<style lang="less">
.expressions {
    .buttons {
        button {
            &:not(:first-child) {
                margin-left: 8px;
            }
        }
    }
}
</style>