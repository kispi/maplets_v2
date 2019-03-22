<template>
    <img :src="imageUrl" v-if="imageUrl">
</template>

<script>
export default {
    props: ['world'],
    computed: {
        imageUrl() {
            if (this.world)
                return require('@/assets/images/worlds/world_' + (this.world.includes('REBOOT') ? 'reboot' : this.world.toLowerCase()) + '.png')
        }
    }
}
</script>
<style scoped>
img {
    max-width: 14px !important;
    max-height: 14px !important;
    min-width: 14px !important;
    min-height: 14px !important;
    display: inline-block;
    vertical-align: middle;
}
</style>