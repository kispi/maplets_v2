<template>
    <div class="cube-probability route">
        <h2 class="m-b-16" :class="labelClass">{{ 'CUBE_PROBABILITY' | translate }}</h2>
        <div class="m-b-32" :class="labelClass" v-html="$translate('CUBE_PROBABILITY_TXT')"/>
        <table class="table-default">
            <tbody>
                <tr
                    :key="idx"
                    v-for="(cube, idx) in cubes">
                    <td><img :src="cube.img"></td>
                    <td :class="{'c-white bgm-rare': idx > 0}">{{ cube.title | translate }}</td>
                    <td :class="{'c-white bgm-epic': idx > 0}">{{ displayed(cube.probs.epic, idx) }}</td>
                    <td :class="{'c-white bgm-unique': idx > 0}">{{ displayed(cube.probs.unique, idx) }}</td>
                    <td :class="{'c-white bgm-legendary': idx > 0}">{{ displayed(cube.probs.legendary, idx) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import cube from '@/modules/cube'

export default {
    name: 'Ability',
    data: () => ({
        showOrientInstruction: null,
    }),
    head: () => ({
        title: '큐브 등급업 확률 :: MAPLETs',
        meta: [
            { name: 'description', content: '중국 메이플스토리에서 공개된 큐브별 등급 상승 확률입니다.' }
        ]
    }),
    computed: {
        cubes() {
            let title = {
                title: "CUBE",
                probs: { epic: "CUBE_EPIC", unique: "CUBE_UNIQUE", legendary: "CUBE_LEGENDARY" }
            }
            
            return [title].concat(cube.map(c => {
                return {
                    title: this.$translate(c.title.toUpperCase()),
                    img: require("@/assets/images/items/" + c.title + ".png"),
                    probs: c.probs,
                }
            }))
        },
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        }
    },
    methods: {
        displayed(value, row) {
            if (row === 0) {
                return this.$translate(value)
            }

            return (value * 100).toFixed(2) + "%"
        }
    }
}
</script>