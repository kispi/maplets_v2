<template>
    <div class="arcane route">
        <div class="text-underline text-xl text-center c-primary m-a m-b-40 p-8 card shadow" style="max-width: 320px;">{{ 'FORMULA' | translate }}: {{ 'LEVEL' | translate }} * {{ 'LEVEL' | translate }} + 11</div>

        <RadioButtons
            class="m-b-16"
            v-model="selected"
            @change="onSelectArea"
            :items="arcaneRivers"/>

        <div class="flex-row items-center">
            <div class="form-group m-a m-b-16">
                <label class="lines-1 text-center text-uppercase m-b-16" :class="labelClass">{{ 'SET_LEVEL_HERE' | translate }}</label>
                <div class="level-box">
                    <div class="flex-row flex-between">
                        <div
                            class="text-center flex-fill"
                            :class="{'selected': lev === idx + 1}"
                            v-for="(_, idx) in $numArray(10)"
                            @click="lev = idx + 1"
                            :key="idx">
                            {{ idx + 1 }}
                        </div>
                    </div>
                    <div class="flex-row flex-between">
                        <div
                            class="text-center flex-fill"
                            :class="{'selected': lev === idx + 11}"
                            v-for="(_, idx) in $numArray(10)"
                            @click="lev = idx + 11"
                            :key="idx">
                            {{ idx + 11 }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-row keys">
            <div class="text-center flex-fill">{{ 'NEEDED_EXP' | translate }} / {{ 'ACCUMULATED' | translate }}</div>
        </div>
        <div class="flex-row values">
            <div class="text-center flex-fill">{{ numSymbols }} / {{ totalNumSymbols }}</div>
        </div>
        <div class="flex-row keys">
            <div class="text-center flex-fill">{{ 'NEEDED_FEE' | translate }} / {{ 'ACCUMULATED' | translate }}</div>
        </div>
        <div class="flex-row values">
            <div class="text-center flex-fill" style="line-height: 24px;">{{ fee | currency }} / {{ totalFee | currency }}</div>
        </div>
    </div>
</template>

<script>
import RadioButtons from '@/components/app/RadioButtons'

export default {
    name: 'Arcane',
    data: () => ({
        lev: 1,
    }),
    head: () => ({
        title: '아케인 심볼 계산기 :: MAPLETs',
        meta: [
            { name: 'description', content: '아케인 심볼 계산기입니다' }
        ]
    }),
    components: { RadioButtons },
    computed: {
        neededLabel() {
            return this.$translate('TO_LEV').replace(/%s/g, this.lev)
        },
        numSymbols() {
            return this.$arcane.exp(this.lev)
        },
        totalNumSymbols() {
            return this.$arcane.totalExp(this.lev)
        },
        fee() {
            return this.$arcane.fee(this.lev)
        },
        totalFee() {
            return this.$arcane.totalFee(this.lev)
        },
        arcaneRivers() {
            return [{ title: "VANISHING_ROAD", value: 'vanishingRoad' }, { title: "OTHER_AREAS", value: 'others' }]
        },
        selected: {
            get() {
                return this.$store.getters.selectedArcaneRiverArea
            },
            set(area) {
                this.$store.commit('setArcaneRiverArea', area)
            }
        },
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        }
    },
    watch: {
        lev(val) {
            val = parseInt(val)
            if (typeof val !== "number" || val < 1) {
                this.lev = 1
            } else if (val >= 20) {
                this.lev = 20
            }
        }
    },
    methods: {
        onSelectArea(area) {
            this.selected = area
        }
    }
}
</script>