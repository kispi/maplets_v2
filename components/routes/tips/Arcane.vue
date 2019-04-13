<template>
    <div class="arcane route">
        <table class="table-default">
            <tbody>
                <tr>
                    <td>{{ 'LEVEL' | translate }}</td>
                    <td>{{ 'NEEDED_EXP' | translate }}</td>
                    <td>{{ 'VANISHING_ROAD' | translate }}</td>
                    <td>{{ 'OTHER_AREAS' | translate }}</td>
                </tr>
                <tr
                    :key="idx"
                    v-for="(exp, idx) in arcane.requiredExp">
                    <td>{{ idx + 1 }} <i class="zmdi zmdi-arrow-right"></i> {{ idx + 2 }}</td>
                    <td>{{ exp }}</td>
                    <td>{{ arcane.requiredFee.vanishingRoad[idx] | currency }}</td>
                    <td>{{ arcane.requiredFee.others[idx] | currency }}</td>
                </tr>
            </tbody>
        </table>
    </div>        
</template>

<script>
import arcane from '@/modules/arcane'

export default {
    name: 'Arcane',
    data: () => ({
        lev: 1,
        selected: "vanishingRoad",
    }),
    head: () => ({
        title: '아케인 심볼 표 :: MAPLETs',
        meta: [
            { name: 'description', content: '아케인 심볼 필요 개수 및 비용을 정리한 표입니다' }
        ]
    }),
    computed: {
        arcane() {
            return arcane
        },
    },
}
</script>