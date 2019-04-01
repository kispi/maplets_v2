<template>
    <div class="union route">
        <div :key="idx" v-for="(item, idx) in allItems" class="m-b-32">
            <h2 :class="labelClass">{{ item.title | translate }}</h2>
            <table>
                <tbody>
                    <tr :key="idx" v-for="(row, idx) in item.items">
                        <td :key="val" v-for="val in row">{{ val | translate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Union',
    head: () => ({
        title: '유니온 효과 정리 :: MAPLETs',
        meta: [
            { name: 'description', content: '유니온 효과들을 정리한 표입니다.' }
        ]
    }),
    computed: {
        allItems() {
            return [
                this.levels,
                this.commons,
                this.etc,
                this.stats,
            ]
        },
        levels() {
            return {
                title: "UNION_LEVELS",
                items: [["", "B", "A", "S", "SS", "SSS"],
                        ["CLASS_NORMAL", "60", "100", "140", "200", "250"],
                        ["CLASS_ZERO", "130", "160", "180", "200", "250"],
                        ["CLASS_MAPLE_M", "30", "50", "70", "120", ""]]
            }
        },
        commons() {
            return {
                title: "UNION_COMMON",
                items: [["CLASS", "EFFECT", "B", "A", "S", "SS", "SSS"],
                        [this.concatTranslatedWords("SNIPER", "NIGHTLORD"), "UNION_CRITICAL_RATE", "1%", "2%", "3%", "4%", "5%"],
                        ["MERCEDES", "UNION_COOLTIME_REDUCTION", "2%", "3%", "4%", "5%", "6%"],
                        ["DEMONAVENGER", "UNION_BOSS_DAMAGE", "1%", "2%", "3%", "4%", "5%"],
                        ["BLASTER", "UNION_IGNORE_GUARD", "1%", "2%", "3%", "4%", "5%"],
                        ["WILDHUNTER", "UNION_INCREASED_DAMAGE_CHANCE_20", "4%", "8%", "12%", "16%", "20%"],
                        ["MECHANIC", "UNION_BUFF_LENGTH", "5%", "10%", "15%", "20%", "25%"],
                        ["EUNWOL", "UNION_CRITICAL_DAMAGE", "1%", "2%", "3%", "4%", "5%"],
                        ["MAPLE_M", "UNION_AD_AP", "5", "10", "15", "20", ""]]
            }
        },
        stats() {
            return {
                title: "UNION_STATS",
                items: [["CLASS", "EFFECT", "B", "A", "S", "SS", "SSS"],
                        [this.concatTranslatedWords(
                            "STRIKER",
                            "KAISER",
                            "VIPER",
                            "HERO",
                            "PALADIN",
                            "CANNONSHOOTER",
                            "ARK"), "UNION_STR", "10", "20", "40", "80", "100"],
                        [this.concatTranslatedWords(
                            "BOWMASTER",
                            "WINDBREAKER",
                            "ANGELICBUSTER",
                            "PATHFINDER"), "UNION_DEX", "10", "20", "40", "80", "100"],
                        [this.concatTranslatedWords(
                            "ARCHMAGE_TC",
                            "VISHOP",
                            "BATTLEMAGE",
                            "LUMINOUS",
                            "FLAMEWIZARD",
                            "KINESIS",
                            "ILLIUM"), "UNION_INT", "10", "20", "40", "80", "100"],
                        [this.concatTranslatedWords(
                            "NIGHTWALKER",
                            "SHADOWER",
                            "DUALBLADE",
                            "CADENA"), "UNION_LUK", "10", "20", "40", "80", "100"],
                        [this.concatTranslatedWords(
                            "XENON"), "UNION_STR_DEX_LUK", "5", "10", "20", "40", "50"]],


            }
        },
        etc() {
            return {
                title: "UNION_ETC",
                items: [["CLASS", "EFFECT", "B", "A", "S", "SS", "SSS"],
                        ["ZERO", "UNION_EXP", "4%", "6%", "8%", "10%", "12%"],
                        ["PHANTOM", "UNION_MESO", "1%", "2%", "3%", "4%", "5%"],
                        [this.concatTranslatedWords("SOULMASTER", "MIHILE"), "UNION_HP", "250", "500", "1000", "2000", "2500"],
                        ["CAPTAIN", "UNION_SUMMON_LENGTH", "4%", "6%", "8%", "10%", "12%"],
                        ["ARAN", "UNION_HP_RECOVERY", "2%", "4%", "6%", "8%", "10%"],
                        ["EVAN", "UNION_MP_RECOVERY", "2%", "4%", "6%", "8%", "10%"],
                        ["DARKKNIGHT", "UNION_MAX_HP", "2%", "3%", "4%", "5%", "6%"],
                        ["ARCHMAGE_FP", "UNION_MAX_MP", "2%", "3%", "4%", "5%", "6%"],
                        ["DEMONSLAYER", "UNION_RESISTANCE", "1", "2", "3", "4", "5"],
                ]
            }
        },
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        }
    },
    methods: {
        concatTranslatedWords(...words) {
            return words.map(w => this.$options.filters.translate(w)).join("\n")
        }
    }
}
</script>
<style lang="less">
.union {
    table {
        display: table;
        background: #fff;
        border-spacing: 0;
        border-collapse: collapse;
        width: 100%;

        tr {
            font-weight: 700;

            td {
                text-align: center;
                padding: 8px;

                &:first-child {
                    min-width: 120px;
                    white-space: pre-wrap;
                }
            }

            &:nth-child(even) {
                background: lightgray;                
            }
        }
    }
}
</style>