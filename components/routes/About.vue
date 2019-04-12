<template>
    <div class="about route">
        <div class="form-group m-a" style="max-width: 240px;">
            <div class="b-lg o-hidden shadow bgm-white p-b-16">
                <img style="width: 100%;" class="m-b-16" src="@/assets/images/thalberg.png">
                <a class="btn btn-accent text-uppercase slow-hover m-l-8 m-r-8" target="_blank" href="https://maple.gg/u/%ED%83%88%EB%B2%A0%EB%A5%B4%ED%81%AC">
                    {{ 'VIEW_MAPLE_GG' | translate }}
                </a>

                <div class="text-center m-t-40 m-b-8">
                    Powered by
                    <a target="_blank" href="https://vuejs.org/" class="c-accent f-700">Vue</a> &
                    <a target="_blank" href="https://golang.org/" class="c-primary f-700">Golang</a></div>
                <div class="text-center">Published in Jan 19, 2019.</div>
            </div>
        </div>
        <div class="m-t-24 p-16 pre-wrap card shadow m-b-40">
            <div v-html="$translate('ABOUT_MAPLETS_1')"></div>
            <div class="m-t-16" v-html="$translate('ABOUT_MAPLETS_2')"></div>
            <div class="m-t-16" v-html="$translate('ABOUT_MAPLETS_3')"></div>
            <div class="m-t-16" v-html="$translate('ABOUT_MAPLETS_4')"></div>
        </div>

        <div class="updates p-16 card shadow">
            <div class="c-accent text-center text-underline" @click="showUpdates = !showUpdates">{{ 'SHOW_UPDATES' | translate }}</div>
            <TransitionExpand>
                <div v-if="showUpdates">
                    <ul class="m-b-32" v-for="day in updates" :key="day.timestamp">
                        <div class="m-b-16">{{ day.timestamp | formatDate("MMM DD, YYYY") }}</div>
                        <li class="m-l-16 m-b-8" v-for="job in day.jobs" :key="job">
                            <div v-html="job"></div>
                        </li>
                    </ul>
                </div>
            </TransitionExpand>
        </div>
    </div>
</template>

<script>
import TransitionExpand from '@/components/app/TransitionExpand'

export default {
    name: 'About',
    components: { TransitionExpand },
    data: () => ({
        showUpdates: false,
    }),
    head: () => ({
        title: '정보 :: MAPLETs',
        meta: [
            { name: 'description', content: 'MAPLETs 소개 및 업데이트 내역을 제공합니다.' }
        ]
    }),
    computed: {
        updates() {
            return [
                {
                    timestamp: "2019-01-19",
                    jobs: [
                        '작업 착수 및 완료 후 최초 배포',
                        '스타포스 계산기 업데이트'
                    ]
                }, {
                    timestamp: "2019-01-24",
                    jobs: [
                        '아케인 심볼 계산기 업데이트'
                    ]
                }, {
                    timestamp: "2019-01-27",
                    jobs: [
                        '아케인 심볼 계산기에 수수료 추가<br>(소멸의 여로 업데이트 내역 반영)'
                    ]
                }, {
                    timestamp: "2019-02-06",
                    jobs: [
                        '메이플 챗 업데이트'
                    ]
                }, {
                    timestamp: "2019-02-27",
                    jobs: [
                        '메이플 챗 첫 릴리즈 & 도메인 변경 (버그가 매우 많을 수 있습니다)'
                    ]
                }, {
                    timestamp: "2019-03-13",
                    jobs: [
                        '귓속말을 한 뒤 닉네임을 변경하면 대화 내역이 변경되는 오류 및 기타 버그들 수정'
                    ]
                }, {
                    timestamp: "2019-03-15",
                    jobs: [
                        '익명게시판 추가 작업 시작 & 메인 화면 레이아웃을 그리드로 변경'
                    ]
                }, {
                    timestamp: "2019-03-18",
                    jobs: [
                        '어빌리티 페이지 업데이트'
                    ]
                }, {
                    timestamp: "2019-03-21",
                    jobs: [
                        '익명게시판 추가. SSR 아직 미구현 관계로 특정 글이 선택된 상태에서 새로고침시 nginx 404페이지가 보임.',
                        'Nuxt로 전환 예정'
                    ]
                }, {
                    timestamp: "2019-03-26",
                    jobs: [
                        'Nuxt로 전환 완료, SEO는 asyncData를 사용하도록 변경해야 해결'
                    ]
                }, {
                    timestamp: "2019-03-29",
                    jobs: [
                        '채팅창에서 자신의 닉네임은 진하게 밑줄치도록 변경',
                        '모바일 화면에서는 첫 접속시 채팅창을 감춤 (접속은 항시 되어있음)',
                        '메뉴의 z-index가 채팅창보다 낮은 버그 수정'
                    ]
                }, {
                    timestamp: "2019-03-31",
                    jobs: [
                        '어빌리티만 보여주던 페이지를 팁 페이지로 개편 & 유니온 정보 추가'
                    ]
                }, {
                    timestamp: "2019-04-01",
                    jobs: [
                        '링크 스킬 페이지 추가'
                    ]
                }, {
                    timestamp: "2019-04-02",
                    jobs: [
                        '조회수 어뷰징 추가',
                        '너무 짧은 시간 간격의 글쓰기, 댓글쓰기 방지'
                    ]
                }, {
                    timestamp: "2019-04-03",
                    jobs: [
                        '자유게시판에 SEO 적용'
                    ]
                }, {
                    timestamp: "2019-04-04",
                    jobs: [
                        '존재하지 않는 게시글에 접근시 보여줄 404 페이지 추가'
                    ]
                }, {
                    timestamp: "2019-04-06",
                    jobs: [
                        '큐브 확률 페이지 추가 & 설정 페이지 삭제 및 메뉴 좌측으로 이동'
                    ]
                }, {
                    timestamp: "2019-04-13",
                    jobs: [
                        '게시물, 댓글 추천/비추천 기능 추가'
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.about {
    .slow-hover:hover {
        background: rgba(80, 82, 127, 1);
    }

    .card.shadow {
        max-width: 480px;
        margin: auto;
    }

    .updates {
        ul {
            font-weight: 700;
            padding: 0;

            li {
                font-weight: initial;
                list-style-type: none;
            }
        }
    }
}
</style>