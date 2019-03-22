<template>
    <div class="pagination">
        <div class="flex-row">
            <div
                class="page flex-fill"
                :key="page"
                v-for="page in pages">{{ page + 1}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['selected', 'limit', 'items'],
    data: () => ({
        pages: []
    }),
    mounted() {
        if (this.items) {
            for (let i = 0; i < Math.ceil((this.items || []).length / this.limit); i++) {
                this.pages.push(i)
            }
            console.log(this.pages)
        }
    }
}
</script>
<style>
.pagination {

}
</style>