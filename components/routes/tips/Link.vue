<template>
    <div class="link route">
        <h2 class="m-b-16" :class="labelClass">{{ 'LINK_TITLE' | translate }}</h2>
        <div class="m-b-40" :class="labelClass" v-html="$options.filters.translate('LINK_TXT')"/>
        <div :key="idx" v-for="(item, idx) in allItems" class="m-b-32">
            <h2 :class="labelClass">{{ item.title | translate }}</h2>
            <table>
                <tbody>
                    <tr :key="idxTr" v-for="(row, idxTr) in item.items">
                        <td :key="val" v-for="(val, idxTd) in row">
                            <span v-if="idxTd !== 1">{{ val | translate }}</span>
                            <span v-if="idxTd === 1"><img :src="val"></span>
                        </td>
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
        title: '링크 스킬 정리 :: MAPLETs',
        meta: [
            { name: 'description', content: '링크 스킬들의 효과들을 정리한 페이지입니다.' }
        ]
    }),
    computed: {
        allItems() {
            return [
                this.exps,
                this.dealings,
                this.etc,
            ]
        },
        exps() {
            let items = [["MERCEDES", "LINK_ELVEN_BLESS"],
                        ["EVAN", "LINK_RUNE_PERSISTENCE"],
                        ["ARAN", "LINK_COMBO_ADVANTAGE"]]
            return {
                title: "LINK_EXPS",
                items: this.skills(items)
            }
        },
        dealings() {
            let items = [["DEMONAVENGER", "LINK_WILD_RAGE"],
                        ["DEMONSLAYER", "LINK_DEMONS_FURY"],
                        ["LUMINOUS", "LINK_PERMEATE"],
                        ["PHANTOM", "LINK_DEADLY_INSTINCT"],
                        ["KINESIS", "LINK_JUDGEMENT"],
                        ["ANGELICBUSTER", "LINK_SOUL_CONTRACT"],
                        ["ZERO", "LINK_RHINNE_BLESSING"],
                        ["XENON", "LINK_HYBRID_LOGIC"],
                        ["CADENA", "LINK_INTENSIVE_INSULT"],
                        ["ILLIUM", "LINK_FLOW_OF_BATTLE"],
                        ["ARK", "LINK_ECSTASY"]]
            return {
                title: "LINK_DEALINGS",
                items: this.skills(items),
            }
        },
        etc() {
            let items = [["MIHILE", "LINK_KNIGHTS_WATCH"],
                        ["RESISTANCE", "LINK_SPIRIT_OF_FREEDOM"],
                        ["CYGNUS_KNIGHTS", "LINK_CYGNUS_BLESS"],
                        ["KAISER", "LINK_IRON_WILL"],
                        ["CANNONSHOOTER", "LINK_PIRATE_BLESS"],
                        ["EUNWOL", "LINK_CLOSE_CALL"]]
            return {
                title: "LINK_ETC",
                items: this.skills(items),
            }
        },
        labelClass() {
            return this.$store.getters.background === "show" ? "c-white" : "c-text-dark"
        },
        icons() {
            return {
                LINK_ELVEN_BLESS: require("@/assets/images/skills_link/elven_bless.png"),
                LINK_RUNE_PERSISTENCE: require("@/assets/images/skills_link/rune_persistence.png"),
                LINK_COMBO_ADVANTAGE: require("@/assets/images/skills_link/combo_kill_advantage.png"),
                LINK_WILD_RAGE: require("@/assets/images/skills_link/wild_rage.png"),
                LINK_DEMONS_FURY: require("@/assets/images/skills_link/fury_unleashed.png"),
                LINK_PERMEATE: require("@/assets/images/skills_link/permeate.png"),
                LINK_DEADLY_INSTINCT: require("@/assets/images/skills_link/deadly_instinct.png"),
                LINK_JUDGEMENT: require("@/assets/images/skills_link/judgement.png"),
                LINK_SOUL_CONTRACT: require("@/assets/images/skills_link/soul_contract.png"),
                LINK_RHINNE_BLESSING: require("@/assets/images/skills_link/rhinne_blessing.png"),
                LINK_HYBRID_LOGIC: require("@/assets/images/skills_link/hybrid_logic.png"),
                LINK_INTENSIVE_INSULT: require("@/assets/images/skills_link/intensive_insult.png"),
                LINK_FLOW_OF_BATTLE: require("@/assets/images/skills_link/flow_of_battle.png"),
                LINK_ECSTASY: require("@/assets/images/skills_link/ecstasy.png"),
                LINK_KNIGHTS_WATCH: require("@/assets/images/skills_link/knights_watch.png"),
                LINK_SPIRIT_OF_FREEDOM: require("@/assets/images/skills_link/spirit_of_freedom.png"),
                LINK_CYGNUS_BLESS: require("@/assets/images/skills_link/cygnus_blessing.png"),
                LINK_IRON_WILL: require("@/assets/images/skills_link/iron_will.png"),
                LINK_PIRATE_BLESS: require("@/assets/images/skills_link/pirate_blessing.png"),
                LINK_CLOSE_CALL: require("@/assets/images/skills_link/close_call.png"),
            }
        },
    },
    methods: {
        skills(items) {
            return items.map(item => {
                let arr = []
                return [item[0], this.icons[item[1]], item[1], item[1] + "_TXT"]
            })
        },
    }
}
</script>
<style lang="less">
.link {
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
            }

            &:nth-child(even) {
                background: #eee;                
            }
            
            &:nth-child(odd) {
                background: #ddd;
            }
        }
    }
}
</style>