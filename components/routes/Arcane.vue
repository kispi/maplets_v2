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
                            @click="onSetLev(idx + 1)"
                            :key="idx">
                            {{ idx + 1 }}
                        </div>
                    </div>
                    <div class="flex-row flex-between">
                        <div
                            class="text-center flex-fill"
                            :class="{'selected': lev === idx + 11}"
                            v-for="(_, idx) in $numArray(10)"
                            @click="onSetLev(idx + 11)"
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
import arcane from '@/modules/arcane'

export default {
    name: 'Arcane',
    data: () => ({
        lev: 1,
        selected: "vanishingRoad",
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
            return arcane.exp(this.lev)
        },
        totalNumSymbols() {
            return arcane.totalExp(this.lev)
        },
        fee() {
            return arcane.fee(this.lev, this.selected)
        },
        totalFee() {
            return arcane.totalFee(this.lev, this.selected)
        },
        arcaneRivers() {
            return [{ title: "VANISHING_ROAD", value: 'vanishingRoad' }, { title: "OTHER_AREAS", value: 'others' }]
        },
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        }
    },
    methods: {
        onSelectArea(area) {
            this.selected = area.value
        },
        onSetLev(lev) {
            this.lev = lev
        },
    }
}
</script>