import Vue from 'vue'

const arcaneSymbol = {
    requiredExp: [137840000],
}

for (let i = 1; i < 20; i++) {
    arcaneSymbol.requiredExp.push(i * i + 11)
}

export default ({ app, store }, inject) => {
    const Arcane = {
        exp: function(lev) {
            lev = parseInt(lev)
            return arcaneSymbol.requiredExp[lev]
        },
        totalExp: function(targetLev) {
            targetLev = parseInt(targetLev)
            let total = 0;
            for (let lev = 1; lev <= targetLev; lev++) {
                total += this.exp(lev)
            }
            return total
        },
        fee: function(lev) {
            arcaneSymbol.requiredFee = [137840000]
            let area = store.getters.selectedArcaneRiverArea;
            for (let i = 1; i < 20; i++) {
                arcaneSymbol.requiredFee.push(
                    arcaneSymbol.requiredFee[i - 1] - (area !== 'vanishing_road' ? 6600000 : 7130000))
            }
            lev = parseInt(lev)
            arcaneSymbol.requiredFee.reverse();
            return arcaneSymbol.requiredFee[parseInt(lev)]
        },
        totalFee: function(targetLev) {
            targetLev = parseInt(targetLev)
            let total = 0;
            for (let lev = 1; lev <= targetLev; lev++) {
                total += this.fee(lev)
            }
            return total
        }
    }

    Vue.prototype.$arcane = Arcane
    Vue.use(Arcane)
}