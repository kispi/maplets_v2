const starforce = function() {
    const TYPE_ARMOR = "ARMOR"
    const TYPE_GLOVE = "GLOVE"
    const TYPE_WEAPON = "WEAPON"

    return {
        doStarforce: function(lev, star, bonusExcludedAD, type) {
            if (star < 0) {
                return 0
            }

            let ad
            if (star === 0) {
                return bonusExcludedAD
            } else if (star <= 15) {
                if (type === TYPE_ARMOR) {
                    return bonusExcludedAD
                } else if (type === TYPE_GLOVE) {
                    return bonusExcludedAD + ([5, 7, 9, 11, 13, 14, 15].indexOf(star) !== -1 ? 1 : 0)
                }
                return bonusExcludedAD + Math.floor(bonusExcludedAD / 50) + 1
            } else {
                let armor = [];
                let weapon = [];
                switch (lev) {
                    case 130:
                        armor = [7, 8, 9, 10, 11]
                        weapon = [6, 7, 7, 8, 9]
                        break;
                    case 140:
                        armor = [8, 9, 10, 11, 12, 13, 15, 17, 19, 21]
                        weapon = [7, 8, 8, 9, 10, 11, 12, 30, 31, 32]
                        break;
                    case 150:
                        armor = [9, 10, 11, 12, 13, 14, 16, 18, 20, 22]
                        weapon = [8, 9, 9, 10, 11, 12, 13, 31, 32, 33]
                        break;
                    case 160:
                        armor = [10, 11, 12, 13, 14, 15, 17, 19, 21, 23]
                        weapon = [9, 9, 10, 11, 12, 13, 14, 32, 33, 34]
                        break;
                    case 200:
                        armor = [12, 13, 14, 15, 16, 17, 19, 21, 23, 25]
                        weapon = [13, 13, 14, 14, 15, 16, 17, 34, 35, 36]
                        break;
                }
                ad = [TYPE_ARMOR, TYPE_GLOVE].indexOf(type) !== -1 ? armor[star - 16] : weapon[star - 16]

            }
            return bonusExcludedAD + ad
        },
        bulkStarforce: function(lev, stars, basicAD, bonusAD, scrollAD, type) {
            if (!basicAD) {
                return
            }

            let history = []
            let bonusExcludedAD = basicAD + scrollAD
            for (var star = 0; star <= stars; star++) {
                bonusExcludedAD = this.doStarforce(lev, star, bonusExcludedAD, type)
                history.push({
                    star,
                    totalAD: bonusExcludedAD + bonusAD,
                })
            }
            return {
                basicAD,
                bonusAD,
                scrollAD,
                history
            }
        },
        bulkStarforceReverse(lev, stars, basicAD, bonusAD, totalAD, type) {
            if (basicAD * totalAD === 0) {
                return
            }

            let scrollAD
            for (var i = 0; i <= 99; i++) {
                let starforceHistory = this.bulkStarforce(lev, stars, basicAD, bonusAD, i, type).history
                if (starforceHistory[starforceHistory.length - 1].totalAD === totalAD) {
                    scrollAD = i
                    break
                }
            }

            if (scrollAD === undefined) {
                return "IMPOSSIBLE"
            }

            return this.bulkStarforce(lev, stars, basicAD, bonusAD, scrollAD, type)
        }
    }
}

export default starforce