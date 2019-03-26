<template>
    <div class="ability route">
        <div class="m-16 text-xl c-white text-center" v-show="showOrientInstruction">{{ 'ABILITY_TXT' | translate }}</div>
        <table class="items">
            <tr>
                <td class="item">{{ 'ABILITY' | translate }}</td>
                <td class="item">{{ 'RARE' | translate }}</td>
                <td class="item">{{ 'EPIC' | translate }}</td>
                <td class="item">{{ 'UNIQUE' | translate }}</td>
                <td class="item">{{ 'LEGENDARY' | translate }}</td>
            </tr>
            <tr :key="abilityKey" v-for="abilityKey in keys">
                <td class="item">{{ abilityKey.toUpperCase() | translate }}</td>
                <td
                    class="item"
                    :key="idx"
                    v-for="(value, idx) in items[abilityKey]">{{ value }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Ability',
    data: () => ({
        showOrientInstruction: null,
    }),
    created() {
        if (process.client)
            window.addEventListener('resize', this.setShowOrientInstruction)
    },
    beforeDestroy() {
        if (process.client)
            window.removeEventListener('resize', this.setShowOrientInstruction)
    },
    computed: {
        keys() {
            return Object.keys(this.items)
        },
        items() {
            return {
                primary_stat_n: ["5~10", "15~20", "25~30", "35~40"],
                all_stat_n: ["5~10", "15~20", "25~30", "35~40"],
                primary_secondary_n_m: ["5~10 / 3~5", "15~20 / 8~10", "25~30 / 13~15", "35~40 / 18~20"],
                n_percent_of_primary_points: ["2~3%", "4~5%", "7~8%", "9~10%"],
                max_hp_n: ["75~150", "225~300", "375~450", "525-600"],
                max_mp_n: ["75~150", "225~300", "375~450", "525-600"],
                defense_n: ["50~100", "150~200", "250~300", "350~400"],
                damage_n: ["2~3%", "4~5%", "7~8%", "9~10%"],
                debuffed_n: ["2~3%", "4~5%", "7~8%", "9~10%"],
                buff_length_n: ["7~13%", "19~25%", "32-38%", "44~50%"],
                increased_meso: ["3~5%", "8~10%", "13~15%", "18~20%"],
                increased_item: ["3~5%", "8~10%", "13~15%", "18~20%"],
                movement_n: ["4~8", "10~14", "18~20", "-"],
                jump_n: ["4~8", "10~14", "18~20", "-"],
                ad_n: ["-", "6~12", "15~21", "27~30"],
                ap_n: ["-", "6~12", "15~21", "27~30"],
                critical_rate: ["-", "5~10%", "15~20%", "25~30%"],
                evade_rate: ["-", "-", "3~5%", "8~10%"],
                max_hp_per: ["-", "-", "5~10%", "15~20%"],
                max_mp_per: ["-", "-", "5~10%", "15~20%"],
                defense_per: ["-", "-", "13~25%", "38~50%"],
                def_to_damage: ["-", "-", "13~25%", "38~50%"],
                reset_cooltime_rate: ["-", "-", "5~10%", "15~20%"],
                boss_damage: ["-", "-", "5~10%", "15~20%"],
                ad_per_lev: ["-", "-", "-", "16~10"],
                ap_per_lev: ["-", "-", "-", "16~10"],
                as_n: ["-", "-", "-", "1"],
                increased_target_n: ["-", "-", "-", "1"],
                passive_lev_n: ["-", "-", "-", "1"]
            }
        },
    },
    methods: {
        setShowOrientInstruction() {
            this.showOrientInstruction = window.innerWidth <= 480
        }
    }
}
</script>