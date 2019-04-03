<template>
    <div class="starforce route">
        <RadioButtons
            class="m-b-16"
            v-model="mode"
            @change="onCalcModeSelected"
            :items="calcModes"/>
        <RadioButtons
            class="m-b-16"
            v-model="starforce.type"
            @change="onStarforceType"
            :items="starforceTypes"/>
        <div class="flex-row m-a">
            <div class="form-group m-r-8" style="min-width: 80px;">
                <label class="lines-1" :class="labelClass">{{ 'REQ_LEVS' | translate }}</label>
                <Selector
                    v-model="levTitle"
                    @change="onReqLev"
                    :items="reqLevs"/>
            </div>
            <div class="form-group m-r-8">
                <label class="lines-1" :class="labelClass">{{ 'BASIC' | translate }}</label>
                <input v-model="starforce.basicAD" min="0" max="999" maxlength="3" type="number" @focus="$event.target.select()" @blur="onBlur('basic', starforce.basicAD)">
            </div>

            <div class="form-group m-r-8">
                <label class="lines-1" :class="labelClass">{{ 'BONUS' | translate }}</label>
                <input v-model="starforce.bonusAD" min="0" max="999" maxlength="3" type="number" @focus="$event.target.select()" @blur="onBlur('bonus', starforce.bonusAD)">
            </div>
            
            <div class="form-group" v-if="mode === 'REVERSE'">
                <label class="lines-1" :class="labelClass">{{ 'TOTAL' | translate }}</label>
                <input v-model="starforce.totalAD" min="0" max="999" maxlength="3" type="number" @focus="$event.target.select()" @blur="onBlur('total', starforce.totalAD)">
            </div>

            <div class="form-group" v-if="mode === 'NORMAL'">
                <label class="lines-1" :class="labelClass">{{ 'SCROLL' | translate }}</label>
                <input v-model="starforce.scrollAD" min="0" max="999" maxlength="3" type="number" @focus="$event.target.select()" @blur="onBlur('scroll', starforce.scrollAD)">
            </div>
        </div>
        <div class="text-center m-b-16">
            <div class="form-group">
                <label :class="labelClass">{{ 'STARFORCE' | translate }} : {{ starforce.stars || 0 }}</label>
                <div v-for="(row, idx) in numStarRows" :key="idx">
                    <i
                        class="zmdi"
                        :class="{
                            'm-r-8': [5, 10, 20].indexOf(star) !== -1,
                            'zmdi-star': star <= starforce.stars,
                            'zmdi-star-outline': star > starforce.stars,
                            'hovered':  star <= lastHoveredPos
                        }"
                        v-show="star !== 0"
                        v-for="star in row" :key="star"
                        :ref="'star-' + star"
                        @mouseover="lastHoveredPos = star"
                        @mouseleave="lastHoveredPos = 0"
                        @click="setNumStars(star)"
                        ></i>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="grid-col" v-if="result && result !== 'IMPOSSIBLE'">
                <div class="result" v-for="col in result.historyColumns" :key="col.colId">
                    <transition-group name="fade">
                        <div class="flex-row flex-between o-hidden items-center p-t-8 p-b-8" v-for="row in col.history" :key="row.star">
                            <div class="flex-wrap flex-row items-center m-r-16">
                                <i class="zmdi zmdi-star m-r-8"></i><span class="c-white">{{ row.star }}</span>
                            </div>
                            <div class="history text-left">
                                <span class="ad ad-total">{{ row.totalAD }}</span>
                                <span class="ad ad-basic">({{ result.basicAD || 0 }}</span>
                                <span class="ad ad-bonus"> + {{ result.bonusAD || 0 }}</span>
                                <span class="ad ad-enchant"> + {{ row.totalAD - (result.basicAD + result.bonusAD) }})</span>
                            </div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="impossible" v-show="result === 'IMPOSSIBLE'">
                <div class="flex-row items-center flex-center m-a" style="width: 240px;">
                    <img class="flex-wrap mushroom m-r-8" src="@/assets/images/orange_mushroom.png">
                    <div class="flex-wrap text-xl c-red">{{ 'IMPOSSIBLE' | translate }}!</div>
                </div>
                <div class="c-danger text-center text-lg m-t-16">{{ 'IMPOSSIBLE_INST' | translate }}</div>
            </div>
        </transition>
    </div>
</template>

<script>
import starforce from '@/modules/starforce'
import Selector from '@/components/app/Selector'
import RadioButtons from '@/components/app/RadioButtons'

