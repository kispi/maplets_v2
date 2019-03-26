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
                <label class="lines-1 text-center text-uppercase m-b-16">{{ 'SET_LEVEL_HERE' | translate }}</label>
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
                            v-for="(_, idx) in $numArray(9)"
                            @click="idx !== 9 ? lev = idx + 11 : undefined"
                            :key="idx">
                            {{ idx + 11 }}
                        </div>
                        <div class="text-center flex-fill"></div>
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
import arcane from '@/modules/arcane'
import RadioButtons from '@/components/app/RadioButtons'

export default {
    name: 'Arcane',
    data: () => ({
        lev: 1,
    }),
    components: { RadioButtons },
    computed: {
        arcaneCalculator() {
            return arcane()
        },
        neededLabel() {
            return this.$translate('TO_LEV').replace(/%s/g, this.lev)
        },
        numSymbols() {
            return this.arcaneCalculator.exp(this.lev)
        },
        totalNumSymbols() {
            return this.arcaneCalculator.totalExp(this.lev)
        },
        fee() {
            return this.arcaneCalculator.fee(this.lev)
        },
        totalFee() {
            return this.arcaneCalculator.totalFee(this.lev)
        },
        arcaneRivers() {
            return [{ title: "VANISHING_ROAD", value: 'vanishing_road' }, { title: "OTHER_AREAS", value: 'others' }]
        },
        selected: {
            get() {
                console.log(this.$store.getters.selectedArcaneRiverArea)
                return this.$store.getters.selectedArcaneRiverArea
            },
            set(area) {
                this.$forceUpdate();
                this.$store.commit('setArcaneRiverArea', area)
            }
        }
    },
    watch: {
        lev(val) {
            val = parseInt(val)
            if (typeof val !== "number" || val < 1) {
                this.lev = 1
            } else if (val > 20) {
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