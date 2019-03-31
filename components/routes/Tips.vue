<template>
    <div class="tips route">
        <TipItems/>
    </div>
</template>
<script>
import TipItems from '@/components/routes/tips/TipItems'

export default {
    name: 'Tips',
    components: { TipItems },
    head: () => ({
        title: '메이플 꿀팁 :: MAPLETs',
        meta: [
            { name: 'description', content: '어빌리티, 링크 스킬, 유니온 등 메이플스토리 관련 팁들입니다.' }
        ]
    }),
}
</script>