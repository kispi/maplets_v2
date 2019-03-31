import Vue from 'vue'

const maxFee = 137840000
const feeVR = 7130000
const feeOthers = 6600000

const requiredExp = [0]
const requiredFee = {
    vanishingRoad: [maxFee],
    others: [maxFee],
}

for (let i = 1; i <= 19; i++) {
    requiredExp.push(i * i + 11)
}

for (let i = 1; i <= 18; i++) {
    requiredFee.vanishingRoad.push(requiredFee.vanishingRoad[i - 1] - feeVR)
    requiredFee.others.push(requiredFee.others[i - 1] - feeOthers)
}

requiredFee.vanishingRoad.push(0)
requiredFee.others.push(0)

requiredFee.vanishingRoad.reverse()
requiredFee.others.reverse()

requiredFee.vanishingRoad.push(0)
requiredFee.others.push(0)

requiredExp.push(0)

export default ({ app, store }, inject) => {
    const Arcane = {
        exp: function(lev) {
            lev = parseInt(lev)
            return requiredExp[lev]
        },
        totalExp: function(targetLev) {
            targetLev = parseInt(targetLev)
            let total = 0;
            for (let lev = 1; lev <= targetLev-1; lev++) {
                total += this.exp(lev)
            }
            return total
        },
        fee: function(lev) {
            let area = store.getters.selectedArcaneRiverArea;
            lev = parseInt(lev)
            return requiredFee[area][parseInt(lev)]
        },
        totalFee: function(targetLev) {
            targetLev = parseInt(targetLev)
            let total = 0;
            for (let lev = 1; lev <= targetLev-1; lev++) {
                total += this.fee(lev)
            }
            return total
        }
    }

    Vue.prototype.$arcane = Arcane
    Vue.use(Arcane)
}