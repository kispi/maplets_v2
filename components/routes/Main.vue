<template>
    <div class="main route">
        <div class="grid-container">
            <button
                class="btn font-hover-shadow"
                :class="btn.class"
                @click="onClick(btn.route)"
                v-for="btn in buttons"
                :key="btn.title">{{ btn.name | translate }}</button>
        </div>
        <div class="notice">
            그동안 제공되어 왔던 게시판 & 채팅 서비스를 제공하던 서버의 운영을 중지하는 관계로, 이 두 서비스는 2021.08.11부로 종료합니다.<br>
누군지는 모르지만 가끔 글을 써주신 모든 분들께 감사드립니다.<br>
스타포스 계산기는 계속 서비스되니 걱정 ㄴㄴ!<br><br>
CONTACT: <a href="mailto:kispi@naver.com">kispi@naver.com</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data: () => ({
        data: {}
    }),
    computed: {
        buttons() {
            return [{ route: "starforce", name: "STARFORCE_CALCULATOR", class: "bgm-yellow" },
                { route: "tips", name: "MAPLE_TIPS", class: "bgm-legendary" },
                { route: "about", name: "ABOUT", class: "bgm-unique" }]
        }
    },
    methods: {
        onClick(route) {
            this.$router.push({
                name: route
            })
        }
    },
}
    
</script>

<style lang="less" scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
    grid-auto-rows: minmax(100px, auto);
}

.notice {
    background: white;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    margin: 20px auto;
    padding: 16px;
    text-align: center;
}
</style>