export default {
    name: 'Starforce',
    components: {
        Selector,
        RadioButtons
    },
    data: () => ({
        starforce: {
            lev: 0,
            basicAD: 0,
            bonusAD: 0,
            scrollAD: 0,
            totalAD: 0,
            stars: 0,
            type: "WEAPON"
        },
        levTitle: null,
        mode: "NORMAL",
        result: null,
        lastHoveredPos: null,
        shouldTwoCols: false
    }),
    head: () => ({
        title: '스타포스 역계산기 :: MAPLETs',
        meta: [
            { name: 'description', content: '스타포스 계산기, 역계산기입니다. 스타포스 0성 상태에서의 주흔작 수치를 알 수 있습니다.' }
        ]
    }),
    computed: {
        reqLevs() {
            return this.supportedLevs.map(l => l.title)
        },
        supportedLevs()  {
            let arr = [
                { value: 200, title: "200" },
                { value: 160, title: "160" },
                { value: 150, title: "150" },
                { value: 140, title: "140" }
            ]
            if (this.starforce.stars <= 20) {
                arr.push({ value: 130, title: "130" })
            }
            if (this.starforce.stars <= 15) {
                arr.push({ value: 120, title: this.$translate("LEV_LTE_120") })
            }
            return arr.reverse();
        },
        calcModes() {
            return [{ title: "CALC_NORMAL", value: "NORMAL" },
                    { title: "CALC_REVERSE", value: "REVERSE" }]
        },
        starforceTypes() {
            return [{ title: "STARFORCE_WEAPON", value: "WEAPON" },
                    { title: "STARFORCE_ARMOR", value: "ARMOR" },
                    { title: "STARFORCE_GLOVE", value: "GLOVE" }]
        },
        numStarRows() {
            let numStars = this.$numArray(26)
            return [numStars.slice(0, 16), numStars.slice(16)]
        },
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        }
    },
    watch: {
        starforce: {
            handler(oldVal, newVal) {
                Object.keys(newVal).forEach(key => {
                    if (!newVal[key]) {
                        newVal[key] = 0;
                    }
                })
                this.doStarforce()
            },
            deep: true
        },
        mode() {
            this.doStarforce();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let selectedReqLevOnLoad = this.supportedLevs[0]
            this.starforce = {
                lev: selectedReqLevOnLoad.value,
                basicAD: 0,
                bonusAD: 0,
                scrollAD: 0,
                totalAD: 0,
                stars: 0,
                type: "WEAPON"
            }
            this.onReqLev({
                newVal: selectedReqLevOnLoad.title
            })
        },
        onReqLev(lev) {
            let selectedReqLev = this.supportedLevs.find(l => l.title === lev.newVal)
            this.starforce.lev = selectedReqLev.value
            this.levTitle = selectedReqLev.title
        },
        onCalcModeSelected(calcMode) {
            this.trackEvent('starforce_set_calc_mode_' + calcMode.value.toString())
            this.mode = calcMode.value
        },
        onStarforceType(type) {
            this.trackEvent('starforce_set_starforce_type_' + type.value.toString())

            this.starforce.type = type.value
        },
        setNumStars(star) {
            this.trackEvent('starforce_set_num_stars_' + star)

            this.starforce.stars = this.starforce.stars === star ? 0 : star

            if (!this.supportedLevs.find(l => l.value === this.starforce.lev)) {
                this.onReqLev({
                    newVal: this.supportedLevs[0].title
                })
            }
        },
        doStarforce() {
            Object.keys(this.starforce).forEach(key => {
                if (key !== "type") {
                    this.starforce[key] = parseInt(this.starforce[key])
                }
            })
            
            if (this.mode === "REVERSE") {
                this.result = starforce().bulkStarforceReverse(
                    this.starforce.lev,
                    this.starforce.stars,
                    this.starforce.basicAD,
                    this.starforce.bonusAD,
                    this.starforce.totalAD,
                    this.starforce.type
                )
            } else if (this.mode === "NORMAL") {
                this.result = starforce().bulkStarforce(
                    this.starforce.lev,
                    this.starforce.stars,
                    this.starforce.basicAD,
                    this.starforce.bonusAD,
                    this.starforce.scrollAD,
                    this.starforce.type
                )
            }
            if (this.result &&
                this.result.history) {
                (this.result.history || []).reverse();
                let lenHistory = this.result.history.length
                this.result.historyColumns = [{
                    colId: 0,
                    history: this.result.history.slice(0, lenHistory / 2),
                }, {
                    colId: 1,
                    history: this.result.history.slice(lenHistory / 2, lenHistory)
                }]
            }
        },
        onBlur(adType, value) {
            if (adType === 'basic' || adType === 'total') {
                if (value === 0) {
                    return
                }
            }
            this.trackEvent('starforce_set_value_' + adType + "_" + value)
        },
        trackEvent(event) {
            // console.log("DISABLED")
            // this.$gtm.trackEvent({
            //     event: "Event",
            //     category: event,
            //     action: "interaction",
            //     label: "maplets",
            //     value: 1
            // });
        },
    },
}
</script>
<style lang="less">
@media (min-width: 768px) {
    .p-reflexive {
        padding-left: 16px;
        padding-right: 16px;
    }
}

.starforce {
    .grid-col {
        position: absolute;
        left: 0;
        right: 0;
        margin-bottom: 160px;
    }

    .selector .selected-item {
        border-radius: none;
    }
}
</style>